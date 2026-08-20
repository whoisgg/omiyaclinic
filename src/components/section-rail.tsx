import { Reveal } from "@/components/reveal";

/**
 * El marcador de sección del sitio, en sus dos piezas.
 *
 * Es el mismo bloque con que abren las secciones del home y no una variante:
 * a la izquierda el numeral con su regla y el eyebrow sobre el titular, y en
 * una columna aparte el kanji con su vertical. Acerca de lo tenía al revés
 * —numeral y rótulo apilados dentro del riel, y el kanji en tinta— así que
 * el mismo elemento no se veía igual en dos páginas seguidas.
 *
 * Las dos piezas van separadas porque en el layout viven separadas: el
 * marcador abre la columna de texto y el riel es una columna propia.
 */

/**
 * Numeral, regla y eyebrow, apilados sobre el titular.
 *
 * Los tres tiempos de entrada —0 para el numeral, 80 para el eyebrow— son los
 * de la cascada documentada en globals.css. El riel entra a 200.
 */
export function SectionMarker({
  numeral,
  eyebrow,
}: {
  /** "01", "02"… Va en la serif de marca: en la sans un numeral chico sobre
   *  un hairline se lee como dos rayas apiladas. */
  numeral: string;
  eyebrow: string;
}) {
  return (
    <>
      <Reveal>
        <p className="font-serif text-[17px] leading-none tracking-[0.12em] text-gold lg:text-[22px]">
          {numeral}
        </p>
        <span
          aria-hidden="true"
          className="mt-4 block hairline-h w-9 bg-gold lg:mt-5 lg:w-11"
        />
      </Reveal>
      <Reveal delay={80}>
        <p className="mt-6 eyebrow text-gold">{eyebrow}</p>
      </Reveal>
    </>
  );
}

/**
 * El riel: el kanji en vertical y su hairline colgando, nada más.
 *
 * Va en oro, como el de Tratamientos y el de Nuestro compromiso. El ancho es
 * explícito y con `shrink-0` porque en WebKit —o sea todo navegador en
 * iPhone, Chrome incluido— un elemento con `writing-mode: vertical-rl` no le
 * propaga su ancho intrínseco al ítem flex que lo contiene: el ítem colapsa a
 * cero y las columnas se montan una sobre otra. El valor sale de la cuenta,
 * font-size x line-height.
 *
 * El margen superior tampoco es decorativo: baja el riel hasta que el kanji
 * arranca a la altura del eyebrow, salteándose lo que ocupan el numeral, su
 * regla y sus márgenes. Son los mismos valores del home.
 */
export function SectionRail({ kanji }: { kanji: string }) {
  return (
    <Reveal
      delay={200}
      className="mt-14 w-11 shrink-0 lg:mt-[4.2rem] lg:w-14"
    >
      <div className="flex flex-col items-center gap-6">
        <span
          lang="ja"
          className="w-9 font-jp text-[19px] leading-[1.6] text-gold [writing-mode:vertical-rl] lg:w-11 lg:text-[24px]"
        >
          {kanji}
        </span>
        <span
          aria-hidden="true"
          className="h-32 hairline-v bg-gold lg:h-40"
        />
      </div>
    </Reveal>
  );
}
