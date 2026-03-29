"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/site";

const simpleLinks = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
] as const;

const servicesSub = [
  { href: "/services", label: "All services" },
  { href: "/services/hair", label: "Hair" },
  { href: "/services/facial", label: "Facial" },
  { href: "/services/body-spa", label: "Body & spa" },
  { href: "/services/nails", label: "Mani, pedi & nails" },
  { href: "/services/mehndi", label: "Mehndi" },
] as const;

function servicesActive(pathname: string) {
  return pathname === "/services" || pathname.startsWith("/services/");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [deskServicesOpen, setDeskServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileServicesOpen(false);
    setDeskServicesOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-black/70 py-3 backdrop-blur-xl"
          : "bg-gradient-to-b from-black/80 to-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-display text-xl tracking-[0.2em] text-white transition-colors group-hover:text-gold md:text-2xl">
            {site.name.split(" ")[0]}
          </span>
          <span className="hidden text-[10px] font-light uppercase tracking-[0.35em] text-white/50 sm:inline">
            Salon
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            href="/"
            className={`relative text-xs uppercase tracking-[0.2em] transition-colors ${
              pathname === "/"
                ? "text-gold"
                : "text-white/70 hover:text-white"
            }`}
          >
            Home
            {pathname === "/" && (
              <motion.span
                layoutId="navline"
                className="absolute -bottom-1 left-0 h-px w-full bg-gold"
              />
            )}
          </Link>

          <div
            className="relative py-1"
            onMouseEnter={() => setDeskServicesOpen(true)}
            onMouseLeave={() => setDeskServicesOpen(false)}
          >
            <Link
              href="/services"
              className={`relative flex items-center gap-1 text-xs uppercase tracking-[0.2em] transition-colors ${
                servicesActive(pathname)
                  ? "text-gold"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Services
              <span className="text-[10px] opacity-70" aria-hidden>
                ▾
              </span>
              {servicesActive(pathname) && (
                <motion.span
                  layoutId="navline"
                  className="absolute -bottom-1 left-0 h-px w-full bg-gold"
                />
              )}
            </Link>

            <AnimatePresence>
              {deskServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full z-50 min-w-[200px] pt-2"
                >
                  <div className="rounded-xl border border-white/10 bg-black/95 py-2 shadow-xl backdrop-blur-xl">
                    {servicesSub.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className={`block px-4 py-2.5 text-xs uppercase tracking-[0.15em] transition hover:bg-white/5 ${
                          pathname === s.href
                            ? "text-gold"
                            : "text-white/75 hover:text-white"
                        }`}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {simpleLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-xs uppercase tracking-[0.2em] transition-colors ${
                  active ? "text-gold" : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="navline"
                    className="absolute -bottom-1 left-0 h-px w-full bg-gold"
                  />
                )}
              </Link>
            );
          })}

          <Link
            href="/book"
            className={`relative text-xs uppercase tracking-[0.2em] transition-colors ${
              pathname === "/book"
                ? "text-gold"
                : "text-white/70 hover:text-white"
            }`}
          >
            Book
            {pathname === "/book" && (
              <motion.span
                layoutId="navline"
                className="absolute -bottom-1 left-0 h-px w-full bg-gold"
              />
            )}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/book"
            className="hidden rounded-full border border-gold/50 bg-gold/10 px-5 py-2 text-xs font-medium uppercase tracking-widest text-gold-light transition hover:border-gold hover:bg-gold/20 md:inline-block lg:hidden"
          >
            Book
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-px w-5 bg-white transition ${open ? "translate-y-1 rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-white transition ${open ? "-translate-y-1 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-white/10 bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-6">
              <Link
                href="/"
                className={`py-3 text-sm uppercase tracking-[0.2em] ${
                  pathname === "/" ? "text-gold" : "text-white/80"
                }`}
              >
                Home
              </Link>

              <div className="border-b border-white/5 py-1">
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="flex w-full items-center justify-between py-3 text-sm uppercase tracking-[0.2em] text-white/80"
                >
                  Services
                  <span className="text-xs" aria-hidden>
                    {mobileServicesOpen ? "▴" : "▾"}
                  </span>
                </button>
                {mobileServicesOpen && (
                  <div className="mb-2 ml-3 flex flex-col border-l border-gold/30 pl-4">
                    {servicesSub.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className={`py-2 text-xs uppercase tracking-[0.15em] ${
                          pathname === s.href ? "text-gold" : "text-white/65"
                        }`}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {simpleLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`py-3 text-sm uppercase tracking-[0.2em] ${
                    pathname === l.href ? "text-gold" : "text-white/80"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/book"
                className={`py-3 text-sm uppercase tracking-[0.2em] ${
                  pathname === "/book" ? "text-gold" : "text-white/80"
                }`}
              >
                Book
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
