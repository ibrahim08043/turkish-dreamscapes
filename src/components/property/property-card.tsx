import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bath, BedDouble, Heart, MapPin, Maximize2 } from "lucide-react";
import { type Property } from "@/data/properties";
import { useFavorites } from "@/hooks/useFavorites";
import { formatArea, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  const { has, toggle } = useFavorites();
  const fav = has(property.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      <Link
        to="/properties/$id"
        params={{ id: property.id }}
        className="block rounded-2xl overflow-hidden bg-card border shadow-elegant hover:shadow-luxury transition-shadow duration-500"
      >
        <div className="relative h-72 overflow-hidden">
          <motion.img
            layoutId={`property-image-${property.id}`}
            src={property.images[0]}
            alt={property.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium glass">
              {property.type}
            </span>
            {property.featured && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-luxury text-gold-foreground">
                Featured
              </span>
            )}
          </div>

          <button
            onClick={(e) => { e.preventDefault(); toggle(property.id); }}
            aria-label="Toggle favorite"
            className="absolute top-4 right-4 size-10 rounded-full glass flex items-center justify-center"
          >
            <motion.span
              animate={fav ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Heart className={cn("size-4 transition-colors", fav && "fill-destructive text-destructive")} />
            </motion.span>
          </button>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            className="absolute bottom-4 left-4 right-4 flex justify-between items-end"
          >
            <div className="text-white">
              <div className="flex items-center gap-1 text-xs opacity-90">
                <MapPin className="size-3" />
                {property.neighborhood}, {property.city}
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-gradient-luxury text-gold-foreground text-sm font-semibold shadow-luxury">
              {formatPrice(property.price, property.currency)}
            </div>
          </motion.div>
        </div>

        <div className="p-5 space-y-3">
          <h3 className="font-display text-lg leading-tight line-clamp-1">{property.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{property.neighborhood}, {property.city}</p>
          <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground border-t">
            <span className="flex items-center gap-1.5 pt-3"><BedDouble className="size-4 text-gold" /> {property.beds} Beds</span>
            <span className="flex items-center gap-1.5 pt-3"><Bath className="size-4 text-gold" /> {property.baths} Baths</span>
            <span className="flex items-center gap-1.5 pt-3"><Maximize2 className="size-4 text-gold" /> {formatArea(property.areaM2)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
