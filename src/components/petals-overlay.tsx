"use client";

import { useEffect, useRef } from "react";

/**
 * Pétalos de cerezo a la deriva sobre el hero. Canvas 2D liviano,
 * adaptado del sistema "Sakura Wind" de Stitch: caen con brisa hacia la
 * derecha, rotan y se voltean suavemente.
 *
 * Al salir del landing (scroll snap hacia la siguiente sección) el viento
 * sopla más fuerte: los pétalos aceleran y entran más desde la izquierda,
 * como ráfaga de transición.
 */

const BASE_PETALS = 40;
const GUST_EXTRA_PETALS = 70;
const GUST_SPEED_BOOST = 5;
// Rosas empolvados con suficiente contraste sobre el crema #faf6ec del hero.
const COLOR_A = "rgba(228, 180, 188, 0.55)";
const COLOR_B = "rgba(206, 154, 166, 0.4)";

export function PetalsOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let gust = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = canvas.width = rect?.width ?? window.innerWidth;
      height = canvas.height = rect?.height ?? window.innerHeight;
    };

    // Fuerza de la ráfaga según cuánto del hero ya salió del viewport.
    const updateGust = () => {
      const heroH = canvas.parentElement?.offsetHeight ?? window.innerHeight;
      gust = Math.min(1, Math.max(0, window.scrollY / (heroH * 0.85)));
    };

    class Petal {
      x = 0;
      y = 0;
      r = 0;
      d = 0;
      speedX = 0;
      speedY = 0;
      rotation = 0;
      rotationSpeed = 0;
      flip = 0;
      flipSpeed = 0;
      color = COLOR_A;

      constructor(scatter = false, fromLeft = false) {
        this.init(scatter, fromLeft);
      }

      init(scatter = false, fromLeft = false) {
        if (fromLeft) {
          this.x = -20 - Math.random() * 120;
          this.y = Math.random() * height * 0.9;
        } else {
          this.x = Math.random() * width;
          this.y = scatter ? Math.random() * height : -20;
        }
        this.r = Math.random() * 8 + 4;
        this.d = Math.random() * BASE_PETALS;
        this.speedX = Math.random() * 1 + 0.5;
        this.speedY = Math.random() * 0.8 + 0.3;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 0.8;
        this.flip = Math.random();
        this.flipSpeed = Math.random() * 0.015;
        this.color = Math.random() > 0.5 ? COLOR_A : COLOR_B;
      }

      update() {
        const wind = 1 + gust * GUST_SPEED_BOOST;
        this.x += this.speedX * wind + Math.sin(this.d) * 0.3;
        this.y += this.speedY * (1 + gust * 1.5);
        this.rotation += this.rotationSpeed * (1 + gust * 3);
        this.flip += this.flipSpeed * (1 + gust * 2);
        this.d += 0.01;
        if (this.y > height || this.x > width) {
          // Con ráfaga, los reemplazos entran desde la izquierda (viento).
          this.init(false, gust > 0.1);
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate((this.rotation * Math.PI) / 180);
        c.scale(Math.cos(this.flip), 1);
        c.beginPath();
        c.moveTo(0, 0);
        c.bezierCurveTo(-this.r, this.r, this.r, this.r * 2, 0, this.r * 3);
        c.bezierCurveTo(-this.r, this.r * 2, -this.r * 2, this.r, 0, 0);
        c.fillStyle = this.color;
        c.fill();
        c.restore();
      }
    }

    resize();
    updateGust();
    const petals = Array.from(
      { length: BASE_PETALS },
      () => new Petal(true),
    );

    const animate = () => {
      // Población según la ráfaga: entran pétalos extra desde la izquierda
      // y se retiran de a poco cuando el viento calma.
      const target = BASE_PETALS + Math.round(gust * GUST_EXTRA_PETALS);
      while (petals.length < target) petals.push(new Petal(false, true));
      if (petals.length > target && Math.random() < 0.2) petals.pop();

      ctx.clearRect(0, 0, width, height);
      for (const p of petals) {
        p.update();
        p.draw(ctx);
      }
      raf = window.requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateGust, { passive: true });
    raf = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateGust);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
    />
  );
}
