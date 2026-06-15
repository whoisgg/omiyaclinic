import Link from "next/link";
import { LogoFull } from "@/components/logo-full";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200/60 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <LogoFull className="h-14 w-auto text-zinc-400" />
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
            <Link href="/contacto" className="hover:text-zinc-900">
              Contacto
            </Link>
          </li>
        </ul>
      </div>

      {/* Fila inferior: copyright a la izquierda · crédito a la derecha */}
      <div className="border-t border-zinc-200/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <p className="text-xs text-zinc-400">© 2026 Omiya</p>
          <a
            href="https://instagram.com/gaspar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.15em] text-zinc-300 transition-colors hover:text-[#b08a4f]"
          >
            Designed by GG
          </a>
        </div>
      </div>
    </footer>
  );
}
