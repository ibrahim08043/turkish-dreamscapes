import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone, Star } from "lucide-react";
import { AGENTS } from "@/data/agents";
import { Reveal } from "@/components/ui/reveal";

export function AgentsPreview() {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">The Atelier</p>
          <h2 className="font-display text-4xl md:text-6xl">Meet our <span className="italic text-gradient-gold">advisors</span></h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {AGENTS.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl overflow-hidden bg-card border shadow-elegant group"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={a.photo} alt={a.name} loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="font-display text-base">{a.name}</div>
                  <div className="text-[11px] opacity-80">{a.title}</div>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1"><Star className="size-3 text-gold fill-gold" />{a.rating}</span>
                <span className="text-muted-foreground">{a.deals} deals</span>
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal className="text-center mt-12">
          <Link to="/agents" className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm hover:bg-gold/10 transition-colors">
            <Phone className="size-4" /> View all advisors
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
