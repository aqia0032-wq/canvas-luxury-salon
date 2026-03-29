import { allBodySpaServiceNames } from "@/lib/body-spa-services-data";
import { allFacialServiceNames } from "@/lib/facial-services-data";
import { allHairServiceNames } from "@/lib/hair-services-data";
import { allHomeMakeupCardNames } from "@/lib/makeup-home-cards";
import { allMehndiServiceNames } from "@/lib/mehndi-services-data";
import { allNailsServiceNames } from "@/lib/nails-services-data";

export const site = {
  name: "Huma Salon & Studio",
  tagline: "Luxury beauty experience",
  description:
    "Huma — premium beauty salon in Lahore: hair, facial, body treatments, and expert makeup for every occasion.",
  email: "humaaqi96@gmail.com",
  phone: "0328 5734656",
  phoneDigits: "923285734656",
  address: "House 60, B1 MM Alam Rd, Block B 1 Gulberg III, Lahore, Punjab 44000",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },
} as const;

export const serviceCategories = [
  {
    slug: "hair",
    title: "Hair",
    short: "Cuts, color, treatments, styling & bridal hair.",
    href: "/services/hair",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=900&q=85",
  },
  {
    slug: "facial",
    title: "Facial",
    short: "Glow, brightening, advanced & bridal facials.",
    href: "/services/facial",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900&q=85",
  },
  {
    slug: "body-spa",
    title: "Body & spa",
    short: "Massage, hammam-style rituals & body treatments.",
    href: "/services/body-spa",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=85",
  },
  {
    slug: "nails",
    title: "Mani, pedi & nails",
    short: "Manicure, pedicure, art, extensions & polish.",
    href: "/services/nails",
    image:
      "https://images.unsplash.com/photo-1519014814348-9c6079d4ca79?w=900&q=85",
  },
  {
    slug: "mehndi",
    title: "Mehndi",
    short: "Bridal, Arabic, feet art & occasion designs.",
    href: "/services/mehndi",
    image:
      "https://images.unsplash.com/photo-1614204424926-65644c7833a7?w=900&q=85",
  },
  {
    slug: "makeup",
    title: "Makeup",
    short: "Bridal, party & camera-ready looks.",
    href: "/services",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=85",
  },
] as const;

const bookingServicesBase = [
  "Bridal Makeup",
  "Party / Event Makeup",
  "Hair Color & Styling",
  "Facial Treatment",
  "Body Waxing",
  "Manicure & Pedicure",
  "Laser Hair Removal",
  "Consultation / Trial",
] as const;

/** Salon-wide bookable labels including all service menus. */
export const bookingServices: string[] = Array.from(
  new Set<string>([
    ...allHairServiceNames(),
    ...allFacialServiceNames(),
    ...allBodySpaServiceNames(),
    ...allNailsServiceNames(),
    ...allMehndiServiceNames(),
    ...allHomeMakeupCardNames(),
    ...bookingServicesBase,
  ])
).sort((a, b) => a.localeCompare(b));
