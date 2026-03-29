import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { facialServiceSections } from "@/lib/facial-services-data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Facial services",
  description: `Basic, brightening, advanced, and bridal facials at ${site.name} — Lahore.`,
};

const heroImage =
  "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1400&q=80";

export default function FacialServicesPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <section className="relative overflow-hidden px-4 pb-12 sm:px-6 md:px-8 md:pb-16">
        <div className="absolute inset-0 top-0 -z-10">
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Link
              href="/services"
              className="text-xs uppercase tracking-[0.25em] text-gold/80 hover:text-gold"
            >
              ← All services
            </Link>
            <p className="mt-6 text-xs uppercase tracking-[0.35em] text-gold">
              Facial menu
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-3xl text-white xs:text-4xl sm:text-5xl md:text-6xl">
              Facial services
            </h1>
            <p className="mt-6 max-w-2xl text-white/60">
              From quick refreshes to bridal glow and advanced skin treatments —
              each card shows price, time, and a short description. Book your
              slot in one tap.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/services/hair"
                className="inline-flex rounded-full border border-white/15 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-gold/40 hover:text-gold"
              >
                Hair menu
              </Link>
              <Link
                href="/services/body-spa"
                className="inline-flex rounded-full border border-white/15 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-gold/40 hover:text-gold"
              >
                Body & spa
              </Link>
              <Link
                href="/services/nails"
                className="inline-flex rounded-full border border-white/15 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-gold/40 hover:text-gold"
              >
                Nails
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {facialServiceSections.map((section, si) => (
        <section
          key={section.id}
          id={section.id}
          className={`border-t border-white/5 px-5 py-16 md:px-8 md:py-20 ${
            si % 2 === 1 ? "bg-white/[0.02]" : ""
          }`}
        >
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="font-display text-3xl text-white md:text-4xl">
                <span className="mr-2" aria-hidden>
                  {section.emoji}
                </span>
                {section.title}
              </h2>
              <div className="mt-3 h-px w-16 bg-gold/50" />
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {section.services.map((item, idx) => (
                <Reveal key={item.name} delay={Math.min(idx * 0.03, 0.24)}>
                  <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition hover:border-gold/30 hover:bg-white/[0.06]">
                    <h3 className="font-display text-lg text-white md:text-xl">
                      {item.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                      {item.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3 border-t border-white/10 pt-4 text-xs">
                      <span className="rounded-full border border-gold/25 bg-gold/5 px-3 py-1 text-gold-light">
                        {item.price}
                      </span>
                      <span className="rounded-full border border-white/15 px-3 py-1 text-white/60">
                        {item.duration}
                      </span>
                    </div>
                    <Link
                      href={`/book?service=${encodeURIComponent(item.name)}`}
                      className="mt-5 inline-flex w-fit rounded-full border border-gold/40 bg-gold/5 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold transition hover:border-gold hover:bg-gold/15"
                    >
                      Book now
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="border-t border-white/5 px-5 py-16 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-sm text-white/55">
              Unsure which facial suits your skin? Book a short consultation and
              we will recommend a safe, effective plan.
            </p>
            <Link
              href={`/book?service=${encodeURIComponent("Consultation / Trial")}`}
              className="mt-6 inline-block rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black"
            >
              Book consultation
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
