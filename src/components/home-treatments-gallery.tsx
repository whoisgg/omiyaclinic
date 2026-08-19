"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { DisplayHeading } from "@/components/display-heading";

/**
 * Galería editorial de tratamientos del home: grilla escalonada de 12
 * columnas con parallax vertical por imagen (velocidades distintas), al
 * estilo de la galería del sitio anterior — en mobile se apila vertical.
 * El parallax es relativo al centro del viewport, con la imagen levemente
 * escalada para que el desplazamiento no muestre bordes.
 */

const GOLD = "#b08a4f";

const ITEMS = [
  {
    cat: "glow",
    name: "Glow",
    tagline: "Calidad y luminosidad de la piel",
    img: "/treatments/limpieza-facial.webp",
    wrap: "md:col-span-7",
    aspect: "aspect-square",
    speed: 0.07,
  },
  {
    cat: "smooth",
    name: "Smooth",
    tagline: "Arrugas y líneas de expresión",
    img: "/treatments/smooth-menton.webp",
    wrap: "md:col-span-4 md:col-start-9 md:mt-48",
    aspect: "aspect-[3/4]",
    speed: 0.11,
  },
  {
    cat: "lift",
    name: "Lift",
    tagline: "Firmeza y soporte facial",
    img: "/treatments/cat-lift-v2.webp",
    wrap: "md:col-span-6 md:mt-32",
    aspect: "aspect-video",
    speed: 0.15,
  },
  {
    cat: "smile",
    name: "Smile",
    tagline: "Salud y estética dental",
    img: "/treatments/blanqueamiento-dental.webp",
    wrap: "md:col-span-5 md:col-start-8 md:mt-16 lg:mt-12",
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
    <section
      data-header-white
      className="relative overflow-hidden bg-white md:-mt-24 lg:-mt-40"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-8 lg:px-12 pb-24 pt-6 lg:pb-32 lg:pt-8">
        {/* Header editorial. Toma el lenguaje de la sección I —numeral romano,
            regla, y un rail vertical en japonés al costado— sin tocar la
            grilla de fotos, que se queda tal cual.
            Dos líneas por sección y no más: la regla bajo el numeral y la
            vertical bajo el kanji. */}
        <div className="relative mb-20 flex items-start justify-between gap-8 pt-20 lg:pt-24">
          <div className="max-w-2xl">
            <Reveal>
              {/* Sección II: el hero no lleva numeral y "Nuestro enfoque" es
                  la I. Va en la serif de marca porque en la sans los romanos
                  se leen como rayas. */}
              <p
                className="font-serif text-[17px] leading-none tracking-[0.12em] lg:text-[22px]"
                style={{ color: GOLD }}
              >
                II
              </p>
              <span
                aria-hidden="true"
                className="mt-4 block h-px w-9 lg:mt-5 lg:w-11"
                style={{ backgroundColor: GOLD }}
              />
            </Reveal>
            <Reveal delay={80}>
              <p
                className="mt-6 text-[10px] uppercase tracking-[0.5em]"
                style={{ color: GOLD }}
              >
                Tratamientos
              </p>
            </Reveal>
            <DisplayHeading
              lines={["Cada piel", "es distinta."]}
              className="mt-6 text-zinc-900"
            />
            <Reveal delay={400}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-zinc-600">
                Cada experiencia responde a necesidades específicas de tu piel y
                bienestar.
              </p>
            </Reveal>
          </div>

          {/* Rail vertical: el titular dicho en japonés, "cada piel es
              distinta". Ancho explícito y shrink-0 por el mismo motivo que en
              la sección I: en WebKit un elemento con writing-mode vertical no
              propaga su ancho al ítem flex y la columna colapsa sobre sus
              hermanas. El valor es font-size x line-height. */}
          {/* El margen superior no es decorativo: baja el rail hasta que el
              kanji arranca a la misma altura que "TRATAMIENTOS". Sale de sumar
              lo que hay encima del eyebrow —el numeral, su regla y los
              márgenes—, que da unos 58px en móvil y 67 en desktop. */}
          <Reveal delay={200} className="mr-4 mt-14 w-11 shrink-0 lg:mr-16 lg:mt-[4.2rem] lg:w-14">
            <div className="flex flex-col items-center gap-6">
              <span
                lang="ja"
                className="w-9 font-jp text-[19px] leading-[1.6] [writing-mode:vertical-rl] lg:w-11 lg:text-[24px]"
                style={{ color: GOLD }}
              >
                肌はそれぞれ違う
              </span>
              <span
                aria-hidden="true"
                className="h-32 w-px lg:h-40"
                style={{ backgroundColor: GOLD }}
              />
            </div>
          </Reveal>
        </div>

        {/* Grilla escalonada con parallax */}
        <div className="grid grid-cols-1 gap-y-14 md:grid-cols-12 md:gap-x-8 md:gap-y-0">
          {ITEMS.map((item, i) => (
            <Reveal key={item.cat} className={item.wrap}>
            <Link
              href={`/tratamientos?cat=${item.cat}`}
              className="group block"
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

              {/* Pie de la card: nombre y descripción, con una horizontal que
                  arranca donde termina el texto y llega hasta el borde de la
                  foto. No lleva vertical ni numeral a propósito: la vertical
                  que cierra la L ya está sobre la imagen, y con otra acá
                  serían tres líneas en una card. El `flex-1` de la raya la
                  hace calzar siempre con el ancho exacto de su imagen, que
                  cambia card a card. */}
              <div className="mt-5">
                <h3 className="font-serif text-[30px] font-light leading-none text-zinc-900 lg:text-[36px]">
                  {item.name}
                </h3>
                <div className="mt-2.5 flex items-center gap-5 lg:mt-3">
                  <p className="text-[10px] uppercase leading-[1.9] tracking-[0.18em] text-zinc-500 lg:text-[11px]">
                    {item.tagline}
                  </p>
                  <span
                    aria-hidden="true"
                    className="h-px min-w-8 flex-1"
                    style={{ backgroundColor: GOLD }}
                  />
                </div>
              </div>
            </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
