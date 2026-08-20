import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { RuleLink } from "@/components/rule-link";
import { SectionMarker, SectionRail } from "@/components/section-rail";

const CITA =
  "“La estética debe ayudarnos a sentirnos mejor con quienes somos, no a convertirnos en alguien diferente.”";

const FICHA = [
  {
    rotulo: "Trayectoria",
    texto: "Más de una década integrando bienestar y salud celular.",
  },
  {
    rotulo: "Especialidad",
    texto: "Medicina estética preventiva y personalizada.",
  },
];

/**
 * 05 · La fundadora — wireframe 32a/32b.
 *
 * Cierra la página y es la única sección con ficha de datos. El bloque de
 * abajo —trayectoria y especialidad, cada uno colgando de su horizontal— es
 * el mismo lenguaje de los principios de "Nuestro compromiso" en el home.
 *
 * El retrato va sin recorte de silueta, a diferencia del home: allá la foto
 * se monta sobre el crema y necesita el cutout, y acá vive dentro de su
 * cuadro, que es lo que pide el wireframe.
 */
export function AcercaFundadora() {
  return (
    <section id="fundadora" className="scroll-mt-20 bg-cream">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-8 lg:px-12 lg:py-32">
        <div className="flex items-start gap-6 lg:gap-14">
          <SectionRail kanji="院長の言葉" />

          <div className="flex-1 lg:grid lg:grid-cols-[38%_minmax(0,1fr)] lg:items-start lg:gap-x-16">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100">
                <Image
                  src="/founder-portrait.webp"
                  alt="Dra. Antonieta Ortega, fundadora de Omiya Clinic"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </Reveal>

            <div className="mt-10 lg:mt-0">
              <SectionMarker numeral="05" eyebrow="La fundadora" />

              {/* No usa DisplayHeading: el nombre es una sola línea larga y
                  aquel compone bloques de dos o tres palabras. A escala de
                  display, "Dra. Antonieta Ortega" se parte en renglones
                  desparejos por su cuenta. */}
              <Reveal delay={160}>
                <h2 className="mt-6 font-serif text-[32px] font-light leading-[1.1] tracking-[-0.01em] text-zinc-900 lg:text-[52px]">
                  Dra. Antonieta Ortega
                </h2>
              </Reveal>

              <Reveal delay={240}>
                <p className="mt-5 eyebrow text-gold">
                  Liderando la medicina del bienestar
                </p>
              </Reveal>

              <Reveal delay={320}>
                <blockquote className="mt-8 max-w-xl font-serif text-[22px] font-light leading-[1.45] text-zinc-900 lg:mt-10 lg:text-[28px]">
                  {CITA}
                </blockquote>
              </Reveal>

              <div className="mt-12 lg:mt-16 lg:grid lg:grid-cols-2 lg:gap-x-12">
                {FICHA.map((f, i) => (
                  <Reveal
                    key={f.rotulo}
                    delay={i * 80}
                    className={`border-t border-zinc-200 pt-4 ${
                      i > 0 ? "mt-8 lg:mt-0" : ""
                    }`}
                  >
                    <h3 className="eyebrow tracking-[0.4em] text-gold">
                      {f.rotulo}
                    </h3>
                    <p className="mt-3 text-[13px] leading-[1.9] text-zinc-600">
                      {f.texto}
                    </p>
                  </Reveal>
                ))}
              </div>

              {/* La raya va corta y no `wide`. La variante ancha es para los
                  bloques de una sola columna donde el enlace cierra la
                  sección y la barre entera; acá cuelga de la ficha de dos
                  columnas y a todo el ancho competía con sus horizontales. */}
              <Reveal delay={160}>
                <RuleLink href="/contacto" className="mt-12 text-gold">
                  Ver más
                </RuleLink>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
