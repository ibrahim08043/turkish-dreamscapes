import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PROPERTIES } from "@/data/properties";
import { PropertyCard } from "@/components/property/property-card";
import { Reveal } from "@/components/ui/reveal";

export function FeaturedProperties() {
  const featured = PROPERTIES.filter((p) => p.featured).slice(0, 6);
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Signature Listings</p>
            <h2 className="font-display text-4xl md:text-6xl">Featured <span className="italic text-gradient-gold">Residences</span></h2>
          </div>
          <Link to="/properties" className="inline-flex items-center gap-2 text-sm font-medium hover:text-gold transition-colors">
            View all <ArrowRight className="size-4" />
          </Link>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
