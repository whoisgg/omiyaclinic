import Link from "next/link";
import { LogoFull } from "@/components/logo-full";

const MENU = [
  { label: "Acerca de", href: "/acerca" },
  { label: "Tratamientos", href: "/tratamientos" },
  { label: "Contacto", href: "/contacto" },
];

const HORARIO = [
  { dia: "Mar · Jue · Vie", hora: "15:00 – 19:00" },
  { dia: "Mié · Sáb", hora: "10:00 – 14:00" },
  { dia: "Lun · Dom", hora: "Cerrado" },
];

const headingClass =
  "text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-800";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Del%20Pucar%C3%A1%2050%2C%20Oficina%20410%2C%20Edificio%20Don%20Octavio";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200/60 bg-white">
      <div className="mx-auto max-w-6xl px-6 pt-16 lg:px-10 lg:pt-20">
        <div className="flex flex-col gap-12 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-x-10 lg:flex-nowrap">
          {/* Logo */}
          <div>
            <LogoFull className="h-14 w-auto text-zinc-700 lg:h-16" />
          </div>

          {/* Menú */}
          <div>
            <h3 className={headingClass}>Menú</h3>
            <ul className="mt-6 space-y-3 text-sm text-zinc-600">
              {MENU.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-zinc-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horario */}
          <div>
            <h3 className={headingClass}>Horario de atención</h3>
            <ul className="mt-6 max-w-[240px] space-y-4 text-sm text-zinc-600">
              {HORARIO.map((item) => (
                <li key={item.dia} className="flex justify-between gap-6">
                  <span>{item.dia}</span>
                  <span className="text-zinc-500">{item.hora}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className={headingClass}>Contacto</h3>
            <ul className="mt-6 space-y-4 text-sm text-zinc-600">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-zinc-900"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-[#b08a4f]"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-zinc-900"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-[#b08a4f]"
                  >
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9z" />
                    <path d="M9 10a.5 .5 0 0 0 1 0V9a.5 .5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0-1h-1a.5 .5 0 0 0 0 1" />
                  </svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-zinc-900"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-[#b08a4f]"
                  >
                    <path d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10Z" />
                    <circle cx="12" cy="11" r="2" />
                  </svg>
                  Del Pucará 50, Rancagua
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-zinc-200/60 py-7 text-center sm:flex-row sm:justify-between sm:text-left lg:mt-20">
          <p className="text-xs text-zinc-400">
            © 2026 Omiya Clinic. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-zinc-400">
            <Link href="/privacidad" className="transition-colors hover:text-zinc-700">
              Política de privacidad
            </Link>
            <Link href="/terminos" className="transition-colors hover:text-zinc-700">
              Términos y condiciones
            </Link>
            <Link href="/cookies" className="transition-colors hover:text-zinc-700">
              Cookies
            </Link>
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
      </div>
    </footer>
  );
}
