"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * Galería editorial de tratamientos del home: grilla escalonada de 12
 * columnas con parallax vertical por imagen (velocidades distintas), al
 * estilo de la galería del sitio anterior — en mobile se apila vertical.
 * El parallax es relativo al centro del viewport, con la imagen levemente
 * escalada para que el desplazamiento no muestre bordes.
 */

const ITEMS = [
  {
    cat: "glow",
    name: "Omiya Glow",
    tagline: "Calidad y luminosidad de la piel",
    img: "/treatments/limpieza-facial.webp",
    wrap: "md:col-span-7",
    aspect: "aspect-square",
    speed: 0.07,
  },
  {
    cat: "smooth",
    name: "Omiya Smooth",
    tagline: "Arrugas y líneas de expresión",
    img: "/treatments/rellenos-acido-hialuronico-v2.webp",
    wrap: "md:col-span-4 md:col-start-9 md:mt-48",
    aspect: "aspect-[3/4]",
    speed: 0.11,
  },
  {
    cat: "lift",
    name: "Omiya Lift",
    tagline: "Firmeza y soporte facial",
    img: "/treatments/cat-lift-v2.webp",
    wrap: "md:col-span-6 md:mt-32",
    aspect: "aspect-video",
    speed: 0.15,
  },
  {
    cat: "smile",
    name: "Omiya Smile",
    tagline: "Salud y estética dental",
    img: "/treatments/blanqueamiento-dental.webp",
    wrap: "md:col-span-5 md:col-start-8 md:-mt-24",
    aspect: "aspect-[4/5]",
    speed: 0.07,
  },
];

export function HomeTreatmentsGallery() {
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    let ticking = false;

    const apply = () => {
      ticking = false;
      const mid = window.innerHeight / 2;
      imgRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = r.top + r.height / 2 - mid;
        el.style.transform = `translateY(${-d * ITEMS[i].speed}px) scale(1.14)`;
      });
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
    <section className="overflow-hidden border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        {/* Header editorial */}
        <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-baseline">
          <div className="max-w-xl">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#a4884f]">
              Tratamientos
            </p>
            <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-zinc-900 sm:text-4xl">
              Curaduría de Bienestar Personalizado
            </h2>
          </div>
          <p className="max-w-[220px] font-serif text-sm italic leading-relaxed text-zinc-500">
            Resultados invisibles, sensaciones tangibles.
          </p>
        </div>

        {/* Grilla escalonada con parallax */}
        <div className="grid grid-cols-1 gap-y-20 md:grid-cols-12 md:gap-x-8 md:gap-y-0">
          {ITEMS.map((item, i) => (
            <Link
              key={item.cat}
              href={`/tratamientos?cat=${item.cat}`}
              className={`group block ${item.wrap}`}
            >
              <div className={`relative overflow-hidden ${item.aspect}`}>
                <div
                  ref={(el) => {
                    imgRefs.current[i] = el;
                  }}
                  className="absolute inset-0 will-change-transform"
                >
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="object-cover grayscale-[0.7] transition-[transform,filter] duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
              </div>
              <div className="mt-7 flex items-end justify-between border-b border-zinc-200 pb-4">
                <div>
                  <h3 className="font-serif text-xl italic text-zinc-900">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-[10px] uppercase tracking-widest text-zinc-500">
                    {item.tagline}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="text-lg text-zinc-900 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
