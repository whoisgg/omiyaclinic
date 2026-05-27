import Link from "next/link";
import { notFound } from "next/navigation";
import { getReservationSummary } from "@/lib/booking";
import { formatCLP } from "@/lib/treatments-shared";
import { reservationToCalendarEvent } from "@/lib/calendar-event";
import { buildGoogleCalendarUrl, buildOutlookCalendarUrl } from "@/lib/ics";
import { CalendarButtons } from "./calendar-buttons";

type SearchParams = Promise<{ id?: string }>;

const DAY_LABELS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const MONTH_LABELS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function formatFecha(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return `${DAY_LABELS[dt.getDay()]} ${d} de ${MONTH_LABELS[m - 1]} · ${y}`;
}

export default async function ConfirmacionPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { id } = await searchParams;
  if (!id) notFound();

  const r = await getReservationSummary(id);
  if (!r) notFound();

  const event = reservationToCalendarEvent(r);
  const googleUrl = buildGoogleCalendarUrl(event);
  const outlookUrl = buildOutlookCalendarUrl(event);

  const fechaHumana = formatFecha(r.fecha);
  const horaIni = r.horaInicio.slice(0, 5);
  const horaFin = r.horaFin.slice(0, 5);

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
          ✓
        </div>
        <h1 className="mt-8 text-3xl font-light text-zinc-900 sm:text-4xl">
          {r.estado === "confirmada" ? "¡Tu hora está confirmada!" : "Tu reserva está lista"}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600">
          <strong>{r.servicioName}</strong> con {r.profesionalName}
          <br />
          {fechaHumana} · {horaIni} – {horaFin}
        </p>

        <dl className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-x-6 gap-y-2 rounded-lg border border-zinc-200 bg-zinc-50 px-6 py-5 text-left text-sm">
          <dt className="text-zinc-500">Paciente</dt>
          <dd className="text-right text-zinc-900">{r.pacienteNombre}</dd>
          <dt className="text-zinc-500">Duración</dt>
          <dd className="text-right text-zinc-900">{r.durationMin} min</dd>
          <dt className="text-zinc-500">Valor total</dt>
          <dd className="text-right text-zinc-900">{formatCLP(r.priceClp)}</dd>
          <dt className="text-zinc-500">Abono</dt>
          <dd className="text-right font-semibold text-[#b08a4f]">
            {formatCLP(r.depositClp)}
          </dd>
        </dl>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CalendarButtons
            reservaId={r.reservaId}
            googleUrl={googleUrl}
            outlookUrl={outlookUrl}
          />
          <Link
            href="/"
            className="rounded-full border border-zinc-300 px-6 py-3 text-xs uppercase tracking-widest text-zinc-700 hover:border-zinc-400"
          >
            Volver al inicio
          </Link>
        </div>

        <p className="mx-auto mt-10 max-w-lg border-l-2 border-[#b08a4f]/40 pl-3 text-left text-xs text-zinc-600">
          <strong>Estado actual:</strong>{" "}
          <code className="font-mono">{r.estado}</code>. La confirmación final
          llega cuando el webhook de Mercado Pago valide el abono. Por ahora
          este flujo es mock — el pago aún no está conectado.
        </p>
      </div>
    </main>
  );
}
