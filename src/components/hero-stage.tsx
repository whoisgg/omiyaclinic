"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { PetalsOverlay } from "@/components/petals-overlay";
import { LogoMark } from "@/components/logo-mark";
import { BOOKING_URL } from "@/lib/links";

/**
 * Transición de máscara estilo sensei.tech: el hero completo (crema +
 * pétalos, nuestro "video" de fondo) se recorta con clip-path hasta quedar
 * contenido en la cajita del logo de la sección intro, mientras el fondo
 * blanco y el texto well-aging aparecen alrededor. Los pétalos siguen
 * vivos dentro de la cajita al final.
 *
 * Estructura: wrapper de 200vh con un stage sticky de 100vh. El progreso
 * de la máscara es scrollY/100vh (scroll natural, sin hijack).
 */
export function HeroStage() {
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroLayer = heroLayerRef.current;
    const heroText = heroTextRef.current;
    const introText = introTextRef.current;
    const box = boxRef.current;
    const monogram = monogramRef.current;
    if (!heroLayer || !heroText || !introText || !box || !monogram) return;

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

      // Rect destino: interior de la cajita del logo (sin el borde).
      const r = box.getBoundingClientRect();
      const top = (r.top + 1.5) * e;
      const left = (r.left + 1.5) * e;
      const right = (vw - r.right + 1.5) * e;
      const bottom = (vh - r.bottom + 1.5) * e;
      heroLayer.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px)`;

      // El texto del hero se desvanece temprano para no quedar apretado.
      heroText.style.opacity = String(clamp01(1 - p / 0.4));

      // El texto de la intro sube y aparece en la segunda mitad.
      const ti = clamp01((p - 0.5) / 0.45);
      introText.style.opacity = String(ti * ti);
      introText.style.transform = `translateY(${(1 - ti) * 48}px)`;

      // Monograma dorado dentro de la cajita, sobre los pétalos, al final.
      const cm = clamp01((p - 0.8) / 0.2);
      monogram.style.opacity = String(cm);
      monogram.style.left = `${r.left + r.width / 2}px`;
      monogram.style.top = `${r.top + r.height / 2}px`;
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
    <div className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        {/* Capa intro (detrás del hero): cajita + texto well-aging */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div
              ref={boxRef}
              className="mx-auto h-16 w-16 border border-[#b08a4f]/40"
            />
            <div ref={introTextRef} style={{ opacity: 0 }}>
              <h2 className="mt-10 font-serif text-3xl font-light leading-tight text-zinc-900 sm:text-4xl">
                El well-aging en Omiya Clinic.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-zinc-600">
                Nuestro enfoque busca crear un espacio donde el bienestar se
                construye de manera consciente, personalizada y sostenible en
                cada etapa de la vida.
              </p>
              <Link
                href="/tratamientos"
                className="btn-underline mt-10 inline-block text-xs text-[#b08a4f]"
              >
                Explora nuestros tratamientos
              </Link>
            </div>
          </div>
        </div>

        {/* Capa hero (se enmascara hacia la cajita) */}
        <div
          ref={heroLayerRef}
          className="absolute inset-0 z-20 overflow-hidden bg-[#faf6ec]"
        >
          <PetalsOverlay />

          <div
            ref={heroTextRef}
            className="relative flex h-full flex-col items-center justify-center px-6 pt-20 text-center"
          >
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#b08a4f]">
              Premium well-aging clinic
            </p>
            <h1 className="mt-6 font-serif text-7xl font-light tracking-[0.18em] text-zinc-900 sm:text-8xl lg:text-9xl">
              OMIYA
            </h1>
            <p className="mt-6 font-serif text-xl font-light tracking-wide text-zinc-600 sm:text-2xl">
              Tratamientos personalizados
            </p>

            <Link
              href="/tratamientos"
              className="btn-luxe mt-12 px-10 py-4 text-xs text-zinc-900"
              style={
                {
                  "--luxe-fill": "#18181b",
                  "--luxe-fill-text": "#ffffff",
                } as React.CSSProperties
              }
            >
              Explora nuestros tratamientos
            </Link>

            <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-zinc-500">
              <span className="text-[10px] uppercase tracking-[0.3em]">
                Scroll para descubrir
              </span>
              <span aria-hidden="true" className="animate-bounce text-lg">
                ↓
              </span>
            </div>
          </div>

          {/* Monograma que aparece dentro de la cajita al final */}
          <div
            ref={monogramRef}
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
            style={{ opacity: 0 }}
          >
            <LogoMark className="h-7 w-auto text-[#b08a4f]" />
          </div>
        </div>

        {/* Agendar CTA del hero: el botón vive en el texto del hero */}
      </div>
    </div>
  );
}
