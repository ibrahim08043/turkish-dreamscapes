export type Agent = {
  id: string;
  name: string;
  title: string;
  city: string;
  phone: string;
  email: string;
  whatsapp: string;
  photo: string;
  bio: string;
  languages: string[];
  deals: number;
  rating: number;
};

const portrait = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

export const AGENTS: Agent[] = [
  { id: "agent-1", name: "Selin Aydın", title: "Senior Luxury Advisor", city: "Istanbul",
    phone: "+90 532 100 1001", email: "selin@nuralux.com", whatsapp: "+905321001001",
    photo: portrait("photo-1573496359142-b8d87734a5a2"),
    bio: "12 years curating Bosphorus residences for international clientele.",
    languages: ["Turkish", "English", "French"], deals: 184, rating: 4.9 },
  { id: "agent-2", name: "Emre Demir", title: "Riviera Specialist", city: "Antalya",
    phone: "+90 532 100 1002", email: "emre@nuralux.com", whatsapp: "+905321001002",
    photo: portrait("photo-1507003211169-0a1dd7228f2d"),
    bio: "Antalya-born expert in beachfront and resort living investments.",
    languages: ["Turkish", "English", "Russian"], deals: 142, rating: 4.8 },
  { id: "agent-3", name: "Defne Kaya", title: "Aegean Estates Director", city: "Bodrum",
    photo: portrait("photo-1580489944761-15a19d654956"), phone: "+90 532 100 1003",
    email: "defne@nuralux.com", whatsapp: "+905321001003",
    bio: "Specializes in private villas across Yalıkavak and Türkbükü.",
    languages: ["Turkish", "English", "German"], deals: 167, rating: 5.0 },
  { id: "agent-4", name: "Kerem Yılmaz", title: "Investment Strategist", city: "Izmir",
    photo: portrait("photo-1500648767791-00dcc994a43e"), phone: "+90 532 100 1004",
    email: "kerem@nuralux.com", whatsapp: "+905321001004",
    bio: "Advises HNW clients on yield-driven Aegean coastline portfolios.",
    languages: ["Turkish", "English", "Spanish"], deals: 96, rating: 4.7 },
  { id: "agent-5", name: "Aylin Şahin", title: "Capital Properties Lead", city: "Ankara",
    photo: portrait("photo-1438761681033-6461ffad8d80"), phone: "+90 532 100 1005",
    email: "aylin@nuralux.com", whatsapp: "+905321001005",
    bio: "Diplomatic district specialist with global relocation expertise.",
    languages: ["Turkish", "English", "Arabic"], deals: 121, rating: 4.9 },
  { id: "agent-6", name: "Mert Öztürk", title: "Heritage Estates Curator", city: "Cappadocia",
    photo: portrait("photo-1472099645785-5658abf4ff4e"), phone: "+90 532 100 1006",
    email: "mert@nuralux.com", whatsapp: "+905321001006",
    bio: "Boutique cave hotels, heritage homes and unique architectural retreats.",
    languages: ["Turkish", "English", "Italian"], deals: 78, rating: 4.9 },
];

export const getAgentById = (id: string) => AGENTS.find((a) => a.id === id) ?? AGENTS[0];
