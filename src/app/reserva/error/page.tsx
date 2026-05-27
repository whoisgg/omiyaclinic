import Link from "next/link";
import { getReservationSummary } from "@/lib/booking";

type SearchParams = Promise<{ id?: string; reason?: string }>;

const REASON_COPY: Record<string, string> = {
  failure: "El pago fue rechazado por Mercado Pago.",
  pending: "El pago quedó pendiente y aún no se confirmó.",
  expired: "La reserva expiró antes de completar el pago.",
};

export default async function ReservaErrorPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { id, reason } = await searchParams;
  const summary = id ? await getReservationSummary(id) : null;
  const explanation =
    REASON_COPY[reason ?? ""] ??
    "Tu hora no quedó reservada. El cupo sigue disponible por unos minutos.";

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-3xl text-rose-600">
          !
        </div>
        <h1 className="mt-8 text-3xl font-light text-zinc-900 sm:text-4xl">
          No pudimos confirmar el pago
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600">
          {explanation}
        </p>

        {summary && (
          <p className="mt-6 text-xs text-zinc-500">
            Servicio: <strong>{summary.servicioName}</strong> ·{" "}
            {summary.fecha} {summary.horaInicio.slice(0, 5)}
          </p>
        )}

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={`/reserva${summary ? `?servicio=${summary.servicioSlug}` : ""}`}
            className="rounded-full border border-[#b08a4f] px-6 py-3 text-xs uppercase tracking-widest text-[#b08a4f] hover:bg-[#b08a4f] hover:text-white"
          >
            Reintentar pago
          </Link>
          <Link
            href="/reserva"
            className="rounded-full border border-zinc-300 px-6 py-3 text-xs uppercase tracking-widest text-zinc-700 hover:border-zinc-400"
          >
            Elegir otra hora
          </Link>
        </div>

        <p className="mx-auto mt-12 max-w-lg border-l-2 border-[#b08a4f]/40 pl-3 text-left text-xs text-zinc-600">
          <strong>Cubre tres casos:</strong> pago rechazado, abandono del Checkout, o
          expiración del TTL de 10 min. La reserva nunca pasó a{" "}
          <code className="font-mono">confirmada</code>, así que no hay cupo bloqueado
          indebidamente.
        </p>
      </div>
    </main>
  );
}
