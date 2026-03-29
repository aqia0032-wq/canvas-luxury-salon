import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { BookingForm } from "@/components/booking/BookingForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book appointment",
  description: `Schedule a visit at ${site.name}.`,
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const sp = await searchParams;
  const decoded =
    typeof sp.service === "string" ? decodeURIComponent(sp.service) : undefined;

  return (
    <div className="pt-28">
      <section className="px-5 pb-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Booking</p>
            <h1 className="mt-3 font-display text-5xl text-white md:text-6xl">
              Reserve your time
            </h1>
            <p className="mt-4 text-white/55">
              Choose a service and preferred slot. We will confirm by phone or
              email within 48 hours.
            </p>
          </Reveal>
          <div className="mt-14">
            <BookingForm defaultService={decoded} />
          </div>
        </div>
      </section>
    </div>
  );
}
