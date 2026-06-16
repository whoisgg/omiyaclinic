import Link from "next/link";
import { LogoFull } from "@/components/logo-full";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200/60 bg-white">
      <div className="mx-auto max-w-6xl px-6 pb-6 pt-14 lg:pt-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
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

        {/* Fila inferior integrada (sin línea): legales · copyright · crédito */}
        <div className="mt-20 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mt-28">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
            <span>© 2026 Omiya</span>
            <Link href="/privacidad" className="transition-colors hover:text-zinc-700">
              Privacidad
            </Link>
            <Link href="/terminos" className="transition-colors hover:text-zinc-700">
              Términos
            </Link>
            <Link href="/cookies" className="transition-colors hover:text-zinc-700">
              Cookies
            </Link>
          </div>
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
