"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";

/**
 * Sección de productos con scrubbing de frames (portada del sitio anterior,
 * wireframe-section.tsx): canvas que dibuja la secuencia según el scroll
 * dentro de un contenedor sticky, PNG de alta calidad al final, y texto
 * que aparece a mitad de la animación. Estilizada a la paleta de Omiya.
 */

const FRAME_COUNT = 192;
const FINAL_FRAME_THRESHOLD = 180;
const TEXT_THRESHOLD = 100;

export function ProductsFramesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [showFinalFrame, setShowFinalFrame] = useState(false);

  // Preload frames
  useEffect(() => {
    let loadedImages = 0;
    const imgArray: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      const frameNumber = i.toString().padStart(3, "0");
      img.src = `/frames/frame_${frameNumber}_delay-0.041s.webp`;
      img.onload = () => {
        loadedImages++;
        if (loadedImages === FRAME_COUNT) {
          imagesRef.current = imgArray;
          setLoaded(true);
        }
      };
      imgArray.push(img);
    }
  }, []);

  // Scroll-driven drawing
  useEffect(() => {
    if (!loaded || !canvasRef.current || !sectionRef.current) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const updateImage = (index: number) => {
      const safeIndex = Math.min(Math.max(index, 0), FRAME_COUNT - 1);
      const img = imagesRef.current[safeIndex];
      if (!img) return;

      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let xOffset = 0;
      let yOffset = 0;

      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // Contain: la imagen completa, sin recorte
        if (canvasRatio > imgRatio) {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
          xOffset = (canvas.width - drawWidth) / 2;
        } else {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          yOffset = (canvas.height - drawHeight) / 2;
        }
      } else {
        // Cover: llena el viewport, recorta si hace falta
        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          yOffset = (canvas.height - drawHeight) / 2;
        } else {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
          xOffset = (canvas.width - drawWidth) / 2;
        }
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, xOffset, yOffset, drawWidth, drawHeight);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height =
        window.innerWidth < 768 ? window.innerHeight * 0.55 : window.innerHeight;
      updateImage(0);
    };

    let ticking = false;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollRange = section.offsetHeight + viewportHeight;

      if (rect.bottom < 0 || rect.top > viewportHeight) return;

      const scrollProgress = Math.max(
        0,
        Math.min(1, (viewportHeight - rect.top) / scrollRange),
      );
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(scrollProgress * FRAME_COUNT),
      );

      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateImage(frameIndex);
          setCurrentFrame(frameIndex);
          setShowFinalFrame(frameIndex >= FINAL_FRAME_THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", handleScroll, { passive: true });

    resizeCanvas();
    handleScroll();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loaded]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] bg-white md:h-[300vh]"
    >
      <div className="sticky top-0 h-[70vh] w-full overflow-hidden md:h-screen">
        {!loaded && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
            <span className="animate-pulse text-xs uppercase tracking-widest text-zinc-500">
              Cargando…
            </span>
          </div>
        )}

        {/* Canvas del scrubbing */}
        <canvas
          ref={canvasRef}
          className="absolute left-0 top-0 w-full transition-opacity duration-700 md:inset-0 md:h-full"
          style={{ opacity: loaded && !showFinalFrame ? 1 : 0 }}
        />

        {/* PNG de alta calidad para el frame final */}
        <div
          className="absolute left-0 top-0 flex h-[55vh] w-full items-center justify-center bg-white transition-opacity duration-500 md:h-full"
          style={{
            opacity: showFinalFrame ? 1 : 0,
            pointerEvents: showFinalFrame ? "auto" : "none",
          }}
        >
          <div className="relative h-full w-full md:h-[80%] md:w-[80%]">
            <NextImage
              src="/products-final-frame.png"
              alt="Productos certificados — Sculptra y Restylane"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Texto — aparece a mitad de la animación */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col items-center px-6 pb-8 transition-opacity duration-500 md:bottom-auto md:top-0 md:px-12 md:pb-0 md:pt-24 lg:px-20 ${
            currentFrame >= TEXT_THRESHOLD ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-xl text-left">
            <p className="text-xs uppercase tracking-[0.3em] text-[#b08a4f]">
              Productos
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium uppercase leading-tight text-zinc-900 lg:text-4xl xl:text-5xl">
              Elegimos calidad
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-600 lg:text-base">
              Trabajamos con productos certificados y cuidadosamente
              seleccionados, pensados para realzar tu belleza de forma natural.
            </p>
            <div className="pointer-events-auto mt-6">
              <Link
                href="/tratamientos"
                className="btn-underline inline-block text-xs text-[#b08a4f]"
              >
                Ver tratamientos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
