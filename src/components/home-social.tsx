import { HomeSocialGrid, type CeldaSocial } from "@/components/home-social-grid";
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
 * El feed: seis celdas, doce publicaciones.
 *
 * El wireframe pide una franja de 5 en desktop y un grid 3×2 en móvil, que
 * son 6. Con 5 habría que esconder uno en desktop —contenido distinto según
 * el dispositivo— o repartir dos sets.
 *
 * **Son publicaciones reales de la cuenta**, rescatadas del sitio de v0
 * (`components/doctor-quote.tsx`, donde vivían en un abanico de tarjetas). No
 * son fotos de la clínica haciendo de posts: son los posts. Eso importa porque
 * la sección se titula `@omiyaclinic` y muestra una grilla — cualquier otra
 * cosa ahí adentro estaría diciendo que la clínica publicó algo que no
 * publicó. Y funcionan solas: las diseñó la misma mano que el sitio.
 *
 * **Cada celda lleva dos, y se alternan.** De las veinte disponibles, diez son
 * 4:5 —el formato del feed— y diez son 9:16 —stories—. Un 9:16 recortado a la
 * caja pierde el 30%, y en estas piezas el texto es la pieza. Se revisaron las
 * diez verticales una por una y cuatro sobreviven el recorte con el texto
 * entero: ésas más las diez nativas dan catorce, y doce es el número que llena
 * seis celdas sin dejar ninguna quieta.
 *
 * **Los pares van emparejados por tono** —oscura con oscura, crema con crema—
 * para que el cambio se lea como que la superficie respira y no como que una
 * casilla se prende mientras las otras cinco no se mueven.
 *
 * El orden de las primeras alterna claro y oscuro, y reparte persona, objeto y
 * tipografía en vez de agrupar por tipo: es lo que hace que una grilla se lea
 * como un feed y no como un catálogo.
 */
const CELDAS: CeldaSocial[] = [
  {
    piezas: [
      { src: "/social/habito.webp", alt: "Publicación: envejecer bien no es cuestión de genética, sino de hábito" },
      { src: "/social/cada-cuanto.webp", alt: "Publicación: ¿cada cuánto se puede aplicar el skin booster?" },
    ],
  },
  {
    piezas: [
      { src: "/social/serum.webp", alt: "Publicación: ¿qué te estás aplicando en la piel?" },
      { src: "/social/labios.webp", alt: "Publicación sobre el resultado de una aplicación de ácido hialurónico" },
    ],
  },
  {
    piezas: [
      { src: "/social/textura.webp", alt: "Publicación sobre incorporar un producto nuevo a la rutina" },
      { src: "/social/reglas.webp", alt: "Publicación: tres reglas de oro para proteger tu inversión" },
    ],
  },
  {
    piezas: [
      { src: "/social/piel-dia.webp", alt: "Publicación: tu piel no se ve igual todo el día" },
      { src: "/social/guia.webp", alt: "Publicación con la guía de cuidados posteriores a un procedimiento" },
    ],
  },
  {
    piezas: [
      { src: "/social/check-in.webp", alt: "Publicación: el check-in del final del día para observar tu piel" },
      { src: "/social/botox-vial.webp", alt: "Publicación: el botox no congela, hace espacio entre lo que ya no sentimos" },
    ],
  },
  {
    piezas: [
      { src: "/social/reloj.webp", alt: "Publicación: el botox no frena el tiempo" },
      { src: "/social/alimentacion.webp", alt: "Publicación sobre la alimentación como combustible de la piel" },
    ],
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
          <div className="flex-1 lg:grid lg:grid-cols-2 lg:items-end lg:gap-x-10">
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
              {/* La grilla vive en un componente cliente aparte: lo único
                  que necesita JavaScript es la alternancia de piezas, así que
                  el resto de la sección se sigue renderizando en el servidor.

                  La caja es 4:5 y no cuadrada: es el formato nativo de las
                  publicaciones, así que entran sin recorte y el texto de cada
                  pieza queda entero. De paso es lo que hace hoy la grilla de
                  Instagram, que dejó el cuadrado atrás. */}
              <HomeSocialGrid celdas={CELDAS} />
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
                // `wide`: la raya rellena lo que queda hasta el borde del
                // bloque en vez de medir un ancho fijo. Con las columnas al
                // 50/50, eso deja el texto arrancando exactamente en el medio
                // de la sección **a cualquier ancho** — que es lo que se
                // buscaba y lo que un valor en píxeles no puede sostener: ahí
                // el punto de partida se corre cada vez que cambia el
                // viewport.
                //
                // De paso resuelve el móvil solo: la raya se calcula sobre los
                // 259px de la columna y le tocan unos 90, en vez de salirse
                // con los 300 y pico que necesita el escritorio.
                wide
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
          {/* El kanji arranca más arriba que en el resto del sitio: allá se
              alinea con el eyebrow, acá sube a la altura del numeral. Esta
              sección tiene el encabezado más alto de la página —numeral,
              regla, eyebrow y el handle a cuerpo de titular— y con el margen
              de siempre el riel quedaba empezando a media altura del bloque. */}
          <Reveal delay={200} className="mt-6 w-11 shrink-0 lg:mt-8 lg:w-14">
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
