import Link from "next/link";
import { CATEGORIES, getTreatments, type Category } from "@/lib/treatments";
import { BOOKING_URL } from "@/lib/links";
import { LogoMark } from "@/components/logo-mark";

type SearchParams = Promise<{ cat?: string }>;

const VALID_CATEGORIES: Category[] = ["glow", "smooth", "lift", "smile", "general"];

export default async function TratamientosPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { cat } = await searchParams;
  const active = (VALID_CATEGORIES as string[]).includes(cat ?? "")
    ? (cat as Category)
    : null;
  const list = await getTreatments(active ?? undefined);
  const all = await getTreatments();
  const activeCategory = active ? CATEGORIES.find((c) => c.id === active) : null;

  return (
    <main className="bg-[#fdf9f0]">
      {/* Header — eyebrow, serif display title, intro + filtros a la derecha */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 lg:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#b08a4f]">
              Catálogo médico
            </p>
            <h1 className="mt-4 font-serif text-5xl font-light leading-tight text-zinc-900 sm:text-6xl">
              Tratamientos Personalizados
            </h1>
            {activeCategory ? (
              <div className="mt-8 max-w-lg">
                <p className="text-xs uppercase tracking-[0.3em] text-[#b08a4f]">
                  {activeCategory.subtitle}
                </p>
                <p className="mt-3 text-base leading-relaxed text-zinc-600">
                  {activeCategory.description}
                </p>
              </div>
            ) : (
              <p className="mt-8 max-w-lg text-base leading-relaxed text-zinc-600">
                El well-aging en Omiya Clinic es un compromiso con la salud de
                tu piel. Técnicas avanzadas diseñadas para realzar tu belleza
                natural con resultados armónicos.
              </p>
            )}
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-6 pb-1 md:gap-8">
            <FilterLink href="/tratamientos" label="All" active={!active} />
            {CATEGORIES.map((c) => (
              <FilterLink
                key={c.id}
                href={`/tratamientos?cat=${c.id}`}
                label={c.label}
                active={active === c.id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Grid de cards */}
      <section
        id="catalogo"
        className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-28 lg:px-10"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {!activeCategory &&
            CATEGORIES.map((c, idx) => {
              const count = all.filter((t) => t.category === c.id).length;
              return (
                <article key={c.id} className="group">
                  <Link
                    href={`/tratamientos?cat=${c.id}#catalogo`}
                    className="block"
                  >
                    {/* Imagen — placeholder con monograma hasta tener fotos */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105 ${
                          idx % 2 === 0 ? "bg-[#f3ede3]" : "bg-[#e8e2d8]"
                        }`}
                      >
                        <LogoMark className="h-16 w-auto text-[#b08a4f]/25" />
                      </div>
                      <div className="absolute left-4 top-4 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest text-zinc-900 backdrop-blur">
                        {c.tagline}
                      </div>
                    </div>

                    <div className="mt-6 flex items-start justify-between gap-4">
                      <h3 className="font-serif text-2xl font-normal text-zinc-900">
                        {c.label}
                      </h3>
                      <span className="mt-1.5 shrink-0 text-[10px] uppercase tracking-widest text-zinc-500">
                        {count} tratamiento{count === 1 ? "" : "s"}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">
                      {c.subtitle}.{" "}
                      {c.description}
                    </p>
                  </Link>
                  <Link
                    href={`/tratamientos?cat=${c.id}#catalogo`}
                    className="btn-underline mt-5 inline-block text-xs text-zinc-900"
                  >
                    Ver tratamientos
                  </Link>
                </article>
              );
            })}

          {activeCategory &&
            list.map((t, idx) => {
            const catLabel =
              CATEGORIES.find((c) => c.id === t.category)?.label ?? "General";
            return (
              <article key={t.slug} className="group">
                <Link href={`/tratamientos/${t.slug}`} className="block">
                  {/* Imagen — placeholder con monograma hasta tener fotos */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105 ${
                        idx % 2 === 0 ? "bg-[#f3ede3]" : "bg-[#e8e2d8]"
                      }`}
                    >
                      <LogoMark className="h-16 w-auto text-[#b08a4f]/25" />
                    </div>
                    <div className="absolute left-4 top-4 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest text-zinc-900 backdrop-blur">
                      {catLabel}
                    </div>
                  </div>

                  <div className="mt-6 flex items-start justify-between gap-4">
                    <h3 className="font-serif text-2xl font-normal text-zinc-900">
                      {t.name}
                    </h3>
                    {t.duration && (
                      <span className="mt-1.5 shrink-0 text-[10px] uppercase tracking-widest text-zinc-500">
                        {t.duration}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">
                    {t.shortDescription}
                  </p>
                </Link>
                <Link
                  href={`/tratamientos/${t.slug}`}
                  className="btn-underline mt-5 inline-block text-xs text-zinc-900"
                >
                  Ver detalles
                </Link>
              </article>
            );
          })}

        </div>
      </section>

      {/* CTA — diagnóstico, banda de cierre full-width */}
      <section className="bg-zinc-900 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="max-w-xl">
            <h3 className="font-serif text-3xl font-light leading-snug sm:text-4xl">
              ¿No sabes qué elegir?
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              Agenda una consulta de diagnóstico personalizada con la Dra.
              Antonieta Ortega para definir tu plan de tratamiento.
            </p>
          </div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxe shrink-0 px-10 py-4 text-center text-xs text-white/90"
            style={
              {
                "--luxe-fill": "#ffffff",
                "--luxe-fill-text": "#18181b",
              } as React.CSSProperties
            }
          >
            Agendar diagnóstico
          </a>
        </div>
      </section>
    </main>
  );
}

function FilterLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative pb-1 text-xs uppercase tracking-widest transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-zinc-900 after:transition-transform after:duration-300 ${
        active
          ? "text-zinc-900 after:scale-x-100"
          : "text-zinc-500 hover:text-zinc-900 after:scale-x-0"
      }`}
    >
      {label}
    </Link>
  );
}
