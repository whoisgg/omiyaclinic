"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOOKING_URL } from "@/lib/links";

// Paleta de la cortina del menú móvil. El negro va cálido (no zinc puro) para
// que case con la tinta #1e1c19 del sitio, y el blanco tira a crema por lo
// mismo: un #fff puro sobre este negro se ve azulado.
const MENU_BG = "#151310";
const MENU_FG = "#f5f1ea";
const GOLD = "#b08a4f";

const DIRECCION = "Del Pucará 50, Machalí";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/acerca", label: "Acerca de" },
  { href: "/tratamientos", label: "Tratamientos" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  const pathname = usePathname();
  // El header es fijo. Arriba del todo es transparente; con scroll gana un
  // velo blanco translúcido. Se bajó del 85% al 70% porque, con el nav
  // horizontal fuera, la barra solo lleva el logo y un velo opaco a todo el
  // ancho era mucho aparato para una palabra. No puede ser transparente del
  // todo: el logo va en tinta y el sitio tiene dos secciones negras donde
  // desaparecería. Al 70% el logo queda en 9.1:1 sobre la más oscura.
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Con el panel abierto se bloquea el scroll del documento: si no, el dedo
  // arrastra la página por detrás y al cerrar el menú apareces en otro punto.
  // Se guarda el valor previo en vez de asumir "" para no pisar un overflow
  // que haya puesto otro componente.
  useEffect(() => {
    if (!menuOpen) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previo;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // El hero del home es claro, así que el header va en tinta oscura en todas
  // las páginas: solo gana un velo blanco con blur al scrollear.

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > (isHome ? window.innerHeight * 0.6 : 24));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    // El bloque negro y el overlay van FUERA del <header>, no dentro. Con el
    // menú abierto en una sección se rompía: `backdrop-filter` convierte al
    // elemento en bloque contenedor de sus descendientes `position: fixed`, así
    // que al scrollear —cuando el header gana `backdrop-blur`— el panel dejaba
    // de posicionarse contra el viewport y quedaba confinado a los 80px de la
    // barra. En el hero funcionaba porque ahí el header aún no tiene blur.
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-white/70 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-8 lg:px-12 relative flex h-20 items-center">
          {/* Con el menú abierto se apaga: el panel trae el suyo y en desktop,
              donde el panel solo cubre la mitad derecha, si no se verían dos
              "Omiya Clinic" al mismo tiempo. Es un relevo, no una
              desaparición. */}
          <Link
            href="/"
            aria-label="Omiya Clinic — Home"
            className={`text-zinc-900 transition-opacity duration-500 ${
              menuOpen ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
            tabIndex={menuOpen ? -1 : undefined}
          >
            <span className="text-sm font-semibold uppercase tracking-[0.28em]">
              Omiya Clinic
            </span>
          </Link>
        </div>
      </header>

      {/* Bloque negro pegado al canto derecho: la hamburguesa arriba y
          "AGENDAR" en vertical debajo. Reemplaza al nav horizontal y al botón
          suelto — ahora los tres enlaces viven dentro del panel en todos los
          tamaños, no solo en móvil.

          El bloque mide 224px y al scrollear se encoge a 80, dejando solo la
          hamburguesa. Se anima la altura con `overflow-hidden`, así el
          separador y "AGENDAR" se recortan solos en vez de tener que
          desmontarlos. Mismo comportamiento en todos los tamaños.

          Los 80px del estado encogido son los mismos `h-20` del header, para
          que el canto de abajo del bloque caiga justo donde termina la barra
          blanca. Antes eran 64 y quedaba un escalón de 16px. Se emparejó por
          acá y no bajando el header porque su altura está acoplada a los
          `scroll-mt-20` de las secciones ancladas: bajarla dejaría los
          anclajes 16px corridos.

          El `pt` acompaña: en el estado encogido la hamburguesa tiene que
          centrarse en 80px y no quedarse donde la dejaba el padding pensado
          para el bloque largo. Anima con la misma curva y duración que la
          altura, así los dos se mueven como una sola cosa. */}
      <div
        className={`fixed right-0 top-0 z-50 w-[54px] overflow-hidden transition-[height] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
          scrolled ? "h-20" : "h-56"
        }`}
        style={{ backgroundColor: MENU_BG }}
      >
        <div
          className={`flex flex-col items-center transition-[padding] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
            scrolled ? "pt-[33px]" : "pt-[26px]"
          }`}
        >
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            className="flex flex-col items-center gap-[5px] pb-[22px]"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`hairline-h transition-[width] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
                  scrolled ? "w-6" : "w-5"
                }`}
                style={{ backgroundColor: MENU_FG }}
              />
            ))}
          </button>

          <span
            aria-hidden="true"
            className={`hairline-h w-5 transition-opacity duration-500 ${
              scrolled ? "opacity-0" : "opacity-100"
            }`}
            style={{ backgroundColor: "rgba(241,237,229,.25)" }}
          />

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`pt-5 font-sans text-[10px] font-medium uppercase leading-none tracking-[0.46em] [text-orientation:upright] [writing-mode:vertical-rl] transition-opacity duration-500 ${
              scrolled ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
            style={{ color: MENU_FG }}
            tabIndex={scrolled ? -1 : undefined}
          >
            Agendar
          </a>
        </div>
      </div>

      {/* Overlay del menú (wireframes 16b/16c).

          Entra deslizándose desde el borde derecho, como la referencia
          villakujoyama.jp: el panel va de `translate-x-full` a 0. Eso
          reemplaza la cortina que bajaba desde arriba — con el rail vertical
          fijo a la derecha, la entrada lateral es la que tiene sentido: el
          panel parece salir de detrás del propio rail.

          En desktop cubre la mitad del ancho y deja ver la página por la
          izquierda —eso es lo que se asomaba en el wireframe, no una foto
          dentro del menú—. En móvil va a pantalla completa: media pantalla en
          un teléfono no deja espacio para la lista.

          Queda siempre montado y se anima con transform en vez de montarse y
          desmontarse, así la salida también se ve. `inert` lo saca del árbol
          de accesibilidad y del foco mientras está cerrado. */}
      {/* Fondo que captura el clic en la franja de página que queda a la
          vista. Va transparente: el diseño muestra esa franja a plena luz, no
          atenuada, así que el único papel del fondo es cerrar al tocar fuera. */}
      <div
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[55] transition-opacity duration-500 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id="menu-movil"
        inert={!menuOpen}
        aria-hidden={!menuOpen}
        className={`fixed inset-y-0 right-0 z-[60] flex w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none lg:w-1/2 ${
          menuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        style={{ backgroundColor: MENU_BG }}
      >
        {/* En desktop la lista se ancla arriba y no centrada. El 13vh no es
            arbitrario: es la misma altura a la que arranca el verso japonés
            del hero (`top-[13%]`), así que al abrir el menú la lista aparece
            a la altura donde estaban los kanji. En móvil se mantiene
            centrada, que es donde cae bien con el logo arriba y el pie
            abajo. */}
        <div className="relative flex flex-1 flex-col justify-center px-8 sm:px-12 lg:justify-start lg:px-20 lg:pt-[13vh]">
          {/* El wordmark vive dentro del panel en todos los tamaños. Antes
              era `lg:hidden`, dando por hecho que en desktop bastaba con el
              del header, que asoma por la mitad de página que el panel no
              tapa. Pero ese va en tinta oscura sobre la página: si el menú se
              abre estando sobre el cierre —que es negro— desaparece, y el
              panel se queda sin marca. Acá siempre está, en el crema del
              menú.

              El `top` de desktop lo alinea con el del header: 30px deja las
              dos palabras sobre la misma línea óptica dentro de la barra de
              80px. */}
          <span
            className="absolute left-8 top-7 text-[12px] font-semibold uppercase tracking-[0.28em] sm:left-12 lg:left-20 lg:top-[30px]"
            style={{ color: MENU_FG }}
          >
            Omiya Clinic
          </span>

          <nav className="flex flex-col items-start">
            {NAV.map((item, i) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  // Cerrar acá y no en un efecto sobre `pathname`: la regla
                  // react-hooks/set-state-in-effect prohíbe el setState suelto
                  // dentro de un efecto, y de paso el enlace a la ruta actual
                  // también cierra.
                  onClick={() => setMenuOpen(false)}
                  className="block overflow-hidden py-1"
                >
                  {/* Cada línea entra desde abajo detrás de su propia máscara,
                      escalonada. El `overflow-hidden` del padre es la máscara. */}
                  <span
                    className={`block font-serif text-[2.2rem] font-light leading-[1.35] transition-transform duration-[700ms] ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none lg:text-[2.8rem] ${
                      menuOpen ? "translate-y-0" : "translate-y-full"
                    } ${isActive ? "italic" : ""}`}
                    style={{
                      color: isActive ? GOLD : MENU_FG,
                      // Escalonado solo al abrir. Al cerrar salen todas juntas,
                      // porque un cierre escalonado se siente lento.
                      transitionDelay: menuOpen ? `${260 + i * 80}ms` : "0ms",
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* AGENDAR y la dirección se agrupan al pie. Con el menú abierto el
              CTA vive acá dentro y no en el rail: en vertical y a 54px competía
              con la X por el mismo rincón. Va junto a la dirección y no pegado
              a "Contacto" —que era lo primero que probé— porque colgando de la
              lista se leía como un quinto enlace. */}
          <div
            className={`absolute bottom-8 left-8 right-8 transition-opacity duration-500 sm:left-12 lg:bottom-10 lg:left-20 lg:right-16 ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: menuOpen ? "620ms" : "0ms" }}
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-6 py-2"
              style={{ color: MENU_FG }}
            >
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] lg:text-[12px]">
                Agendar
              </span>
              <span
                aria-hidden="true"
                className="hairline-h max-w-[22rem] flex-1 transition-opacity duration-500 group-hover:opacity-100"
                style={{ backgroundColor: "rgba(245,241,234,.45)" }}
              />
            </a>

            <p
              className="mt-7 font-sans text-[9px] uppercase tracking-[0.24em] lg:mt-9 lg:text-[10px]"
              style={{ color: "rgba(245,241,234,.55)" }}
            >
              {DIRECCION}
            </p>
          </div>
        </div>

        {/* Mismo rail de 54px que en reposo, para que la hamburguesa se lea
            como que se transforma en la X sin moverse de sitio. Con el menú
            abierto lleva solo la X: AGENDAR se muda al pie del panel. */}
        <div
          className="flex w-[54px] shrink-0 flex-col items-center pt-[26px]"
          style={{ borderLeft: "1px solid rgba(245,241,234,.12)" }}
        >
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
            className="pb-[22px]"
          >
            <span aria-hidden="true" className="relative block h-4 w-5">
              <span
                className="absolute left-0 top-1/2 hairline-h w-full rotate-45"
                style={{ backgroundColor: MENU_FG }}
              />
              <span
                className="absolute left-0 top-1/2 hairline-h w-full -rotate-45"
                style={{ backgroundColor: MENU_FG }}
              />
            </span>
          </button>

        </div>
      </div>

    </>
  );
}
