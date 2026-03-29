import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} — ${site.address}`,
};

export default function ContactPage() {
  return (
    <div className="pt-28">
      <section className="px-5 pb-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Say hello</p>
            <h1 className="mt-3 font-display text-5xl text-white md:text-6xl">
              Contact
            </h1>
          </Reveal>
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="glass-panel h-full rounded-3xl p-8 md:p-10">
                <h2 className="font-display text-2xl text-white">Visit us</h2>
                <p className="mt-6 text-sm leading-relaxed text-white/65">
                  {site.address}
                </p>
                <div className="mt-8 space-y-4 text-sm">
                  <p>
                    <span className="text-white/40">Phone</span>
                    <br />
                    <a
                      href={`tel:+${site.phoneDigits}`}
                      className="text-gold hover:underline"
                    >
                      {site.phone}
                    </a>
                  </p>
                  <p>
                    <span className="text-white/40">Email</span>
                    <br />
                    <a
                      href={`mailto:${site.email}`}
                      className="text-gold hover:underline"
                    >
                      {site.email}
                    </a>
                  </p>
                </div>
                <a
                  href={`https://wa.me/${site.phoneDigits}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-10 inline-flex rounded-full border border-gold/40 px-8 py-3 text-xs uppercase tracking-[0.2em] text-gold transition hover:bg-gold/10"
                >
                  WhatsApp
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="glass-panel h-full min-h-[320px] overflow-hidden rounded-3xl border border-white/10">
                <iframe
                  title="Map — MM Alam Road Gulberg III Lahore"
                  className="h-full min-h-[320px] w-full grayscale contrast-[0.9] invert-[0.92]"
                  src="https://www.google.com/maps?q=MM+Alam+Road+Gulberg+III+Lahore+Pakistan&hl=en&z=15&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
