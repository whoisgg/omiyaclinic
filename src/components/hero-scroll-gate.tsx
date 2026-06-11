"use client";

import { useEffect, useRef } from "react";

/**
 * Un gesto de rueda en el hero dispara la transición completa: tween suave
 * hasta la sección siguiente (~1.1s). Como la ráfaga de pétalos y el fade
 * de la intro van ligados a scrollY, se animan solos durante el viaje.
 * Rueda hacia arriba en el tope de la intro devuelve al hero. Touch y
 * scrollbar quedan con scroll natural.
 */
export function HeroScrollGate() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = ref.current?.parentElement;
    if (!hero) return;

    let animating = false;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

    const tween = (to: number, dur = 1100) => {
      animating = true;
      const from = window.scrollY;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        window.scrollTo(0, from + (to - from) * easeInOutCubic(t));
        if (t < 1) {
          window.requestAnimationFrame(step);
        } else {
          animating = false;
        }
      };
      window.requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      const heroH = hero.offsetHeight;
      const y = window.scrollY;

      if (animating) {
        // Transición en curso: ignorar más input de rueda.
        if (y < heroH + 80) e.preventDefault();
        return;
      }
      if (e.deltaY > 8 && y < heroH - 4) {
        // Dentro del hero, un tick hacia abajo = viaje completo a la intro.
        e.preventDefault();
        tween(heroH);
      } else if (e.deltaY < -8 && y > 4 && y <= heroH + 40) {
        // En el tope de la intro, un tick hacia arriba = volver al hero.
        e.preventDefault();
        tween(0);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return <div ref={ref} aria-hidden="true" className="hidden" />;
}
