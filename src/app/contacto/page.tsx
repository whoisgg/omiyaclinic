import { DisplayHeading } from "@/components/display-heading";
import { Reveal } from "@/components/reveal";
import { RuleLink } from "@/components/rule-link";
import { SectionRail } from "@/components/section-rail";
import {
  BOOKING_URL,
  DIRECCION,
  MAPS_EMBED_URL,
  MAPS_URL,
} from "@/lib/links";

/** "Su visita". */
const JA = "ご来院";

const HORARIO = [
  { dia: "Mar · Jue · Vie", hora: "15:00 – 19:00" },
  { dia: "Mié · Sáb", hora: "10:00 – 14:00" },
  { dia: "Lun · Dom", hora: "Cerrado" },
];

/**
 * Los datos, cada uno colgando de su hairline.
 *
 * **Sin iconos.** El wireframe 52 los reemplaza por rótulo y regla, y tiene
 * razón: en una columna de varias filas un pin y un sobre pesaban más que la
 * palabra que acompañaban, y ninguno de los dos existe en el resto del
 * lenguaje del sitio.
 *
 * **Sin fila de pagos**, aunque el wireframe la trae. El link de HealthAtom se
 * le envía al paciente cuando corresponde; no es una puerta pública. Tenerlo
 * acá invitaba a pagar antes de que exista nada que pagar.
 *
 * ⚠️ **Falta el teléfono.** La versión anterior de esta página mostraba
 * "+56 9 …" como marcador, que en una página de contacto es peor que no
 * mostrar nada: parece un dato roto. La fila entra sola cuando haya número.
 *
 * El correo viene de la versión anterior y **no está verificado**; se mantiene
 * porque ya estaba publicado, no porque conste que es el bueno.
 */
const DATOS = [
  {
    rotulo: "Dirección",
    valor: DIRECCION,
    href: MAPS_URL,
    externo: true,
  },
  {
    rotulo: "Correo",
    valor: "hello@omiyaclinic.cl",
    href: "mailto:hello@omiyaclinic.cl",
    externo: false,
  },
];

/**
 * Contacto — wireframes 52a (desktop) / 52b (móvil).
 *
 * Reemplaza una página que era un borrador: los datos iban con emojis por
 * icono (📍 📞 ✉), el mapa era un degradado gris con la palabra "Google Maps
 * embed" encima, y al pie había **una nota interna de desarrollo publicada en
 * producción** —"Decisión: el botón Agendar abre la agenda de Dentalink…"—,
 * que es documentación del equipo y no contenido para un paciente.
 *
 * La estructura del 52: el riel del kanji, la columna de datos separados por
 * hairlines, y el mapa a sangre ocupando la mitad derecha.
 *
 * **El riel va a la derecha en móvil y a la izquierda en desktop**, como las
 * secciones de Acerca de: es un bloque partido en dos columnas, y a 390px el
 * riel a la izquierda le come el margen al texto.
 */
export default function ContactoPage() {
  return (
    <main className="bg-cream-pale">
      <div className="mx-auto w-full max-w-[1600px] px-6 pb-24 pt-32 sm:px-8 lg:px-12 lg:pb-32 lg:pt-40">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6 lg:flex lg:gap-16">
          <SectionRail kanji={JA} className="col-start-2 row-start-1" align="top" />

          <div className="col-start-1 row-start-1 flex-1 lg:grid lg:grid-cols-[minmax(0,1fr)_52%] lg:items-stretch lg:gap-x-16">
            {/* ── Columna de datos ───────────────────────────────────── */}
            <div>
              <Reveal>
                <p className="eyebrow text-gold">Visítanos</p>
              </Reveal>

              <DisplayHeading
                as="h1"
                lines={["Contacto"]}
                size="sm"
                delay={80}
                className="mt-6 text-zinc-900"
              />

              {/* Corta, porque abre. */}
              <Reveal delay={160}>
                <span
                  aria-hidden="true"
                  className="mt-8 block hairline-h w-9 bg-gold lg:w-11"
                />
              </Reveal>

              <dl className="mt-10">
                {DATOS.map((d, i) => (
                  <Reveal
                    key={d.rotulo}
                    delay={200 + i * 60}
                    className="border-t border-zinc-200 py-5"
                  >
                    <dt className="eyebrow tracking-[0.4em] text-gold">
                      {d.rotulo}
                    </dt>
                    <dd className="mt-3 text-sm leading-[1.9] text-zinc-700">
                      <a
                        href={d.href}
                        {...(d.externo
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="transition-colors hover:text-gold"
                      >
                        {d.valor}
                      </a>
                    </dd>
                  </Reveal>
                ))}

                {/* El horario va en su propia fila porque son tres pares
                    día/hora y no un valor suelto. Los mismos del footer, que
                    es la fuente que estaba al día: la página anterior decía
                    "Martes a sábado · 10:00 – 19:00", que no coincide con
                    ninguno de los tres. */}
                {/* Cierra la lista, así que lleva borde abajo además del de
                    arriba: sin él la última fila quedaba abierta contra el
                    aire y las otras dos parecían un bloque cortado. */}
                <Reveal
                  delay={320}
                  className="border-y border-zinc-200 py-5"
                >
                  <dt className="eyebrow tracking-[0.4em] text-gold">
                    Horarios
                  </dt>
                  <dd className="mt-3 space-y-1.5 text-sm leading-[1.9] text-zinc-700">
                    {HORARIO.map((h) => (
                      <p key={h.dia} className="flex gap-x-4">
                        <span className="w-32 shrink-0">{h.dia}</span>
                        <span className="text-zinc-500">{h.hora}</span>
                      </p>
                    ))}
                  </dd>
                </Reveal>

              </dl>

              {/* Cierra la columna, con la raya larga que corresponde. La
                  agenda es la acción principal de la página, así que es lo
                  último que se lee. */}
              <Reveal delay={440} className="mt-10 w-full max-w-[22rem]">
                <RuleLink href={BOOKING_URL} external wide className="text-gold">
                  Agendar consulta
                </RuleLink>
              </Reveal>
            </div>

            {/* ── El mapa ────────────────────────────────────────────────
                En móvil va después de los datos, que es el orden del 52b.

                El `iframe` de Google es un tercero: carga sus scripts y sus
                cookies apenas se monta. Va con `loading="lazy"` para que no
                lo haga hasta que entre en pantalla, pero **si la política de
                cookies exige consentimiento previo, esto hay que revisarlo**:
                hoy carga sin preguntar.

                El recuadro con la ciudad va encima y no dentro del mapa: el
                iframe es de Google y no se le puede meter contenido. */}
            <Reveal delay={240} className="relative mt-12 lg:mt-0 lg:h-full">
              {/* En móvil conserva el 4:5; en desktop se estira al alto de la
                  columna de datos. Estirar acá es lo correcto y no lo era con
                  la foto de la fundadora: un mapa no tiene encuadre que
                  romper, así que puede tomar cualquier proporción. Sin esto
                  sobraban 219px de mapa por debajo del último dato. */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream lg:aspect-auto lg:h-full">
                <iframe
                  src={MAPS_EMBED_URL}
                  title="Ubicación de Omiya Clinic en Machalí"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
              {/* Arriba a la derecha y no a la izquierda como el wireframe: el
                  embed de Google dibuja su propia tarjeta con la dirección en
                  la esquina superior izquierda, y el rótulo le caía encima. El
                  wireframe no podía preverlo porque ahí el mapa era un
                  rectángulo gris. */}
              <p className="absolute right-4 top-4 bg-cream-pale/95 px-3 py-1.5 text-[10px] uppercase leading-none tracking-[0.28em] text-zinc-900 backdrop-blur lg:right-5 lg:top-5">
                Machalí, Chile
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}
