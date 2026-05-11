export type TurkishCity =
  | "Istanbul" | "Antalya" | "Bodrum" | "Izmir"
  | "Ankara" | "Bursa" | "Fethiye" | "Cappadocia";

export type PropertyType = "Villa" | "Apartment" | "Penthouse" | "Mansion";

export type Property = {
  id: string;
  title: string;
  city: TurkishCity;
  neighborhood: string;
  price: number;
  currency: "USD" | "EUR" | "TRY";
  type: PropertyType;
  listing: "sale" | "rent";
  beds: number;
  baths: number;
  areaM2: number;
  amenities: string[];
  description: string;
  images: string[];
  videoUrl?: string;
  coords: { lat: number; lng: number };
  agentId: string;
  featured?: boolean;
  yearBuilt: number;
};

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

const AMENITIES_POOL = [
  "Private Pool", "Sea View", "Smart Home", "Concierge", "Gym",
  "Spa & Sauna", "Private Beach", "Helipad", "Wine Cellar", "Home Cinema",
  "Garden", "Garage", "24/7 Security", "Elevator", "Rooftop Terrace",
];

const HEROES = [
  "photo-1613490493576-7fde63acd811",
  "photo-1600596542815-ffad4c1539a9",
  "photo-1600585154340-be6161a56a0c",
  "photo-1600047509807-ba8f99d2cdde",
  "photo-1582268611958-ebfd161ef9cf",
  "photo-1564013799919-ab600027ffc6",
  "photo-1512917774080-9991f1c4c750",
  "photo-1600585154526-990dced4db0d",
  "photo-1600566753190-17f0baa2a6c3",
  "photo-1613977257363-707ba9348227",
  "photo-1600210492486-724fe5c67fb0",
  "photo-1600573472550-8090b5e0745e",
  "photo-1505142468610-359e7d316be0",
  "photo-1545324418-cc1a3fa10c00",
  "photo-1518684079-3c830dcef090",
  "photo-1542838132-92c53300491e",
  "photo-1570077188670-e3a8d69ac5ff",
  "photo-1571055107559-3e67626fa8be",
  "photo-1571003123894-1f0594d2b5d9",
  "photo-1551522435-a13afa10f103",
];

const INTERIORS = [
  "photo-1616594039964-ae9021a400a0",
  "photo-1616137466211-f939a420be84",
  "photo-1616486338812-3dadae4b4ace",
  "photo-1600210491892-03d54c0aaf87",
  "photo-1615529182904-14819c35db37",
  "photo-1560448204-e02f11c3d0e2",
];

const cities: { city: TurkishCity; neighborhood: string; lat: number; lng: number }[] = [
  { city: "Istanbul", neighborhood: "Bebek", lat: 41.077, lng: 29.043 },
  { city: "Istanbul", neighborhood: "Sarıyer", lat: 41.166, lng: 29.057 },
  { city: "Istanbul", neighborhood: "Beşiktaş", lat: 41.044, lng: 29.005 },
  { city: "Antalya", neighborhood: "Konyaaltı", lat: 36.864, lng: 30.642 },
  { city: "Antalya", neighborhood: "Lara", lat: 36.851, lng: 30.836 },
  { city: "Bodrum", neighborhood: "Yalıkavak", lat: 37.105, lng: 27.292 },
  { city: "Bodrum", neighborhood: "Türkbükü", lat: 37.117, lng: 27.354 },
  { city: "Izmir", neighborhood: "Çeşme", lat: 38.323, lng: 26.305 },
  { city: "Izmir", neighborhood: "Alaçatı", lat: 38.279, lng: 26.376 },
  { city: "Ankara", neighborhood: "Çankaya", lat: 39.908, lng: 32.862 },
  { city: "Bursa", neighborhood: "Nilüfer", lat: 40.214, lng: 28.985 },
  { city: "Fethiye", neighborhood: "Ölüdeniz", lat: 36.553, lng: 29.131 },
  { city: "Fethiye", neighborhood: "Kalkan", lat: 36.265, lng: 29.413 },
  { city: "Cappadocia", neighborhood: "Göreme", lat: 38.642, lng: 34.829 },
  { city: "Cappadocia", neighborhood: "Uçhisar", lat: 38.629, lng: 34.806 },
  { city: "Istanbul", neighborhood: "Etiler", lat: 41.082, lng: 29.029 },
  { city: "Antalya", neighborhood: "Kaleiçi", lat: 36.884, lng: 30.704 },
  { city: "Bodrum", neighborhood: "Gümüşlük", lat: 37.085, lng: 27.232 },
  { city: "Izmir", neighborhood: "Karşıyaka", lat: 38.456, lng: 27.111 },
  { city: "Fethiye", neighborhood: "Hisarönü", lat: 36.561, lng: 29.158 },
];

const types: PropertyType[] = ["Villa", "Penthouse", "Mansion", "Apartment"];

const titles = [
  "Bosphorus Crystal Residence", "Skyline Penthouse Sanctuary",
  "Aegean Cliffside Villa", "Marina View Mansion",
  "Olive Grove Estate", "Sunset Pearl Villa",
  "Heritage Stone Mansion", "Cappadocian Cave Suite",
  "Imperial Garden Penthouse", "Coastal Mirage Villa",
  "Lara Beachfront Residence", "Yalıkavak Bay House",
  "Alaçatı Windmill Estate", "Çankaya Diplomatic Villa",
  "Nilüfer Modern Loft", "Kalkan Infinity Villa",
  "Göreme Skyview Suite", "Etiler Glass Tower",
  "Kaleiçi Ottoman Mansion", "Karşıyaka Marina Apartment",
];

const descriptions = [
  "An architectural masterpiece offering panoramic vistas, fusing contemporary luxury with timeless craftsmanship.",
  "Curated to perfection — handpicked Italian marble, smart-home automation, and bespoke interiors throughout.",
  "Wake up to the sound of the Mediterranean. Floor-to-ceiling glass invites the horizon into every room.",
  "A private sanctuary where minimalist elegance meets uncompromising comfort and discreet world-class service.",
];

export const PROPERTIES: Property[] = cities.map((loc, i) => {
  const heroIdx = i % HEROES.length;
  const gallery = [
    img(HEROES[heroIdx]),
    img(INTERIORS[i % INTERIORS.length]),
    img(INTERIORS[(i + 1) % INTERIORS.length]),
    img(HEROES[(heroIdx + 3) % HEROES.length]),
    img(INTERIORS[(i + 2) % INTERIORS.length]),
  ];
  const beds = 2 + (i % 6);
  const baths = 2 + (i % 4);
  const areaM2 = 180 + i * 45;
  const amenities = AMENITIES_POOL.filter((_, idx) => (idx + i) % 2 === 0).slice(0, 7);
  return {
    id: `prop-${i + 1}`,
    title: titles[i],
    city: loc.city,
    neighborhood: loc.neighborhood,
    price: 450000 + i * 175000,
    currency: i % 3 === 0 ? "EUR" : i % 3 === 1 ? "USD" : "TRY",
    type: types[i % types.length],
    listing: i % 5 === 0 ? "rent" : "sale",
    beds, baths, areaM2,
    amenities,
    description: descriptions[i % descriptions.length] + " " + descriptions[(i + 1) % descriptions.length],
    images: gallery,
    coords: { lat: loc.lat, lng: loc.lng },
    agentId: `agent-${(i % 6) + 1}`,
    featured: i < 6,
    yearBuilt: 2018 + (i % 7),
  };
});

export const getPropertyById = (id: string) => PROPERTIES.find((p) => p.id === id);
export const getSimilarProperties = (id: string, limit = 3) => {
  const p = getPropertyById(id);
  if (!p) return [];
  return PROPERTIES.filter((x) => x.id !== id && (x.city === p.city || x.type === p.type)).slice(0, limit);
};
