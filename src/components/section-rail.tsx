import { Reveal } from "@/components/reveal";

/**
 * Riel vertical de sección, la columna angosta que abre cada bloque de Acerca
 * de: kanji, hairline, numeral y el rótulo de la sección en vertical.
 *
 * Es una variante del lenguaje del home y no un invento nuevo. Allá el
 * marcador se parte en dos zonas —numeral y eyebrow sobre el titular, kanji y
 * vertical en una columna aparte—; acá los cuatro elementos se apilan en una
 * sola columna a la izquierda, que es lo que pedía el wireframe 32.
 *
 * El ancho va explícito y con `shrink-0` por el mismo motivo que en el home:
 * en WebKit —o sea todo navegador en iPhone, Chrome incluido— un elemento con
 * `writing-mode: vertical-rl` no le propaga su ancho intrínseco al ítem flex
 * que lo contiene, el ítem colapsa a cero y las columnas se montan una sobre
 * otra. El valor sale de la cuenta: font-size x line-height.
 *
 * El rótulo va con las letras derechas (`text-orientation: upright`) y no
 * girado: es el mismo gesto que el riel "AGENDAR" del header, y a esta escala
 * un texto girado 90° obliga a ladear la cabeza para leer dos palabras.
 *
 * Su tracking es 0.22em y no el 0.5em del eyebrow horizontal. En vertical el
 * tracking se convierte en separación entre renglones de una letra, así que
 * el valor del canon estiraba "FILOSOFÍA OMIYA" a más de 250px y el rótulo
 * terminaba midiendo más que el kanji que lo encabeza.
 */
export function SectionRail({
  kanji,
  numeral,
  label,
  tone = "light",
  className = "",
}: {
  /** El verso japonés de la sección, en vertical. */
  kanji: string;
  /** "01", "02"… El hero va sin numeral. */
  numeral?: string;
  /** El rótulo de la sección, en vertical y en versalitas. */
  label: string;
  /** `dark` es el panel negro de "El significado de Omiya". */
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Reveal className={`w-9 shrink-0 lg:w-11 ${className}`}>
      <div className="flex flex-col items-center">
        <span
          lang="ja"
          className={`font-jp text-[19px] leading-[1.6] [writing-mode:vertical-rl] lg:text-[24px] ${
            tone === "dark" ? "text-night-fg" : "text-ink"
          }`}
        >
          {kanji}
        </span>

        <span
          aria-hidden="true"
          className="mt-6 h-16 hairline-v bg-gold lg:mt-8 lg:h-20"
        />

        {numeral ? (
          <span className="mt-6 font-sans text-[9px] tracking-[0.2em] text-gold lg:mt-8">
            {numeral}
          </span>
        ) : null}

        {/* El rótulo es decorativo: la sección ya lleva su eyebrow horizontal
            con el mismo texto, y el titular es el encabezado real. Repetirlo
            para un lector de pantalla sería oírlo dos veces seguidas. */}
        <span
          aria-hidden="true"
          className="mt-6 font-sans text-[10px] uppercase leading-none tracking-[0.22em] text-gold [text-orientation:upright] [writing-mode:vertical-rl] lg:mt-7"
        >
          {label}
        </span>
      </div>
    </Reveal>
  );
}
