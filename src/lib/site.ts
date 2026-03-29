export const site = {
  name: "Canvas Salon & Studio",
  tagline: "Luxury beauty experience",
  description:
    "Premium beauty salon in Lahore — hair, facial, body treatments, and expert makeup for every occasion.",
  email: "info@canvassalon.com.pk",
  phone: "+92 328 642 7572",
  phoneDigits: "923286427572",
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
    title: "Hair Treatment",
    short: "Color, extensions, and restorative care.",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
  },
  {
    slug: "facial",
    title: "Facial Treatment",
    short: "Radiance rituals tailored to your skin.",
    image:
      "https://images.unsplash.com/photo-1570172619647-dfd03c5b8628?w=800&q=80",
  },
  {
    slug: "body",
    title: "Body Treatment",
    short: "Waxing, nails, laser, and full-body glow.",
    image:
      "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=800&q=80",
  },
  {
    slug: "makeup",
    title: "Makeup Services",
    short: "Bridal, party, and editorial artistry.",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80",
  },
] as const;

export const bookingServices = [
  "Bridal Makeup",
  "Party / Event Makeup",
  "Hair Color & Styling",
  "Facial Treatment",
  "Body Waxing",
  "Manicure & Pedicure",
  "Laser Hair Removal",
  "Consultation / Trial",
] as const;
