"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { PetalsOverlay } from "@/components/petals-overlay";
import { LogoWordmark } from "@/components/logo-wordmark";
import { LogoClinic } from "@/components/logo-clinic";
import { BOOKING_URL } from "@/lib/links";

/**
 * Transición de máscara estilo sensei.tech: el lienzo del hero (crema +
 * pétalos) se recorta y el lockup OMIYA/CLINIC viaja achicándose hasta la
 * columna izquierda de un layout de 2 columnas, con el texto well-aging a
 * la derecha. Los pétalos se desvanecen al comenzar el scroll y vuelven en
 * el landing. El lockup final queda pinned y las secciones siguientes lo
 * cubren al seguir scrolleando; subiendo, todo se revierte.
 *
 * Geometría del lockup tomada del AI original: CLINIC ocupa 665/801 del
 * ancho del wordmark, inset izquierdo 108/801, separación vertical 45/801.
 */
export function HeroStage({ children }: { children: React.ReactNode }) {
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const lockupRef = useRef<HTMLDivElement>(null);
  const clinicRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroLayer = heroLayerRef.current;
    const anchor = anchorRef.current;
    const lockup = lockupRef.current;
    const clinic = clinicRef.current;
    const target = targetRef.current;
    const introText = introTextRef.current;
    if (!heroLayer || !anchor || !lockup || !clinic || !target || !introText)
      return;

    const extras = Array.from(
      document.querySelectorAll<HTMLElement>("[data-hero-extra]"),
    );
    const canvas = heroLayer.querySelector("canvas");

    let raf = 0;
    let ticking = false;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

    const apply = () => {
      ticking = false;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const p = clamp01(window.scrollY / vh);
      const e = easeInOutCubic(p);

      // Caja destino (columna izquierda del layout final).
      const rT = target.getBoundingClientRect();
      const top = rT.top * e;
      const left = rT.left * e;
      const right = (vw - rT.right) * e;
      const bottom = (vh - rT.bottom) * e;
      heroLayer.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px)`;

      // El lockup viaja del centro del hero al centro de la caja destino,
      // achicándose para ocupar ~72% del ancho de la caja.
      const rA = anchor.getBoundingClientRect();
      const sTarget = (rT.width * 0.72) / rA.width;
      const s = 1 + (sTarget - 1) * e;
      const tx = (rT.left + rT.width / 2 - (rA.left + rA.width / 2)) * e;
      const ty = (rT.top + rT.height / 2 - (rA.top + rA.height / 2)) * e;
      lockup.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;

      // Pétalos: desaparecen apenas comienza el efecto, vuelven al landing.
      if (canvas) canvas.style.opacity = String(clamp01(1 - p / 0.4));

      // Eyebrow, tagline, botón y hint se desvanecen temprano.
      const fade = String(clamp01(1 - p / 0.3));
      for (const el of extras) el.style.opacity = fade;

      // CLINIC del lockup oficial aparece completando el logo.
      clinic.style.opacity = String(clamp01((p - 0.35) / 0.3));

      // Texto well-aging (columna derecha) sube al final.
      const ti = clamp01((p - 0.6) / 0.35);
      introText.style.opacity = String(ti * ti);
      introText.style.transform = `translateY(${(1 - ti) * 40}px)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = window.requestAnimationFrame(apply);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    apply();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="relative">
      {/* Rango del sticky: 100vh de máscara + ~20vh de pausa; después el
          bloque completo scrollea natural como cualquier sección */}
      <div className="h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        {/* Capa intro (detrás del hero): layout final de 2 columnas */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 pt-16 lg:grid-cols-2 lg:gap-16 lg:pt-0">
            {/* Caja destino del lockup (la máscara aterriza aquí) */}
            <div
              ref={targetRef}
              className="mx-auto aspect-[9/5] w-full max-w-[300px] sm:max-w-[420px] lg:mx-0 lg:max-w-[480px]"
            />
            <div ref={introTextRef} style={{ opacity: 0 }}>
              <h2 className="font-serif text-3xl font-light leading-snug text-zinc-900 sm:text-4xl">
                El well-aging en Omiya Clinic.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-zinc-600">
                Nuestro enfoque busca crear un espacio donde el bienestar se
                construye de manera consciente, personalizada y sostenible en
                cada etapa de la vida.
              </p>
              <Link
                href="/tratamientos"
                className="btn-underline mt-8 inline-block text-xs text-[#b08a4f]"
              >
                Explora nuestros tratamientos
              </Link>
            </div>
          </div>
        </div>

        {/* Capa hero: se enmascara hacia la caja destino */}
        <div
          ref={heroLayerRef}
          className="absolute inset-0 z-20 overflow-hidden bg-[#faf6ec]"
        >
          <PetalsOverlay />

          <div className="relative flex h-full flex-col items-center justify-center px-6 pt-20 text-center">
            <p
              data-hero-extra
              className="text-[10px] uppercase tracking-[0.5em] text-[#b08a4f]"
            >
              Premium well-aging clinic
            </p>

            {/* Ancla estática del lockup; el inner se transforma al scroll */}
            <div ref={anchorRef} className="mt-6">
              <div
                ref={lockupRef}
                style={{ "--lw": "min(76vw, 640px)" } as React.CSSProperties}
              >
                <h1>
                  <LogoWordmark className="h-auto w-[var(--lw)] text-zinc-900" />
                  <span className="sr-only">OMIYA</span>
                </h1>
                <div
                  ref={clinicRef}
                  style={{
                    opacity: 0,
                    width: "calc(var(--lw) * 0.8302)",
                    marginLeft: "calc(var(--lw) * 0.1348)",
                    marginTop: "calc(var(--lw) * 0.0562)",
                  }}
                >
                  <LogoClinic className="h-auto w-full text-zinc-900" />
                </div>
              </div>
            </div>

            <div data-hero-extra>
              <p className="mt-6 font-serif text-xl font-light tracking-wide text-zinc-600 sm:text-2xl">
                Tratamientos personalizados
              </p>

              <Link
                href="/tratamientos"
                className="btn-luxe mt-12 inline-block px-10 py-4 text-xs text-zinc-900"
                style={
                  {
                    "--luxe-fill": "#18181b",
                    "--luxe-fill-text": "#ffffff",
                  } as React.CSSProperties
                }
              >
                Explora nuestros tratamientos
              </Link>
            </div>

            <div
              data-hero-extra
              className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-zinc-500"
            >
              <span className="text-[10px] uppercase tracking-[0.3em]">
                Scroll para descubrir
              </span>
              <span aria-hidden="true" className="animate-bounce text-lg">
                ↓
              </span>
            </div>
          </div>
        </div>
      </div>

      </div>

      {/* Flujo natural después del stage */}
      {children}
    </div>
  );
}
