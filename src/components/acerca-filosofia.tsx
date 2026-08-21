import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { SectionMarker, SectionRail } from "@/components/section-rail";

const CITA =
  "“Creemos que la medicina estética debe ayudar a las personas a sentirse mejor consigo mismas, sin perder aquello que las hace únicas.”";

const PARRAFOS = [
  "En Omiya rechazamos la estandarización de la belleza. Cada rostro cuenta una historia única, y nuestro objetivo es preservar su carácter mientras optimizamos su vitalidad.",
  "Nuestra metodología combina técnicas avanzadas con una visión artística, asegurando que cada intervención sea sutil, elegante y, sobre todo, imperceptible. Es la belleza del silencio.",
];

/**
 * 04 · Nuestra filosofía — wireframe 32a/32b.
 *
 * La única sección de la página sin titular: el encabezado es la cita. No usa
 * DisplayHeading por el mismo motivo que la cita de la fundadora en el home
 * —aquel compone titulares de dos o tres palabras a escala de display y esto
 * son cuatro renglones largos—, así que la escala se queda en la serif de
 * marca a un cuerpo intermedio.
 *
 * La foto cierra la columna de la derecha, debajo de los párrafos, y no al
 * lado de la cita: puesta arriba competía con ella por el mismo peso visual.
 *
 * Va a 5:4 y no al 16:10 del wireframe porque es la proporción nativa del
 * archivo: recortarla a una banda ancha le cortaba la cabeza a la doctora y
 * la lámpara del techo, que son las dos cosas que sitúan la escena.
 *
 * El `-v2` del nombre no es un capricho: el optimizador de Next cachea por
 * URL, así que reemplazar el archivo sin renombrarlo sigue sirviendo la foto
 * vieja. Es la misma razón por la que la rama del hero del home es `-v6`.
 */
export function AcercaFilosofia() {
  return (
    <section className="bg-cream-pale">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-8 lg:px-12 lg:py-32">
        {/* En móvil el riel es la columna derecha y el contenido la izquierda,
              como en "Tu experiencia en Omiya" del home. Con el riel a la
              izquierda —que es donde vive en desktop— los 44px del kanji más
              el gap se leían a 390px como un margen izquierdo de más, distinto
              al del resto de la página. La colocación va por `col-start` y no
              reordenando el DOM: el riel se anuncia después del texto igual
              que en desktop. */}
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6 lg:flex lg:gap-16">
          <SectionRail kanji="私たちの信条" className="col-start-2 row-start-1" />

          <div className="col-start-1 row-start-1 flex-1 lg:grid lg:grid-cols-[minmax(0,1fr)_42%] lg:items-start lg:gap-x-16">
            <div>
              <SectionMarker numeral="04" eyebrow="Nuestra filosofía" />

              <Reveal delay={160}>
                <blockquote className="mt-6 max-w-2xl font-serif text-[26px] font-light leading-[1.3] text-zinc-900 lg:mt-8 lg:text-[40px]">
                  {CITA}
                </blockquote>
              </Reveal>

              {/* Larga, como la de las secciones I y III: la del marcador,
                  que va arriba, mide 44px y abre; ésta cierra. Con las dos
                  cortas se leían como la misma raya repetida. */}
              <Reveal delay={240}>
                <span
                  aria-hidden="true"
                  className="mt-8 block hairline-h w-1/2 max-w-[20rem] bg-gold lg:mt-10"
                />
              </Reveal>
            </div>

            <div className="mt-12 lg:mt-0">
              <Reveal delay={200}>
                {PARRAFOS.map((p, i) => (
                  <p
                    key={i}
                    className={`max-w-xl text-sm leading-[2] text-zinc-600 ${
                      i > 0 ? "mt-6" : ""
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </Reveal>

              <Reveal delay={280}>
                <div className="relative mt-10 aspect-[5/4] w-full overflow-hidden lg:mt-12">
                  <Image
                    src="/acerca/filosofia-v2.webp"
                    alt="La doctora marcando los puntos del tratamiento mientras le muestra el espejo a la paciente"
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
