export type LocationCard = {
  city: string;
  tagline: string;
  image: string;
  properties: number;
};

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const LOCATIONS: LocationCard[] = [
  { city: "Istanbul", tagline: "Where two continents meet", image: img("photo-1524231757912-21f4fe3a7200"), properties: 248 },
  { city: "Antalya", tagline: "Turquoise coastline living", image: img("photo-1589561253831-b8421dd58261"), properties: 162 },
  { city: "Bodrum", tagline: "The Aegean's white pearl", image: img("photo-1605649487212-47bdab064df7"), properties: 134 },
  { city: "Izmir", tagline: "Modern coastal elegance", image: img("photo-1605648916361-9bc12ad6a569"), properties: 98 },
  { city: "Ankara", tagline: "Capital sophistication", image: img("photo-1589834390005-5d4fb9bf3d32"), properties: 76 },
  { city: "Bursa", tagline: "Green Ottoman heritage", image: img("photo-1635445522050-c43e15b6c6f2"), properties: 54 },
  { city: "Fethiye", tagline: "Hidden bays & blue lagoons", image: img("photo-1565008447742-97f6f38c985c"), properties: 87 },
  { city: "Cappadocia", tagline: "Surreal stone landscapes", image: img("photo-1641893308556-c4aab2a85a2a"), properties: 41 },
];
