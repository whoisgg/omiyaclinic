import { DisplayHeading } from "@/components/display-heading";
import { Reveal } from "@/components/reveal";
import { SectionRail } from "@/components/section-rail";

const PILARES = [
  {
    numeral: "I",
    title: "Conocimiento y Autoconciencia",
    desc: "Comprender los cambios físicos, mentales y emocionales en cada etapa de la vida.",
  },
  {
    numeral: "II",
    title: "Salud Mental y Autoestima",
    desc: "Fortalecer la confianza y el amor propio a lo largo del tiempo.",
  },
  {
    numeral: "III",
    title: "Bienestar Integral",
    desc: "Promover hábitos saludables, cuidado físico y balance emocional.",
  },
  {
    numeral: "IV",
    title: "Conexión y Comunidad",
    desc: "Fomentar relaciones significativas y un sentido de pertenencia que nutra la vida cotidiana.",
  },
  {
    numeral: "V",
    title: "Cuidado Personal y Belleza Consciente",
    desc: "Prevención y tratamientos estéticos mínimamente invasivos, respetando la naturalidad.",
  },
];

/**
 * 02 · Nuestra mirada — wireframe 32a/32b.
 *
 * Reemplaza al componente `WellagingPillars`, que dibujaba una W con offsets
 * verticales y la animaba con GSAP y ScrollTrigger. Sale por dos motivos: la
 * W escalonada no existe en el wireframe —los cinco pilares van a la misma
 * altura, separados por verticales— y era el único consumidor de GSAP en todo
 * el sitio, una librería entera para un efecto que la regla de entrada del
 * sitio ya resuelve.
 *
 * Los numerales van en romano y no en arábigo: es la misma serie con que se
 * numeran las secciones del home, y acá cuenta cinco ideas, no cinco pasos.
 *
 * En desktop los pilares se separan con una vertical entre columnas; en móvil
 * pasan a una horizontal arriba de cada uno, porque una vertical entre dos
 * bloques apilados no separa nada.
 */
export function AcercaPilares() {
  return (
    <section className="bg-cream-pale">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-8 lg:px-12 lg:py-32">
        <div className="flex items-start gap-6 lg:gap-16">
          <SectionRail kanji="五つの柱" numeral="02" label="Nuestra mirada" />

          <div className="flex-1">
            <Reveal delay={80}>
              <p className="eyebrow text-gold">Nuestra mirada</p>
            </Reveal>

            <DisplayHeading
              lines={["Pilares del", "Well Aging"]}
              size="sm"
              dimFrom={2}
              className="mt-6 text-zinc-900"
            />

            <ul className="mt-12 lg:mt-16 lg:grid lg:grid-cols-5 lg:gap-x-8">
              {PILARES.map((p, i) => (
                // El borde y el margen viven en el <li> y no en el Reveal: un
                // <ul> solo admite <li> como hijo directo, y Reveal renderiza
                // un div. La separación además cambia de eje con el
                // breakpoint, y el primero no lleva vertical —una raya antes
                // de la primera columna abriría el bloque en vez de dividirlo.
                <li
                  key={p.numeral}
                  className="border-t border-zinc-200 pt-5 [&:not(:first-child)]:mt-10 lg:border-t-0 lg:pt-0 lg:[&:not(:first-child)]:mt-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-zinc-200 lg:[&:not(:first-child)]:pl-8"
                >
                  <Reveal delay={i * 80}>
                    <span className="font-serif text-[13px] leading-none tracking-[0.12em] text-gold">
                      {p.numeral}
                    </span>
                    <h3 className="mt-5 font-serif text-[22px] font-light leading-[1.25] text-zinc-900 lg:text-[24px]">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-[13px] leading-[1.9] text-zinc-600">
                      {p.desc}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
