import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { PROPERTIES } from "@/data/properties";
import { PropertyCard } from "@/components/property/property-card";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Saved Properties — Nuralux" },
      { name: "description", content: "Your private collection of saved luxury properties." },
    ],
  }),
  component: Favorites,
});

function Favorites() {
  const { ids } = useFavorites();
  const saved = PROPERTIES.filter((p) => ids.includes(p.id));

  return (
    <div className="pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Your Collection</p>
          <h1 className="font-display text-5xl md:text-7xl">Saved <span className="italic text-gradient-gold">Properties</span></h1>
          <p className="mt-4 text-muted-foreground">
            {saved.length === 0 ? "Build your private shortlist of dream homes." : `${saved.length} curated residence${saved.length === 1 ? "" : "s"} in your collection.`}
          </p>
        </Reveal>

        {saved.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 rounded-3xl border bg-card">
            <div className="size-20 mx-auto rounded-full glass flex items-center justify-center mb-5">
              <Heart className="size-8 text-gold" />
            </div>
            <h2 className="font-display text-3xl mb-3">Nothing saved yet</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Tap the heart icon on any property to add it to your private collection.
            </p>
            <Link to="/properties"><MagneticButton>Browse Properties</MagneticButton></Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {saved.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
