export type HairServiceItem = {
  name: string;
  hint: string;
};

export type HairServiceSection = {
  id: string;
  emoji: string;
  title: string;
  services: HairServiceItem[];
};

export const hairServiceSections: HairServiceSection[] = [
  {
    id: "hair-cut",
    emoji: "✂️",
    title: "Hair cut services",
    services: [
      { name: "Hair Trim", hint: "Neaten length and ends while keeping your shape." },
      { name: "Straight Cut", hint: "Clean, one-length line for a polished silhouette." },
      { name: "Layer Cut", hint: "Movement and volume with soft or defined layers." },
      { name: "Step Cut", hint: "Graduated steps for texture and bounce." },
      { name: "Feather Cut", hint: "Light, feathered ends for a soft, airy finish." },
      { name: "Bob Cut", hint: "Classic or modern bob tailored to your jawline." },
      { name: "Pixie Cut", hint: "Short, sculpted crop with bespoke detailing." },
      { name: "Bangs (Fringe)", hint: "Curtain, blunt, or side-swept fringe design." },
      { name: "U Cut / V Cut", hint: "Shaped perimeter for length at back with flow." },
    ],
  },
  {
    id: "hair-color",
    emoji: "🎨",
    title: "Hair coloring services",
    services: [
      { name: "Root Touch-Up", hint: "Seamless regrowth refresh to match your tone." },
      { name: "Full Hair Color", hint: "Rich, even color from roots to ends." },
      { name: "Highlights", hint: "Dimensional ribbons of light where you want glow." },
      { name: "Lowlights", hint: "Depth and contrast for fuller-looking hair." },
      { name: "Balayage", hint: "Hand-painted sun-kissed gradient, low maintenance." },
      { name: "Ombre", hint: "Bold or soft melt from depth to lighter ends." },
      { name: "Global Color", hint: "One unified shade from scalp to tips." },
      {
        name: "Fashion Colors (Red, Blue, Purple etc.)",
        hint: "Creative vivids and pastels with healthy prep and aftercare.",
      },
    ],
  },
  {
    id: "hair-treatment",
    emoji: "💆‍♀️",
    title: "Hair treatment services",
    services: [
      { name: "Hair Spa", hint: "Deep nourishment, massage, and shine ritual." },
      { name: "Keratin Treatment", hint: "Smoothing care to reduce frizz and styling time." },
      { name: "Protein Treatment", hint: "Strength and elasticity for stressed strands." },
      { name: "Smoothening Treatment", hint: "Sleek, manageable finish with expert application." },
      { name: "Rebonding", hint: "Straight, structured results for resistant textures." },
      { name: "Botox Hair Treatment", hint: "Fillers and care for silky, plumped hair feel." },
      { name: "Scalp Treatment", hint: "Balance, comfort, and a healthy base for growth." },
      { name: "Dandruff Treatment", hint: "Targeted calming and clarifying for flaky scalp." },
      { name: "Hair Fall Treatment", hint: "Fortifying ritual to support density and strength." },
    ],
  },
  {
    id: "hair-styling",
    emoji: "💃",
    title: "Hair styling services",
    services: [
      { name: "Blow Dry", hint: "Volume, smoothness, or waves with a pro finish." },
      { name: "Straightening (Temporary)", hint: "Sleek pass with heat protection." },
      { name: "Curling", hint: "Waves or curls sized to your occasion." },
      { name: "Ironing", hint: "Pin-straight polish with lasting hold." },
      { name: "Party Hairstyle", hint: "Statement look for evenings and celebrations." },
      { name: "Bridal Hairstyle", hint: "Secure, photogenic styling for your big day." },
      { name: "Braids / Plaits", hint: "Classic and trend braids tailored to your hair." },
      { name: "Bun Styles", hint: "Low, high, or textured buns with elegant detail." },
    ],
  },
  {
    id: "bridal-hair",
    emoji: "👰",
    title: "Bridal hair services",
    services: [
      { name: "Bridal Hairstyling", hint: "Trial and day-of styling aligned with your veil and look." },
      { name: "Hair Accessories Setting", hint: "Pins, vines, and jewels placed to stay all day." },
      { name: "Dupatta Setting", hint: "Secure, comfortable draping that complements hair." },
      { name: "Hair Extensions Setup", hint: "Volume or length blended for bridal styling." },
    ],
  },
  {
    id: "hair-care",
    emoji: "🧴",
    title: "Hair care services",
    services: [
      { name: "Hair Wash", hint: "Gentle cleanse and finish with salon care." },
      { name: "Conditioning", hint: "Instant slip, softness, and detangling." },
      { name: "Deep Conditioning", hint: "Intensive moisture for dry or damaged hair." },
      { name: "Oil Massage (Head Massage)", hint: "Relaxing scalp massage to boost circulation." },
    ],
  },
  {
    id: "advanced-premium",
    emoji: "➕",
    title: "Advanced / premium services",
    services: [
      { name: "Hair Extensions", hint: "Tape, weave, or keratin — matched to your color." },
      { name: "Hair Volume Treatment", hint: "Body and lift without heavy product feel." },
      { name: "Scalp Detox", hint: "Deep cleanse to remove buildup and refresh roots." },
      {
        name: "Laser Hair Therapy (premium salons)",
        hint: "Light-based scalp support where offered — consult for suitability.",
      },
    ],
  },
];

export function allHairServiceNames(): string[] {
  const names: string[] = [];
  for (const sec of hairServiceSections) {
    for (const s of sec.services) {
      names.push(s.name);
    }
  }
  return names;
}
