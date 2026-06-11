import Link from "next/link";
import { CATEGORIES, getTreatments, type Category } from "@/lib/treatments";
import { BOOKING_URL } from "@/lib/links";

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
  const activeCategory = active ? CATEGORIES.find((c) => c.id === active) : null;

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-4xl font-light text-zinc-900">Nuestros tratamientos</h1>

        {/* Filtros */}
        <div className="mt-8 flex flex-wrap gap-3">
          <FilterChip href="/tratamientos" label="Todos" active={!active} />
          {CATEGORIES.map((c) => (
            <FilterChip
              key={c.id}
              href={`/tratamientos?cat=${c.id}`}
              label={c.label}
              active={active === c.id}
            />
          ))}
        </div>

        {activeCategory ? (
          <div className="mt-8 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[#b08a4f]">
              {activeCategory.subtitle}
            </p>
            <p className="mt-3 text-base leading-relaxed text-zinc-600">
              {activeCategory.description}
            </p>
          </div>
        ) : (
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-600">
            Tratamientos personalizados que integran ciencia médica avanzada con un
            enfoque natural y holístico del bienestar.
          </p>
        )}

        {/* Lista */}
        <ul className="mt-10 divide-y divide-zinc-200 border-y border-zinc-200">
          {list.map((t) => (
            <li key={t.slug} className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-[140px_1fr_auto] sm:items-center">
              <div className="aspect-square w-full bg-gradient-to-br from-zinc-200 to-zinc-300 sm:w-[140px]" />
              <Link
                href={`/tratamientos/${t.slug}`}
                className="block"
              >
                <h3 className="text-xl font-medium text-zinc-900 group-hover:text-[#b08a4f]">
                  {t.name}
                </h3>
                <p className="mt-1 text-sm text-zinc-600">{t.shortDescription}</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-zinc-500">
                  {CATEGORIES.find((c) => c.id === t.category)?.label ?? "General"}
                  {t.duration ? ` · ${t.duration}` : ""}
                </p>
              </Link>
              <div className="text-right">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxe inline-block px-6 py-3 text-xs text-[#b08a4f]"
                  style={
                    {
                      "--luxe-fill": "#b08a4f",
                      "--luxe-fill-text": "#ffffff",
                    } as React.CSSProperties
                  }
                >
                  Reservar →
                </a>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </main>
  );
}

function FilterChip({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={
        "rounded-full border px-4 py-1.5 text-xs uppercase tracking-widest transition-colors " +
        (active
          ? "border-[#b08a4f] bg-[#b08a4f] text-white"
          : "border-zinc-300 text-zinc-700 hover:border-[#b08a4f] hover:text-[#b08a4f]")
      }
    >
      {label}
    </Link>
  );
}
