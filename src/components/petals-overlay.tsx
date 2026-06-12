"use client";

import { useEffect, useRef } from "react";

/**
 * Pétalos de cerezo a la deriva sobre el hero. Canvas 2D liviano
 * (~40 partículas), brisa suave constante hacia la derecha: caen, rotan
 * y se voltean lentamente.
 */

const PETAL_COUNT = 40;
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
    // Congelados mientras corre la máscara del hero; se reactivan al
    // volver al landing (scroll arriba).
    let paused = false;

    const updatePaused = () => {
      paused = window.scrollY > window.innerHeight * 0.04;
    };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = canvas.width = rect?.width ?? window.innerWidth;
      height = canvas.height = rect?.height ?? window.innerHeight;
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

      constructor(scatter = false) {
        this.init(scatter);
      }

      init(scatter = false) {
        this.x = Math.random() * width;
        this.y = scatter ? Math.random() * height : -20;
        this.r = Math.random() * 8 + 4;
        this.d = Math.random() * PETAL_COUNT;
        this.speedX = Math.random() * 1 + 0.5;
        this.speedY = Math.random() * 0.8 + 0.3;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 0.8;
        this.flip = Math.random();
        this.flipSpeed = Math.random() * 0.015;
        this.color = Math.random() > 0.5 ? COLOR_A : COLOR_B;
      }

      update() {
        this.x += this.speedX + Math.sin(this.d) * 0.3;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.flip += this.flipSpeed;
        this.d += 0.01;
        if (this.y > height || this.x > width) {
          this.init();
          if (Math.random() < 0.4) {
            // Reentra desde arriba.
            this.x = Math.random() * width - 100;
          } else {
            // Reentra desde la izquierda a altura aleatoria: en pantallas
            // angostas los pétalos salen por la derecha antes de bajar, y
            // sin esto se concentran solo en la parte superior.
            this.x = -20;
            this.y = Math.random() * height;
          }
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
    const petals = Array.from({ length: PETAL_COUNT }, () => new Petal(true));

    const animate = () => {
      if (!paused) {
        ctx.clearRect(0, 0, width, height);
        for (const p of petals) {
          p.update();
          p.draw(ctx);
        }
      }
      raf = window.requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updatePaused, { passive: true });
    updatePaused();
    raf = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updatePaused);
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
