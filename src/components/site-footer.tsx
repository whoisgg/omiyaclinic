import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200/60 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-3">
        <div className="text-2xl font-semibold tracking-[0.3em] text-zinc-300">
          OMIYA
        </div>
        <ul className="space-y-2 text-sm text-zinc-600">
          <li>
            <Link href="/" className="hover:text-zinc-900">
              Home
            </Link>
          </li>
          <li>
            <Link href="/acerca" className="hover:text-zinc-900">
              Acerca de
            </Link>
          </li>
          <li>
            <Link href="/tratamientos" className="hover:text-zinc-900">
              Tratamientos
            </Link>
          </li>
        </ul>
        <ul className="space-y-2 text-sm text-zinc-600">
          <li>
            <a href="https://instagram.com" className="hover:text-zinc-900">
              Instagram
            </a>
          </li>
          <li>
            <Link href="/contacto" className="hover:text-zinc-900">
              Contacto
            </Link>
          </li>
          <li className="text-zinc-400">© 2026 Omiya</li>
        </ul>
      </div>
    </footer>
  );
}
