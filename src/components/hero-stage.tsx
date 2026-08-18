"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { LogoWordmark } from "@/components/logo-wordmark";
import { LogoClinic } from "@/components/logo-clinic";
import { DisplayHeading } from "@/components/display-heading";

/**
 * Transición de máscara estilo sensei.tech: la foto del hero (rama de
 * momiji sobre muro crema) se recorta y el lockup OMIYA/CLINIC viaja
 * achicándose hasta la columna izquierda de un layout de 2 columnas, con el
 * texto well-aging a la derecha. El lockup final queda pinned y las
 * secciones lo cubren al seguir scrolleando; subiendo, todo se revierte.
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
    const photos = Array.from(
      heroLayer.querySelectorAll<HTMLImageElement>("img"),
    );
    const scrims = Array.from(
      heroLayer.querySelectorAll<HTMLElement>("[data-hero-scrim]"),
    );

    let raf = 0;
    let ticking = false;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

    const apply = () => {
      ticking = false;
      const vh = window.innerHeight;
      const p = clamp01(window.scrollY / vh);
      const e = easeInOutCubic(p);

      // Caja destino (columna izquierda del layout final). El inset se mide
      // contra la propia capa hero: tras des-pinnearse el stage, sus
      // coordenadas ya no coinciden con el viewport.
      const rT = target.getBoundingClientRect();
      const hl = heroLayer.getBoundingClientRect();
      const top = (rT.top - hl.top) * e;
      const left = (rT.left - hl.left) * e;
      const right = (hl.right - rT.right) * e;
      const bottom = (hl.bottom - rT.bottom) * e;
      heroLayer.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px)`;

      // El lockup viaja del centro del hero al centro de la caja destino,
      // achicándose para ocupar ~72% del ancho de la caja.
      const rA = anchor.getBoundingClientRect();
      const sTarget = (rT.width * 0.72) / rA.width;
      const s = 1 + (sTarget - 1) * e;
      const tx = (rT.left + rT.width / 2 - (rA.left + rA.width / 2)) * e;
      const ty = (rT.top + rT.height / 2 - (rA.top + rA.height / 2)) * e;
      lockup.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;

      // El lockup nace blanco sobre la foto y termina en el dorado de marca.
      // El fondo que revela la máscara es negro, continuo con el velo oscuro
      // del hero para que la transición no salte de color.
      const cb = clamp01((p - 0.55) / 0.4);
      const lerp = (a: number, b: number) => Math.round(a + (b - a) * cb);
      lockup.style.color = `rgb(${lerp(255, 164)}, ${lerp(255, 136)}, ${lerp(255, 79)})`;
      // En reposo el lockup no existe: la marca la pone el letrero de bronce
      // de la foto. Entra apenas arranca el scroll, relevando al titular en el
      // mismo punto, y queda completo al 22% — de ahí en adelante se ve todo
      // el viaje hasta la caja destino, que es el corazón de la transición.
      lockup.style.opacity = String(clamp01((p - 0.1) / 0.12));
      // La foto se desvanece al aterrizar: el lockup queda limpio sobre el
      // blanco de la sección, sin recorte de foto detrás.
      for (const ph of photos) ph.style.opacity = String(1 - cb);
      for (const sc of scrims) sc.style.opacity = String(1 - cb);

      // El titular y los textos del hero se van rápido: el lockup tiene que
      // tomar la posta temprano para que su recorrido se vea casi completo.
      const fade = String(clamp01(1 - p / 0.14));
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
      {/* Rango del sticky: 100vh de máscara + ~120vh de pausa; ese remanente
          es lo que deja ver el panel "Nuestro enfoque" ya aterrizado antes de
          que la siguiente sección lo cubra. Después el bloque completo
          scrollea natural como cualquier sección. */}
      <div className="h-[220svh] bg-zinc-900">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-zinc-900">
        {/* Capa intro (detrás del hero): layout final de 2 columnas */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto grid w-full max-w-6xl translate-y-[5vh] grid-cols-1 items-center gap-10 px-6 pt-24 lg:grid-cols-2 lg:gap-16 lg:pt-0">
            {/* Caja destino del lockup (la máscara aterriza aquí) */}
            <div
              ref={targetRef}
              className="mx-auto aspect-[9/5] w-full max-w-[300px] sm:max-w-[420px] lg:mx-0 lg:max-w-[480px]"
            />
            <div
              ref={introTextRef}
              className="text-center lg:text-left"
              style={{ opacity: 0 }}
            >
              <p className="text-[10px] uppercase tracking-[0.5em] text-white/70">
                Nuestro enfoque
              </p>
              <h2 className="mt-6 font-serif text-2xl font-light leading-[1.35] text-white sm:text-3xl lg:text-[2.1rem]">
                Buscamos crear un espacio donde el bienestar se construye de
                manera consciente, personalizada y sostenible en cada etapa de
                la vida.
              </h2>
              <Link
                href="/tratamientos"
                className="btn-underline mt-10 inline-block text-xs text-[#a4884f]"
              >
                Explora nuestros tratamientos
              </Link>
            </div>
          </div>
        </div>

        {/* Capa hero: se enmascara hacia la caja destino */}
        <div
          ref={heroLayerRef}
          className="absolute inset-0 z-20 overflow-hidden bg-zinc-900"
        >
          {/* Recepción de la clínica: base fotográfica de Claudia Ferrer
              (_DSC4822) reinterpretada con IA para vestir el arce, que en la
              toma real está pelado. Se usa el cuadro completo a lo ancho —
              entra el logo de bronce del muro, que convive con el lockup
              porque van a escalas distintas y separados. Vertical dedicado en
              mobile; <picture> nativo para cargar solo el crop visible por
              media query (evita precargar ambos) y no disparar el warning de
              next/image sobre el crop oculto. */}
          <picture>
            <source
              media="(min-width: 640px)"
              srcSet="/momiji/hero-recepcion-v4.webp"
            />
            <img
              src="/momiji/hero-recepcion-v4-mobile.webp"
              alt=""
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full select-none object-cover object-center"
            />
          </picture>

          {/* Velo parejo sobre la foto: es lo que hace legible el texto blanco.
              A diferencia del radial anterior, no mancha una zona — oscurece
              todo por igual y refuerza abajo, que es donde vive el texto. */}
          <div
            data-hero-scrim
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 bg-zinc-900/25"
          />
          <div
            data-hero-scrim
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-zinc-900/60 via-zinc-900/15 to-transparent"
          />

          <div
            className="hero-intro relative z-20 flex h-full w-full flex-col items-start justify-end px-6 pb-[18vh] text-left sm:pb-[38vh] sm:px-8 lg:px-12"
            style={{ "--lw": "min(76vw, 560px)" } as React.CSSProperties}
          >
            <p
              data-hero-extra
              className="text-[10px] uppercase tracking-[0.28em] text-white/75 sm:text-[11px] sm:tracking-[0.4em]"
            >
              Premium well-aging clinic
            </p>

            {/* El titular manda el alto del bloque; el lockup se superpone
                centrado sobre él y solo aparece al scrollear. El ancla
                conserva su ancho (--lw) porque de ahí sale la escala de la
                transición. */}
            <div className="relative mt-3" data-hero-extra>
              <DisplayHeading
                as="h1"
                lines={["El arte de", "envejecer mejor."]}
                dimFrom={2}
                immediate
                className="display-xl display-noblur whitespace-nowrap text-white"
              />
            </div>
            <div
              ref={anchorRef}
              className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 sm:left-8 lg:left-12"
            >
              <div
                ref={lockupRef}
                style={{ color: "#ffffff", opacity: 0 }}
              >
                <div aria-hidden="true">
                  <LogoWordmark className="h-auto w-[var(--lw)]" />
                </div>
                <div
                  ref={clinicRef}
                  style={{
                    opacity: 0,
                    width: "calc(var(--lw) * 0.8302)",
                    marginLeft: "calc(var(--lw) * 0.1348)",
                    marginTop: "calc(var(--lw) * 0.0562)",
                  }}
                >
                  <LogoClinic className="h-auto w-full" />
                </div>
              </div>
            </div>

            <div
              data-hero-extra
              className="absolute bottom-[7vh] left-6 flex items-center gap-4 text-white/70 sm:bottom-10 sm:left-8 sm:gap-5 lg:left-12"
            >
              <span aria-hidden="true" className="h-px w-14 bg-white/40" />
              <span className="text-[10px] uppercase tracking-[0.35em]">
                Scroll para explorar
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
