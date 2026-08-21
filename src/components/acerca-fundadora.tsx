import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { RuleLink } from "@/components/rule-link";
import { SectionMarker, SectionRail } from "@/components/section-rail";
import { INSTAGRAM_URL } from "@/lib/links";

/**
 * El handle que muestra el enlace de cierre. Se escribe acá y la URL vive en
 * `INSTAGRAM_URL`: son el mismo dato en dos formatos y conviene que se vean
 * juntos, porque si cambia la cuenta hay que tocar los dos.
 *
 * Es la cuenta personal de la doctora, no la de la clínica —esa es
 * `@omiya.clinica` y aparece en el home—.
 */
const HANDLE = "@dra.antonietaortegamunoz";

const CITA =
  "“La estética debe ayudarnos a sentirnos mejor con quienes somos, no a convertirnos en alguien diferente.”";

/**
 * Qué es la doctora, en una línea, debajo del nombre.
 *
 * Ocupa el lugar donde estaba "Liderando la medicina del bienestar", que salió
 * por vago. Es la identidad profesional —el título— y por eso va acá y no en
 * la ficha: lo de abajo son especialidades, y el pregrado no es una.
 */
const TITULO = "Cirujano Dentista · Cosmetóloga";

/**
 * Las especialidades, una por columna.
 *
 * La versión anterior mezclaba categorías: una columna "Formación" con el
 * pregrado, otra "Perfeccionamiento" con dos cursos apretados y una tercera
 * "Especialidad" con una frase de posicionamiento. Tres rótulos que no eran
 * comparables entre sí, así que el bloque no se leía como una lista de nada.
 *
 * Las tres son la misma cosa —una especialidad— y cada una trae dónde la
 * hizo. Se muestran como lista de dos columnas: el rótulo en oro a la
 * izquierda es la especialidad, la institución a la derecha.
 *
 * Los valores van sin punto final: son un dato, no una oración. Con punto
 * parecían tres frases truncadas.
 *
 * El orden es cronológico y de paso geográfico: Chile 2022, Brasil 2023,
 * Corea 2024. Los tres países cuentan la trayectoria internacional que la
 * galería de fotos intentaba contar, sin una sola foto de teléfono.
 *
 * Queda fuera la cosmetología de Academia Expertas: subió al título, que es
 * donde el usuario la quiso.
 */
const ESPECIALIDADES = [
  {
    rotulo: "Endodoncia",
    donde: "Universidad de los Andes, Chile",
  },
  {
    // INRO, no INAO: Instituto Nacional de Reabilitação Orofacial.
    rotulo: "Armonización Orofacial",
    donde: "INRO, Brasil",
  },
  {
    rotulo: "Skin Care Profesional",
    donde: "Mikwang Beauty Academy, Corea",
  },
];

/**
 * 05 · La fundadora — wireframe 32a/32b, con la ficha del 49a.
 *
 * Cierra la página y es la única sección con ficha de datos. El bloque de
 * abajo —cada columna colgando de su horizontal— es el mismo lenguaje de los
 * principios de "Nuestro compromiso" en el home.
 *
 * El reparto de la información: el **título** va debajo del nombre porque es
 * quién es; las **especialidades** van en las columnas porque son una lista.
 * Mezclarlos —pregrado y especialidades en la misma ficha— fue el primer
 * intento y no se leía como una lista de nada.
 *
 * **Una sola foto, no una galería.** Se probó una tira de cinco miniaturas
 * clickeables con la trayectoria (Japón, Corea, INRO, Nueva York, Academia
 * Expertas) y se descartó. Dos razones, y la segunda pesa más de lo que
 * parece:
 *
 * - Las fotos de trayectoria son de teléfono contra backdrops corporativos, y
 *   chocaban con el reportaje profesional que ocupa el resto de la página.
 * - La tira era el único elemento interactivo de todo el sitio. Introducía un
 *   vocabulario nuevo para una sección sola.
 *
 * Queda la del cruce de Japón, que es la única documental del set —la doctora
 * caminando, sin posar, sin papel en la mano— y la única que no pelea con el
 * sistema de negro y dorado.
 *
 * El código de la galería sigue en `founder-gallery.tsx`, sin usar, por si la
 * decisión se revierte.
 *
 * El retrato de estudio no está a propósito: `/founder-portrait.webp` es el
 * mismo archivo que usa la sección de la fundadora del landing, dos veces.
 */
export function AcercaFundadora() {
  return (
    <section id="fundadora" className="scroll-mt-20 bg-cream">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-8 lg:px-12 lg:py-32">
        {/* En móvil el riel es la columna derecha y el contenido la izquierda,
            como en "Tu experiencia en Omiya" del home. Con el riel a la
            izquierda —que es donde vive en desktop— los 44px del kanji más el
            gap se leían a 390px como un margen izquierdo de más, distinto al
            del resto de la página. La colocación va por `col-start` y no
            reordenando el DOM: el riel se anuncia después del texto igual que
            en desktop. */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6 lg:flex lg:gap-14">
          <SectionRail kanji="院長の言葉" className="col-start-2 row-start-1" />

          {/* La columna de la foto se capa en 26rem, y de ahí sale que la
              foto y el texto terminen casi juntos.

              El 38% solo crecía sin techo: la foto es un porcentaje del
              viewport y el alto del texto es casi constante de 1280px para
              arriba, así que a 1728 la foto sacaba 174px de ventaja. Con el
              tope, de 1280 en adelante el desfase queda en 12px. */}
          <div className="col-start-1 row-start-1 flex-1 lg:grid lg:grid-cols-[min(38%,26rem)_minmax(0,1fr)] lg:items-start lg:gap-x-16">
            <Reveal>
              {/* Sin pie. Lo tuvo —"Japón", con el degradado del parque
                  Ōmiya de la sección 03— y salió: con una sola foto el pie
                  dejó de cumplir su función. Ahí acreditaba cuál de cinco se
                  estaba viendo; acá el dato ya no distingue nada y el
                  degradado que lo hacía legible ensuciaba el pie de la imagen
                  para nada.

                  Con el pie fuera se va también el `figure`: sin `figcaption`
                  no hay nada que agrupar. */}
              {/* 7:10 y no 4:5: la foto se alarga para emparejar el alto de
                  la columna de texto, que a 1280px mide 582px contra los 509
                  que daba el 4:5 —73px de crema sobrando debajo, con el bloque
                  terminando en escalón—. A 7:10 calzan al pixel.

                  **Aspecto fijo y no `h-full` estirándose al alto real**, que
                  fue el primer intento. Estirar calza exacto a cualquier
                  ancho, pero el alto de la columna de texto se dispara cuando
                  el texto se angosta: a 1024px la foto quedaba de 304×688, o
                  sea aspecto 0.44, una tira con la doctora recortada a los
                  costados. Y en pantallas muy anchas se daba vuelta a
                  apaisada. Un número fijo es predecible en todo el rango.

                  El archivo se rehizo a 7:10 desde el original de 3:4 en vez
                  de dejarle el recorte a `object-cover` sobre el 4:5: así se
                  recorta una sola vez y no se pierde resolución.

                  El calce fino lo termina el tope de 26rem de la columna, acá
                  arriba. Entre 1024 y 1200 el texto sigue quedando más largo,
                  pero ahí es el texto el que se estira al angostarse, no la
                  foto la que se queda corta. */}
              <div className="relative aspect-[7/10] w-full overflow-hidden bg-zinc-100">
                <Image
                  src="/fundadora/japon-cruce-v3.webp"
                  alt="La Dra. Antonieta Ortega cruzando una calle en Japón"
                  fill
                  sizes="(min-width: 1024px) min(38vw, 26rem), 100vw"
                  className="object-cover object-center"
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

              {/* Pegado al nombre: el título es parte del lockup —quién es—
                  y no un dato suelto. Con los 20px que tenía se leía como el
                  primer renglón del bloque siguiente.

                  En `ink-muted` y no en oro. Con los dos en oro el nombre
                  quedaba entre dos eyebrows del mismo color y el mismo cuerpo
                  —"La fundadora" arriba, el título abajo—, y se leían como el
                  mismo elemento repetido. Son cosas distintas: el de arriba
                  rotula la sección, como en todas las secciones del sitio; el
                  de abajo dice quién es la persona. Separarlos por color hace
                  que el nombre reciba el peso, que es lo que corresponde. */}
              <Reveal delay={240}>
                <p className="mt-3 eyebrow text-ink-muted">{TITULO}</p>
              </Reveal>

              <Reveal delay={320}>
                <blockquote className="mt-8 max-w-xl font-serif text-[22px] font-light leading-[1.45] text-zinc-900 lg:mt-10 lg:text-[28px]">
                  {CITA}
                </blockquote>
              </Reveal>

              {/* Lista de dos columnas, no tres columnas lado a lado.
                  Tres columnas obligaban a reservar dos líneas al rótulo para
                  que los cuerpos no arrancaran a alturas distintas, y aun así
                  cada especialidad quedaba leyéndose de arriba abajo mientras
                  el ojo las compara de izquierda a derecha. Apiladas, las
                  instituciones caen todas en el mismo eje y el bloque se lee
                  como lo que es: una lista.

                  Va en `dl` y no en divs: es literalmente una lista de
                  término y definición, y así el lector de pantalla anuncia el
                  par completo en vez de dos textos sueltos.

                  **Sin raya arriba.** La tenía —la heredó de la ficha de
                  columnas, donde cada una colgaba de su horizontal— y sobraba:
                  con las tres filas ya alineadas en dos ejes, el bloque se
                  separa solo. La raya agregaba un tercer elemento gris a una
                  sección que vive de blanco y oro.

                  Con la raya fuera, el aire de arriba se consolida en un solo
                  margen en vez de repartirse entre `mt` y `pt`.

                  El tope es de 32rem y no un número al azar: la columna de
                  rótulos mide 16rem fijos más 2.5rem de gap, así que a la
                  institución le quedan 216px y la más larga —"Mikwang Beauty
                  Academy, Corea"— mide 198. Entra justa en una línea, y el
                  borde del bloque cae unos 18px después de donde termina. Eso
                  es lo que le da a la raya del cierre dónde parar. */}
              <div className="mt-10 w-full max-w-[32rem] lg:mt-12">
                {/* El bloque necesita decir qué son las tres filas. Sin este
                    rótulo se leen como tres datos sueltos: no hay nada que
                    diga que son sus especialidades.

                    Hacía falta desde que los nombres pasaron a serif. Cuando
                    eran eyebrows dorados *parecían* etiquetas y el bloque se
                    autoexplicaba a medias; ahora que son contenido, la
                    etiqueta tiene que existir de verdad.

                    Va en oro y en `.eyebrow`, que es lo correcto por partida
                    doble: rotula estructura —que es el trabajo del dorado en
                    esta página— y son dos palabras cortas, que es para lo que
                    esa clase está hecha. */}
                <Reveal>
                  <h3 className="eyebrow text-gold">Especialidades</h3>
                </Reveal>

                <dl className="mt-5">
                  {ESPECIALIDADES.map((e, i) => (
                    <Reveal
                      key={e.rotulo}
                      delay={(i + 1) * 80}
                      className={`lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-baseline lg:gap-x-10 ${
                        i > 0 ? "mt-5 lg:mt-2" : ""
                      }`}
                    >
                      {/* `items-baseline` y no el `mt-0` de siempre: el rótulo
                          va a 10px y la institución a 13, así que alineados
                          por arriba el oro quedaba flotando sobre el texto.

                          Las filas van apretadas en desktop —8px— porque ahí
                          cada una es una sola línea y con más aire dejaban de
                          leerse como una lista. En móvil se quedan en 24: allá
                          cada fila son dos líneas, y apretarlas al mismo valor
                          confundiría el corte entre pares con el corte de
                          adentro. */}
                      {/* En serif y caja baja, no en el eyebrow del sitio.
                          `.eyebrow` lleva `letter-spacing: 0.5em` y está hecha
                          para rótulos de una o dos palabras cortas —"La
                          fundadora", "Tratamientos"—. Aplicada a
                          "Armonización Orofacial", de 22 caracteres, separa
                          cada letra 4px y la palabra deja de leerse como
                          palabra.

                          El nombre de la especialidad es contenido, no una
                          etiqueta, así que toma el tratamiento que el sitio le
                          da al contenido de una lista: el mismo de los
                          títulos de "Pilares" en esta misma página, un cuerpo
                          más chico porque acá es una fila y no una tarjeta.

                          De paso resuelve el color: en serif oscuro tiene peso
                          propio y no necesita el oro que tenía antes. */}
                      <dt className="font-serif text-[17px] font-light leading-[1.3] text-zinc-900 lg:text-[18px]">
                        {e.rotulo}
                      </dt>
                      <dd className="mt-2 text-[13px] leading-[1.9] text-zinc-600 lg:mt-0">
                        {e.donde}
                      </dd>
                    </Reveal>
                  ))}
                </dl>

              {/* El enlace muestra el handle en vez de decir "Ver más". Con
                  "Ver más" el destino era una incógnita: el visitante no sabía
                  si iba a otra página del sitio o a Instagram. El handle lo
                  dice y de paso deja la cuenta a la vista para quien no piensa
                  hacer clic.

                  `.btn-rule-plain` porque `.btn-rule` pone `text-transform:
                  uppercase` para el resto de los enlaces del sitio, y
                  `@DRA.ANTONIETAORTEGAMUNOZ` no es un handle: los handles se
                  escriben como se escriben. La excepción vive en globals.css
                  junto a la regla que modifica — la utilidad de Tailwind no
                  alcanza, porque `.btn-rule` se declara después y le gana.

                  **La raya va `wide`**, o sea rellenando lo que sobra hasta
                  el borde del bloque, en vez de medir un ancho fijo. Con un
                  número fijo terminaba 166px antes de donde termina "Mikwang
                  Beauty Academy, Corea" y el cierre no cerraba nada; y como el
                  handle es bastante más largo que el "Ver más" que había
                  antes, cualquier valor elegido a ojo se rompía al cambiar el
                  texto.

                  Antes se había descartado `wide` con el argumento de que
                  barre la columna entera. Ese argumento valía cuando la
                  columna medía 800px; ahora el bloque está topado en 32rem, y
                  barrerlo es exactamente lo que se quiere.

                  De paso resuelve el móvil solo: ahí la raya se calcula sobre
                  los 259px de la columna y le tocan 59, en vez de salirse 69px
                  como pasaba con los 128 fijos de escritorio.

                  Los 48px hasta la lista son a propósito. Con las filas a 8px
                  de separación, el enlace necesita mucho más que eso para
                  leerse como lo que sigue y no como una cuarta fila que perdió
                  su institución. */}
              <Reveal delay={160}>
                <RuleLink
                  href={INSTAGRAM_URL}
                  external
                  wide
                  className="btn-rule-plain mt-12 tracking-[0.08em] text-gold"
                >
                  {HANDLE}
                </RuleLink>
              </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
