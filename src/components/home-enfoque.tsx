import Image from "next/image";
import { Reveal } from "@/components/reveal";

/**
 * Sección 02 — Nuestro enfoque.
 *
 * El bloque de texto es el mismo en los dos breakpoints; lo único que cambia
 * es dónde cae la foto. Por eso todo vive en un solo grid de dos columnas que
 * en móvil colapsa a una:
 *
 *   móvil     el bloque arriba y la foto a sangre completa debajo.
 *   desktop   el bloque en la mitad izquierda y la foto ocupando la mitad
 *             derecha entera, sangrando por el borde y a toda altura.
 *
 * La composición interna del bloque es vertical de izquierda a derecha:
 * numeral romano, el japonés a escala de titular, el título en `upright` a su
 * lado formando pareja con él, y el párrafo a la derecha de ambos.
 *
 * La foto es la de la recepción, que era el hero hasta el rediseño. Acá
 * funciona mejor: el logo de bronce del muro —que en el hero había que
 * recortar para que no compitiera con el lockup— es justamente lo que pone el
 * oro en el cuadro.
 */

const PARRAFO =
  "Buscamos crear un espacio donde el bienestar se construye de manera consciente, personalizada y sostenible en cada etapa de la vida.";

// "Nuestro modo de pensar". Se prefirió sobre 生きがい (ikigai) por composición:
// ikigai son 4 caracteres y esta columna convive con la de "NUESTRO ENFOQUE",
// que son 14 en upright — con 4 quedaba a menos de la mitad de alto y las dos
// columnas dejaban de leerse como pareja.
const JA = "私たちの考え方";

export function HomeEnfoque() {
  return (
    <section
      id="enfoque"
      className="relative overflow-hidden bg-cream"
    >
      {/* El grid se acota al mismo eje de 1600px que el resto del sitio, pero
          la foto sigue sangrando por el borde derecho: el margen negativo
          `min(0px, (1600px - 100vw)/2)` vale 0 mientras la pantalla es más
          angosta que el eje y se vuelve negativo cuando lo supera, empujando
          la foto hasta el borde real del viewport. Sin este tope, a 2000px la
          sección se volvía una banda ancha y chata y el recorte de la foto
          perdía la verticalidad del diseño. */}
      <div className="mx-auto w-full max-w-[1600px] lg:grid lg:min-h-[760px] lg:grid-cols-2">

      {/* ── Bloque de texto ────────────────────────────────────────────
          Alineado arriba y no centrado: centrado en los 760px de la sección
          el numeral caía al 29% de la altura y se leía como un hueco de
          padding. Con `pt-20` arranca cerca del 10%, que es donde el bloque
          deja de sentirse hundido.
          El sangrado izquierdo va en porcentaje y no en rem: el padding en %
          se resuelve contra la columna del grid (50vw), así que `pl-[16%]`
          deja el texto siempre en el 8% del ancho de pantalla, que es donde
          lo pone el diseño. Con un valor fijo más `ml-auto` —como estaba— el
          bloque se despegaba del borde y derivaba hacia la foto a medida que
          crecía el viewport: a 2279px arrancaba en el 15% en vez del 8%. */}
      <div className="flex items-center px-6 pb-14 pt-16 sm:px-8 lg:items-start lg:pb-24 lg:pl-12 lg:pr-16 lg:pt-20">
        <div className="w-full">
          <Reveal>
            <div className="pl-8 lg:pl-14">
              {/* Es la sección I, no la II: el hero se quedó sin numeral, así
                  que ésta abre la numeración.

                  Va en romano y en la serif de marca. En la sans una "I" es
                  una barra vertical sin más, y encima de un hairline se leería
                  como dos rayas apiladas; la Cormorant le pone remates arriba
                  y abajo y ahí sí se lee como numeral. */}
              <p
                className="font-serif text-[17px] leading-none tracking-[0.12em] lg:text-[22px] text-gold"
              >
                I
              </p>
              <span
                aria-hidden="true"
                className="mt-4 block hairline-h w-9 lg:mt-5 lg:w-11 bg-gold"
              />
            </div>
          </Reveal>

          <div className="mt-7 flex items-start gap-5 pl-8 lg:mt-9 lg:gap-8 lg:pl-14">
            {/* Ancho explícito y `shrink-0` en los dos ítems verticales. En
                WebKit —o sea todo navegador en iPhone, Chrome incluido— un
                elemento con `writing-mode: vertical-rl` no propaga su ancho
                intrínseco al ítem flex que lo contiene: el ítem colapsa a
                ancho 0 y las dos columnas se montan una sobre otra. En Blink
                se ve bien, así que el bug solo aparece en iOS.
                El valor sale de la cuenta: una columna vertical mide
                font-size x line-height. 26px x 1.5 = 39px en móvil (w-11 = 44)
                y 42px x 1.5 = 63px en desktop (w-16 = 64). */}
            <Reveal delay={100} className="w-11 shrink-0 lg:w-16">
              <p
                lang="ja"
                className="font-jp text-[26px] font-normal leading-[1.5] [writing-mode:vertical-rl] lg:text-[42px] text-ink"
              >
                {JA}
              </p>
            </Reveal>

            <Reveal delay={180} className="w-4 shrink-0 lg:w-5">
              {/* El título va en vertical con las letras derechas, en pareja
                  con el japonés. No se repite en horizontal en ninguna parte
                  de la sección, así que acá sí es el encabezado. */}
              <h2
                className="font-sans text-[10px] font-normal uppercase leading-none tracking-[0.42em] [text-orientation:upright] [writing-mode:vertical-rl] lg:text-[13px] lg:tracking-[0.5em] text-ink"
              >
                Nuestro enfoque
              </h2>
            </Reveal>

            <Reveal delay={260} className="flex-1">
              <div className="max-w-[16rem] pt-10 lg:max-w-[19rem] lg:pt-16">
                {/* Se probó `text-balance` para emparejar los largos de línea
                    y matar la palabra suelta del final: mejora en desktop pero
                    en móvil, con la columna ya angosta entre las dos verticales,
                    parte el texto en tiras cortas. Queda el corte natural.
                    `justify` está descartado de plano: en columna angosta y con
                    palabras largas del español abre ríos de blanco. */}
                <p
                  className="font-serif text-[13px] font-light leading-[1.8] lg:text-[17px] lg:leading-[1.75] text-ink-body"
                >
                  {PARRAFO}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-6 block h-10 hairline-v lg:mt-9 lg:h-14 bg-gold"
                />
              </div>
            </Reveal>
          </div>

        </div>
      </div>

      {/* ── Foto ─────────────────────────────────────────────────────────
          Sangra por el borde en los dos breakpoints: en móvil por los dos
          lados, en desktop por el derecho y a toda altura.

          El archivo `-v5` viene recortado a 1252px de ancho, justo antes del
          canto del muro que empieza en el 1257 del original. Eso lo resuelve
          de raíz: el canto ya no está en la imagen, así que no puede asomarse
          por el borde derecho en ningún breakpoint. Antes había que acertarle
          a una ventana de solo 37px —el círculo del logo termina en el 1220 y
          el canto empieza en el 1257—, y bastaba una caja un poco más ancha
          de lo previsto para que se colara.
          Con la fuente recortada, alinear a la derecha garantiza el logo y su
          círculo completos en cualquier proporción de caja. */}
      <Reveal delay={200}>
        {/* En lg la foto se detiene 48px antes del borde del eje, el mismo
            padding derecho que llevan las demás secciones, en vez de sangrar
            hasta el borde del viewport: así su borde queda alineado con el
            del resto del sitio.
            El `w-auto` va de la mano: con `w-full` el ancho queda fijado al de
            la celda del grid y el margen solo correría la caja en vez de
            achicarla. En móvil sí va a sangre completa. */}
        <div className="relative aspect-[10/9] w-full lg:h-full lg:w-auto lg:aspect-auto lg:mr-12">
          <Image
            src="/momiji/hero-recepcion-v5.webp"
            alt="Recepción de Omiya Clinic: un momiji junto al muro con el logo de bronce"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-right"
          />

          {/* Velo inferior para la firma. Es necesario, no decorativo: medida
              sobre los píxeles reales, esa esquina mezcla muro claro (L 0.62)
              con el zócalo oscuro cruzándola (L 0.055 en el p10), así que
              ningún color plano se lee en las dos zonas —el blanco se pierde
              en el muro y la tinta en el zócalo—. Con el degradado el texto
              claro queda sobre 4.8:1 en el peor punto. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#151310]/65 to-transparent"
          />

          <p className="absolute bottom-5 right-5 flex items-center gap-3 font-sans text-[9px] uppercase tracking-[0.24em] text-[#f5f1ea] sm:bottom-7 sm:right-7 lg:bottom-9 lg:right-9 lg:text-[10px]">
            <span
              aria-hidden="true"
              className="h-1 w-1 shrink-0 rounded-full bg-gold"
            />
            Machalí, Chile
          </p>
        </div>
      </Reveal>
      </div>
    </section>
  );
}
