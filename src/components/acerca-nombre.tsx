import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { SectionRail } from "@/components/section-rail";

const PARRAFO =
  "Inspirado en la serenidad de los templos japoneses y la precisión de la medicina contemporánea, Omiya (大宮) simboliza el “Gran Palacio” del bienestar. Para nosotros, el cuerpo es un templo que merece ser cuidado con la máxima delicadeza, honrando su historia y su evolución natural a través del tiempo.";

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
 */
export function AcercaNombre() {
  return (
    <section className="relative overflow-hidden bg-night">
      <div className="lg:grid lg:min-h-[720px] lg:grid-cols-2">
        {/* La foto no lleva Reveal propio: al ser media pantalla contra un
            panel negro, el fade la haría aparecer como un agujero que se
            rellena. Entra con la sección. */}
        <div className="relative aspect-[16/10] w-full lg:aspect-auto lg:h-full">
          <Image
            src="/esencia.webp"
            alt="Recepción de Omiya Clinic"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="flex items-center px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="flex items-start gap-6 lg:gap-14">
            <SectionRail
              kanji="大いなる宮"
              numeral="03"
              label="El nombre"
              tone="dark"
            />

            <div className="flex-1">
              {/* El kanji va como texto decorativo y no como encabezado: el
                  h2 es la frase en español. En una página en español el
                  encabezado no puede ser el ideograma. */}
              <Reveal delay={80}>
                <p
                  aria-hidden="true"
                  lang="ja"
                  className="font-jp text-[40px] font-normal leading-none text-gold lg:text-[52px]"
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
