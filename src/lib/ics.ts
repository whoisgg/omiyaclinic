/**
 * Calendar export helpers — .ics (RFC 5545) + Google Calendar template URL.
 * Pure functions, no IO. Safe to import from client or server.
 */

export type CalendarEvent = {
  uid: string;          // unique identifier — usually the reserva id + domain
  title: string;        // e.g. "Limpieza facial profunda · Omiya Clinic"
  description: string;
  location: string;
  /** Local start in YYYY-MM-DDTHH:MM:SS (no timezone suffix — treated as local) */
  startLocal: string;
  /** Local end in YYYY-MM-DDTHH:MM:SS */
  endLocal: string;
  /** IANA timezone, e.g. "America/Santiago" */
  tz: string;
  /** Reminder minutes before start (default 60) */
  reminderMinutes?: number;
};

/**
 * Build the body of a .ics calendar file describing a single VEVENT.
 *
 * Notes on timezones: we use floating local times tagged with TZID=<iana>.
 * Modern Google/Apple/Outlook calendars resolve IANA names natively, so we
 * skip the verbose VTIMEZONE block. If you ever need stricter compliance,
 * embed a full VTIMEZONE for America/Santiago — but every mainstream client
 * already handles the short form correctly today.
 */
export function buildIcs(event: CalendarEvent): string {
  const stamp = formatIcsUtc(new Date()); // DTSTAMP must be UTC
  const start = formatIcsLocal(event.startLocal);
  const end = formatIcsLocal(event.endLocal);
  const reminder = event.reminderMinutes ?? 60;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Omiya Clinic//Booking//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${event.tz}:${start}`,
    `DTEND;TZID=${event.tz}:${end}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    `DESCRIPTION:${escapeIcs(event.description)}`,
    `LOCATION:${escapeIcs(event.location)}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcs("Recordatorio: " + event.title)}`,
    `TRIGGER:-PT${reminder}M`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ];
  return lines.join("\r\n");
}

/**
 * Builds a "Add to Google Calendar" template URL. Opens Google Calendar with
 * a new event pre-populated. The user clicks Save in their browser.
 *
 * We pass local times + ctz so Google knows the timezone without us doing
 * any conversion math.
 */
export function buildGoogleCalendarUrl(event: CalendarEvent): string {
  const start = formatIcsLocal(event.startLocal);
  const end = formatIcsLocal(event.endLocal);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    ctz: event.tz,
    details: event.description,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Builds an Outlook (web) compose URL — useful as a fallback for users on
 * Outlook.com / Microsoft 365. Times are sent as ISO local + timezone hint
 * via subject of the event.
 */
export function buildOutlookCalendarUrl(event: CalendarEvent): string {
  const params = new URLSearchParams({
    rru: "addevent",
    path: "/calendar/action/compose",
    startdt: event.startLocal + ":00",
    enddt: event.endLocal + ":00",
    subject: event.title,
    body: event.description,
    location: event.location,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

// ---- helpers ----

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function formatIcsUtc(d: Date): string {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

/**
 * Converts "YYYY-MM-DDTHH:MM" or "YYYY-MM-DDTHH:MM:SS" to "YYYYMMDDTHHMMSS".
 */
function formatIcsLocal(local: string): string {
  // Accept '2026-06-03T14:00' or '2026-06-03T14:00:00'
  const match = local.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) {
    throw new Error(`Invalid local datetime: ${local}`);
  }
  const [, y, mo, d, h, mi, s] = match;
  return `${y}${mo}${d}T${h}${mi}${s ?? "00"}`;
}

function escapeIcs(s: string): string {
  // Escape per RFC 5545: backslash, newline, comma, semicolon
  return s
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}
