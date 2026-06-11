"use client";

import { useEffect, useRef } from "react";

/**
 * Fade-in de la sección intro ligado a la salida del hero: a medida que
 * el viewport deja el landing (mismo progreso que la ráfaga de pétalos),
 * el contenido aparece con opacidad y un leve ascenso. Pasado el hero
 * queda fijo en opacidad 1.
 */
export function IntroReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let ticking = false;

    const apply = () => {
      const p = Math.min(
        1,
        Math.max(0, window.scrollY / (window.innerHeight * 0.85)),
      );
      el.style.opacity = String(p);
      el.style.transform = `translateY(${(1 - p) * 32}px)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = window.requestAnimationFrame(apply);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    apply();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
