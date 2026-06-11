"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pilares del Well Aging — sección replicada del sitio anterior
 * (whoisgg/v0-website-replication, summer-pillars.tsx), adaptada a la
 * paleta de Omiya. Desktop: contenedor sticky con cards asimétricas que
 * entran escalonadas con el scroll. Mobile: cards apiladas.
 */

const romanNumerals = ["I", "II", "III", "IV", "V"];

const pillars = [
  {
    id: 1,
    title: "Conocimiento y Autoconciencia",
    description:
      "Comprender los cambios físicos, mentales y emocionales en cada etapa de la vida.",
    size: "medium",
  },
  {
    id: 2,
    title: "Salud Mental y Autoestima",
    description: "Fortalecer la confianza y el amor propio a lo largo del tiempo.",
    size: "medium",
  },
  {
    id: 3,
    title: "Bienestar Integral",
    description: "Promover hábitos saludables, cuidado físico y balance emocional.",
    size: "large",
  },
  {
    id: 4,
    title: "Conexión y Comunidad",
    description:
      "Fomentar relaciones significativas y un sentido de pertenencia que nutra la vida cotidiana.",
    size: "medium",
  },
  {
    id: 5,
    title: "Cuidado Personal y Belleza Consciente",
    description:
      "Prevención y tratamientos estéticos mínimamente invasivos, respetando la naturalidad.",
    size: "large",
  },
];

// Asymmetrical card positions; tuned to avoid overlap at all breakpoints.
const cardPositions: Array<{
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}> = [
  { top: "28%", left: "3%" },
  { top: "13%", right: "3%" },
  { top: "42%", left: "32%" },
  { top: "58%", right: "4%" },
  { bottom: "4%", left: "4%" },
];

const entryDirections = [
  { x: -100, y: -50 },
  { x: 100, y: -50 },
  { x: 0, y: 80 },
  { x: 100, y: 0 },
  { x: -100, y: 50 },
];

export function WellagingPillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || !sectionRef.current) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    cards.forEach((card, index) => {
      const dir = entryDirections[index];
      gsap.set(card, { opacity: 0, x: dir.x, y: dir.y });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    cards.forEach((card, index) => {
      tl.to(
        card,
        { opacity: 1, x: 0, y: 0, duration: 0.2, ease: "power2.out" },
        index * 0.15,
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile]);

  // Mobile — stacked cards
  if (isMobile) {
    return (
      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <p className="text-center text-xs uppercase tracking-[0.4em] text-[#b08a4f]">
          Pilares del Well Aging
        </p>
        <div className="mt-10 space-y-6">
          {pillars.map((pillar, index) => (
            <div key={pillar.id} className="bg-zinc-50 p-6">
              <span className="block text-3xl font-light leading-none text-zinc-300">
                {romanNumerals[index]}
              </span>
              <h3 className="mt-3 text-lg font-medium leading-tight text-zinc-900">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop — sticky container with scroll-staggered asymmetrical cards
  return (
    <section
      ref={sectionRef}
      className="relative z-10 border-b border-zinc-200 bg-white"
      style={{ height: "350vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute left-6 top-24 z-10 lg:left-12">
          <p className="text-xs uppercase tracking-[0.4em] text-[#b08a4f]">
            Nuestra mirada
          </p>
          <h2 className="mt-3 text-3xl font-light tracking-tight text-zinc-900 lg:text-5xl">
            Pilares del Well Aging
          </h2>
        </div>

        {pillars.map((pillar, index) => {
          const pos = cardPositions[index];
          const isLarge = pillar.size === "large";
          const widthClass =
            index === 2
              ? "w-[320px] lg:w-[400px] xl:w-[520px] 2xl:w-[580px]"
              : index === 4
                ? "w-[300px] lg:w-[380px] xl:w-[480px] 2xl:w-[520px]"
                : "w-[260px] lg:w-[320px] xl:w-[420px] 2xl:w-[460px]";

          return (
            <div
              key={pillar.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`absolute bg-zinc-50 p-6 lg:p-8 xl:p-10 2xl:p-12 ${widthClass}`}
              style={{
                top: pos.top,
                left: pos.left,
                right: pos.right,
                bottom: pos.bottom,
              }}
            >
              <div className="flex gap-4 lg:gap-6 xl:gap-8">
                <div className="flex-shrink-0">
                  <span
                    className={`font-light leading-none text-zinc-200 ${
                      isLarge
                        ? "text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
                        : "text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
                    }`}
                  >
                    {romanNumerals[index]}
                  </span>
                </div>
                <div className="flex-1 pt-1 lg:pt-2 xl:pt-3">
                  <h3
                    className={`font-medium leading-tight text-zinc-900 ${
                      isLarge
                        ? "text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
                        : "text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                    }`}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className={`mt-2 leading-relaxed text-zinc-500 lg:mt-3 ${
                      isLarge
                        ? "text-sm lg:text-base xl:text-lg"
                        : "text-xs lg:text-sm xl:text-base"
                    }`}
                  >
                    {pillar.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
