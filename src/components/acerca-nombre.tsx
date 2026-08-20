import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { SectionMarker, SectionRail } from "@/components/section-rail";

const PARRAFO =
  "Inspirado en la serenidad de los templos japoneses y la precisión de la medicina contemporánea, Omiya (大宮) simboliza el “Gran Santuario” del bienestar. Para nosotros, el cuerpo es un templo que merece ser cuidado con la máxima delicadeza, honrando su historia y su evolución natural a través del tiempo.";

/**
 * 03 · El nombre — wireframe 32a/32b.
 *
 * Dos columnas: la foto ocupa la mitad izquierda y el texto la derecha. En
 * móvil la foto va arriba y el texto debajo, porque partir la pantalla en dos
 * a 390px deja las dos mitades sin aire.
 *
 * La diferencia con la versión anterior es que ya no sangra: el bloque entero
 * vive dentro del eje del sitio, con los mismos paddings que las demás
 * secciones, así que el borde izquierdo de la foto cae donde caen los rieles
 * del resto de la página en vez de pegarse al borde del viewport.
 *
 * Fue un panel negro y dejó de serlo. El negro existía para que el 大宮
 * pudiera ir en oro a escala de titular, pero con la foto del monumento —un
 * parque japonés en pleno día— el fondo oscuro peleaba con la imagen en vez
 * de sostenerla.
 *
 * Al pasar a claro, el 大宮 baja a tinta. No es gusto: la regla de marca dice
 * que el negro es el primario y que el oro se reserva para acentos chicos,
 * así que un ideograma de 52px en oro sobre crema sería justamente "mucho
 * dorado". El oro se queda donde le corresponde: el numeral, su regla, el
 * eyebrow y el riel.
 *
 * Dice "Gran Santuario" y no "Gran Palacio", que era la traducción anterior.
 * El 宮 de 大宮 se traduce por palacio en abstracto, pero en topónimos
 * japoneses remite al santuario sintoísta —el Ōmiya de Saitama se llama así
 * por el santuario Hikawa—, y además es lo que sostiene la frase que sigue:
 * el cuerpo como templo.
 */
export function AcercaNombre() {
  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-8 lg:px-12 lg:py-32">
        <div className="lg:grid lg:min-h-[640px] lg:grid-cols-2 lg:items-stretch lg:gap-x-16">
          {/* La foto es el monumento de la entrada del parque Ōmiya, con el
              nombre tallado en la placa. Es la única del sitio que no sale del
              reportaje de la clínica, y está acá porque la sección habla del
              origen del nombre: enseñar el 大宮 real, tallado en piedra y
              madera, dice eso mejor que cualquier interior.

              Viene recortada a 4:3 desde un vertical, y el recorte se hizo a
              mano en vez de dejárselo a `object-position`: la placa corre por
              el centro en vertical, así que una ventana apaisada centrada la
              partía por la mitad y se comía el 大 de arriba y el 園 de abajo.
              La ventana arranca en la fila 265 del original y deja la placa
              entera con aire por los dos lados.

              En móvil conserva el 4:3 del archivo, así que no hay recorte
              ninguno; en desktop se estira al alto de la columna. */}
          <Reveal className="lg:h-full">
            <figure className="relative h-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden lg:h-full lg:aspect-auto">
                <Image
                  src="/acerca/nombre-v2.webp"
                  alt="Monumento de piedra a la entrada del parque Ōmiya, en Japón, con el nombre 大宮公園 tallado en una placa de madera, entre cerezos en flor"
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              {/* El pie no es un crédito de rigor: es lo que ata la foto al
                  texto. Sin él, el monumento podría ser cualquier piedra con
                  kanji; con él, la sección enseña el lugar del que sale el
                  nombre de la clínica.

                  Va dentro de la foto y no debajo, como el "silent luxury
                  space" que llevaba la sección de la fundadora: al pie del
                  cuadro pertenece a la imagen, y colgando por fuera abría una
                  línea de texto suelta entre la foto y el borde de la
                  sección. El degradado es lo que lo hace legible sin tener
                  que oscurecer la imagen entera. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/60 via-black/25 to-transparent"
              />
              <figcaption className="absolute bottom-5 left-5 text-[10px] uppercase leading-[1.9] tracking-[0.2em] text-white/85 lg:bottom-6 lg:left-6">
                大宮公園 · Parque Ōmiya, Saitama
              </figcaption>
            </figure>
          </Reveal>

          <div className="mt-12 flex items-center lg:mt-0">
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
                    className="mt-8 font-jp text-[40px] font-normal leading-none text-ink lg:text-[52px]"
                  >
                    大宮
                  </p>
                </Reveal>

                <Reveal delay={160}>
                  <h2 className="mt-6 font-serif text-[30px] font-light leading-[1.15] text-zinc-900 lg:mt-8 lg:text-[44px]">
                    El significado de Omiya
                  </h2>
                </Reveal>

                <Reveal delay={240}>
                  <p className="mt-10 max-w-xl text-sm leading-[2] text-zinc-600 lg:mt-12">
                    {PARRAFO}
                  </p>
                </Reveal>

                {/* La raya cierra el bloque en vez de partirlo. Entre el
                    titular y el párrafo metía un corte donde no hay cambio de
                    voz —el párrafo continúa lo que el titular enuncia— y
                    dejaba el bloque en tres pedazos. Al final hace lo que
                    hacen las horizontales del sitio: cerrar la L que abre la
                    vertical del riel. */}
                <Reveal delay={320}>
                  <span
                    aria-hidden="true"
                    className="mt-10 block hairline-h w-1/2 max-w-[20rem] bg-gold lg:mt-12"
                  />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
