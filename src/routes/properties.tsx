import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { PROPERTIES, type TurkishCity } from "@/data/properties";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyCardSkeleton } from "@/components/ui/skeleton-card";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  city: z.string().optional(),
  type: z.string().optional(),
  listing: z.enum(["sale", "rent", "all"]).optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/properties")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Properties — Nuralux" },
      { name: "description", content: "Browse our curated portfolio of luxury properties across Türkiye." },
      { property: "og:title", content: "Luxury Property Portfolio — Nuralux" },
      { property: "og:description", content: "Villas, penthouses and estates across Istanbul, Bodrum, Antalya & beyond." },
    ],
  }),
  component: Properties,
});

const CITIES: TurkishCity[] = ["Istanbul", "Antalya", "Bodrum", "Izmir", "Ankara", "Bursa", "Fethiye", "Cappadocia"];
const TYPES = ["Villa", "Apartment", "Penthouse", "Mansion"];
const AMENITIES = ["Private Pool", "Sea View", "Smart Home", "Spa & Sauna", "Private Beach", "Helipad", "Wine Cellar", "Home Cinema"];

function Properties() {
  const search = Route.useSearch();
  const [city, setCity] = useState<string>(search.city ?? "all");
  const [type, setType] = useState<string>(search.type ?? "all");
  const [listing, setListing] = useState<"all" | "sale" | "rent">(search.listing ?? "all");
  const [beds, setBeds] = useState<number>(0);
  const [baths, setBaths] = useState<number>(0);
  const [price, setPrice] = useState<number[]>([0, 5000000]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [q, setQ] = useState(search.q ?? "");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return PROPERTIES.filter((p) => {
      if (city !== "all" && p.city !== city) return false;
      if (type !== "all" && p.type !== type) return false;
      if (listing !== "all" && p.listing !== listing) return false;
      if (beds > 0 && p.beds < beds) return false;
      if (baths > 0 && p.baths < baths) return false;
      if (p.price < price[0] || p.price > price[1]) return false;
      if (amenities.length && !amenities.every((a) => p.amenities.includes(a))) return false;
      if (q && !`${p.title} ${p.city} ${p.neighborhood}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [city, type, listing, beds, baths, price, amenities, q]);

  const toggleAmenity = (a: string) =>
    setAmenities((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));

  const FiltersPanel = (
    <div className="space-y-7">
      <div>
        <div className="text-xs uppercase tracking-wider text-gold mb-3">Listing</div>
        <div className="grid grid-cols-3 gap-2 p-1 rounded-full bg-muted">
          {(["all", "sale", "rent"] as const).map((l) => (
            <button key={l} onClick={() => setListing(l)}
              className={cn("rounded-full text-xs py-2 capitalize transition-colors",
                listing === l ? "bg-gradient-luxury text-gold-foreground shadow-luxury" : "text-muted-foreground hover:text-foreground")}>
              {l === "all" ? "All" : l === "sale" ? "Buy" : "Rent"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wider text-gold mb-3">City</div>
        <select value={city} onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold">
          <option value="all">All cities</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wider text-gold mb-3">Type</div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setType("all")}
            className={cn("px-3 py-1.5 rounded-full text-xs border transition-colors",
              type === "all" ? "bg-gradient-luxury text-gold-foreground border-transparent" : "hover:bg-muted")}>All</button>
          {TYPES.map((t) => (
            <button key={t} onClick={() => setType(t)}
              className={cn("px-3 py-1.5 rounded-full text-xs border transition-colors",
                type === t ? "bg-gradient-luxury text-gold-foreground border-transparent" : "hover:bg-muted")}>{t}</button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs uppercase tracking-wider text-gold mb-3">
          <span>Price</span>
          <span className="text-muted-foreground normal-case tracking-normal">
            {formatPrice(price[0])} – {formatPrice(price[1])}
          </span>
        </div>
        <Slider value={price} onValueChange={setPrice} min={0} max={5000000} step={50000} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-gold mb-3">Beds</div>
          <div className="flex gap-1">
            {[0, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setBeds(n)}
                className={cn("flex-1 py-2 rounded-lg text-xs border transition-colors",
                  beds === n ? "bg-gradient-luxury text-gold-foreground border-transparent" : "hover:bg-muted")}>
                {n === 0 ? "Any" : `${n}+`}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-gold mb-3">Baths</div>
          <div className="flex gap-1">
            {[0, 2, 3, 4].map((n) => (
              <button key={n} onClick={() => setBaths(n)}
                className={cn("flex-1 py-2 rounded-lg text-xs border transition-colors",
                  baths === n ? "bg-gradient-luxury text-gold-foreground border-transparent" : "hover:bg-muted")}>
                {n === 0 ? "Any" : `${n}+`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wider text-gold mb-3">Amenities</div>
        <div className="flex flex-wrap gap-2">
          {AMENITIES.map((a) => (
            <button key={a} onClick={() => toggleAmenity(a)}
              className={cn("px-3 py-1.5 rounded-full text-xs border transition-colors",
                amenities.includes(a) ? "bg-gradient-luxury text-gold-foreground border-transparent" : "hover:bg-muted")}>
              {a}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Portfolio</p>
          <h1 className="font-display text-5xl md:text-7xl">Discover <span className="italic text-gradient-gold">Properties</span></h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            {filtered.length} curated residences across Türkiye's most coveted addresses.
          </p>
        </motion.div>

        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, city, neighborhood..."
              className="w-full pl-11 pr-4 py-3 rounded-full glass border outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 text-sm transition-all" />
          </div>
          <button onClick={() => setDrawerOpen(true)}
            className="lg:hidden px-4 py-3 rounded-full glass flex items-center gap-2 text-sm">
            <SlidersHorizontal className="size-4" /> Filters
          </button>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-28 p-6 rounded-2xl border bg-card shadow-elegant">
              {FiltersPanel}
            </div>
          </aside>

          <div>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24 rounded-2xl border bg-card">
                <p className="font-display text-2xl">No matches found</p>
                <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters.</p>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filtered.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setDrawerOpen(false)} />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 h-full w-[85%] max-w-md bg-card border-r p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display text-xl">Filters</h3>
                <button onClick={() => setDrawerOpen(false)} className="size-9 rounded-full glass flex items-center justify-center">
                  <X className="size-4" />
                </button>
              </div>
              {FiltersPanel}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
