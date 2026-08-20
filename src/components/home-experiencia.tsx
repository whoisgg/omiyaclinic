import Image from "next/image";
import { BOOKING_URL } from "@/lib/links";
import { DisplayHeading } from "@/components/display-heading";
import { Reveal } from "@/components/reveal";
import { RuleLink } from "@/components/rule-link";

/**
 * Sección V — Tu experiencia en Omiya. Wireframes 36a (desktop) / 36b (móvil).
 *
 * Reemplaza la versión anterior, que era una foto a sangre por detrás del texto
 * con dos degradados encima para poder leerlo. El wireframe la invierte y la
 * separa: la foto pasa a ser un bloque propio a la izquierda y el texto ocupa
 * la derecha, sin nada superpuesto. Se gana legibilidad —el texto ya no depende
 * de un fade sobre la imagen— y la foto se ve entera en vez de asomar por
 * debajo del degradado.
 *
 * De izquierda a derecha en desktop:
 *
 *   foto     bloque rectangular, centrado en el alto de la sección.
 *   riel     肌を知る en vertical con su hairline.
 *   texto    marcador de sección (numeral, hairline y eyebrow), titular,
 *            párrafo y el enlace de reserva.

 * La hairline que iba entre el titular y el párrafo salió: con el marcador
 * arriba ya trayendo la suya, el bloque acumulaba tres rayas horizontales
 * —marcador, titular y enlace— en una columna sola.
 *
 * El numeral es el V y no el "06" del wireframe: la numeración del sitio va en
 * romanos y arranca en el enfoque, porque el hero se quedó sin numeral. Enfoque
 * I, tratamientos II, compromiso III, fundadora IV, ésta V.
 *
 * El wireframe pone el numeral y un "Tu experiencia" vertical dentro del riel.
 * Acá no: el numeral sube al eyebrow horizontal, que es donde vive en el resto
 * del sitio, y el rótulo vertical se cae porque repetía lo que el eyebrow ya
 * dice entero.
 *
 * La llamada a la acción deja de ser el botón con outline (`.btn-luxe`) y pasa
 * al enlace con regla del wireframe, el mismo de "Ver más" en la fundadora.
 */

// El fondo va blanco y no crema, igual que la galería de tratamientos. La
// home alterna crema y blanco sección a sección, y con el crema de acá
// quedaban dos seguidos —la fundadora y ésta— sin corte entre ellos.

// "Conocer la piel".
const JA = "肌を知る";

// El café con la revista sobre la mesa, la toma de la 36a. Del original de
// cámara (5020×4016) sale un webp de 2000px de ancho: el bloque mide 585px en
// desktop y 390 a sangre en móvil, así que con 2000 alcanza para servir el
// srcset hasta 3x sin cargar los 4.5MB del jpg.
const FOTO = "/clinica/experiencia.webp";

const PARRAFO =
  "Cada tratamiento comienza con una evaluación personalizada que nos permite comprender tu piel, tus objetivos y la etapa en la que te encuentras.";

/**
 * Riel vertical: el japonés y su hairline, nada más.
 *
 * Antes llevaba también el numeral y "Tu experiencia" en vertical. Los dos
 * salieron: el numeral se fue al eyebrow horizontal, donde vive en el resto
 * de las secciones, y el rótulo vertical repetía lo que el eyebrow ya dice.
 * Con la columna vacía de texto, la hairline se alarga para que el riel siga
 * teniendo el peso de una columna y no quede como un carácter suelto.
 */
function Riel() {
  return (
    <div className="flex flex-col items-center">
      <span
        lang="ja"
        className="w-9 font-jp text-[24px] leading-[1.6] [writing-mode:vertical-rl] text-gold"
      >
        {JA}
      </span>
      <span
        aria-hidden="true"
        className="mt-8 h-28 hairline-v bg-gold"
      />
    </div>
  );
}

/**
 * Marcador de sección: numeral romano, hairline y eyebrow, apilados y
 * alineados a la izquierda. Es el mismo bloque con que abren Tratamientos y
 * Nuestro compromiso, con la misma escala y el mismo tracking, para que las
 * tres secciones se lean como parte de una serie.
 */
function Marcador() {
  return (
    <>
      <Reveal>
        <p
          className="font-serif text-[17px] leading-none tracking-[0.12em] lg:text-[22px] text-gold"
        >
          V
        </p>
        <span
          aria-hidden="true"
          className="mt-4 block hairline-h w-9 lg:mt-5 lg:w-11 bg-gold"
        />
      </Reveal>
      <Reveal delay={80}>
        <p
          className="mt-6 eyebrow text-gold"
        >
          Tu experiencia en Omiya
        </p>
      </Reveal>
    </>
  );
}

export function HomeExperiencia() {
  return (
    <section
      id="experiencia"
      className="relative scroll-mt-20 overflow-hidden bg-white"
    >
      {/* ══ MÓVIL — wireframe 36b ═══════════════════════════════════════ */}
      {/* La foto arriba a sangre completa y el texto debajo. El riel se
          conserva —japonés y hairline— en una columna angosta a la derecha. */}
      <div className="lg:hidden">
        <Reveal>
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={FOTO}
              alt="Detalle del espacio de Omiya Clinic"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </Reveal>

        <div className="px-6 pb-16 pt-10">
          {/* El riel es una columna propia a la derecha y todo el texto vive
              en la izquierda: marcador, titular, párrafo y enlace. Es como
              está resuelto Tratamientos, y es el punto — antes el párrafo y la
              raya del enlace salían del grid y cruzaban por debajo de la
              vertical, que es justo lo que la columna tiene que impedir. */}
          <div className="grid grid-cols-[minmax(0,1fr)_2rem] gap-x-5">
            <div>
              <Marcador />
              <DisplayHeading
                lines={["Comprender", "tu piel", "hoy."]}
                dimFrom={2}
                size="sm"
                className="mt-6 text-zinc-900"
              />
              <Reveal delay={120}>
                <p className="mt-8 text-[13px] leading-[2] text-zinc-600">
                  {PARRAFO}
                </p>
                {/* El color va en el enlace y no en el texto: la raya del
                    componente hereda `currentColor`, así texto y regla no se
                    pueden despegar. */}
                {/* Raya corta y no `wide`: barriendo la columna entera
                    competía con el titular. En la fundadora sí va larga,
                    porque ahí el enlace cierra la sección solo. */}
                <RuleLink
                  href={BOOKING_URL}
                  external
                  className="mt-10 text-gold"
                >
                  Agenda tu evaluación
                </RuleLink>
              </Reveal>
            </div>

            {/* Mismo tratamiento que el vertical de "Nuestro compromiso": el
                kanji en oro, arrancando a la altura del eyebrow y no del
                numeral —de ahí el `mt-14`, que son los 58px que ocupan
                numeral, hairline y sus márgenes—, y una vertical larga
                colgando debajo. El ancho explícito es necesario: en WebKit un
                texto vertical no le propaga su ancho al ítem flex. */}
            <Reveal delay={80} className="mt-14">
              <div className="flex flex-col items-center gap-6">
                <span
                  lang="ja"
                  className="w-9 font-jp text-[19px] leading-[1.6] [writing-mode:vertical-rl] text-gold"
                >
                  {JA}
                </span>
                <span
                  aria-hidden="true"
                  className="h-32 hairline-v bg-gold"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ══ DESKTOP — wireframe 36a ═════════════════════════════════════ */}
      {/* La foto no sangra por el borde izquierdo: arranca en el eje del sitio,
          alineada con el resto de las secciones. En el wireframe llega al
          canto, pero las fotos de "Nuestro enfoque" y "La fundadora" quedaron
          respetando el padding y ésta tiene que empatar con ellas.

          Las tres columnas van alineadas al tope (`items-start`) y no
          centradas: con `items-center` la foto quedaba 44px más abajo que el
          texto y el riel, que es el más corto de los tres, caía a media
          altura — el kanji arrancaba 143px por debajo del borde de la foto.
          Al tope, la foto, el numeral y el kanji abren en la misma línea. */}
      <div className="mx-auto hidden w-full max-w-[1600px] items-start gap-x-10 px-12 py-24 lg:grid lg:grid-cols-[44%_3.5rem_minmax(0,1fr)] xl:gap-x-14 xl:py-32">
        <Reveal>
          <div className="relative aspect-[10/9] w-full overflow-hidden">
            <Image
              src={FOTO}
              alt="Detalle del espacio de Omiya Clinic"
              fill
              sizes="44vw"
              className="object-cover object-center"
            />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <Riel />
        </Reveal>

        <div>
          <Marcador />

          <DisplayHeading
            lines={["Comprender", "tu piel", "hoy."]}
            dimFrom={2}
            size="sm"
            className="mt-7 text-zinc-900"
          />

          <Reveal delay={160}>
            <p className="mt-10 max-w-[34rem] text-sm leading-[2] text-zinc-600">
              {PARRAFO}
            </p>
            <RuleLink
              href={BOOKING_URL}
              external
              ruleClass="w-36"
              className="mt-10 text-gold"
            >
              Agenda tu evaluación
            </RuleLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
