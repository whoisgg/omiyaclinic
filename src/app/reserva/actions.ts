"use server";

import { redirect } from "next/navigation";
import { createPendingReservation, getReservationSummary } from "@/lib/booking";
import { isMpConfigured, createCheckoutPreference } from "@/lib/mp";

export type BookingFormState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"nombre" | "rut" | "email" | "telefono", string>>;
};

export async function bookReservationAction(
  _prev: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  const servicioSlug = String(formData.get("servicioSlug") ?? "");
  const profesionalSlug = String(formData.get("profesionalSlug") ?? "");
  const fecha = String(formData.get("fecha") ?? "");
  const horaInicio = String(formData.get("horaInicio") ?? "");
  const nombre = String(formData.get("nombre") ?? "").trim();
  const rut = String(formData.get("rut") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const telefono = String(formData.get("telefono") ?? "").trim();

  const fieldErrors: BookingFormState["fieldErrors"] = {};
  if (!nombre) fieldErrors.nombre = "Falta tu nombre";
  if (!rut) fieldErrors.rut = "Falta tu RUT";
  if (!email || !/.+@.+\..+/.test(email)) fieldErrors.email = "Correo inválido";
  if (!telefono) fieldErrors.telefono = "Falta tu teléfono";

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  if (!servicioSlug || !profesionalSlug || !fecha || !horaInicio) {
    return { ok: false, error: "Faltan datos del servicio o el horario." };
  }

  // 1. Create the reserva pendiente_pago (TTL 10 min)
  const result = await createPendingReservation({
    servicioSlug,
    profesionalSlug,
    fecha,
    horaInicio,
    nombre,
    rut,
    email,
    telefono,
  });

  if (!result.ok) {
    const map: Record<typeof result.error, string> = {
      slot_taken: "Ese horario acaba de ser tomado. Elige otro slot, por favor.",
      servicio_not_found: "El servicio ya no está disponible.",
      profesional_not_found: "El profesional ya no está disponible.",
      unknown: "Hubo un problema. Intenta de nuevo.",
    };
    return { ok: false, error: map[result.error] };
  }

  const reservaId = result.data.reservaId;

  // 2. If MP is configured, redirect to Checkout Pro. Otherwise go straight to
  // confirmation (mock mode — the reserva will stay pendiente_pago and the
  // cron will expire it in 10 min unless we manually flip it).
  if (isMpConfigured()) {
    const summary = await getReservationSummary(reservaId);
    if (!summary) {
      return { ok: false, error: "No pudimos leer la reserva recién creada." };
    }
    try {
      const pref = await createCheckoutPreference(summary);
      redirect(pref.initPoint);
    } catch (e) {
      // Re-throw Next's internal redirect signal
      const errLike = e as { digest?: string };
      if (errLike?.digest?.startsWith?.("NEXT_REDIRECT")) throw e;
      console.error("[bookReservationAction] MP preference failed", e);
      return {
        ok: false,
        error: "No pudimos iniciar el pago. Intenta de nuevo o contáctanos.",
      };
    }
  }

  // Mock mode: confirm directly. (Remove this once MP is in production.)
  redirect(`/reserva/confirmacion?id=${reservaId}`);
}
