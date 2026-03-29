import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl tracking-wide text-white">
            {site.name}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
            {site.description}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/65">
            <li>
              <Link href="/services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-white">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/book" className="hover:text-white">
                Book Appointment
              </Link>
            </li>
            <li>
              <Link href="/admin/login" className="hover:text-white/40">
                Staff
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-sm text-white/65">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:+${site.phoneDigits}`} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li className="max-w-[240px] leading-relaxed">{site.address}</li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold">
            Follow
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-wider text-white/70 transition hover:border-gold/50 hover:text-gold"
            >
              Instagram
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-wider text-white/70 transition hover:border-gold/50 hover:text-gold"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
