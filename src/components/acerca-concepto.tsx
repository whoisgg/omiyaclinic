import Image from "next/image";

import { DisplayHeading } from "@/components/display-heading";
import { Reveal } from "@/components/reveal";
import { SectionMarker, SectionRail } from "@/components/section-rail";

const PARRAFO =
  "El well-aging es el arte de envejecer con plenitud. A diferencia del concepto tradicional de “anti-envejecimiento”, abrazamos el paso del tiempo como un proceso natural que puede gestionarse con elegancia y consciencia.";

const CITA =
  "“La belleza más duradera nace de hábitos, prevención y bienestar sostenidos en el tiempo.”";

/**
 * 01 · Nuestro concepto — wireframe 32a/32b.
 *
 * El kanji del riel es 時を重ねる, "acumular tiempo": es el mismo verso que
 * abre el hero del home (時を重ねるということ) recortado a su núcleo, así que
 * la página se ata al sitio por el idioma y no solo por la tipografía.
 *
 * En móvil la foto sube entre el titular y el párrafo, como en el wireframe:
 * a ese ancho, dejarla al final la separaba del texto que la explica.
 */
export function AcercaConcepto() {
  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-8 lg:px-12 lg:py-32">
        {/* En móvil el riel es la columna derecha y el contenido la izquierda,
              como en "Tu experiencia en Omiya" del home. Con el riel a la
              izquierda —que es donde vive en desktop— los 44px del kanji más
              el gap se leían a 390px como un margen izquierdo de más, distinto
              al del resto de la página. La colocación va por `col-start` y no
              reordenando el DOM: el riel se anuncia después del texto igual
              que en desktop. */}
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6 lg:flex lg:gap-16">
          <SectionRail kanji="時を重ねる" className="col-start-2 row-start-1" />

          <div className="col-start-1 row-start-1 flex-1 lg:grid lg:grid-cols-[minmax(0,1fr)_44%] lg:items-start lg:gap-x-16">
            <div>
              <SectionMarker numeral="01" eyebrow="Nuestro concepto" />

              <DisplayHeading
                lines={["¿Qué es", "Well-aging?"]}
                size="sm"
                dimFrom={2}
                className="mt-6 display-loose text-zinc-900"
              />

              {/* La foto, solo en móvil. En desktop vive en la columna de la
                  derecha y no se repite: son dos posiciones del mismo bloque,
                  no dos bloques. */}
              <Reveal delay={280} className="lg:hidden">
                <div className="relative mt-10 aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/acerca/concepto.webp"
                    alt="Sala de espera de Omiya Clinic: una paciente con una infusión junto al ventanal"
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>
              </Reveal>

              <Reveal delay={280}>
                <p className="mt-10 max-w-xl text-sm leading-[2] text-zinc-600 lg:text-base">
                  {PARRAFO}
                </p>
              </Reveal>

              {/* Una sola raya en el bloque, y va acá: separando el párrafo de
                  la cita, que es donde el texto cambia de voz. Antes había
                  cuatro líneas en la sección —la regla del numeral, la
                  vertical del kanji, una horizontal colgando del titular y la
                  vertical de la cita— y la regla del sitio es dos por sección
                  y no más. La del numeral y la del kanji se quedan porque
                  arman el marcador; las otras dos se resuelven en ésta.

                  Va notoriamente más larga que la del numeral —44px— y eso
                  es lo que la distingue: cuando dos rayas cumplen funciones
                  distintas en el mismo bloque, el largo es lo que lo dice.
                  Las cortas abren, las largas separan.

                  Media columna con tope de 320px. La proporción la ata al
                  titular mientras éste crece, y el tope la frena cuando deja
                  de crecer: el `clamp` de la escala display topa la fuente en
                  76px, así que de 1267px de viewport en adelante el titular
                  mide siempre 328px de ancho mientras la columna sigue
                  ensanchando. Sin el tope, a 1920 la raya se pasaba 28px del
                  signo de cierre. Con él muere 8px antes. */}
              <Reveal delay={320}>
                <span
                  aria-hidden="true"
                  className="mt-12 block hairline-h w-1/2 max-w-[20rem] bg-gold lg:mt-14"
                />
              </Reveal>

              <Reveal delay={360}>
                <blockquote className="mt-10 max-w-xl font-serif text-[22px] font-light leading-[1.45] text-zinc-900 lg:mt-12 lg:text-[28px]">
                  {CITA}
                </blockquote>
              </Reveal>
            </div>

            <Reveal delay={200} className="hidden lg:block">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/acerca/concepto.webp"
                  alt="Sala de espera de Omiya Clinic: una paciente con una infusión junto al ventanal"
                  fill
                  sizes="44vw"
                  className="object-cover object-center"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
