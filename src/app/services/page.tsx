import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { serviceCategories, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Hair, facial, body, and makeup services at ${site.name} in Lahore.`,
};

const detailBlocks = [
  {
    title: "Hair treatments",
    items: ["Color & gloss", "Extensions", "Cut & styling", "Repair rituals"],
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=85",
    href: "/services/hair" as const,
  },
  {
    title: "Facial treatments",
    items: ["Brightening", "Deep cleanse", "Anti-fatigue", "Pre-event prep"],
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200&q=85",
    href: "/services/facial" as const,
  },
  {
    title: "Body & spa",
    items: ["Massage", "Moroccan bath", "Body polish", "Bridal spa"],
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=85",
    href: "/services/body-spa" as const,
  },
  {
    title: "Makeup services",
    items: ["Bridal", "Engagement", "Party", "Editorial"],
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=85",
    href: "/book" as const,
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-28">
      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Menu</p>
            <h1 className="mt-3 max-w-3xl font-display text-5xl text-white md:text-6xl">
              Services for every occasion
            </h1>
            <p className="mt-6 max-w-2xl text-white/60">
              Curated rituals that balance precision and comfort — from quiet
              maintenance to show-stopping event looks.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/services/hair"
                className="inline-flex rounded-full border border-gold/40 bg-gold/5 px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-gold transition hover:border-gold/60 hover:bg-gold/10"
              >
                Full hair menu
              </Link>
              <Link
                href="/services/facial"
                className="inline-flex rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-white/80 transition hover:border-gold/40 hover:bg-white/10"
              >
                Full facial menu
              </Link>
              <Link
                href="/services/body-spa"
                className="inline-flex rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-white/80 transition hover:border-gold/40 hover:bg-white/10"
              >
                Body & spa menu
              </Link>
              <Link
                href="/services/nails"
                className="inline-flex rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-white/80 transition hover:border-gold/40 hover:bg-white/10"
              >
                Mani, pedi & nails
              </Link>
              <Link
                href="/services/mehndi"
                className="inline-flex rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-white/80 transition hover:border-gold/40 hover:bg-white/10"
              >
                Mehndi
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/5 px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((s, idx) => (
            <Reveal key={s.slug} delay={idx * 0.06}>
              <Link
                href={s.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:border-gold/35 hover:shadow-gold"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h2 className="font-display text-2xl text-white drop-shadow-md md:text-[1.65rem]">
                      {s.title}
                    </h2>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm leading-relaxed text-white/55">
                    {s.short}
                  </p>
                  <span className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-gold transition group-hover:text-gold-light">
                    View details →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {detailBlocks.map((block, i) => (
        <section
          key={block.title}
          className={`border-t border-white/5 px-5 py-20 md:px-8 ${
            i % 2 === 1 ? "bg-white/[0.02]" : ""
          }`}
        >
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={block.image}
                  alt={block.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
            <Reveal className={i % 2 === 1 ? "lg:order-1" : ""} delay={0.08}>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">
                Signature
              </p>
              <h2 className="mt-3 font-display text-4xl text-white">
                {block.title}
              </h2>
              <ul className="mt-8 space-y-3">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-white/70"
                  >
                    <span className="h-px w-8 bg-gold/60" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href={block.href}
                  className="inline-block rounded-full border border-white/20 px-8 py-3 text-xs uppercase tracking-[0.2em] text-white/80 transition hover:border-gold/40 hover:bg-white/5"
                >
                  View menu
                </Link>
                <Link
                  href="/book"
                  className="inline-block rounded-full border border-gold/40 px-8 py-3 text-xs uppercase tracking-[0.2em] text-gold transition hover:bg-gold/10"
                >
                  Book now
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      ))}
    </div>
  );
}
