import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, getFeaturedTreatments } from "@/lib/treatments";
import { BOOKING_URL } from "@/lib/links";
import { ProductsFramesSection } from "@/components/products-frames-section";

export default async function HomePage() {
  const featured = await getFeaturedTreatments(3);

  return (
    <>
      {/* HERO — full-bleed photo, serif wordmark, outlined CTA */}
      <section className="relative isolate min-h-screen overflow-hidden">
        <Image
          src="/hero-clinic.webp"
          alt="Recepción de Omiya Clinic"
          fill
          priority
          className="object-cover"
        />
        {/* Legibility overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/55" />

        <div className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#f3ede3]/80">
            Premium well-aging clinic
          </p>
          <h1 className="mt-6 font-serif text-7xl font-light tracking-[0.18em] text-[#f3ede3] sm:text-8xl lg:text-9xl">
            OMIYA
          </h1>
          <p className="mt-6 font-serif text-xl font-light tracking-wide text-[#f3ede3]/90 sm:text-2xl">
            Tratamientos personalizados
          </p>

          <Link
            href="/tratamientos"
            className="btn-luxe mt-12 px-10 py-4 text-xs text-[#f3ede3]"
            style={
              {
                "--luxe-fill": "#f3ede3",
                "--luxe-fill-text": "#18181b",
              } as React.CSSProperties
            }
          >
            Explora nuestros tratamientos
          </Link>
        </div>

        <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-[#f3ede3]/80">
          <span className="text-[10px] uppercase tracking-[0.3em]">
            Scroll para descubrir
          </span>
          <span aria-hidden="true" className="animate-bounce text-lg">
            ↓
          </span>
        </div>
      </section>

      {/* CLINIC INTRO */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#b08a4f]">
            Clinic
          </p>
          <h2 className="mt-6 text-3xl font-light leading-tight text-zinc-900 sm:text-4xl">
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
      </section>

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
              Dra. Antonieta Ortega
            </p>
            <blockquote className="mt-6 text-xl font-light leading-snug text-zinc-900">
              &ldquo;Mi compromiso es que cada paciente sienta que el tiempo le pertenece.&rdquo;
            </blockquote>
            <Link
              href="/acerca"
              className="btn-underline mt-8 inline-block text-xs text-[#b08a4f]"
            >
              Ver más
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCTOS — scrubbing de frames */}
      <ProductsFramesSection />

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
