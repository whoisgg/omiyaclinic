"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * Sección de productos: composición por capas de la foto de estudio
 * (Sculptra + línea Restylane) que se ensambla con el scroll dentro de un
 * contenedor sticky. Reemplaza el antiguo scrubbing de 192 frames (9.3MB,
 * texto ilegible y artefactos de rotación) por 4 capas webp (~200KB) que
 * terminan exactamente en la foto limpia.
 *
 * Orden de entrada (de adelante hacia atrás) para que los cortes de
 * oclusión queden siempre cubiertos: fila oscura (frontal, silueta limpia),
 * luego fila blanca y Sculptra subiendo por detrás.
 */

type LayerDef = {
  src: string;
  z: number;
  start: number;
  end: number;
  /** Desplazamiento de entrada como % de la altura de la imagen. */
  offsetPct: number;
};

const LAYERS: LayerDef[] = [
  { src: "/products/bg.webp", z: 0, start: 0.0, end: 0.12, offsetPct: 0 },
  { src: "/products/white.webp", z: 10, start: 0.34, end: 0.6, offsetPct: 5.2 },
  { src: "/products/sculptra.webp", z: 20, start: 0.58, end: 0.8, offsetPct: 4.6 },
  { src: "/products/dark.webp", z: 30, start: 0.05, end: 0.32, offsetPct: 5.9 },
];

const TEXT_AT = 0.8;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function ProductsAssemblySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const apply = (progress: number) => {
      LAYERS.forEach((layer, i) => {
        const el = layerRefs.current[i];
        if (!el) return;
        const t = reduced
          ? 1
          : easeOutCubic(
              Math.max(
                0,
                Math.min(1, (progress - layer.start) / (layer.end - layer.start)),
              ),
            );
        el.style.opacity = String(t);
        el.style.transform =
          t >= 1 ? "" : `translateY(${(1 - t) * layer.offsetPct}%)`;
      });
      setShowText(reduced || progress >= TEXT_AT);
    };

    let ticking = false;
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewportHeight) return;

      const scrollRange = section.offsetHeight - viewportHeight;
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / Math.max(1, scrollRange)),
      );

      if (!ticking) {
        window.requestAnimationFrame(() => {
          apply(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    apply(0);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[220vh] bg-white">
      <div className="sticky top-0 flex h-[70vh] w-full items-center justify-center overflow-hidden md:h-screen">
        {/* Composición por capas */}
        <div className="relative h-full w-full">
          {LAYERS.map((layer, i) => (
            <div
              key={layer.src}
              ref={(el) => {
                layerRefs.current[i] = el;
              }}
              className="absolute inset-0"
              style={{ zIndex: layer.z, opacity: 0 }}
            >
              <Image
                src={layer.src}
                alt={
                  layer.src.includes("dark")
                    ? "Productos Restylane y Sculptra"
                    : ""
                }
                fill
                sizes="100vw"
                unoptimized
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Texto — aparece cuando la composición está armada */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-40 flex flex-col items-center px-6 pb-8 transition-opacity duration-500 md:bottom-auto md:top-0 md:px-12 md:pb-0 md:pt-24 lg:px-20 ${
            showText ? "opacity-100" : "opacity-0"
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
