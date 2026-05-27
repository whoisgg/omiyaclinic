export default function ContactoPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-4xl font-light text-zinc-900">Visítanos</h1>

        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          <ul className="space-y-4 text-sm text-zinc-700">
            <li className="flex items-start gap-3">
              <span className="text-[#b08a4f]">📍</span>
              <span>Del Pucará 50, Of. 410 — Machalí</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#b08a4f]">📞</span>
              <a href="tel:+569" className="hover:text-zinc-900">+56 9 …</a>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#b08a4f]">✉</span>
              <a href="mailto:hello@omiyaclinic.cl" className="hover:text-zinc-900">
                hello@omiyaclinic.cl
              </a>
            </li>
            <li className="mt-6 border-t border-zinc-200 pt-6">
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Horarios de atención
              </p>
              <p className="mt-2 text-sm text-zinc-700">Martes a sábado · 10:00 – 19:00</p>
            </li>
          </ul>

          <div className="aspect-video bg-gradient-to-br from-zinc-200 to-zinc-300">
            <div className="flex h-full items-center justify-center text-xs uppercase tracking-widest text-zinc-500">
              Google Maps embed
            </div>
          </div>
        </div>

        <p className="mt-10 max-w-2xl border-l-2 border-[#b08a4f]/40 pl-4 text-sm text-zinc-600">
          <strong>Decisión:</strong> el botón <em>Agendar</em> del nav lleva al flujo de
          reserva, no a un formulario. Esta página es para info y consultas generales,
          con WhatsApp como canal directo.
        </p>
      </div>
    </main>
  );
}
