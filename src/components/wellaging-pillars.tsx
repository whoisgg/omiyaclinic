"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pilares del Well Aging — versión silent luxury.
 * Una sola vista (sin pin ni scroll largo): cinco columnas en zigzag (W),
 * hairlines en vez de cajas, numerales dorados y una entrada suave única
 * cuando la sección aparece.
 */

const romanNumerals = ["I", "II", "III", "IV", "V"];

const pillars = [
  {
    title: "Conocimiento y Autoconciencia",
    description:
      "Comprender los cambios físicos, mentales y emocionales en cada etapa de la vida.",
  },
  {
    title: "Salud Mental y Autoestima",
    description: "Fortalecer la confianza y el amor propio a lo largo del tiempo.",
  },
  {
    title: "Bienestar Integral",
    description: "Promover hábitos saludables, cuidado físico y balance emocional.",
  },
  {
    title: "Conexión y Comunidad",
    description:
      "Fomentar relaciones significativas y un sentido de pertenencia que nutra la vida cotidiana.",
  },
  {
    title: "Cuidado Personal y Belleza Consciente",
    description:
      "Prevención y tratamientos estéticos mínimamente invasivos, respetando la naturalidad.",
  },
];

// Vertical offsets (lg+) que dibujan la W: alto, bajo, medio, bajo, alto.
const offsets = ["lg:mt-0", "lg:mt-16", "lg:mt-6", "lg:mt-16", "lg:mt-0"];

export function WellagingPillars() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = sectionRef.current.querySelectorAll("[data-pillar]");
    gsap.set(items, { opacity: 0, y: 24 });

    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#b08a4f]">
            Nuestra mirada
          </p>
          <h2 className="mt-4 text-3xl font-light tracking-tight text-zinc-900 sm:text-4xl">
            Pilares del Well Aging
          </h2>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5">
          {pillars.map((pillar, index) => (
            <li
              key={pillar.title}
              data-pillar
              className={`border-t border-zinc-200 pt-6 ${offsets[index]}`}
            >
              <span className="text-sm tracking-[0.2em] text-[#b08a4f]">
                {romanNumerals[index]}
              </span>
              <h3 className="mt-4 text-lg font-light leading-snug tracking-tight text-zinc-900">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                {pillar.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
