import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { SectionMarker, SectionRail } from "@/components/section-rail";

const PARRAFO =
  "Inspirado en la serenidad de los templos japoneses y la precisión de la medicina contemporánea, Omiya (大宮) simboliza el “Gran Santuario” del bienestar. Para nosotros, el cuerpo es un templo que merece ser cuidado con la máxima delicadeza, honrando su historia y su evolución natural a través del tiempo.";

/**
 * 03 · El nombre — wireframe 32a/32b.
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
 * También dejó de sangrar a los bordes. Era la única sección de la página
 * que lo hacía, y con el fondo oscuro se justificaba porque el panel entero
 * era el elemento; sobre crema, una foto pegada al borde del viewport
 * mientras el resto del sitio respeta el eje se lee como un error de
 * maquetación. Ahora usa el mismo contenedor que las demás.
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
        <div className="flex items-start gap-6 lg:gap-16">
          <SectionRail kanji="大いなる宮" />

          <div className="flex-1 lg:grid lg:grid-cols-[minmax(0,1fr)_46%] lg:items-start lg:gap-x-16">
            <div>
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

              {/* La foto, solo en móvil. En desktop vive en la columna de la
                  derecha y no se repite: son dos posiciones del mismo bloque,
                  no dos bloques. Es el mismo reparto que la sección 01. */}
              <Reveal delay={240} className="lg:hidden">
                <div className="relative mt-10 aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/acerca/nombre-v2.webp"
                    alt="Monumento de piedra a la entrada del parque Ōmiya, en Japón, con el nombre 大宮公園 tallado en una placa de madera, entre cerezos en flor"
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>
              </Reveal>

              <Reveal delay={240}>
                <span
                  aria-hidden="true"
                  className="mt-10 block hairline-h w-1/2 max-w-[20rem] bg-gold lg:mt-12"
                />
              </Reveal>

              <Reveal delay={320}>
                <p className="mt-10 max-w-xl text-sm leading-[2] text-zinc-600 lg:mt-12 lg:text-base">
                  {PARRAFO}
                </p>
              </Reveal>
            </div>

            {/* La foto es el monumento de la entrada del parque Ōmiya, con el
                nombre tallado en la placa. Es la única del sitio que no sale
                del reportaje de la clínica, y está acá porque la sección
                habla del origen del nombre: enseñar el 大宮 real, tallado en
                piedra y madera, dice eso mejor que cualquier interior.

                Viene recortada a 4:3 desde un vertical, y el recorte se hizo
                a mano en vez de dejárselo a `object-position`: la placa corre
                por el centro en vertical, así que una ventana apaisada
                centrada la partía por la mitad y se comía el 大 de arriba y
                el 園 de abajo. La ventana arranca en la fila 265 del
                original y deja la placa entera con aire por los dos lados. */}
            <Reveal delay={200} className="hidden lg:block">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/acerca/nombre-v2.webp"
                  alt="Monumento de piedra a la entrada del parque Ōmiya, en Japón, con el nombre 大宮公園 tallado en una placa de madera, entre cerezos en flor"
                  fill
                  sizes="46vw"
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
