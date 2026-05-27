/**
 * Maps a ReservationSummary → CalendarEvent. Pure function, client+server safe.
 * Keep the clinic data here so we have a single source of truth for the address.
 */
import type { CalendarEvent } from "@/lib/ics";
import type { ReservationSummary } from "@/lib/booking";

const CLINIC_LOCATION = "Del Pucará 50, Of. 410, Machalí, Chile";
const CLINIC_TZ = "America/Santiago";
const DOMAIN = "omiyaclinic.cl";

export function reservationToCalendarEvent(r: ReservationSummary): CalendarEvent {
  const startLocal = `${r.fecha}T${r.horaInicio.slice(0, 5)}`;
  const endLocal = `${r.fecha}T${r.horaFin.slice(0, 5)}`;
  const title = `${r.servicioName} · Omiya Clinic`;
  const description = [
    `Reserva con ${r.profesionalName}.`,
    `Duración: ${r.durationMin} minutos.`,
    `Valor total: $${r.priceClp.toLocaleString("es-CL")} CLP (abono $${r.depositClp.toLocaleString("es-CL")} a confirmar la reserva).`,
    "",
    "Si necesitas reagendar o cancelar, contáctanos con al menos 24 horas de anticipación.",
  ].join("\n");

  return {
    uid: `${r.reservaId}@${DOMAIN}`,
    title,
    description,
    location: CLINIC_LOCATION,
    startLocal,
    endLocal,
    tz: CLINIC_TZ,
    reminderMinutes: 60,
  };
}
