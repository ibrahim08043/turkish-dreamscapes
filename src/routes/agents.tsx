import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone, Star } from "lucide-react";
import { AGENTS } from "@/data/agents";
import { Reveal } from "@/components/ui/reveal";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Our Advisors — Nuralux" },
      { name: "description", content: "Meet our luxury real estate advisors across Türkiye." },
      { property: "og:title", content: "Our Advisors — Nuralux" },
      { property: "og:description", content: "World-class advisors for Türkiye's most distinguished addresses." },
    ],
  }),
  component: AgentsPage,
});

function AgentsPage() {
  return (
    <div className="pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">The Atelier</p>
          <h1 className="font-display text-5xl md:text-7xl">Our <span className="italic text-gradient-gold">advisors</span></h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A curated team of senior advisors fluent in the language of luxury — and the cultures of our international clientele.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AGENTS.map((a, i) => (
            <motion.div key={a.id}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.7 }} whileHover={{ y: -8 }}
              className="rounded-2xl overflow-hidden bg-card border shadow-elegant group"
            >
              <div className="relative h-80 overflow-hidden">
                <img src={a.photo} alt={a.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[10px] uppercase tracking-[0.3em] opacity-80">{a.title}</div>
                  <h3 className="font-display text-2xl mt-1">{a.name}</h3>
                  <div className="flex items-center gap-3 text-xs mt-2 opacity-90">
                    <span className="flex items-center gap-1"><Star className="size-3 fill-gold text-gold" />{a.rating}</span>
                    <span>·</span>
                    <span>{a.deals} deals</span>
                    <span>·</span>
                    <span>{a.city}</span>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <p className="text-sm text-muted-foreground">{a.bio}</p>
                <div className="flex flex-wrap gap-1">
                  {a.languages.map((l) => (
                    <span key={l} className="text-[11px] px-2 py-0.5 rounded-full bg-muted">{l}</span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <a href={`tel:${a.phone}`} className="flex items-center justify-center gap-1 py-2 rounded-full bg-muted text-xs hover:bg-gold/20 transition-colors">
                    <Phone className="size-3" /> Call
                  </a>
                  <a href={`mailto:${a.email}`} className="flex items-center justify-center gap-1 py-2 rounded-full bg-muted text-xs hover:bg-gold/20 transition-colors">
                    <Mail className="size-3" />
                  </a>
                  <a href={`https://wa.me/${a.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"
                    className="flex items-center justify-center gap-1 py-2 rounded-full bg-muted text-xs hover:bg-gold/20 transition-colors">
                    <MessageCircle className="size-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
