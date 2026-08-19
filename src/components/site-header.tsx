"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOOKING_URL } from "@/lib/links";

// Paleta de la cortina del menú móvil. El negro va cálido (no zinc puro) para
// que case con la tinta #1e1c19 del sitio, y el blanco tira a crema por lo
// mismo: un #fff puro sobre este negro se ve azulado.
const MENU_BG = "#151310";
const MENU_FG = "#f5f1ea";
const GOLD = "#b08a4f";

const NAV = [
  { href: "/acerca", label: "Acerca de" },
  { href: "/tratamientos", label: "Tratamientos" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  const pathname = usePathname();
  // El header es fijo (no desaparece al scrollear). Arriba del todo es
  // transparente; con scroll gana un velo blanco con blur para mantener
  // legibilidad sobre cualquier sección.
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

  // En el home la línea inferior nace con ancho 0 y crece al salir del hero.
  const barRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  // El hero del home pasó a ser claro (blanco, con la rama de momiji), así
  // que el header va en tinta oscura desde el primer scroll en todas las
  // páginas. Antes había que alternar a blanco mientras el hero era una foto
  // con velo oscuro y un panel negro detrás; nada de eso existe ya.

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > (isHome ? window.innerHeight * 0.6 : 24));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    const bar = barRef.current;
    const cluster = clusterRef.current;
    const line = lineRef.current;
    const logo = logoRef.current;
    if (!bar || !cluster || !line || !logo) return;

    logo.style.opacity = "1";
    logo.style.pointerEvents = "auto";

    if (!isHome) {
      line.style.transform = "scaleX(1)";
      return;
    }

    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

    const apply = () => {
      // La línea termina de crecer justo cuando el hero sale de pantalla.
      const p = clamp01(window.scrollY / (window.innerHeight * 0.62));
      const e = easeInOutCubic(p);
      // La línea nace con ancho 0 (sin barra sobre el hero) y crece desde la
      // derecha hasta cubrir todo el ancho al terminar el hero.
      line.style.transform = `scaleX(${e})`;
      // El nombre va siempre visible: el hero ya no lleva lockup en reposo,
      // así que es la única marca en pantalla al entrar.
    };

    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
    apply();

    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
  }, [isHome]);

  const linkBase =
    "text-xs font-medium uppercase tracking-[0.18em] transition-colors";
  const linkColor = "text-zinc-900 hover:text-zinc-900";
  const activeColor = "italic text-zinc-900";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-white/85 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div
        ref={barRef}
        className="mx-auto w-full max-w-[1600px] px-6 sm:px-8 lg:px-12 relative flex h-20 items-center justify-between"
      >
        {/* Línea inferior: en el home nace con ancho 0 y crece al salir del hero */}
        <span
          ref={lineRef}
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px origin-right bg-zinc-900/10"
          style={{ transform: isHome ? "scaleX(0)" : "scaleX(1)" }}
        />
        <Link
          ref={logoRef}
          href="/"
          aria-label="Omiya Clinic — Home"
          className="text-zinc-900 transition-colors hover:text-zinc-900"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.28em]">
            Omiya Clinic
          </span>
        </Link>

        <div ref={clusterRef} className="flex items-center gap-8">
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${linkBase} ${isActive ? activeColor : linkColor}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <span
            aria-hidden="true"
            className="hidden h-5 w-px bg-zinc-300 md:block"
          />

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxe hidden px-6 py-2.5 text-[10px] font-medium text-white md:inline-block"
            style={
              {
                // Todos los fondos bajo el header son claros, así que el
                // botón va sólido negro y se invierte a blanco al hover.
                background: "#18181b",
                borderColor: "#18181b",
                "--luxe-fill": "#ffffff",
                "--luxe-fill-text": "#18181b",
              } as React.CSSProperties
            }
          >
            Agendar
          </a>

          {/* En móvil el botón Agendar cede el lugar al menú: hasta ahora era
              lo único en la barra y los tres links quedaban inalcanzables,
              porque el <nav> es `hidden md:flex`. Agendar no desaparece, pasa
              a ser el cierre del panel. */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            className="-mr-3 flex h-14 w-14 items-center justify-center md:hidden"
          >
            <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
              <span className="h-px w-full bg-zinc-900" />
              <span className="h-px w-full bg-zinc-900" />
            </span>
          </button>
        </div>
      </div>

      {/* Panel de navegación móvil: cortina negra a pantalla completa.

          El negro pleno no contradice la regla de marca —negro + dorado sobre
          fondo claro—: el negro ES el primario, y acá va a sangre. Lo que
          rompía el sistema era un hero oscuro, porque ahí el dorado tenía que
          cargar el lockup. En el menú el dorado sigue en su papel de acento
          (la ruta activa y la hairline).

          Queda siempre montado y se anima con clip-path en vez de montarse y
          desmontarse: así la salida también se ve. `inert` lo saca del árbol
          de accesibilidad y del foco cuando está cerrado, que es lo que
          `hidden` hacía antes sin dejar animar. */}
      <div
        id="menu-movil"
        inert={!menuOpen}
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-50 flex flex-col transition-[clip-path] duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] md:hidden motion-reduce:transition-none ${
          menuOpen
            ? "[clip-path:inset(0_0_0%_0)]"
            : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        style={{ backgroundColor: MENU_BG }}
      >
        <div className="mx-auto flex h-20 w-full max-w-[1600px] shrink-0 items-center justify-between px-6 sm:px-8">
          <span
            className="text-sm font-semibold uppercase tracking-[0.28em]"
            style={{ color: MENU_FG }}
          >
            Omiya Clinic
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
            className="-mr-3 flex h-14 w-14 items-center justify-center"
          >
            {/* Las dos rayas de la hamburguesa giran hasta la X en el mismo
                punto de la pantalla donde estaban: se lee como que el control
                se transforma, no como dos botones distintos. */}
            <span aria-hidden="true" className="relative block h-4 w-6">
              <span
                className={`absolute left-0 h-px w-full transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
                  menuOpen ? "top-1/2 rotate-45" : "top-0 rotate-0"
                }`}
                style={{ backgroundColor: MENU_FG }}
              />
              <span
                className={`absolute left-0 h-px w-full transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
                  menuOpen ? "top-1/2 -rotate-45" : "top-full rotate-0"
                }`}
                style={{ backgroundColor: MENU_FG }}
              />
            </span>
          </button>
        </div>

        <nav className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 sm:px-8">
          {NAV.map((item, i) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                // Cerrar acá y no en un efecto sobre `pathname`: la regla
                // react-hooks/set-state-in-effect prohíbe el setState suelto
                // dentro de un efecto, y de paso el link a la ruta actual
                // también cierra.
                onClick={() => setMenuOpen(false)}
                className="group border-b py-5"
                style={{ borderColor: "rgba(245,241,234,.12)" }}
              >
                {/* Cada línea entra desde abajo detrás de su propia máscara,
                    escalonada. El `overflow-hidden` es la máscara; sin él el
                    texto se vería subir desde fuera del renglón. */}
                <span className="block overflow-hidden">
                  <span
                    className={`block font-serif text-[2.6rem] font-light leading-[1.15] transition-transform duration-[700ms] ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
                      menuOpen ? "translate-y-0" : "translate-y-full"
                    } ${isActive ? "italic" : ""}`}
                    style={{
                      color: isActive ? GOLD : MENU_FG,
                      // Escalonado sólo al abrir. Al cerrar salen todas
                      // juntas, porque un cierre escalonado se siente lento.
                      transitionDelay: menuOpen ? `${140 + i * 90}ms` : "0ms",
                    }}
                  >
                    {item.label}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mx-auto w-full max-w-[1600px] shrink-0 px-6 pb-10 sm:px-8">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className={`btn-luxe block w-full px-6 py-4 text-center text-[11px] font-medium transition-opacity duration-500 motion-reduce:transition-none ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
            style={
              {
                // Sobre negro el botón se invierte: contorno claro que se
                // rellena al hover, con el texto pasando a negro.
                color: MENU_FG,
                background: "transparent",
                borderColor: MENU_FG,
                "--luxe-fill": MENU_FG,
                "--luxe-fill-text": MENU_BG,
                transitionDelay: menuOpen ? "420ms" : "0ms",
              } as React.CSSProperties
            }
          >
            Agendar
          </a>
        </div>
      </div>
    </header>
  );
}
