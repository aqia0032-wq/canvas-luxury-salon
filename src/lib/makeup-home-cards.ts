/** Featured makeup packages on the home page (hero below). */
export type HomeMakeupCard = {
  id: string;
  name: string;
  price: string;
  image: string;
};

export const homeMakeupCards: HomeMakeupCard[] = [
  {
    id: "bridal-barat",
    name: "Bridal Makeup Barat",
    price: "From Rs. 35,000",
    image:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=85",
  },
  {
    id: "bridal-walima",
    name: "Bridal Makeup Walima",
    price: "From Rs. 28,000",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=85",
  },
  {
    id: "nikkah-engagement",
    name: "Nikkah & Engagement Makeup",
    price: "From Rs. 22,000",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=85",
  },
  {
    id: "party",
    name: "Party Makeup",
    price: "From Rs. 8,500",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=85",
  },
  {
    id: "mehndi-makeup",
    name: "Mehndi Makeup",
    price: "From Rs. 12,000",
    image:
      "https://images.unsplash.com/photo-1614204424926-65644c7833a7?w=800&q=85",
  },
];

export function allHomeMakeupCardNames(): string[] {
  return homeMakeupCards.map((c) => c.name);
}
