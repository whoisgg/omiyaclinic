"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOOKING_URL } from "@/lib/links";

const NAV = [
  { href: "/acerca", label: "Acerca de" },
  { href: "/tratamientos", label: "Tratamientos" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  const pathname = usePathname();
  // On home the header overlays the full-bleed hero: absolute, cream text,
  // hairline bottom border. Elsewhere it's the sticky white bar.
  const overHero = pathname === "/";

  const linkBase = "text-xs uppercase tracking-[0.18em] transition-colors";
  const linkColor = overHero
    ? "text-[#f3ede3]/80 hover:text-[#f3ede3]"
    : "text-zinc-600 hover:text-zinc-900";
  const activeColor = overHero ? "text-[#f3ede3]" : "italic text-zinc-900";

  return (
    <header
      className={
        overHero
          ? "absolute inset-x-0 top-0 z-50"
          : "sticky top-0 z-50 border-b border-zinc-200/60 bg-white/80 backdrop-blur"
      }
    >
      <div
        className={`mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10 ${
          overHero ? "border-b border-[#f3ede3]/25" : ""
        }`}
      >
        <Link
          href="/"
          className={`font-serif text-2xl tracking-[0.25em] ${
            overHero ? "text-[#f3ede3]" : "text-zinc-900"
          }`}
        >
          OMIYA
        </Link>

        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${linkBase} ${isActive ? activeColor : linkColor}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <span
            aria-hidden="true"
            className={`hidden h-5 w-px md:block ${
              overHero ? "bg-[#f3ede3]/30" : "bg-zinc-300"
            }`}
          />

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkBase} ${
              overHero
                ? "text-[#f3ede3] hover:text-white"
                : "text-zinc-900 hover:text-[#b08a4f]"
            }`}
          >
            Agendar <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
