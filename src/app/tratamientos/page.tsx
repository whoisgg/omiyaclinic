import Link from "next/link";
import { CATEGORIES, getTreatments, formatCLP, type Category } from "@/lib/treatments";

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

        <p className="mt-6 max-w-2xl border-l-2 border-[#b08a4f]/40 pl-4 text-sm text-zinc-600">
          Estructura FaceLab: filtro por categoría; cada fila lleva imagen, descripción,
          duración, precio y abono. <strong>Reservar</strong> precarga el servicio en el flujo.
        </p>

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
                  ⏱ {t.durationMin} min · {CATEGORIES.find((c) => c.id === t.category)?.label ?? "General"}
                </p>
              </Link>
              <div className="text-right">
                <p className="text-xl font-semibold text-zinc-900">{formatCLP(t.price)}</p>
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  Abono {formatCLP(t.deposit)}
                </p>
                <Link
                  href={`/reserva?servicio=${t.slug}`}
                  className="mt-3 inline-block rounded-full border border-[#b08a4f] px-4 py-2 text-xs uppercase tracking-widest text-[#b08a4f] transition-colors hover:bg-[#b08a4f] hover:text-white"
                >
                  Reservar →
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-xs uppercase tracking-widest text-zinc-500">
          Datos desde Supabase · tabla <code className="font-mono text-zinc-900">servicios</code>
        </p>
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
