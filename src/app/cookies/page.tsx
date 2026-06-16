import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies — Omiya Clinic",
};

export default function CookiesPage() {
  return (
    <main className="bg-white">
      <section className="bg-[#faf6ec]">
        <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 lg:pb-32 lg:pt-40">
          <p className="text-xs uppercase tracking-[0.4em] text-[#b08a4f]">
            Legal
          </p>
          <h1 className="mt-6 font-serif text-4xl font-light leading-tight text-zinc-900 sm:text-5xl">
            Política de Cookies
          </h1>
          <p className="mt-8 text-base leading-relaxed text-zinc-600">
            Estamos preparando el contenido de esta página. Pronto detallaremos
            qué cookies utilizamos y cómo puedes gestionarlas.
          </p>
        </div>
      </section>
    </main>
  );
}
