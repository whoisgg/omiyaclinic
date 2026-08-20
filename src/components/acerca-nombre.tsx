import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { SectionMarker, SectionRail } from "@/components/section-rail";

const PARRAFO =
  "Inspirado en la serenidad de los templos japoneses y la precisión de la medicina contemporánea, Omiya (大宮) simboliza el “Gran Santuario” del bienestar. Para nosotros, el cuerpo es un templo que merece ser cuidado con la máxima delicadeza, honrando su historia y su evolución natural a través del tiempo.";

/**
 * 03 · El nombre — wireframe 32a/32b.
 *
 * La única sección oscura de la página, y la única del sitio fuera del menú y
 * del cierre del home. El negro no es un cambio de tono porque sí: es la
 * sección que explica de dónde viene el nombre, así que el 大宮 tiene que
 * poder ir en oro a escala de titular, y el oro sobre crema a ese tamaño se
 * lava. Sobre el negro llega a ser el protagonista sin pelear con la marca.
 *
 * En desktop la foto ocupa la mitad izquierda y el texto la derecha. En móvil
 * la foto va arriba, a sangre, y el panel negro debajo: partir la pantalla en
 * dos a 390px deja las dos mitades sin aire.
 *
 * Dice "Gran Santuario" y no "Gran Palacio", que era la traducción anterior.
 * El 宮 de 大宮 se traduce por palacio en abstracto, pero en topónimos
 * japoneses remite al santuario sintoísta —el Ōmiya de Saitama se llama así
 * por el santuario Hikawa—, y además es lo que sostiene la frase que sigue:
 * el cuerpo como templo.
 */
export function AcercaNombre() {
  return (
    <section className="relative overflow-hidden bg-night">
      <div className="lg:grid lg:min-h-[720px] lg:grid-cols-2">
        {/* La foto es el monumento de la entrada del parque Ōmiya, con el
            nombre tallado en la placa. Es la única del sitio que no sale del
            reportaje de la clínica, y está acá porque la sección habla del
            origen del nombre: enseñar el 大宮 real, tallado en piedra y
            madera, dice eso mejor que cualquier interior.

            Viene recortada a 4:3 desde un vertical, y el recorte se hizo a
            mano en vez de dejárselo a `object-position`: la placa corre por
            el centro en vertical, así que una ventana apaisada centrada la
            partía por la mitad y se comía el 大 de arriba y el 園 de abajo.
            La ventana arranca en la fila 265 del original, que deja la placa
            entera con aire por los dos lados. Por eso el hueco de móvil pasó
            de 16/10 a 4:3: para no volver a recortarla.

            No lleva Reveal propio: al ser media pantalla contra un panel
            negro, el fade la haría aparecer como un agujero que se rellena.
            Entra con la sección. */}
        <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:h-full">
          <Image
            src="/acerca/nombre-v2.webp"
            alt="Monumento de piedra a la entrada del parque Ōmiya, en Japón, con el nombre 大宮公園 tallado en una placa de madera, entre cerezos en flor"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="flex items-center px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="flex items-start gap-6 lg:gap-14">
            <SectionRail kanji="大いなる宮" />

            <div className="flex-1">
              <SectionMarker numeral="03" eyebrow="El nombre" />

              {/* El kanji va como texto decorativo y no como encabezado: el
                  h2 es la frase en español. En una página en español el
                  encabezado no puede ser el ideograma. */}
              <Reveal delay={160}>
                <p
                  aria-hidden="true"
                  lang="ja"
                  className="mt-8 font-jp text-[40px] font-normal leading-none text-gold lg:text-[52px]"
                >
                  大宮
                </p>
              </Reveal>

              <Reveal delay={160}>
                <h2 className="mt-6 font-serif text-[30px] font-light leading-[1.15] text-night-fg lg:mt-8 lg:text-[44px]">
                  El significado de Omiya
                </h2>
              </Reveal>

              <Reveal delay={240}>
                <span
                  aria-hidden="true"
                  className="mt-8 block hairline-h w-12 bg-gold lg:w-16"
                />
              </Reveal>

              <Reveal delay={320}>
                <p className="mt-8 max-w-xl text-sm leading-[2] text-night-fg/70 lg:mt-10">
                  {PARRAFO}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
