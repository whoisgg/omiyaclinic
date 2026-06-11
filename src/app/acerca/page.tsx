import Image from "next/image";
import { WellagingPillars } from "@/components/wellaging-pillars";

export default function AcercaPage() {
  const team = [
    { name: "Profesional 1", role: "Dermatólogo" },
    { name: "Profesional 2", role: "Cosmiatra" },
    { name: "Profesional 3", role: "Odontólogo" },
  ];

  return (
    <main className="bg-white">
      {/* Nuestra esencia */}
      <section className="bg-[#faf6ec]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-28">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#b08a4f]">
              Nuestra esencia
            </p>
            <h1 className="mt-6 font-serif text-5xl font-medium leading-[1.05] tracking-tight text-zinc-900 sm:text-6xl">
              El arte de envejecer con gracia.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg">
              En Omiya Clinic, entendemos que la belleza no es una lucha contra
              el tiempo, sino una alianza con él. Creemos en un enfoque
              arquitectónico del rostro, donde la armonía y la salud prevalecen
              sobre el cambio artificial.
            </p>
          </div>
          <div className="relative aspect-[4/5] max-h-[640px] w-full overflow-hidden">
            <Image
              src="/esencia.webp"
              alt="Interior de Omiya Clinic"
              fill
              className="object-cover object-[20%_center]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Cita + historia */}
      <section className="bg-[#f0eee8]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[2fr_3fr] lg:gap-20 lg:px-10 lg:py-28">
          <blockquote className="font-serif text-3xl font-light italic leading-snug text-zinc-900 sm:text-4xl">
            &ldquo;Mi compromiso es que cada paciente sienta que el tiempo le
            pertenece.&rdquo;
          </blockquote>
          <div>
            <p className="text-base leading-relaxed text-zinc-700">
              Omiya nació de la visión de crear un santuario donde la medicina
              estética se encuentra con la hospitalidad de lujo. No buscamos
              transformar rostros, sino potenciar la identidad de cada persona
              que cruza nuestra puerta.
            </p>
            <p className="mt-6 text-base leading-relaxed text-zinc-700">
              Nuestro nombre evoca la idea de un lugar sagrado, un refugio donde
              el bienestar comienza por el reconocimiento propio. Aquí, cada
              tratamiento es una pieza de diseño personalizada, ejecutada con
              precisión médica y sensibilidad artística.
            </p>
            <div className="mt-10 grid gap-8 border-t border-zinc-300/60 pt-8 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Tratamientos
                </p>
                <p className="mt-2 text-base text-zinc-800">
                  Médicamente seguros y certificados.
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Atención
                </p>
                <p className="mt-2 text-base text-zinc-800">
                  Un equipo que te conoce por tu nombre.
                </p>
              </div>
            </div>
          </div>
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
