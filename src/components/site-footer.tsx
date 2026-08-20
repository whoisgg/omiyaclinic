import Link from "next/link";
import { LogoFull } from "@/components/logo-full";

/**
 * Footer del sitio. Wireframes 38a (desktop) / 40b (móvil).
 *
 * Un solo grid que reordena, no dos bloques: acá móvil y desktop llevan las
 * mismas cuatro piezas y solo cambia cómo se reparten, así que separar el
 * markup habría duplicado todo el contenido para nada.
 *
 *   desktop   las cuatro en fila — logo, menú, horario y contacto.
 *   móvil     logo a lo ancho, menú y contacto en dos columnas, y horario
 *             abajo a lo ancho, que es donde el par día/hora necesita sitio.
 *
 * El orden del DOM es el de lectura en móvil (logo, menú, contacto, horario) y
 * en `lg` el horario se adelanta con `order`, que es lo que pide la 38a.
 *
 * Los enlaces de contacto van sin los iconos que traía la versión anterior: el
 * wireframe los pone como texto plano y en una columna de tres ítems el icono
 * pesaba más que la palabra.
 */

const MENU = [
  { label: "Acerca de", href: "/acerca" },
  { label: "Tratamientos", href: "/tratamientos" },
  { label: "Contacto", href: "/contacto" },
];

const HORARIO = [
  { dia: "Mar · Jue · Vie", hora: "15:00 – 19:00" },
  { dia: "Mié · Sáb", hora: "10:00 – 14:00" },
  { dia: "Lun · Dom", hora: "Cerrado" },
];

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Del%20Pucar%C3%A1%2050%2C%20Oficina%20410%2C%20Edificio%20Don%20Octavio%2C%20Machal%C3%AD";

const CONTACTO = [
  { label: "Del Pucará 50, Machalí", href: MAPS_URL },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "WhatsApp", href: "https://wa.me/" },
];

const LEGALES = [
  { label: "Política de privacidad", href: "/privacidad" },
  { label: "Términos y condiciones", href: "/terminos" },
  { label: "Cookies", href: "/cookies" },
];

const CREMA = "#f2eee7";
const GOLD = "#b08a4f";

const rotulo = "text-[10px] uppercase tracking-[0.4em]";
const enlace = "text-sm text-zinc-600 transition-colors hover:text-zinc-900";

function DisenadoPor({ className = "" }: { className?: string }) {
  return (
    <a
      href="https://www.instagram.com/gasprlab"
      target="_blank"
      rel="noopener noreferrer"
      className={`text-xs text-zinc-400 transition-colors hover:text-[#b08a4f] ${className}`}
    >
      Designed by GG
    </a>
  );
}

function Rotulo({ children }: { children: React.ReactNode }) {
  return (
    <h3 className={rotulo} style={{ color: GOLD }}>
      {children}
    </h3>
  );
}

export function SiteFooter() {
  return (
    <footer style={{ backgroundColor: CREMA }}>
      <div className="mx-auto w-full max-w-[1600px] px-6 pt-16 sm:px-8 lg:px-12 lg:pt-24">
        {/* En desktop pasa a `flex justify-between`: con columnas `1fr` los
            cuatro bloques quedaban mucho más anchos que su contenido y cada
            uno arrastraba un vacío a su derecha —el último terminaba 130px
            antes del eje—. Repartidos, cada bloque mide lo que mide y el aire
            se reparte entre ellos, que es lo que pide la 38a: "footer
            repartido a lo ancho". En móvil sigue siendo la grilla de dos. */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:flex lg:justify-between lg:gap-x-16">
          {/* Logo. En móvil el wireframe lo fija en 190px; en desktop crece un
              poco, pero no tanto como para competir con el titular del cierre
              que queda justo encima.

              Va alineado a la izquierda, no centrado: todo el sitio cuelga de
              un eje izquierdo —riel, numeral y titular en cada sección— y un
              logo centrado sobre dos columnas alineadas a la izquierda queda
              flotando, sin relación con nada de lo que tiene debajo.

              En móvil no va: a 190px ocupaba más de la mitad del ancho de la
              columna y el footer arrancaba con un bloque de marca más pesado
              que todo lo que venía después. La firma la sigue dando el
              copyright del pie. */}
          <div className="hidden lg:order-1 lg:block">
            <LogoFull className="w-[190px] text-zinc-800 lg:w-[210px]" />
          </div>

          <div className="lg:order-2">
            <Rotulo>Menú</Rotulo>
            <ul className="mt-7 space-y-4">
              {MENU.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={enlace}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:order-4">
            <Rotulo>Contacto</Rotulo>
            <ul className="mt-7 space-y-4">
              {CONTACTO.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={enlace}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Las dos columnas internas del horario van en grilla y no en
              `flex`, en los dos breakpoints: los tres días tienen largos
              distintos —"Mar · Jue · Vie" contra "Lun · Dom"— y con `flex` las
              horas salían en zigzag, cada una arrancando donde terminaba su
              día. En grilla forman su propia columna.

              En móvil eso además las alinea con Contacto, que cae en la misma
              vertical, así que el bloque entero se lee sobre dos ejes. */}
          <div className="col-span-2 lg:order-3 lg:col-span-1">
            <Rotulo>Horario de atención</Rotulo>
            <ul className="mt-7 space-y-4">
              {HORARIO.map((item) => (
                <li
                  key={item.dia}
                  className="grid grid-cols-2 gap-x-8 text-sm text-zinc-600"
                >
                  <span>{item.dia}</span>
                  <span className="text-zinc-500">{item.hora}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Barra inferior. En móvil los legales van arriba y el copyright
            debajo —de ahí el `flex-col-reverse`, que invierte el orden visual
            sin tocar el del DOM, donde el copyright sigue yendo primero. */}
        <div className="mt-16 border-t border-zinc-300/60 pt-7 pb-9 lg:mt-20">
          <div className="flex flex-col-reverse gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* En móvil el crédito cierra la misma línea del copyright, contra
                el borde derecho; en desktop viaja al final de los legales. Van
                dos instancias y no una movida por CSS porque cambia de
                contenedor, no de posición dentro del mismo. */}
            <div className="flex items-baseline justify-between gap-6">
              <p className="text-xs text-zinc-500">
                © 2026 Omiya Clinic.
                <span className="hidden lg:inline">
                  {" "}
                  Todos los derechos reservados.
                </span>
              </p>
              <DisenadoPor className="lg:hidden" />
            </div>
            {/* En móvil los tres legales se reparten a lo ancho para que
                "Cookies" cierre contra el borde derecho, en la misma vertical
                que "Designed by GG" de la línea de abajo. En desktop vuelven a
                ir juntos al final de la fila. */}
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-zinc-500 lg:justify-start lg:gap-x-6">
              {LEGALES.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-zinc-800"
                >
                  {item.label}
                </Link>
              ))}
              <DisenadoPor className="hidden lg:inline" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
