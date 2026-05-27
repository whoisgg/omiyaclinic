"use client";

import { useState } from "react";

type Props = {
  reservaId: string;
  googleUrl: string;
  outlookUrl: string;
};

/**
 * Calendar export buttons. Renders a "Agregar a calendario" pill that opens a
 * small popover with three options: Google, Outlook (both open new tabs to
 * the providers' compose flows) and a download for the .ics file (works for
 * Apple Calendar and any other client that consumes iCalendar).
 */
export function CalendarButtons({ reservaId, googleUrl, outlookUrl }: Props) {
  const [open, setOpen] = useState(false);
  const icsUrl = `/reserva/calendar?id=${reservaId}`;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full border border-[#b08a4f] px-6 py-3 text-xs uppercase tracking-widest text-[#b08a4f] transition-colors hover:bg-[#b08a4f] hover:text-white"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        Agregar a calendario ▾
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 z-10 mt-2 w-56 -translate-x-1/2 overflow-hidden rounded-lg border border-zinc-200 bg-white text-left shadow-lg"
        >
          <a
            role="menuitem"
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            <span aria-hidden="true">🟦</span>
            Google Calendar
          </a>
          <a
            role="menuitem"
            href={outlookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 border-t border-zinc-100 px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            <span aria-hidden="true">🟧</span>
            Outlook
          </a>
          <a
            role="menuitem"
            href={icsUrl}
            download
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 border-t border-zinc-100 px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            <span aria-hidden="true">📅</span>
            Apple / descargar .ics
          </a>
        </div>
      )}
    </div>
  );
}
