import { notFound } from "next/navigation";
import { CATEGORIES, getTreatmentBySlug } from "@/lib/treatments";
import { BOOKING_URL } from "@/lib/links";

type Params = Promise<{ slug: string }>;

export default async function TreatmentDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const t = await getTreatmentBySlug(slug);
  if (!t) notFound();

  const category = CATEGORIES.find((c) => c.id === t.category);

  return (
    <main className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:grid-cols-2">
        {/* Galería */}
        <div className="aspect-[4/5] bg-gradient-to-br from-zinc-200 to-zinc-300" />

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-[0.4em] text-[#b08a4f]">
            {(category?.label ?? "General").toUpperCase()}
            {t.duration ? ` · ${t.duration}` : ""}
          </p>
          <h1 className="mt-3 text-4xl font-light text-zinc-900 sm:text-5xl">{t.name}</h1>

          <section className="mt-8 border-l-2 border-zinc-200 pl-4 text-sm leading-relaxed text-zinc-700">
            {t.longDescription}
          </section>

          {t.includes.length > 0 && (
            <section className="mt-6">
              <p className="text-xs uppercase tracking-widest text-zinc-500">Qué incluye</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
                {t.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </section>
          )}

          {t.contraindications.length > 0 && (
            <section className="mt-6">
              <p className="text-xs uppercase tracking-widest text-zinc-500">Contraindicaciones</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
                {t.contraindications.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-10 flex flex-col gap-4 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xs text-xs leading-relaxed text-zinc-500">
              El plan y los valores se definen en una evaluación personalizada
              con la doctora.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxe shrink-0 px-8 py-4 text-center text-xs text-[#b08a4f]"
              style={
                {
                  "--luxe-fill": "#b08a4f",
                  "--luxe-fill-text": "#ffffff",
                } as React.CSSProperties
              }
            >
              ↘ Agendar evaluación
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
