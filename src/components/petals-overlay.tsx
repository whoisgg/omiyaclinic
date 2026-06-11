"use client";

import { useEffect, useRef } from "react";

/**
 * Pétalos de cerezo a la deriva sobre el hero. Canvas 2D liviano
 * (~40 partículas), adaptado del sistema "Sakura Wind" de Stitch:
 * caen con brisa hacia la derecha, rotan y se voltean suavemente.
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
        this.speedX = Math.random() * 2 + 1;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 1.5;
        this.flip = Math.random();
        this.flipSpeed = Math.random() * 0.03;
        this.color = Math.random() > 0.5 ? COLOR_A : COLOR_B;
      }

      update() {
        this.x += this.speedX + Math.sin(this.d) * 0.5;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.flip += this.flipSpeed;
        this.d += 0.01;
        if (this.y > height || this.x > width) {
          this.init();
          this.x = Math.random() * width - 100;
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

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of petals) p.draw(ctx);
    };

    const animate = () => {
      for (const p of petals) p.update();
      drawFrame();
      raf = window.requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    raf = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
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
