import { WellagingPillars } from "@/components/wellaging-pillars";

export default function AcercaPage() {
  const team = [
    { name: "Profesional 1", role: "Dermatólogo" },
    { name: "Profesional 2", role: "Cosmiatra" },
    { name: "Profesional 3", role: "Odontólogo" },
  ];

  return (
    <main className="bg-white">
      {/* Filosofía */}
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#b08a4f]">
            Nuestra filosofía
          </p>
          <h1 className="mt-4 text-4xl font-light text-zinc-900 sm:text-5xl">
            Well-aging, no anti-aging.
          </h1>
        </div>
      </section>

      {/* Fundadora */}
      <section className="border-b border-zinc-200">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:grid-cols-2">
          <div className="aspect-[4/5] bg-gradient-to-br from-zinc-200 to-zinc-300" />
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
              Retrato fundadora
            </p>
            <h2 className="mt-2 text-2xl font-light text-zinc-900">
              Historia y enfoque de la Dra. Antonieta Ortega
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-zinc-700">
              Médica con especialización en estética facial y bienestar. Fundó Omiya con
              la convicción de que cada paciente merece un plan diseñado para su edad,
              su piel y su historia.
            </p>
            <a
              href="https://instagram.com"
              className="mt-8 inline-block border-b border-[#b08a4f] pb-1 text-xs uppercase tracking-widest text-[#b08a4f]"
            >
              Instagram →
            </a>
          </div>
        </div>
      </section>

      {/* Pilares del Well Aging */}
      <WellagingPillars />

      {/* Equipo */}
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">Equipo</p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {team.map((p) => (
              <div key={p.name} className="border border-zinc-200 bg-white p-4">
                <div className="aspect-[4/5] bg-gradient-to-br from-zinc-200 to-zinc-300" />
                <p className="mt-4 text-sm font-medium text-zinc-900">{p.name}</p>
                <p className="text-xs uppercase tracking-widest text-zinc-500">{p.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* El espacio */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">El espacio</p>
          <div className="mt-8 aspect-[21/9] bg-gradient-to-br from-zinc-200 to-zinc-300" />
          <p className="mt-4 text-xs uppercase tracking-widest text-zinc-500">
            Galería de la clínica
          </p>
        </div>
      </section>
    </main>
  );
}
