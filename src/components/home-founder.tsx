import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { RuleLink } from "@/components/rule-link";

/**
 * Sección IV — La fundadora.
 *
 * Móvil y desktop no comparten composición, así que tampoco comparten markup:
 * son dos bloques hermanos, cada uno con su `hidden`, sobre las mismas
 * constantes de copy. Forzar los dos casos en un solo grid que colapsara
 * salía más enredado que escribirlos por separado: el riel vertical no cabe
 * en móvil y el orden de lectura es otro.
 *
 *   desktop   riel (japonés, hairline, marcador de sección) | cita y, abajo,
 *             párrafo junto a la firma | la foto sangrando por el margen
 *             derecho hasta el borde inferior de la sección.
 *   móvil     wireframe 29a: la foto a sangre con la firma y la cita al pie,
 *             encima de su propio fondo oscuro, y el párrafo debajo sobre el
 *             crema.
 *
 * Las dos usan `/founder-portrait.webp` a color pleno y sin filtros. La
 * referencia muestra la foto en blanco y negro, pero acá se replica la
 * composición y no el tratamiento de color.
 *
 * Queda en `public/` un `/founder-cutout.webp`, la misma toma con el fondo de
 * estudio removido por matting y el borde trabajado (rampa de alpha
 * endurecida a ~1px, color del anillo descontaminado y light wrap del crema
 * 7px hacia adentro, que es lo que evita que una figura de luminancia 15
 * contra un crema de 237 se lea como calcomanía). Se probó en desktop y se
 * descartó a favor del bloque rectangular con fondo; el archivo se conserva
 * por si se retoma, pero hoy no lo referencia nadie.
 *
 * El numeral y el eyebrow no van arriba de la cita como en las secciones I a
 * III: en desktop viven en el riel, donde la referencia pone la firma de la
 * clínica, y así la cita abre el cuadro sin nada por encima.
 *
 * En desktop la sección no lleva padding inferior: la foto tiene que llegar
 * al borde de abajo y quedar cortada por el cuadro. Arriba sí lo lleva, así
 * que el borde superior de la foto queda alineado con el del texto. Se probó
 * a toda altura, tocando también el borde de arriba, y pesaba demasiado. El
 * aire de abajo lo pone el `pb` de la columna de texto, no el de la sección.
 */

// "La belleza está en la armonía". Es la frase de la referencia y sostiene el
// riel: 7 caracteres dan una columna de alto parecido al de los verticales de
// las otras secciones. En móvil no hay riel y se usa solo el primer carácter,
// 美 (belleza), como sello.
const JA = "美は調和にある";

// Declarar los cortes y no dejárselos al navegador, igual que en los titulares
// del sitio: la cita es el centro del cuadro y con corte automático quedaba en
// renglones desparejos según el ancho.
const CITA = [
  "“La estética",
  "debe ayudarnos",
  "a sentirnos mejor",
  "con quienes somos,",
  "no a convertirnos",
  "en alguien diferente.”",
];

const PARRAFO =
  "Creé Omiya con la convicción de que el cuidado estético puede acompañar el paso del tiempo sin alterar aquello que nos hace únicos. Cada decisión dentro de la clínica busca reflejar esa filosofía: priorizar la armonía, la autenticidad y el bienestar por sobre las tendencias o los cambios excesivos.";

/** Firma de la doctora: hairline, tratamiento, nombre y cargo. */
function Firma({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <span
        aria-hidden="true"
        className="block hairline-h w-9 bg-gold"
      />
      <p
        className="mt-6 eyebrow text-gold"
      >
        Dra.
      </p>
      {/* El nombre es lo único de la sección que sube a escala de titular: el
          tracking abierto lo separa de la cita, que va en la misma serif pero
          mucho más grande y sin espaciar. */}
      {/* "Ortega M." y no "Ortega" a secas: el apellido materno abreviado,
          como se firma en Chile. Cabe porque el corte de línea está declarado
          a mano —el renglón largo sigue siendo "ANTONIETA", 206px con su
          tracking— y "ORTEGA M." queda por debajo de esa medida. */}
      <p className="mt-4 font-serif text-[26px] font-light uppercase leading-[1.35] tracking-[0.16em] text-zinc-900 lg:text-[32px]">
        Antonieta
        <br />
        Ortega M.
      </p>
      <p
        className="mt-5 text-[10px] uppercase leading-[2] tracking-[0.35em] text-gold"
      >
        Fundadora, Omiya Clinic
      </p>
    </div>
  );
}

export function HomeFounder() {
  return (
    <section
      id="fundadora"
      className="relative scroll-mt-20 overflow-hidden bg-cream"
    >
      {/* ══ MÓVIL — wireframe 29a ══════════════════════════════════════ */}
      {/* La cita no va al lado de la foto sino encima, al pie, sobre el fondo
          oscuro del retrato. Es lo que resuelve el problema que tenía la
          sección en móvil: a 342px de ancho, cita y foto una debajo de otra
          estiraban el bloque a más de 1300px de alto y ninguna de las dos
          quedaba con presencia. Apiladas en la misma caja, la foto es el
          fondo y la cita el primer plano.

          La foto va a sangre completa y el texto de abajo con el padding del
          sitio, igual que en el wireframe. */}
      <div className="lg:hidden">
        {/* El retrato entra con el mismo fade + lift que el resto de las
            fotos del sitio. El Reveal envuelve la caja de aspecto y no el
            <Image>: así sube el bloque entero y no queda un hueco de 12px al
            pie mientras dura la animación. */}
        <Reveal>
        <div className="relative aspect-[13/20] w-full overflow-hidden">
          <Image
            src="/founder-portrait.webp"
            alt="Dra. Antonieta Ortega, fundadora de Omiya Clinic"
            fill
            sizes="100vw"
            className="object-cover object-top"
          />
          {/* La mitad de abajo del encuadre es su chaqueta negra, así que la
              cita ya caería sobre un fondo casi negro. El degradado igual va:
              asegura el contraste del texto pase lo que pase con el recorte
              en pantallas de proporción distinta. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
          />
          {/* "Las palabras de la directora", en vertical arriba a la derecha,
              con su hairline colgando. Es el mismo gesto del riel de desktop
              trasladado adentro de la foto. */}
          <div className="absolute right-6 top-8 flex flex-col items-center">
            <span
              lang="ja"
              className="font-jp text-[16px] leading-[1.6] [writing-mode:vertical-rl] text-gold"
            >
              院長の言葉
            </span>
            <span
              aria-hidden="true"
              className="mt-5 h-12 hairline-v bg-gold"
            />
          </div>
          {/* Pie: la firma en oro y, debajo, la cita en blanco. Acá la cita va
              de corrido y no en las líneas declaradas del desktop: son para
              una columna ancha, y a este ancho partirían en renglones de dos
              palabras. */}
          <div className="absolute inset-x-0 bottom-0 px-6 pb-9">
            <Reveal>
              <p
                className="text-[10px] uppercase leading-[1.9] tracking-[0.28em] text-gold"
              >
                Dra. Antonieta Ortega
                <br />
                Fundadora, Omiya Clinic
              </p>
              <blockquote className="mt-5 font-serif text-[26px] font-light leading-[1.35] text-white">
                {CITA.join(" ")}
              </blockquote>
              {/* La hairline cierra la cita acá adentro, sobre el fondo
                  oscuro, en vez de abrir el bloque de crema de abajo: ahí
                  metía 70px de aire entre la foto y el párrafo. */}
              <span
                aria-hidden="true"
                className="mt-7 block hairline-h w-9 bg-gold"
              />
            </Reveal>
          </div>
        </div>
        </Reveal>

        <div className="px-6 pb-16 pt-8">
          <Reveal>
            <p className="text-[13px] leading-[2] text-zinc-600">
              {PARRAFO}
            </p>
            <RuleLink href="/acerca" wide className="mt-10 text-gold">
              Ver más
            </RuleLink>
          </Reveal>
        </div>
      </div>

      {/* ══ DESKTOP ═════════════════════════════════════════════════════ */}
      {/* `founder-card` y `founder-photo` no son decorativos: globals.css los
          usa para que al pasar por el retrato se expanda el subrayado de
          "Ver más".

          El ancho de la columna de la foto no es una proporción elegida a
          ojo: es el mínimo con el que el recorte no le corta los hombros.
          `object-cover` escala por el lado que falte, y con la foto detenida
          en el padding derecho la caja se vuelve angosta; la silueta ocupa
          1295 de las 1709 columnas del original, así que hace falta un ancho
          de caja de ~409px a 1280 y ~389px a 1024. De ahí el 35% en `xl` y el
          43% en `lg`, donde el eje total es más chico. */}
      <div className="founder-card mx-auto hidden w-full max-w-[1600px] px-12 pt-16 lg:grid lg:min-h-[820px] lg:grid-cols-[3.5rem_minmax(0,1fr)_43%] lg:gap-x-8 xl:min-h-[900px] xl:grid-cols-[3.5rem_minmax(0,1fr)_minmax(300px,35%)] xl:gap-x-10 xl:pt-24">
        {/* ── Riel izquierdo ──────────────────────────────────────────── */}
        <Reveal>
          <div className="flex flex-col items-center">
            <span
              lang="ja"
              className="font-jp text-[24px] leading-[1.6] [writing-mode:vertical-rl] text-ink"
            >
              {JA}
            </span>
            <span
              aria-hidden="true"
              className="mt-8 h-14 hairline-v bg-gold"
            />
            {/* El lugar que en la referencia ocupa la firma de la clínica lo
                toma acá el marcador de sección: numeral romano y eyebrow, los
                mismos dos elementos con que abren las secciones I a III, solo
                que apilados en el riel en vez de sobre el titular.
                Horizontal y en dos líneas: el vertical ya lo pone el japonés
                de arriba, y dos columnas verticales seguidas se leerían como
                una sola tira larga. */}
            <span
              className="mt-8 font-serif text-[22px] leading-none tracking-[0.12em] text-gold"
            >
              IV
            </span>
            <span
              className="mt-5 text-center text-[10px] uppercase leading-[2.2] tracking-[0.4em] text-gold"
            >
              La
              <br />
              Fundadora
            </span>
          </div>
        </Reveal>

        {/* ── Columna central ─────────────────────────────────────────── */}
        <div className="flex flex-col pb-16 pl-6 xl:pb-24 xl:pl-8">
          {/* La cita no usa DisplayHeading: aquel compone titulares de 2–3
              palabras a escala de display y acá son seis renglones largos que
              tienen que caber al lado del retrato. La escala se queda en la
              franja de 30–52px, que es la de la referencia. */}
          <Reveal delay={80}>
            <blockquote
              className="mt-16 font-serif font-light text-zinc-900 xl:mt-24"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 3.25rem)",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              {CITA.map((linea) => (
                <span key={linea} className="block">
                  {linea}
                </span>
              ))}
            </blockquote>
          </Reveal>

          {/* Pie del bloque: el párrafo a la izquierda con "Ver más" colgando
              debajo, y la firma de la doctora en la segunda columna. El
              `mt-auto` lo empuja contra el borde inferior de la sección para
              que quede a la altura de las manos del retrato. */}
          {/* Una columna hasta 1280 y dos a partir de ahí. En `lg` la columna
              de texto se queda en 432px —la foto necesita 43% para que el
              recorte no le corte los hombros— y partida en dos daba 184px por
              lado: "ANTONIETA" mide 206 con su tracking y se salía por debajo
              de la foto. Apiladas, el nombre tiene los 408px enteros. */}
          <div className="mt-auto grid grid-cols-1 gap-10 pt-12 xl:grid-cols-2 xl:gap-12 xl:pt-20">
            <Reveal delay={140}>
              <p className="max-w-[30rem] text-sm leading-[2] text-zinc-600">
                {PARRAFO}
              </p>
              <div className="mt-10">
                <RuleLink href="/acerca" className="text-gold">
                  Ver más
                </RuleLink>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <Firma />
            </Reveal>
          </div>
        </div>

        {/* ── Retrato ─────────────────────────────────────────────────── */}
        {/* Bloque rectangular con su fondo de estudio. Arranca a la altura
            del texto —el borde de arriba de la celda cae bajo el padding del
            contenedor— y baja hasta el borde de la sección, que no lo tiene.

            A la derecha se detiene en el padding del contenedor, alineada
            con el borde del resto del sitio. Se probó sangrándola hasta el
            borde del viewport y quedaba fuera de eje respecto de las otras
            secciones.

            El encuadre tiene un ancla por eje y cada una resuelve un problema
            distinto, porque cuál de los dos recorta depende del ancho:

            56% en horizontal — ella no está centrada en el original, su
            silueta ocupa de 232 a 1527 sobre 1709, o sea que cae un poco a la
            derecha. Manda por debajo de ~1700px de viewport, donde la caja es
            más angosta en proporción que la foto.

            15% en vertical — por encima de ~1700px la columna se ensancha, la
            caja pasa a ser más ancha en proporción que la foto y el recorte se
            da vuelta: a 1920 sobran 405 filas y hay que decidir de dónde
            salen. Centrado se comía la cabeza (154 filas por arriba, y su pelo
            empieza en la 115). Con el 15% la ventana abre en la fila 61 y todo
            lo que sobra se va por abajo, que es donde la foto ya estaba
            cortada por el cuadro. */}
        <Reveal className="h-full">
          <div className="founder-photo relative h-full">
            <Image
              src="/founder-portrait.webp"
              alt="Dra. Antonieta Ortega, fundadora de Omiya Clinic"
              fill
              sizes="36vw"
              className="object-cover object-[56%_15%]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
