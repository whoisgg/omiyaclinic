"use client";

import { useActionState, useState, useTransition } from "react";
import Link from "next/link";
import { formatCLP, type Treatment } from "@/lib/treatments-shared";
import { bookReservationAction, type BookingFormState } from "./actions";

const STEPS = [
  { n: 1, label: "Servicio" },
  { n: 2, label: "Hora" },
  { n: 3, label: "Tus datos" },
  { n: 4, label: "Pago abono" },
];

type DayOption = {
  iso: string;
  dayLabel: string;
  dateLabel: string;
};

type SlotsByDay = Record<string, string[]>; // iso → ['10:00:00', ...]

type Professional = { slug: string; name: string };

type Props = {
  services: Treatment[];
  initialServiceSlug: string;
  professional: Professional;
  days: DayOption[];
  slotsByDay: SlotsByDay;
};

export function BookingFlow({
  services,
  initialServiceSlug,
  professional,
  days,
  slotsByDay,
}: Props) {
  const [serviceSlug, setServiceSlug] = useState(initialServiceSlug);
  const [selectedDay, setSelectedDay] = useState<string>(() => {
    return days.find((d) => (slotsByDay[d.iso]?.length ?? 0) > 0)?.iso ?? days[0]?.iso ?? "";
  });
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const service = services.find((s) => s.slug === serviceSlug) ?? services[0];
  const slotsForDay = slotsByDay[selectedDay] ?? [];

  const initialState: BookingFormState = { ok: false };
  const [state, formAction] = useActionState(bookReservationAction, initialState);
  const [isPending, startTransition] = useTransition();

  const stepReached =
    !serviceSlug ? 1 :
    !selectedSlot ? 2 :
    isPending ? 4 : 3;

  const dayLabel = days.find((d) => d.iso === selectedDay)?.dateLabel ?? "—";

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Stepper */}
      <ol className="grid grid-cols-4 overflow-hidden rounded-full border border-zinc-200 text-center">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className={
              "px-2 py-3 text-xs uppercase tracking-widest " +
              (s.n === stepReached
                ? "bg-[#b08a4f]/10 text-[#b08a4f]"
                : s.n < stepReached
                ? "text-zinc-700"
                : "text-zinc-400")
            }
          >
            <div className="text-sm font-semibold">{s.n}</div>
            <div>{s.label}</div>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        {/* LEFT COLUMN */}
        <section className="space-y-10">
          {/* Step 1: Service */}
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500">1 · Servicio</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {services.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => {
                    setServiceSlug(s.slug);
                    setSelectedSlot(null);
                  }}
                  className={
                    "rounded-md border px-4 py-3 text-left transition-colors " +
                    (s.slug === serviceSlug
                      ? "border-[#b08a4f] bg-[#b08a4f]/10"
                      : "border-zinc-300 hover:border-[#b08a4f]")
                  }
                >
                  <p className="text-sm font-medium text-zinc-900">{s.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {s.durationMin} min · {formatCLP(s.price)} · abono {formatCLP(s.deposit)}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Date + slot */}
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              2 · Hora con {professional.name}
            </p>

            {/* Days */}
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
              {days.map((d) => {
                const hasSlots = (slotsByDay[d.iso]?.length ?? 0) > 0;
                const isSelected = d.iso === selectedDay;
                return (
                  <button
                    key={d.iso}
                    type="button"
                    disabled={!hasSlots}
                    onClick={() => {
                      setSelectedDay(d.iso);
                      setSelectedSlot(null);
                    }}
                    className={
                      "rounded-md border px-2 py-2 text-center transition-colors " +
                      (isSelected
                        ? "border-[#b08a4f] bg-[#b08a4f]/10 text-[#b08a4f]"
                        : hasSlots
                        ? "border-zinc-300 hover:border-[#b08a4f]"
                        : "cursor-not-allowed border-zinc-200 text-zinc-300")
                    }
                  >
                    <div className="text-[10px] uppercase tracking-widest">
                      {d.dayLabel}
                    </div>
                    <div className="text-sm font-medium">{d.dateLabel}</div>
                  </button>
                );
              })}
            </div>

            {/* Slots */}
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {slotsForDay.length === 0 && (
                <p className="col-span-full text-sm text-zinc-500">
                  Sin horarios disponibles ese día.
                </p>
              )}
              {slotsForDay.map((slot) => {
                const hhmm = slot.slice(0, 5);
                const isSelected = slot === selectedSlot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={
                      "rounded-md border px-3 py-2 text-sm transition-colors " +
                      (isSelected
                        ? "border-[#b08a4f] bg-[#b08a4f]/10 text-[#b08a4f]"
                        : "border-zinc-300 text-zinc-700 hover:border-[#b08a4f]")
                    }
                  >
                    {hhmm}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Form */}
          <form
            action={(fd) => startTransition(() => formAction(fd))}
            className={selectedSlot ? "" : "pointer-events-none opacity-40"}
          >
            <input type="hidden" name="servicioSlug" value={serviceSlug} />
            <input type="hidden" name="profesionalSlug" value={professional.slug} />
            <input type="hidden" name="fecha" value={selectedDay} />
            <input type="hidden" name="horaInicio" value={selectedSlot ?? ""} />

            <p className="text-xs uppercase tracking-widest text-zinc-500">3 · Tus datos</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="Nombre completo" name="nombre" error={state.fieldErrors?.nombre} />
              <Field label="RUT" name="rut" error={state.fieldErrors?.rut} />
              <Field label="Teléfono" name="telefono" error={state.fieldErrors?.telefono} />
              <Field label="Correo" name="email" type="email" error={state.fieldErrors?.email} />
            </div>

            {state.error && (
              <p className="mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={!selectedSlot || isPending}
              className="mt-6 w-full rounded-md bg-[#b08a4f] py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#8e6e3a] disabled:cursor-not-allowed disabled:bg-zinc-300"
            >
              {isPending ? "Procesando…" : "Pagar abono y confirmar"}
            </button>
            <p className="mt-2 text-center text-xs text-zinc-500">
              ⊕ Pago seguro con Mercado Pago (próximo paso · de momento mock)
            </p>
          </form>
        </section>

        {/* RIGHT COLUMN — Summary */}
        <aside className="h-fit rounded-xl border border-zinc-200 bg-zinc-50 p-6">
          <p className="text-xs uppercase tracking-widest text-zinc-500">Resumen</p>
          <dl className="mt-4 space-y-3 text-sm">
            <Row k="Servicio" v={service?.name ?? "—"} />
            <Row k="Profesional" v={professional.name} />
            <Row
              k="Fecha"
              v={selectedSlot ? `${dayLabel} · ${selectedSlot.slice(0, 5)}` : dayLabel}
            />
            <Row k="Duración" v={service ? `${service.durationMin} min` : "—"} />
            <Row k="Valor total" v={service ? formatCLP(service.price) : "—"} />
          </dl>
          <div className="mt-4 border-t border-zinc-200 pt-4">
            <p className="flex items-end justify-between">
              <span className="text-sm text-zinc-700">Abono hoy</span>
              <span className="text-2xl font-semibold text-[#b08a4f]">
                {service ? formatCLP(service.deposit) : "—"}
              </span>
            </p>
          </div>
          <p className="mt-6 rounded-md border-l-2 border-[#b08a4f]/40 bg-white p-3 text-xs text-zinc-600">
            Crea una reserva <code className="font-mono">pendiente_pago</code> con TTL de
            10 min. Sin pago en ese tiempo, el cupo se libera.
          </p>
          <Link
            href="/tratamientos"
            className="mt-4 block text-center text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900"
          >
            ← Ver tratamientos
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-zinc-500">{label}</span>
      <input
        name={name}
        type={type}
        className={
          "mt-2 block w-full rounded-md border bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none " +
          (error ? "border-rose-300 focus:border-rose-500" : "border-zinc-300 focus:border-[#b08a4f]")
        }
      />
      {error && <span className="mt-1 block text-xs text-rose-600">{error}</span>}
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-zinc-500">{k}</dt>
      <dd className="font-medium text-zinc-900">{v}</dd>
    </div>
  );
}
