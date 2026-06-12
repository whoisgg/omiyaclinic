import Link from "next/link";
import Image from "next/image";
import { getFeaturedTreatments } from "@/lib/treatments";
import { BOOKING_URL } from "@/lib/links";
import { HeroStage } from "@/components/hero-stage";
import { HomeTreatmentsGallery } from "@/components/home-treatments-gallery";

export default async function HomePage() {
  const featured = await getFeaturedTreatments(3);

  return (
    <>
      {/* HERO + INTRO — máscara hacia el logo; el resto cubre al scrollear */}
      <HeroStage>

      {/* TRATAMIENTOS — galería editorial con parallax */}
      <HomeTreatmentsGallery />

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
      </HeroStage>
    </>
  );
}
