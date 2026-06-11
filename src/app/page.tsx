import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, getFeaturedTreatments } from "@/lib/treatments";
import { BOOKING_URL } from "@/lib/links";

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
          <h1 className="font-serif text-7xl font-light tracking-[0.18em] text-[#f3ede3] sm:text-8xl lg:text-9xl">
            OMIYA
          </h1>
          <p className="mt-6 font-serif text-xl font-light tracking-wide text-[#f3ede3]/90 sm:text-2xl">
            El santuario del well-aging
          </p>

          <Link
            href="/tratamientos"
            className="mt-12 border border-[#f3ede3]/70 px-10 py-4 text-xs uppercase tracking-[0.25em] text-[#f3ede3] transition-colors hover:bg-[#f3ede3] hover:text-zinc-900"
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
            Cuidamos cómo envejecemos. Tratamientos médicos seguros, productos
            certificados y un equipo que te conoce por tu nombre.
          </p>
          <Link
            href="/tratamientos"
            className="mt-10 inline-block border-b border-[#b08a4f] pb-1 text-xs uppercase tracking-widest text-[#b08a4f]"
          >
            Explora nuestros tratamientos →
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
          <div className="flex aspect-[4/5] items-center justify-center border border-dashed border-zinc-300 bg-zinc-100 text-xs uppercase tracking-widest text-zinc-400">
            Retrato fundadora
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
              className="mt-8 inline-block border-b border-[#b08a4f] pb-1 text-xs uppercase tracking-widest text-[#b08a4f]"
            >
              Ver más →
            </Link>
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
            className="mt-8 inline-block rounded-full border border-white/30 px-8 py-3 text-xs uppercase tracking-widest transition-colors hover:bg-white hover:text-zinc-900"
          >
            ↘ Agendar consulta
          </a>
        </div>
      </section>
    </>
  );
}
