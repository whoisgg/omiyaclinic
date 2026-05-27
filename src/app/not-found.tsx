import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-[#b08a4f]">404</p>
      <h1 className="mt-4 text-4xl font-light text-zinc-900">No encontramos esa página</h1>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full border border-[#b08a4f] px-6 py-3 text-xs uppercase tracking-widest text-[#b08a4f] hover:bg-[#b08a4f] hover:text-white"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
