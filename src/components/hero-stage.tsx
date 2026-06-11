"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { PetalsOverlay } from "@/components/petals-overlay";
import { BOOKING_URL } from "@/lib/links";

/**
 * Transición de máscara estilo sensei.tech: el lienzo del hero (crema +
 * pétalos, nuestro "video" de fondo) se recorta con clip-path hasta quedar
 * enmarcando el wordmark OMIYA — el logo no se transforma, la máscara
 * termina en él, con los pétalos aún vivos dentro del marco. Debajo
 * aparece "CLINIC" y sube el texto well-aging sobre fondo blanco.
 *
 * Wrapper de 200vh con stage sticky de 100vh; progreso = scrollY/100vh.
 * Scroll natural, sin snap ni hijack.
 */
export function HeroStage() {
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const clinicRef = useRef<HTMLParagraphElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroLayer = heroLayerRef.current;
    const title = titleRef.current;
    const intro = introRef.current;
    const clinic = clinicRef.current;
    const introText = introTextRef.current;
    if (!heroLayer || !title || !intro || !clinic || !introText) return;

    const extras = Array.from(
      document.querySelectorAll<HTMLElement>("[data-hero-extra]"),
    );

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

      // Rect destino: el wordmark OMIYA con un margen de aire.
      const r = title.getBoundingClientRect();
      const padX = 36;
      const padY = 22;
      const top = Math.max(0, r.top - padY) * e;
      const left = Math.max(0, r.left - padX) * e;
      const right = Math.max(0, vw - r.right - padX) * e;
      const bottom = Math.max(0, vh - r.bottom - padY) * e;
      heroLayer.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px)`;

      // Eyebrow, tagline, botón y hint se desvanecen temprano.
      const fade = String(clamp01(1 - p / 0.35));
      for (const el of extras) el.style.opacity = fade;

      // Contenido intro anclado bajo el wordmark.
      intro.style.top = `${r.bottom + padY + 28}px`;

      // "CLINIC" aparece primero, luego sube el texto well-aging.
      const cm = clamp01((p - 0.55) / 0.3);
      clinic.style.opacity = String(cm);
      const ti = clamp01((p - 0.65) / 0.35);
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
    <div className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        {/* Capa intro (detrás del hero): CLINIC + texto well-aging */}
        <div
          ref={introRef}
          className="absolute inset-x-0 z-10 flex flex-col items-center px-6 text-center"
        >
          <p
            ref={clinicRef}
            className="text-sm uppercase tracking-[0.6em] text-zinc-900"
            style={{ opacity: 0 }}
          >
            Clinic
          </p>
          <div ref={introTextRef} className="max-w-3xl" style={{ opacity: 0 }}>
            <h2 className="mt-12 font-serif text-2xl font-light leading-tight text-zinc-900 sm:text-3xl">
              El well-aging en Omiya Clinic.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-zinc-600">
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

        {/* Capa hero: se enmascara hasta enmarcar el wordmark */}
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
            <h1
              ref={titleRef}
              className="mt-6 font-serif text-7xl font-light tracking-[0.18em] text-zinc-900 sm:text-8xl lg:text-9xl"
            >
              OMIYA
            </h1>
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
  );
}
