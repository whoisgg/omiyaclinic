"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOOKING_URL } from "@/lib/links";
import { LogoMark } from "@/components/logo-mark";

const NAV = [
  { href: "/acerca", label: "Acerca de" },
  { href: "/tratamientos", label: "Tratamientos" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  const pathname = usePathname();
  // El header siempre es absoluto y transparente sobre la página. Con el
  // hero crema del home, la paleta zinc oscura funciona en todas partes.
  const overHero = false;

  const linkBase = "text-xs uppercase tracking-[0.18em] transition-colors";
  const linkColor = overHero
    ? "text-[#f3ede3]/80 hover:text-[#f3ede3]"
    : "text-zinc-600 hover:text-zinc-900";
  const activeColor = overHero ? "text-[#f3ede3]" : "italic text-zinc-900";

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10 border-b ${
          overHero ? "border-[#f3ede3]/25" : "border-zinc-900/10"
        }`}
      >
        <Link
          href="/"
          aria-label="Omiya Clinic — Home"
          className={`transition-colors ${
            overHero
              ? "text-[#f3ede3]/80 hover:text-[#f3ede3]"
              : "text-zinc-600 hover:text-zinc-900"
          }`}
        >
          <LogoMark className="h-8 w-auto" />
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
            className={`btn-luxe px-6 py-2.5 text-[10px] ${
              overHero ? "text-[#f3ede3]" : "text-zinc-900"
            }`}
            style={
              (overHero
                ? { "--luxe-fill": "#f3ede3", "--luxe-fill-text": "#18181b" }
                : {
                    "--luxe-fill": "#18181b",
                    "--luxe-fill-text": "#ffffff",
                  }) as React.CSSProperties
            }
          >
            Agendar
          </a>
        </div>
      </div>
    </header>
  );
}
