import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { LOCATIONS } from "@/data/locations";
import { Reveal } from "@/components/ui/reveal";

export function LocationsSection() {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Destinations</p>
          <h2 className="font-display text-4xl md:text-6xl">Explore <span className="italic text-gradient-gold">Türkiye</span></h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            From Bosphorus shores to Aegean coastlines — eight legendary destinations curated for the world's most discerning.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {LOCATIONS.map((loc, i) => (
            <motion.div
              key={loc.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
            >
              <Link
                to="/properties"
                search={{ city: loc.city }}
                className="relative block h-72 md:h-96 rounded-2xl overflow-hidden group"
              >
                <img src={loc.image} alt={loc.city} loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                  <div className="text-[10px] uppercase tracking-[0.3em] opacity-80">{loc.properties} listings</div>
                  <h3 className="font-display text-2xl md:text-3xl mt-1">{loc.city}</h3>
                  <p className="text-sm opacity-80 italic">{loc.tagline}</p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="mt-3 inline-flex items-center gap-1 text-xs text-gold group-hover:opacity-100 opacity-0 transition-all"
                  >
                    Discover <ArrowUpRight className="size-3" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
