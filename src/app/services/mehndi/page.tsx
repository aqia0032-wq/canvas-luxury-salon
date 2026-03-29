import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { mehndiServiceSections } from "@/lib/mehndi-services-data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mehndi",
  description: `Bridal, Arabic, Pakistani, and occasion mehndi at ${site.name} — Lahore.`,
};

const heroImage =
  "https://images.unsplash.com/photo-1614204424926-65644c7833a7?w=1400&q=80";

export default function MehndiServicesPage() {
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
              Mehndi menu
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-3xl text-white xs:text-4xl sm:text-5xl md:text-6xl">
              Mehndi
            </h1>
            <p className="mt-6 max-w-2xl text-white/60">
              Hands, feet, bridal masterpieces, and quick occasion sets — with
              clear pricing and timing. Book your slot for Eid, weddings, or
              custom bridal art.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/services/nails"
                className="inline-flex rounded-full border border-gold/35 bg-gold/10 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold transition hover:border-gold hover:bg-gold/15"
              >
                ← Mani, pedi & nails
              </Link>
              <Link
                href="/services/hair"
                className="inline-flex rounded-full border border-white/15 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-gold/40 hover:text-gold"
              >
                Hair
              </Link>
              <Link
                href="/services/facial"
                className="inline-flex rounded-full border border-white/15 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-gold/40 hover:text-gold"
              >
                Facial
              </Link>
              <Link
                href="/services/body-spa"
                className="inline-flex rounded-full border border-white/15 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-gold/40 hover:text-gold"
              >
                Body & spa
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {mehndiServiceSections.map((section, si) => (
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
              Bridal dates fill fast — share reference photos and we will
              confirm time and final quote.
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
