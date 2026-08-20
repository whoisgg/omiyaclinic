import { BOOKING_URL } from "@/lib/links";
import { DisplayHeading } from "@/components/display-heading";
import { Reveal } from "@/components/reveal";
import { RuleLink } from "@/components/rule-link";

/**
 * Cierre de la home. Wireframes 42a (desktop) / 42b (móvil).
 *
 * Es la única sección sin numeral: no es un capítulo más de la página sino el
 * punto final, así que se sale de la numeración igual que el hero se sale por
 * arriba.
 *
 * Los dos breakpoints comparten composición —cambian escalas, no piezas—, así
 * que acá sí alcanza un solo bloque: verso vertical, titular, la línea de
 * apoyo y el enlace de reserva.
 *
 * La 42 corrige a la 38a en un punto: el texto no va centrado sino alineado a
 * la izquierda, y lo que se centra es el bloque entero. Es la diferencia entre
 * un texto que se abre en abanico desde el medio y uno que cuelga de su propio
 * eje, que es como está compuesto el resto del sitio. El `w-fit` es lo que lo
 * hace posible: la caja mide lo que mide su hijo más ancho y el `mx-auto` la
 * centra, así que el bloque queda centrado sin que su contenido lo esté.
 *
 * El verso va centrado sobre esa caja, no sobre la sección — que es lo mismo,
 * porque la caja ya está centrada.
 *
 * El fondo es el negro cálido de la cortina del menú y no un zinc-900: sobre
 * un neutro frío el oro de la marca se ensucia. El titular mantiene la cascada
 * letra por letra, que en el sitio está reservada para este momento.
 *
 * La llamada a la acción deja de ser el botón con outline y pasa al enlace con
 * regla del wireframe.
 */

// Negro cálido, el mismo de la cortina del menú: con la tinta #1e1c19 del
// sitio casa, y un #18181b puro le tira el oro a verde.
const NEGRO = "#151310";
const GOLD = "#b08a4f";

// "Empieza desde aquí".
const JA = "ここから始まる";

export function HomeCierre() {
  return (
    <section className="relative" style={{ backgroundColor: NEGRO }}>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto w-fit max-w-full">
          {/* El verso abre el bloque colgado de su propia vertical, como los
              rieles de las otras secciones, pero centrado sobre la caja. */}
          <Reveal>
            <div className="flex flex-col items-center">
              <span
                lang="ja"
                className="font-jp text-[15px] leading-[2] [writing-mode:vertical-rl] lg:text-[17px]"
                style={{ color: GOLD }}
              >
                {JA}
              </span>
              <span
                aria-hidden="true"
                className="mt-7 h-10 hairline-v lg:h-12"
                style={{ backgroundColor: GOLD }}
              />
            </div>
          </Reveal>

          <DisplayHeading
            lines={["Tu bienestar", "empieza aquí."]}
            split="letter"
            tone="dark"
            className="mt-12 text-white lg:mt-16"
          />

          <Reveal delay={200}>
            <p className="mt-8 text-sm font-light text-zinc-400 lg:mt-10 lg:text-base">
              Cada piel tiene una historia diferente.
            </p>
          </Reveal>

          {/* La raya va solo a la derecha: con el texto alineado a la
              izquierda, una raya del otro lado lo empujaría fuera de su eje.

              Y va `wide`, que la estira hasta el borde de la caja, en vez de
              con un ancho fijo. Como la caja es `w-fit` —mide lo que mide su
              hijo más ancho, que es el titular—, la raya termina exactamente
              donde termina "empieza aquí.". Con un ancho fijo quedaba corta y
              había que reajustarlo en cada breakpoint. */}
          <Reveal delay={300}>
            <RuleLink
              href={BOOKING_URL}
              external
              wide
              className="mt-10 text-[#b08a4f] lg:mt-14"
            >
              Agendar consulta
            </RuleLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
