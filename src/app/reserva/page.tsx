import { getTreatments } from "@/lib/treatments";
import { getAvailableSlots, getDefaultProfessional, nextNDays } from "@/lib/booking";
import { BookingFlow } from "./booking-flow";

type SearchParams = Promise<{ servicio?: string }>;

export default async function ReservaPage({ searchParams }: { searchParams: SearchParams }) {
  const { servicio } = await searchParams;

  const [services, professional] = await Promise.all([
    getTreatments(),
    getDefaultProfessional(),
  ]);

  if (services.length === 0 || !professional) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-sm text-zinc-600">
          El sistema de reservas no está disponible. Intenta más tarde.
        </p>
      </main>
    );
  }

  const initialServiceSlug =
    services.find((s) => s.slug === servicio)?.slug ?? services[0].slug;
  const initialService =
    services.find((s) => s.slug === initialServiceSlug) ?? services[0];

  // Fetch 7 days of slots in parallel.
  const days = nextNDays(7);
  const slotsArr = await Promise.all(
    days.map((d) => getAvailableSlots(professional.id, d.iso, initialService.durationMin)),
  );
  const slotsByDay: Record<string, string[]> = {};
  days.forEach((d, i) => {
    slotsByDay[d.iso] = slotsArr[i];
  });

  return (
    <main className="bg-white">
      <BookingFlow
        services={services}
        initialServiceSlug={initialServiceSlug}
        professional={{ slug: professional.slug, name: professional.name }}
        days={days.map(({ iso, dayLabel, dateLabel }) => ({ iso, dayLabel, dateLabel }))}
        slotsByDay={slotsByDay}
      />
    </main>
  );
}
