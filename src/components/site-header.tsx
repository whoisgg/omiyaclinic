"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOOKING_URL } from "@/lib/links";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={`text-xs uppercase tracking-widest transition-colors hover:text-zinc-900 ${
        isActive ? "italic text-zinc-900" : "text-zinc-600"
      }`}
    >
      {children}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-semibold tracking-[0.3em] text-zinc-900">
          OMIYA
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink href="/acerca">Acerca de</NavLink>
          <NavLink href="/tratamientos">Tratamientos</NavLink>
          <NavLink href="/contacto">Contacto</NavLink>
        </nav>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[#b08a4f] px-4 py-2 text-xs uppercase tracking-widest text-[#b08a4f] transition-colors hover:bg-[#b08a4f] hover:text-white"
        >
          ↘ Agendar
        </a>
      </div>
    </header>
  );
}
