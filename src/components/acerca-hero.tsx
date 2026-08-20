import { DisplayHeading } from "@/components/display-heading";
import { Reveal } from "@/components/reveal";
import { SectionRail } from "@/components/section-rail";

const DIRECCION = "Del Pucará 50, Machalí";

/**
 * Hero de Acerca de — wireframe 32a/32b.
 *
 * Va sin numeral: abre la página, igual que el hero del home abre el sitio, y
 * la numeración arranca en la sección siguiente. Lo que sí lleva es el rótulo
 * vertical, que acá hace de eyebrow.
 *
 * Los dos rieles no son simétricos ni pretenden serlo: el de la izquierda es
 * el marcador de sección, y el de la derecha es la dirección de la clínica —
 * el mismo dato que el hero del home pone al pie. Puesto en vertical contra el
 * borde, cierra el cuadro sin competir con el titular.
 */
export function AcercaHero() {
  return (
    <section className="relative bg-cream-pale">
      <div className="mx-auto flex w-full max-w-[1600px] items-start justify-between gap-8 px-6 pb-24 pt-32 sm:px-8 lg:gap-16 lg:px-12 lg:pb-40 lg:pt-48">
        <SectionRail kanji="大宮の哲学" label="Filosofía Omiya" />

        <div className="flex-1">
          <DisplayHeading
            as="h1"
            lines={["Acerca de", "Omiya"]}
            // Ninguna línea atenuada: son dos palabras y el nombre de la
            // clínica es la segunda. Atenuarlo sería enterrar la marca en su
            // propia página.
            dimFrom={2}
          />

          <Reveal delay={200}>
            <span
              aria-hidden="true"
              className="mt-10 block hairline-h w-16 bg-gold lg:mt-12 lg:w-20"
            />
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-8 max-w-xl text-sm leading-[2] text-zinc-600 lg:mt-10 lg:text-base">
              Una visión de la medicina estética centrada en el well-aging,
              donde salud, prevención y bienestar conviven en equilibrio.
            </p>
          </Reveal>
        </div>

        {/* La dirección, contra el borde derecho. Se oculta en móvil: con el
            titular ya ocupando el ancho útil, un tercer riel deja la columna
            del texto en nada. Sigue en el footer, como en el home. */}
        <Reveal
          delay={200}
          className="hidden w-9 shrink-0 lg:block lg:w-11"
        >
          <span
            aria-hidden="true"
            className="block font-sans text-[10px] uppercase leading-none tracking-[0.22em] text-gold [text-orientation:upright] [writing-mode:vertical-rl]"
          >
            {DIRECCION}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
