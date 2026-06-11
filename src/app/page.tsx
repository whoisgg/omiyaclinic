import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, getFeaturedTreatments } from "@/lib/treatments";
import { BOOKING_URL } from "@/lib/links";
import { PetalsOverlay } from "@/components/petals-overlay";
import { IntroReveal } from "@/components/intro-reveal";
import { LogoMark } from "@/components/logo-mark";

export default async function HomePage() {
  const featured = await getFeaturedTreatments(3);

  return (
    <>
      {/* HERO pinned + INTRO que sube como lámina blanca encima (cover) */}
      <div className="relative">
      <section className="sticky top-0 z-0 h-screen overflow-hidden bg-[#faf6ec]">
        <PetalsOverlay />

        <div className="relative flex h-full flex-col items-center justify-center px-6 pt-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#b08a4f]">
            Premium well-aging clinic
          </p>
          <h1 className="mt-6 font-serif text-7xl font-light tracking-[0.18em] text-zinc-900 sm:text-8xl lg:text-9xl">
            OMIYA
          </h1>
          <p className="mt-6 font-serif text-xl font-light tracking-wide text-zinc-600 sm:text-2xl">
            Tratamientos personalizados
          </p>

          <Link
            href="/tratamientos"
            className="btn-luxe mt-12 px-10 py-4 text-xs text-zinc-900"
            style={
              {
                "--luxe-fill": "#18181b",
                "--luxe-fill-text": "#ffffff",
              } as React.CSSProperties
            }
          >
            Explora nuestros tratamientos
          </Link>
        </div>

        <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-zinc-500">
          <span className="text-[10px] uppercase tracking-[0.3em]">
            Scroll para descubrir
          </span>
          <span aria-hidden="true" className="animate-bounce text-lg">
            ↓
          </span>
        </div>
      </section>

      {/* CLINIC INTRO — sube con fondo blanco sobre el hero, logo al centro */}
      <section className="relative z-10 flex min-h-screen items-center bg-white">
        <IntroReveal>
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          {/* Cajita con el monograma, al estilo sensei.tech */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center border border-[#b08a4f]/40">
            <LogoMark className="h-7 w-auto text-[#b08a4f]" />
          </div>
          <h2 className="mt-10 font-serif text-3xl font-light leading-tight text-zinc-900 sm:text-4xl">
            El well-aging en Omiya Clinic.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-600">
            Nuestro enfoque busca crear un espacio donde el bienestar se
            construye de manera consciente, personalizada y sostenible en cada
            etapa de la vida.
          </p>
          <Link
            href="/tratamientos"
            className="btn-underline mt-10 inline-block text-xs text-[#b08a4f]"
          >
            Explora nuestros tratamientos
          </Link>
          </div>
        </IntroReveal>
      </section>
      </div>

      {/* CATEGORÍAS */}
      <section className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-500">
            Tratamientos
          </p>
          <ul className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200">
            {CATEGORIES.map((cat, idx) => (
              <li key={cat.id}>
                <Link
                  href={`/tratamientos?cat=${cat.id}`}
                  className="group flex items-center justify-between py-6 transition-colors hover:bg-zinc-50"
                >
                  <span className="w-12 text-xs text-zinc-400">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-2xl font-light tracking-tight text-zinc-900 sm:text-3xl">
                    {cat.label}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-zinc-500">
                    {cat.tagline}
                  </span>
                  <span className="ml-6 text-zinc-400 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#b08a4f]">
            Destacados
          </p>
          <h2 className="mt-4 text-2xl font-light text-zinc-900">
            Los más reservados.
          </h2>
          <ul className="mt-8 grid gap-px bg-zinc-200 sm:grid-cols-3">
            {featured.map((t) => (
              <li key={t.slug} className="bg-white">
                <Link
                  href={`/tratamientos/${t.slug}`}
                  className="block h-full p-6 transition-colors hover:bg-zinc-50"
                >
                  <p className="text-[10px] uppercase tracking-[0.4em] text-[#b08a4f]">
                    {t.category}
                  </p>
                  <h3 className="mt-3 text-lg font-medium text-zinc-900">
                    {t.name}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600">
                    {t.shortDescription}
                  </p>
                  {t.duration && (
                    <p className="mt-6 text-xs uppercase tracking-widest text-zinc-500">
                      {t.duration}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FUNDADORA — wireframe placeholder */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:grid-cols-2 sm:items-center">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/founder-portrait.webp"
              alt="Dra. Antonieta Ortega, fundadora de Omiya Clinic"
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#b08a4f]">
              Dra. Antonieta Ortega · Fundadora, Omiya Clinic
            </p>
            <blockquote className="mt-6 font-serif text-2xl font-light leading-snug text-zinc-900 sm:text-3xl">
              &ldquo;El verdadero cuidado comienza comprendiendo la historia de
              cada paciente.&rdquo;
            </blockquote>
            <p className="mt-6 text-base leading-relaxed text-zinc-600">
              Cada decisión clínica se basa en la armonía entre salud, calma y
              precisión, priorizando siempre lo natural por sobre la
              corrección. Nuestro enfoque busca crear un espacio donde el
              bienestar se construye de manera consciente, personalizada y
              sostenible en cada etapa de la vida.
            </p>
            <Link
              href="/acerca"
              className="btn-underline mt-8 inline-block text-xs text-[#b08a4f]"
            >
              Ver más
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="border-t border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[2fr_3fr] lg:gap-16 lg:py-28">
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#b08a4f]">
              Productos
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium uppercase leading-tight text-zinc-900 lg:text-4xl">
              Elegimos calidad
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-600 lg:text-base">
              Trabajamos con productos certificados y cuidadosamente
              seleccionados, pensados para realzar tu belleza de forma natural.
            </p>
            <Link
              href="/tratamientos"
              className="btn-underline mt-8 inline-block text-xs text-[#b08a4f]"
            >
              Ver tratamientos
            </Link>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src="/products/composicion.webp"
              alt="Productos Sculptra y Restylane de Galderma"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-900 text-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="text-2xl font-light">Tu bienestar comienza aquí.</p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxe mt-8 inline-block px-10 py-4 text-xs text-white/90"
            style={
              {
                "--luxe-fill": "#ffffff",
                "--luxe-fill-text": "#18181b",
              } as React.CSSProperties
            }
          >
            ↘ Agendar consulta
          </a>
        </div>
      </section>
    </>
  );
}
