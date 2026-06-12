"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOOKING_URL } from "@/lib/links";
import { LogoMark } from "@/components/logo-mark";

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
  const overHero = false;
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  // En el home, la línea inferior nace junto a "Acerca de" y el logo está
  // oculto; ambos crecen/aparecen en sincronía con la máscara del hero
  // (mismo rango: scrollY 0 → 1vh, mismo easing).
  const barRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  // El velo toma el color de lo que tiene debajo: crema mientras el stage
  // del hero (fondo #faf6ec) sigue bajo el header; blanco apenas la sección
  // de tratamientos ([data-header-white]) asoma en el viewport.
  const [pastStage, setPastStage] = useState(!isHome);

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

    if (!isHome) {
      line.style.left = "0px";
      logo.style.opacity = "1";
      logo.style.pointerEvents = "auto";
      return;
    }

    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

    const apply = () => {
      const p = clamp01(window.scrollY / window.innerHeight);
      const e = easeInOutCubic(p);
      const start =
        cluster.getBoundingClientRect().left -
        bar.getBoundingClientRect().left -
        28;
      line.style.left = `${Math.max(0, start) * (1 - e)}px`;
      // El logo aparece al final, cuando el lockup aterriza (mismo rango
      // que el cambio de color del lockup en hero-stage).
      const cb = clamp01((p - 0.55) / 0.4);
      logo.style.opacity = String(cb);
      logo.style.pointerEvents = cb > 0.3 ? "auto" : "none";
    };

    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
    apply();

    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
  }, [isHome]);

  const linkBase = "text-xs uppercase tracking-[0.18em] transition-colors";
  const linkColor = overHero
    ? "text-[#f3ede3]/80 hover:text-[#f3ede3]"
    : "text-zinc-900 hover:text-zinc-900";
  const activeColor = overHero ? "text-[#f3ede3]" : "italic text-zinc-900";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? pastStage
            ? "bg-white/85 backdrop-blur"
            : "bg-[#faf6ec]/85 backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div
        ref={barRef}
        className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10"
      >
        {/* Línea inferior: en el home nace junto al nav y crece con la máscara */}
        <span
          ref={lineRef}
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px bg-zinc-900/10"
        />
        <Link
          ref={logoRef}
          href="/"
          aria-label="Omiya Clinic — Home"
          className={`transition-colors ${
            overHero
              ? "text-[#f3ede3]/80 hover:text-[#f3ede3]"
              : "text-zinc-900 hover:text-zinc-900"
          }`}
        >
          <LogoMark className="h-8 w-auto" />
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
              overHero ? "bg-[#f3ede3]/30" : "bg-zinc-300"
            }`}
          />

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxe px-6 py-2.5 text-[10px] text-white"
            style={
              {
                background: "#18181b",
                borderColor: "#18181b",
                "--luxe-fill": "#18181b",
                "--luxe-fill-text": "#ffffff",
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
