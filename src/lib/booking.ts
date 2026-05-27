/**
 * Booking data access — wraps the SQL primitives:
 *   - public.available_slots(...)        → free time slots
 *   - public.create_pending_reservation  → atomic booking insert
 *   - public.get_reservation_summary     → reservation details for confirmation
 *
 * All RPCs are SECURITY DEFINER on the DB side, so the anon client can call
 * them safely without exposing a service-role key.
 */
import { createClient } from "@/lib/supabase/server";

// ---- Types ----

export type Professional = {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
};

export type ReservationInput = {
  servicioSlug: string;
  profesionalSlug: string;
  fecha: string;       // 'YYYY-MM-DD'
  horaInicio: string;  // 'HH:MM' or 'HH:MM:SS'
  nombre: string;
  rut: string;
  email: string;
  telefono: string;
};

export type ReservationResult = { reservaId: string; expiresAt: string };

export type ReservationSummary = {
  reservaId: string;
  estado: "pendiente_pago" | "confirmada" | "cancelada" | "no_show" | "expirada";
  fecha: string;
  horaInicio: string;
  horaFin: string;
  expiresAt: string | null;
  servicioName: string;
  servicioSlug: string;
  durationMin: number;
  priceClp: number;
  depositClp: number;
  profesionalName: string;
  pacienteNombre: string;
  pacienteEmail: string | null;
};

// ---- Reads ----

export async function getDefaultProfessional(): Promise<Professional | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profesionales")
    .select("id, slug, name, role, bio")
    .eq("active", true)
    .order("sort_order")
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error("[getDefaultProfessional]", error);
    return null;
  }
  return data;
}

/**
 * Returns the slot start times (HH:MM:SS) available on `fecha` for the given
 * professional + service duration.
 */
export async function getAvailableSlots(
  profesionalId: string,
  fecha: string,
  durationMin: number,
): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("available_slots", {
    p_profesional_id: profesionalId,
    p_fecha: fecha,
    p_duration_min: durationMin,
  });
  if (error) {
    console.error("[getAvailableSlots]", error);
    return [];
  }
  return (data as { slot_start: string }[] | null)?.map((r) => r.slot_start) ?? [];
}

export async function getReservationSummary(
  reservaId: string,
): Promise<ReservationSummary | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .rpc("get_reservation_summary", { p_reserva_id: reservaId })
    .maybeSingle();
  if (error) {
    console.error("[getReservationSummary]", error);
    return null;
  }
  if (!data) return null;
  const r = data as {
    reserva_id: string;
    estado: ReservationSummary["estado"];
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    expires_at: string | null;
    servicio_name: string;
    servicio_slug: string;
    duration_min: number;
    price_clp: number;
    deposit_clp: number;
    profesional_name: string;
    paciente_nombre: string;
    paciente_email: string | null;
  };
  return {
    reservaId: r.reserva_id,
    estado: r.estado,
    fecha: r.fecha,
    horaInicio: r.hora_inicio,
    horaFin: r.hora_fin,
    expiresAt: r.expires_at,
    servicioName: r.servicio_name,
    servicioSlug: r.servicio_slug,
    durationMin: r.duration_min,
    priceClp: r.price_clp,
    depositClp: r.deposit_clp,
    profesionalName: r.profesional_name,
    pacienteNombre: r.paciente_nombre,
    pacienteEmail: r.paciente_email,
  };
}

// ---- Writes ----

export type CreateReservationError =
  | "servicio_not_found"
  | "profesional_not_found"
  | "slot_taken"
  | "unknown";

export async function createPendingReservation(
  input: ReservationInput,
): Promise<{ ok: true; data: ReservationResult } | { ok: false; error: CreateReservationError }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .rpc("create_pending_reservation", {
      p_servicio_slug: input.servicioSlug,
      p_profesional_slug: input.profesionalSlug,
      p_fecha: input.fecha,
      p_hora_inicio: input.horaInicio,
      p_nombre: input.nombre,
      p_rut: input.rut,
      p_email: input.email,
      p_telefono: input.telefono,
    })
    .single();

  if (error) {
    const msg = error.message ?? "";
    if (msg.includes("slot_taken")) return { ok: false, error: "slot_taken" };
    if (msg.includes("servicio_not_found")) return { ok: false, error: "servicio_not_found" };
    if (msg.includes("profesional_not_found")) return { ok: false, error: "profesional_not_found" };
    console.error("[createPendingReservation]", error);
    return { ok: false, error: "unknown" };
  }

  const row = data as { reserva_id: string; expires_at: string };
  return { ok: true, data: { reservaId: row.reserva_id, expiresAt: row.expires_at } };
}

// ---- Date utilities (shared between server + client) ----

const DAY_LABELS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTH_LABELS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export function nextNDays(n: number, fromDate?: Date): { iso: string; dayLabel: string; dateLabel: string; isoDow: number }[] {
  const start = fromDate ? new Date(fromDate) : new Date();
  // Use local date — strip time
  start.setHours(0, 0, 0, 0);
  const out: { iso: string; dayLabel: string; dateLabel: string; isoDow: number }[] = [];
  for (let i = 0; i < n; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    out.push({
      iso,
      dayLabel: DAY_LABELS[d.getDay()],
      dateLabel: `${d.getDate()} ${MONTH_LABELS[d.getMonth()]}`,
      isoDow: ((d.getDay() + 6) % 7) + 1, // 1=Mon..7=Sun
    });
  }
  return out;
}

export function formatHM(timeStr: string): string {
  // 'HH:MM:SS' or 'HH:MM' → 'HH:MM'
  return timeStr.slice(0, 5);
}
