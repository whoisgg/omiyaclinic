"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOOKING_URL } from "@/lib/links";

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

  // En el home, la línea inferior nace con ancho 0 y el logo está oculto;
  // ambos crecen/aparecen en sincronía con la máscara del hero
  // (mismo rango: scrollY 0 → 1vh, mismo easing).
  const barRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  // El velo toma el color de lo que tiene debajo: crema mientras el stage
  // del hero (fondo #faf6ec) sigue bajo el header; blanco apenas la sección
  // de tratamientos ([data-header-white]) asoma en el viewport.
  const [pastStage, setPastStage] = useState(!isHome);

  // Todo el stage del home es oscuro: primero la foto con velo, después el
  // panel negro donde aterriza el lockup. El header va en claro durante los
  // dos y recién vuelve al negro cuando entra la sección de tratamientos.
  const overHero = isHome && !pastStage;
  // Tramo en que el panel negro ya cubrió la foto.
  const onBlackPanel = overHero && scrolled;

  useEffect(() => {
    // En el home el velo espera a que la máscara del hero aterrice (1vh);
    // durante la transición el header queda transparente sobre el crema.
    const onScroll = () => {
      setScrolled(
        window.scrollY > (isHome ? window.innerHeight * 0.95 : 24),
      );
      // Cambia a blanco cuando la sección de tratamientos empieza a
      // solaparse con el navbar (su borde superior toca el alto del header).
      const marker = document.querySelector("[data-header-white]");
      setPastStage(
        !isHome ||
          (marker
            ? marker.getBoundingClientRect().top < 80
            : window.scrollY > window.innerHeight * 2.05),
      );
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
      const p = clamp01(window.scrollY / window.innerHeight);
      const e = easeInOutCubic(p);
      // La línea nace con ancho 0 (sin barra en el hero) y crece desde la
      // derecha hasta cubrir todo el ancho cuando la máscara aterriza.
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
  const linkColor = overHero
    ? "text-white/85 hover:text-white"
    : "text-zinc-900 hover:text-zinc-900";
  const activeColor = overHero ? "text-white" : "italic text-zinc-900";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? pastStage
            ? "bg-white/85 backdrop-blur"
            : "bg-zinc-900/85 backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div
        ref={barRef}
        className="relative flex h-20 items-center justify-between px-6 sm:px-8 lg:px-12"
      >
        {/* Línea inferior: en el home nace con ancho 0 y crece con la máscara */}
        <span
          ref={lineRef}
          aria-hidden="true"
          className={`absolute bottom-0 left-0 right-0 h-px origin-right ${
            overHero ? "bg-white/15" : "bg-zinc-900/10"
          }`}
          style={{ transform: isHome ? "scaleX(0)" : "scaleX(1)" }}
        />
        <Link
          ref={logoRef}
          href="/"
          aria-label="Omiya Clinic — Home"
          className={`transition-colors ${
            overHero ? "text-white" : "text-zinc-900 hover:text-zinc-900"
          }`}
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
            className={`hidden h-5 w-px md:block ${
              overHero ? "bg-white/35" : "bg-zinc-300"
            }`}
          />

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxe px-6 py-2.5 text-[10px] font-medium text-white"
            style={
              {
                // Sobre el panel negro un bloque negro es invisible: ahí va
                // con contorno. Sobre la foto y en claro, sólido negro.
                background: onBlackPanel ? "transparent" : "#18181b",
                borderColor: onBlackPanel ? "#ffffff" : "#18181b",
                "--luxe-fill": overHero ? "#ffffff" : "#18181b",
                "--luxe-fill-text": overHero ? "#18181b" : "#ffffff",
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
