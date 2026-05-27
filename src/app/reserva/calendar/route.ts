import { NextResponse, type NextRequest } from "next/server";
import { getReservationSummary } from "@/lib/booking";
import { buildIcs } from "@/lib/ics";
import { reservationToCalendarEvent } from "@/lib/calendar-event";

/**
 * GET /reserva/calendar?id=<reserva_id>
 * Returns a downloadable .ics file with the reservation details.
 */
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "missing id" }, { status: 400 });
  }
  const reservation = await getReservationSummary(id);
  if (!reservation) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const event = reservationToCalendarEvent(reservation);
  const ics = buildIcs(event);

  return new NextResponse(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="omiya-reserva-${id.slice(0, 8)}.ics"`,
      "Cache-Control": "private, no-store",
    },
  });
}
