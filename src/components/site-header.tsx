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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-white/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-8 lg:px-12 relative flex h-20 items-center">
        <Link
          href="/"
          aria-label="Omiya Clinic — Home"
          className="text-zinc-900 transition-colors hover:text-zinc-900"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.28em]">
            Omiya Clinic
          </span>
        </Link>
      </div>

      {/* Bloque negro pegado al canto derecho: la hamburguesa arriba y
          "AGENDAR" en vertical debajo. Reemplaza al nav horizontal y al botón
          suelto — ahora los tres enlaces viven dentro del panel en todos los
          tamaños, no solo en móvil.

          El bloque mide 224px y al scrollear se encoge a 64, dejando solo la
          hamburguesa. Se anima la altura con `overflow-hidden`, así el
          separador y "AGENDAR" se recortan solos en vez de tener que
          desmontarlos. Mismo comportamiento en todos los tamaños. */}
      <div
        className={`fixed right-0 top-0 z-50 w-[54px] overflow-hidden transition-[height] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
          scrolled ? "h-16" : "h-56"
        }`}
        style={{ backgroundColor: MENU_BG }}
      >
        <div className="flex flex-col items-center pt-[26px]">
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
                className={`h-px transition-[width] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
                  scrolled ? "w-6" : "w-5"
                }`}
                style={{ backgroundColor: MENU_FG }}
              />
            ))}
          </button>

          <span
            aria-hidden="true"
            className={`h-px w-5 transition-opacity duration-500 ${
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

          En desktop cubre 3/4 del ancho y deja ver la página por la izquierda
          —eso es lo que se asomaba en el wireframe, no una foto dentro del
          menú—. En móvil va a pantalla completa: una franja de un cuarto en un
          teléfono no muestra nada legible.

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
        className={`fixed inset-y-0 right-0 z-[60] flex w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none lg:w-3/4 ${
          menuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        style={{ backgroundColor: MENU_BG }}
      >
        <div className="relative flex flex-1 flex-col justify-center px-8 sm:px-12 lg:px-20">
          <span
            className="absolute left-8 top-7 text-[12px] font-semibold uppercase tracking-[0.28em] sm:left-12 lg:hidden"
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

          <p
            className={`absolute bottom-8 left-8 font-sans text-[9px] uppercase tracking-[0.24em] transition-opacity duration-500 sm:left-12 lg:bottom-10 lg:left-20 lg:text-[10px] ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{
              color: "rgba(245,241,234,.55)",
              transitionDelay: menuOpen ? "620ms" : "0ms",
            }}
          >
            {DIRECCION}
          </p>
        </div>

        {/* Mismo rail de 54px que en reposo, para que la hamburguesa se lea
            como que se transforma en la X sin moverse de sitio. */}
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
                className="absolute left-0 top-1/2 h-px w-full rotate-45"
                style={{ backgroundColor: MENU_FG }}
              />
              <span
                className="absolute left-0 top-1/2 h-px w-full -rotate-45"
                style={{ backgroundColor: MENU_FG }}
              />
            </span>
          </button>

          <span
            aria-hidden="true"
            className="h-px w-5"
            style={{ backgroundColor: "rgba(241,237,229,.25)" }}
          />

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="pt-5 font-sans text-[10px] font-medium uppercase leading-none tracking-[0.46em] [text-orientation:upright] [writing-mode:vertical-rl]"
            style={{ color: MENU_FG }}
          >
            Agendar
          </a>
        </div>
      </div>

    </header>
  );
}
