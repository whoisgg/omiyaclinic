import Link from "next/link";
import Image from "next/image";
import { BOOKING_URL } from "@/lib/links";
import { HeroStage } from "@/components/hero-stage";
import { HomeTreatmentsGallery } from "@/components/home-treatments-gallery";
import { Reveal } from "@/components/reveal";

const COMPROMISO = [
  {
    title: "Resultados naturales",
    desc: "Buscamos armonizar, no transformar.",
  },
  {
    title: "Progresión gradual",
    desc: "Cambios que evolucionan contigo.",
  },
  {
    title: "Acompañamiento médico",
    desc: "Seguimiento antes, durante y después.",
  },
  {
    title: "Protocolos personalizados",
    desc: "Adaptados a tus necesidades y objetivos.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO + INTRO — máscara hacia el logo; el resto cubre al scrollear */}
      <HeroStage>

      {/* TRATAMIENTOS — galería editorial con parallax */}
      <HomeTreatmentsGallery />

      {/* NUESTRO COMPROMISO */}
      <section id="compromiso" className="scroll-mt-20 bg-zinc-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#c2a25f]">
              Nuestro compromiso
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-3xl font-light leading-tight text-white sm:text-4xl">
              Cada tratamiento está guiado por los mismos principios.
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {COMPROMISO.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 80}
                className="border-t border-white/15 pt-6"
              >
                <h3 className="font-serif text-lg italic leading-snug text-zinc-100">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {c.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FUNDADORA — wireframe placeholder */}
      <section className="bg-white">
        <div className="founder-card mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:grid-cols-2 sm:items-center">
          <div className="group founder-photo relative aspect-[4/5] overflow-hidden">
            <Image
              src="/founder-portrait.webp"
              alt="Dra. Antonieta Ortega, fundadora de Omiya Clinic"
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover object-top grayscale-[0.7] sepia-[0.1] brightness-[1.08] contrast-[0.95] transition-[transform,filter] duration-1000 group-hover:scale-105 group-hover:grayscale-0 group-hover:sepia-0 group-hover:brightness-100 group-hover:contrast-100"
            />
          </div>
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#b08a4f]">
              Dra. Antonieta Ortega · Fundadora, Omiya Clinic
            </p>
            <blockquote className="mt-6 font-serif text-2xl font-light leading-snug text-zinc-900 sm:text-3xl">
              &ldquo;La estética debe ayudarnos a sentirnos mejor con quienes
              somos, no a convertirnos en alguien diferente.&rdquo;
            </blockquote>
            <p className="mt-6 text-base leading-relaxed text-zinc-600">
              Creé Omiya con la convicción de que el cuidado estético puede
              acompañar el paso del tiempo sin alterar aquello que nos hace
              únicos. Cada decisión dentro de la clínica busca reflejar esa
              filosofía: priorizar la armonía, la autenticidad y el bienestar
              por sobre las tendencias o los cambios excesivos.
            </p>
            <Link
              href="/acerca"
              className="btn-underline mt-8 inline-block text-xs text-[#b08a4f]"
            >
              Ver más
            </Link>
          </Reveal>
        </div>
      </section>

      {/* TU EXPERIENCIA — imagen del box con fade hacia el crema */}
      <section className="relative overflow-hidden border-t border-zinc-200 bg-[#faf6ec]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[62%]"
        >
          <Image
            src="/box-omiya-2.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="object-cover object-center"
          />
          {/* Fade horizontal hacia la columna de texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf6ec] via-[#faf6ec]/90 to-[#faf6ec]/30 lg:via-[#faf6ec]/40 lg:to-transparent" />
          {/* Fade vertical suave para fundir con las secciones vecinas */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf6ec]/40 via-transparent to-[#faf6ec]/40" />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-6 py-20 lg:min-h-[680px] lg:px-10 lg:py-28">
          <Reveal className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.4em] text-[#b08a4f]">
              Tu experiencia en Omiya
            </p>
            <h2 className="mt-6 font-serif text-4xl font-light leading-[1.1] text-zinc-900 sm:text-5xl">
              Lo más importante es comprender qué necesita tu piel hoy.
            </h2>
            <div className="mt-8 h-px w-16 bg-[#b08a4f]" />
            <p className="mt-8 max-w-md text-base leading-relaxed text-zinc-700">
              Cada tratamiento comienza con una evaluación personalizada que nos
              permite comprender tu piel, tus objetivos y la etapa en la que te
              encuentras.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxe mt-10 inline-block px-8 py-4 text-xs text-[#b08a4f]"
              style={
                {
                  "--luxe-fill": "#b08a4f",
                  "--luxe-fill-text": "#ffffff",
                } as React.CSSProperties
              }
            >
              Agenda tu evaluación
            </a>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-900 text-white">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:py-24">
          <Reveal>
            <h2 className="font-serif text-3xl font-light leading-tight text-white sm:text-4xl">
              Cada piel tiene una historia diferente.
            </h2>
            <div className="mx-auto mt-6 h-px w-16 bg-[#b08a4f]" />
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-8 text-lg font-light text-zinc-300">
              Tu bienestar comienza aquí.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxe mt-10 inline-block px-10 py-4 text-xs text-white"
              style={
                {
                  "--luxe-fill": "#ffffff",
                  "--luxe-fill-text": "#18181b",
                } as React.CSSProperties
              }
            >
              Agendar consulta
            </a>
          </Reveal>
        </div>
      </section>
      </HeroStage>
    </>
  );
}
