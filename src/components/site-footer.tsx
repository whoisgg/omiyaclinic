import Link from "next/link";
import { LogoFull } from "@/components/logo-full";

const ENLACES = [
  { label: "Tratamientos", href: "/tratamientos" },
  { label: "Nuestro compromiso", href: "/#compromiso" },
  { label: "Acerca de", href: "/acerca" },
  { label: "Dra. Antonieta", href: "/acerca#fundadora" },
  { label: "Contacto", href: "/contacto" },
];

const HORARIO = [
  { dia: "Lunes", hora: "Cerrado" },
  { dia: "Martes", hora: "3:00 PM – 7:00 PM" },
  { dia: "Miércoles", hora: "10:00 AM – 2:00 PM" },
  { dia: "Jueves", hora: "3:00 PM – 7:00 PM" },
  { dia: "Viernes", hora: "3:00 PM – 7:00 PM" },
  { dia: "Sábado", hora: "10:00 AM – 2:00 PM" },
  { dia: "Domingo", hora: "Cerrado" },
];

const headingClass =
  "text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-800";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200/60 bg-[#faf6ec]">
      <div className="mx-auto max-w-6xl px-6 pt-16 lg:px-10 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-16">
          {/* Columna 1 — Logo + Ubicación */}
          <div>
            <LogoFull className="h-16 w-auto text-zinc-700 lg:h-20" />
            <div className="mt-8 flex items-center gap-5 text-[#b08a4f]">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Del%20Pucar%C3%A1%2050%2C%20Oficina%20410%2C%20Edificio%20Don%20Octavio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ubicación: Del Pucará 50, Oficina 410, Edificio Don Octavio"
                className="transition-colors hover:text-zinc-900"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10Z" />
                  <circle cx="12" cy="11" r="2" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-colors hover:text-zinc-900"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="transition-colors hover:text-zinc-900"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.24.68-1.42 1.31-1.95 1.36-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.15-.19-1.19-1.58-1.19-3.02 0-1.44.76-2.14 1.03-2.44.27-.29.58-.36.78-.36h.56c.18.01.42-.07.66.5.24.59.82 2.03.89 2.18.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.66-.15.27.1 1.71.81 2 .96.29.15.49.22.56.34.07.12.07.68-.17 1.36Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2 — Menú */}
          <div>
            <h3 className={headingClass}>Menú</h3>
            <ul className="mt-6 space-y-3 text-sm text-zinc-600">
              {ENLACES.map((item) => (
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

          {/* Columna 3 — Horario */}
          <div>
            <h3 className={headingClass}>Horario de atención</h3>
            <ul className="mt-6 space-y-3 text-sm text-zinc-600">
              {HORARIO.map((item) => (
                <li
                  key={item.dia}
                  className="flex justify-between gap-4 border-b border-zinc-200/70 pb-3 last:border-0"
                >
                  <span>{item.dia}</span>
                  <span className="text-zinc-500">{item.hora}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Barra inferior: © · políticas · crédito */}
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-zinc-200/60 py-7 text-center sm:flex-row sm:justify-between sm:text-left lg:mt-20">
          <p className="text-xs text-zinc-400">
            © 2026 Omiya Clinic. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-zinc-400">
            <Link href="/privacidad" className="transition-colors hover:text-zinc-700">
              Política de privacidad
            </Link>
            <Link href="/terminos" className="transition-colors hover:text-zinc-700">
              Términos
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
