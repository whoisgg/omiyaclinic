import Image from "next/image";

import { DisplayHeading } from "@/components/display-heading";
import { Reveal } from "@/components/reveal";

const DIRECCION = "Del Pucará 50, Machalí";

/**
 * Hero de Acerca de — wireframes 32a/32b, segunda versión.
 *
 * Cambió de un bloque de texto sobre crema a una portada con foto de fondo, y
 * con eso se reordenó entero: el titular baja al pie en una sola línea, el
 * rótulo vertical se va al riel derecho y la dirección pasa a horizontal
 * abajo. Aparece además el hint de scroll, que es el mismo del hero del home
 * —misma raya, mismo cuerpo, mismo tracking— porque las dos portadas del
 * sitio tienen que invitar a bajar de la misma manera.
 *
 * No usa `SectionRail`: aquel apila kanji, hairline, numeral y rótulo en una
 * columna, y acá los dos elementos viven separados —el kanji arriba a la
 * izquierda y el rótulo en el borde derecho—. Forzar el componente habría
 * sido reusarlo de nombre y no de forma.
 *
 * La foto no es la que pedía el wireframe —anotaba "jardín/parque de Omiya o
 * exterior de la clínica"— porque en las 325 fotos del reportaje de Claudia
 * Ferrer no hay una sola de exterior: son todas interiores. Lo más cercano a
 * un jardín es este macro del macetero del momiji, con el musgo, las hojas
 * caídas y el pasto, y resuelve la misma idea con material propio en vez de
 * con un banco de imágenes.
 *
 * Además calza con el encuadre: la mitad inferior izquierda, que es donde cae
 * el titular, está desenfocada y clara, así que la tinta se lee sin pelear.
 */
const FOTO_FONDO: string | null = "/acerca/hero-equipo-v1.webp";

/**
 * El encuadre de la foto, que no es un `object-cover` normal.
 *
 * La imagen se agranda al 130% y se corre un 30% a la izquierda: eso saca del
 * cuadro el televisor que ocupa el lado izquierdo real de la toma. Recién
 * después `object-position` decide qué parte del encuadre ampliado queda
 * centrada — la X mueve horizontal, más alto es más a la derecha; la Y mueve
 * vertical, más bajo es más arriba, que es lo que muestra los cuerpos enteros
 * en vez de solo los rostros.
 *
 * Los valores salen del wireframe 32 y están afinados por breakpoint: en
 * desktop la banda es apaisada y hay que ir a la derecha (82%); en móvil es
 * casi cuadrada y el punto se corre al centro (58%) subiendo el recorte (22%).
 */
const ENCUADRE = "absolute inset-0 h-[130%] w-[130%] max-w-none object-cover";

export function AcercaHero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-cream-pale">
      {/* En desktop la foto va detrás de todo, a pantalla completa. En móvil
          no: a 390px una foto de fondo bajo el titular lo deja sin contraste,
          así que el wireframe la baja a una banda en flujo y el texto vuelve
          al crema limpio. Son dos tratamientos distintos del mismo archivo, y
          por eso cada uno se monta en su breakpoint en vez de reacomodar uno
          solo con utilidades. */}
      {FOTO_FONDO ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block"
        >
          <Image
            src={FOTO_FONDO}
            alt=""
            width={2400}
            height={1920}
            priority
            sizes="130vw"
            className={ENCUADRE}
            style={{ left: "-30%", objectPosition: "82% 32%" }}
          />
          {/* El velo no es para oscurecer sino para bajarle el contraste a la
              foto hasta que el negro del titular vuelva a leerse sin pelear.
              Va en el crema de la marca y no en blanco o negro: cualquiera de
              los dos le cambia la temperatura a la imagen.

              Dejó de ser un velo plano: ahora es un degradado en diagonal que
              tapa fuerte por la izquierda —donde cae el titular— y suelta la
              foto en el centro, donde están ellas. Un velo parejo tenía que
              subir hasta el 65% para que el texto se leyera, y a esa altura la
              foto entera quedaba lavada. */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(100deg, rgba(240,236,228,.72) 0%, rgba(240,236,228,.18) 46%, rgba(240,236,228,.4) 100%)",
            }}
          />
        </div>
      ) : null}

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-6 pb-8 pt-24 sm:px-8 lg:px-12 lg:pb-10 lg:pt-32">
        {/* ── Franja superior: el kanji y, en desktop, el riel derecho ── */}
        <div className="relative flex items-start lg:flex-1">
          <Reveal>
            <p
              aria-hidden="true"
              lang="ja"
              className="font-jp text-[26px] font-normal leading-[1.5] text-ink [writing-mode:vertical-rl] lg:text-[34px]"
            >
              大宮の哲学
            </p>
          </Reveal>

          {/* El riel, calcado del hero del landing: no va pegado al borde
              derecho sino posicionado dentro del cuadro. Pegado a la derecha
              quedaba contra el botón de agendar y arriba del todo, y por eso
              no se leía como el mismo elemento aunque las piezas fueran las
              mismas.

              El 68% del eje horizontal es el mismo número que allá y cae en
              el mismo pixel, porque la caja que lo contiene mide igual: el
              ancho del eje menos el padding lateral.

              El vertical, en cambio, va a 20% y no al 26% del landing. No es
              una discrepancia: el porcentaje se mide contra cajas distintas.
              Allá la franja ocupa casi todo el hero, porque el hero no tiene
              titular abajo; acá arranca bajo el padding superior y termina
              donde empieza "Acerca de Omiya". Con el 26% el riel caía 34px
              más abajo que el del landing. Lo que tiene que coincidir es
              dónde queda en pantalla, y a 20% cae a 2px del original.

              Las piezas también son las de allá: la vertical, el rótulo en
              tinta, el descriptor atenuado y la horizontal que cierra. El
              descriptor repite el del landing —"clínica premium de
              well-aging"— y eso es deliberado: es la bajada de la marca, así
              que las dos portadas del sitio la dicen igual en vez de inventar
              una variante por página.

              El rótulo va en tinta y no en oro: a 11px sobre una foto el oro
              se lava. El oro queda en las dos rayas.

              En móvil no va: el wireframe deja ese lado libre para que la
              banda de foto respire. */}
          <Reveal
            delay={200}
            className="absolute right-0 top-[20%] hidden flex-col items-start lg:left-[68%] lg:right-auto lg:flex"
          >
            <span
              aria-hidden="true"
              className="mb-6 h-16 hairline-v bg-gold lg:mb-8 lg:h-20"
            />
            <p
              aria-hidden="true"
              className="font-sans text-[10px] font-normal uppercase leading-[2.1] tracking-[0.26em] text-ink lg:text-[11px] lg:tracking-[0.3em]"
            >
              Filosofía
              <br />
              Omiya
            </p>
            <p
              aria-hidden="true"
              className="mt-8 font-sans text-[9px] uppercase leading-[2] tracking-[0.22em] text-ink-muted lg:mt-10 lg:text-[10px]"
            >
              Clínica premium
              <br />
              de well-aging
            </p>
            <span
              aria-hidden="true"
              className="mt-5 block hairline-h w-16 bg-gold lg:mt-6 lg:w-20"
            />
          </Reveal>
        </div>

        {/* La banda de móvil. Va después del kanji y antes del titular, que es
            el orden del wireframe 32b, y sangra por los dos bordes con
            márgenes negativos que cancelan el padding del contenedor.

            Sangrar no es un capricho: es lo que hace que la portada se lea
            como el hero del landing. Allá la rama se pasa del ancho del
            viewport y toca los dos bordes; acá, metida dentro del padding, la
            foto se leía como una tarjeta pegada sobre el crema en vez de como
            el fondo de una portada. */}
        {FOTO_FONDO ? (
          <Reveal delay={120} className="-mx-6 sm:-mx-8 lg:hidden">
            <div className="relative mt-8 h-[460px] w-full overflow-hidden">
              <Image
                src={FOTO_FONDO}
                alt=""
                width={2400}
                height={1920}
                priority
                sizes="130vw"
                className={ENCUADRE}
                style={{ left: "-30%", objectPosition: "58% 22%" }}
              />
              {/* Acá el degradado va vertical y no en diagonal: en la banda de
                  móvil el texto no está al costado sino arriba y abajo. */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(240,236,228,.4) 0%, rgba(240,236,228,.08) 40%, rgba(240,236,228,.68) 100%)",
                }}
              />
            </div>
          </Reveal>
        ) : null}

        {/* ── Bloque del titular, anclado al pie ──
            `mt-auto` en móvil: con la sección midiendo una pantalla completa,
            el titular tiene que caer abajo y no quedar flotando a media
            altura. En desktop no hace falta porque la franja del kanji ya se
            estira con `lg:flex-1`.

            Sin padding propio: el margen automático ya se come todo el hueco
            libre, y sumarle uno encima empujaba el bloque 64px de más y
            dejaba la sección midiendo 818px contra los 812 de la pantalla. */}
        <div className="mt-auto lg:mt-0">
          {/* Una sola línea: "Acerca de Omiya" son tres palabras y el
              wireframe las quiere juntas. `immediate` porque está sobre el
              pliegue, donde el observador no aporta nada. */}
          <DisplayHeading
            as="h1"
            lines={["Acerca de Omiya"]}
            dimFrom={1}
            size="sm"
            immediate
            className="text-zinc-900"
          />

          <Reveal delay={280}>
            <p className="mt-6 max-w-xl text-sm leading-[2] text-zinc-600 lg:mt-8 lg:text-base">
              Una visión de la medicina estética centrada en el well-aging,
              donde salud, prevención y bienestar conviven en equilibrio.
            </p>
          </Reveal>
        </div>

        {/* ── Pie: el hint de scroll y la ubicación ── */}
        <Reveal
          delay={360}
          className="mt-12 flex flex-col-reverse items-start gap-4 lg:mt-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="flex items-center gap-4">
            <span aria-hidden="true" className="hairline-h w-7 bg-gold sm:w-9" />
            <span className="font-sans text-[9px] uppercase tracking-[0.26em] text-ink-muted lg:text-[10px]">
              Scroll para explorar
            </span>
          </div>

          {/* La dirección pasó de vertical a horizontal en esta versión del
              wireframe. En móvil no se muestra: sigue en el footer. */}
          <p className="hidden font-sans text-[9px] uppercase tracking-[0.24em] text-ink-muted lg:block lg:text-[10px]">
            {DIRECCION}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
