import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Bath, BedDouble, Calendar, Check, Heart, MapPin, Maximize2, MessageSquare, Phone, Star, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getAgentById } from "@/data/agents";
import { getPropertyById, getSimilarProperties } from "@/data/properties";
import { PropertyCard } from "@/components/property/property-card";
import { Reveal, staggerContainer, staggerItem } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFavorites } from "@/hooks/useFavorites";
import { formatArea, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/properties/$id")({
  loader: ({ params }) => {
    const property = getPropertyById(params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.property.title} — Nuralux` },
      { name: "description", content: loaderData?.property.description.slice(0, 160) },
      { property: "og:title", content: `${loaderData?.property.title} — Nuralux` },
      { property: "og:description", content: loaderData?.property.description.slice(0, 160) },
      { property: "og:image", content: loaderData?.property.images[0] },
      { name: "twitter:image", content: loaderData?.property.images[0] },
    ],
  }),
  notFoundComponent: () => (
    <div className="pt-40 text-center">
      <h1 className="font-display text-4xl">Property not found</h1>
      <Link to="/properties" className="text-gold mt-4 inline-block">Browse all properties</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="pt-40 text-center">
      <p className="text-destructive">{error.message}</p>
      <button onClick={reset} className="text-gold mt-4">Retry</button>
    </div>
  ),
  component: PropertyDetails,
});

function PropertyDetails() {
  const { property } = Route.useLoaderData();
  const agent = getAgentById(property.agentId);
  const similar = getSimilarProperties(property.id, 3);
  const { has, toggle } = useFavorites();
  const fav = has(property.id);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  // Mortgage calc
  const [downPct, setDownPct] = useState(20);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(7);
  const principal = property.price * (1 - downPct / 100);
  const r = rate / 100 / 12;
  const n = years * 12;
  const monthly = r > 0 ? (principal * r) / (1 - Math.pow(1 + r, -n)) : principal / n;

  return (
    <div className="pt-24 pb-20">
      {/* Gallery */}
      <section className="px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/properties" className="text-sm text-muted-foreground hover:text-gold transition-colors">
            ← Back to portfolio
          </Link>
          <div className="grid md:grid-cols-4 gap-3 mt-6 h-[60vh] md:h-[70vh]">
            <motion.button
              layoutId={`property-image-${property.id}`}
              onClick={() => setLightbox(activeImg)}
              className="md:col-span-3 relative rounded-2xl overflow-hidden cursor-zoom-in"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={property.images[activeImg]}
                  alt={property.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </motion.button>
            <div className="grid grid-cols-4 md:grid-cols-1 gap-3">
              {property.images.slice(0, 4).map((src: string, i: number) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={cn("relative rounded-xl overflow-hidden transition-all",
                    activeImg === i ? "ring-2 ring-gold" : "opacity-70 hover:opacity-100")}>
                  <img src={src} alt="" className="w-full h-full object-cover aspect-square md:aspect-auto" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Header & Content */}
      <section className="px-4 md:px-8 mt-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_380px] gap-12">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="size-4 text-gold" /> {property.neighborhood}, {property.city}
                  </div>
                  <h1 className="font-display text-4xl md:text-6xl">{property.title}</h1>
                </div>
                <button onClick={() => { toggle(property.id); toast.success(fav ? "Removed from favorites" : "Saved to favorites"); }}
                  className="size-12 rounded-full glass flex items-center justify-center">
                  <Heart className={cn("size-5", fav && "fill-destructive text-destructive")} />
                </button>
              </div>
            </Reveal>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 p-6 rounded-2xl bg-card border shadow-elegant">
              {[
                { icon: BedDouble, label: "Bedrooms", value: property.beds },
                { icon: Bath, label: "Bathrooms", value: property.baths },
                { icon: Maximize2, label: "Area", value: formatArea(property.areaM2) },
                { icon: Calendar, label: "Year built", value: property.yearBuilt },
              ].map((s) => (
                <motion.div key={s.label} variants={staggerItem} className="text-center">
                  <s.icon className="size-5 mx-auto text-gold mb-2" />
                  <div className="font-display text-2xl">{s.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <Tabs defaultValue="overview" className="mt-10">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="mortgage">Mortgage</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Reveal>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {property.description} The estate offers an unrivaled combination of architectural pedigree, cutting-edge automation,
                    and uninterrupted views, designed for the most discerning lifestyle.
                  </p>
                </Reveal>

                {/* Video section */}
                <Reveal className="mt-8">
                  <div className="relative rounded-2xl overflow-hidden aspect-video bg-card group cursor-pointer">
                    <img src={property.images[1]} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <motion.div whileHover={{ scale: 1.1 }} className="size-20 rounded-full bg-gradient-luxury flex items-center justify-center shadow-luxury">
                        <div className="ml-1 w-0 h-0 border-y-[12px] border-y-transparent border-l-[18px] border-l-gold-foreground" />
                      </motion.div>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white text-sm uppercase tracking-wider">Cinematic Property Tour</div>
                  </div>
                </Reveal>
              </TabsContent>

              <TabsContent value="amenities" className="mt-6">
                <motion.div variants={staggerContainer} initial="hidden" animate="show"
                  className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((a: string) => (
                    <motion.div key={a} variants={staggerItem}
                      className="flex items-center gap-2 p-3 rounded-xl bg-card border">
                      <div className="size-7 rounded-full bg-gradient-luxury flex items-center justify-center">
                        <Check className="size-3.5 text-gold-foreground" />
                      </div>
                      <span className="text-sm">{a}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="mortgage" className="mt-6">
                <div className="p-6 rounded-2xl bg-card border space-y-5">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Down payment</span><span className="text-gold font-medium">{downPct}%</span>
                    </div>
                    <input type="range" min={5} max={60} value={downPct} onChange={(e) => setDownPct(+e.target.value)}
                      className="w-full accent-[oklch(0.78_0.14_80)]" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Term</span><span className="text-gold font-medium">{years} years</span>
                    </div>
                    <input type="range" min={5} max={30} value={years} onChange={(e) => setYears(+e.target.value)}
                      className="w-full accent-[oklch(0.78_0.14_80)]" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Interest rate</span><span className="text-gold font-medium">{rate}%</span>
                    </div>
                    <input type="range" min={2} max={15} step={0.25} value={rate} onChange={(e) => setRate(+e.target.value)}
                      className="w-full accent-[oklch(0.78_0.14_80)]" />
                  </div>
                  <div className="pt-4 border-t flex justify-between items-end">
                    <span className="text-sm text-muted-foreground">Estimated monthly</span>
                    <span className="font-display text-3xl text-gradient-gold">{formatPrice(Math.round(monthly), property.currency)}</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="map" className="mt-6">
                <div className="relative rounded-2xl overflow-hidden border h-96">
                  <iframe
                    title="Property location"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.coords.lng - 0.02}%2C${property.coords.lat - 0.02}%2C${property.coords.lng + 0.02}%2C${property.coords.lat + 0.02}&layer=mapnik&marker=${property.coords.lat}%2C${property.coords.lng}`}
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sticky Sidebar */}
          <aside>
            <div className="sticky top-28 space-y-5">
              <Reveal>
                <div className="p-6 rounded-2xl bg-card border shadow-luxury">
                  <div className="text-xs uppercase tracking-wider text-gold">{property.listing === "rent" ? "Monthly Rental" : "Asking Price"}</div>
                  <div className="font-display text-4xl text-gradient-gold mt-1">
                    {formatPrice(property.price, property.currency)}
                  </div>
                  <Link to="/booking/$id" params={{ id: property.id }} className="block mt-5">
                    <MagneticButton className="w-full">
                      <Calendar className="size-4" /> Schedule a Visit
                    </MagneticButton>
                  </Link>
                  <button onClick={() => toast.success("Inquiry sent — our advisor will reach out shortly.")}
                    className="mt-3 w-full py-3 rounded-full border text-sm hover:bg-muted transition-colors flex items-center justify-center gap-2">
                    <MessageSquare className="size-4" /> Request Information
                  </button>
                </div>
              </Reveal>

              <Reveal>
                <div className="p-6 rounded-2xl bg-card border">
                  <div className="text-xs uppercase tracking-wider text-gold mb-4">Listed by</div>
                  <Link to="/agents" className="flex items-start gap-4 group">
                    <img src={agent.photo} alt={agent.name} className="size-16 rounded-full object-cover ring-2 ring-gold/40" />
                    <div className="flex-1">
                      <div className="font-display text-lg group-hover:text-gold transition-colors">{agent.name}</div>
                      <div className="text-xs text-muted-foreground">{agent.title}</div>
                      <div className="flex items-center gap-1 text-xs mt-1">
                        <Star className="size-3 text-gold fill-gold" />{agent.rating} · {agent.deals} deals
                      </div>
                    </div>
                  </Link>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <a href={`tel:${agent.phone}`} className="flex items-center justify-center gap-1 py-2 rounded-full bg-muted text-xs hover:bg-gold/20 transition-colors">
                      <Phone className="size-3" /> Call
                    </a>
                    <a href={`https://wa.me/${agent.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"
                      className="flex items-center justify-center gap-1 py-2 rounded-full bg-muted text-xs hover:bg-gold/20 transition-colors">
                      <MessageSquare className="size-3" /> WhatsApp
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="px-4 md:px-8 mt-24">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-10">
              <h2 className="font-display text-3xl md:text-5xl">Similar <span className="italic text-gradient-gold">residences</span></h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similar.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}>
            <button className="absolute top-6 right-6 size-12 rounded-full glass flex items-center justify-center text-white">
              <X className="size-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              src={property.images[lightbox]} alt="" className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
