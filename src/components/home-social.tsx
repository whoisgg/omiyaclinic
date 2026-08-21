import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { RuleLink } from "@/components/rule-link";
import { SectionMarker } from "@/components/section-rail";
import { INSTAGRAM_CLINICA_URL } from "@/lib/links";

/** Confirmado por el usuario. El wireframe 50 dibujaba `@omiya.clinica`, que
 *  no es la cuenta real. Se escribe acá y la URL en `INSTAGRAM_CLINICA_URL`:
 *  si cambia la cuenta hay que tocar los dos. */
const HANDLE = "@omiyaclinic";

/** "El registro de los días". */
const JA = "日々の記録";

/**
 * El feed. Seis fotos, no cinco.
 *
 * El wireframe pide una franja de 5 en desktop y un grid 3×2 en móvil, que
 * son 6. Con 5 habría que esconder una en desktop —contenido distinto según
 * el dispositivo— o repartir dos sets. Con 6 el mismo set entra en una fila de
 * seis arriba y en dos de tres abajo, sin ocultar nada.
 *
 * **Ninguna se repite con las del home.** El landing ya usa la rama del hero,
 * la recepción de Nuestro enfoque, los productos de Compromiso, el retrato de
 * la fundadora y el café de Tu experiencia; encontrarse cualquiera de esas
 * dentro de un supuesto feed, a dos pantallas de distancia, lo delataría como
 * relleno. Sí se repiten algunas con Acerca de y Tratamientos, y ahí no
 * molesta: son páginas distintas y un feed de la clínica está hecho
 * justamente de las fotos de la clínica.
 *
 * El orden alterna espacio, detalle y persona en vez de agrupar por tipo, que
 * es lo que hace que una grilla de fotos se lea como un feed y no como un
 * catálogo.
 *
 * No hay archivos nuevos: las fotos se recortan a cuadrado con `object-cover`
 * y Next sirve la variante del tamaño que toca. El recorte centrado funciona
 * en las seis; se revisaron una por una antes de elegirlas.
 */
const POSTS = [
  {
    src: "/hero-clinic.webp",
    alt: "El acceso a Omiya Clinic, con el letrero iluminado junto a la puerta",
  },
  {
    src: "/clinica/ritual.webp",
    alt: "Un café y la revista Historias de Piel sobre una bandeja de madera",
  },
  {
    src: "/acerca/filosofia-v2.webp",
    alt: "La doctora mostrándole el espejo a una paciente durante el tratamiento",
  },
  {
    src: "/clinica/productos.webp",
    alt: "Productos de cuidado de la piel dispuestos sobre el mesón",
  },
  {
    src: "/treatments/limpieza-facial.webp",
    alt: "Una limpieza facial en curso, con la mascarilla aplicada",
  },
  {
    src: "/clinica/productos-3.webp",
    alt: "El sillón del box de atención junto al ventanal",
  },
];

/**
 * VI · Síguenos — wireframes 50a (desktop) / 50b (móvil).
 *
 * Va entre "Tu experiencia" y el cierre, y con eso se lleva el fondo crema que
 * le corresponde por alternancia: la V es blanca y el cierre es negro.
 *
 * **El numeral es VI y no el "06" del wireframe.** La numeración del sitio va
 * en romanos y arranca en Nuestro enfoque, porque el hero se quedó sin
 * numeral: enfoque I, tratamientos II, compromiso III, fundadora IV,
 * experiencia V, ésta VI. El cierre sigue sin numeral, que es lo que lo marca
 * como punto final y no como un capítulo más.
 *
 * **El riel del kanji va a la derecha**, y no a la izquierda como en el
 * wireframe, porque es lo que hace "Nuestro compromiso" —la otra sección de
 * esta página que es un bloque a todo el ancho en vez de dos columnas—. En
 * este sitio el riel se pone del lado que no le quita margen al texto, y con
 * un bloque que ocupa el ancho completo ese lado es el derecho.
 *
 * El enlace de Instagram es **uno solo**, colocado con `grid` y no duplicado
 * por breakpoint: en móvil cierra la sección debajo de la grilla, y en desktop
 * sube a la derecha del handle. Duplicarlo —que es lo que se hizo con la raya
 * decorativa de la 04— acá significaría dos veces el mismo enlace en el orden
 * de tabulación y dos veces el mismo anuncio para un lector de pantalla.
 */
export function HomeSocial() {
  return (
    <section id="social" className="scroll-mt-20 bg-cream-pale">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="flex items-start gap-6 lg:gap-16">
          {/* La columna de contenido, con el enlace colocado por grid. En
              móvil el grid no existe y los tres bloques caen en orden de DOM
              —encabezado, fotos, enlace—, que es justo lo que pide la 50b. */}
          <div className="flex-1 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-x-10">
            <div>
              <SectionMarker numeral="VI" eyebrow="Síguenos" />

              {/* El handle es el titular de la sección. No usa DisplayHeading
                  —aquel compone bloques de dos o tres palabras y esto es una
                  sola cadena— ni versalitas, porque un handle se escribe como
                  se escribe. */}
              <Reveal delay={160}>
                <p className="mt-6 font-serif text-[32px] font-light leading-[1.1] tracking-[-0.01em] text-zinc-900 lg:text-[52px]">
                  {HANDLE}
                </p>
              </Reveal>
            </div>

            <Reveal
              delay={240}
              className="mt-12 lg:col-span-2 lg:row-start-2 lg:mt-16"
            >
              {/* Seis en una fila arriba, tres por fila abajo. El gap es
                  chico a propósito: un feed se lee como una superficie
                  continua, y con aire entre las fotos pasa a ser seis fotos
                  sueltas. */}
              <ul className="grid grid-cols-3 gap-2 lg:grid-cols-6 lg:gap-3">
                {POSTS.map((post) => (
                  <li key={post.src} className="relative aspect-square overflow-hidden bg-zinc-100">
                    <Image
                      src={post.src}
                      alt={post.alt}
                      fill
                      // A 1600px de contenedor, seis columnas dan unos 250px
                      // cada una; en móvil, tres dan unos 110.
                      sizes="(min-width: 1024px) 16vw, 33vw"
                      className="object-cover object-center"
                    />
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Fila 1, columna 2 en desktop: a la derecha del handle y
                alineado con su base, que es lo que pide la 50a. En móvil
                simplemente sigue a la grilla. */}
            <Reveal
              delay={200}
              className="mt-10 lg:col-start-2 lg:row-start-1 lg:mt-0"
            >
              <RuleLink
                href={INSTAGRAM_CLINICA_URL}
                external
                ruleClass="w-12 lg:w-20"
                className="text-gold"
              >
                Seguir en Instagram
              </RuleLink>
            </Reveal>
          </div>

          {/* Mismo riel que el resto del sitio: el kanji en oro arrancando a la
              altura del eyebrow —de ahí el margen superior, que se salta el
              numeral y su regla— y la vertical colgando. El ancho explícito y
              el `shrink-0` son necesarios: en WebKit un texto vertical no le
              propaga su ancho al ítem flex y la columna colapsa a cero. */}
          <Reveal delay={200} className="mt-14 w-11 shrink-0 lg:mt-[4.2rem] lg:w-14">
            <div className="flex flex-col items-center gap-6">
              <span
                lang="ja"
                className="w-9 font-jp text-[19px] leading-[1.6] text-gold [writing-mode:vertical-rl] lg:w-11 lg:text-[24px]"
              >
                {JA}
              </span>
              <span aria-hidden="true" className="h-32 hairline-v bg-gold lg:h-40" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
