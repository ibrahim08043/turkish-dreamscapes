import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Globe2, HeartHandshake, ShieldCheck } from "lucide-react";
import { STATS } from "@/data/content";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Nuralux" },
      { name: "description", content: "Curating Türkiye's most distinguished addresses since 2008." },
      { property: "og:title", content: "About Nuralux" },
      { property: "og:description", content: "A boutique luxury real estate atelier with offices in Istanbul, Bodrum and London." },
    ],
  }),
  component: About,
});

const VALUES = [
  { icon: ShieldCheck, title: "Discretion", text: "Off-market access and absolute confidentiality, end to end." },
  { icon: HeartHandshake, title: "Concierge Service", text: "Personalized white-glove care from search to closing." },
  { icon: Globe2, title: "Global Reach", text: "International team serving clients across 38 countries." },
  { icon: Award, title: "Curation", text: "Only 4% of properties we evaluate enter our portfolio." },
];

function About() {
  return (
    <div>
      <section className="relative pt-40 pb-24 px-4 md:px-8 overflow-hidden">
        <motion.div initial={{ scale: 1.15, opacity: 0 }} animate={{ scale: 1, opacity: 0.4 }} transition={{ duration: 1.5 }}
          className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
            alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        </motion.div>
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">About Nuralux</p>
            <h1 className="font-display text-5xl md:text-7xl">A different kind of <span className="italic text-gradient-gold">real estate</span></h1>
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Founded in 2008, Nuralux is a boutique luxury real estate atelier dedicated to Türkiye's most exclusive addresses —
              from Bosphorus mansions to Aegean cliffside villas and Cappadocian heritage retreats.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="rounded-3xl overflow-hidden shadow-luxury">
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                alt="Bodrum villa" className="w-full h-[500px] object-cover" />
            </div>
          </Reveal>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Our story</p>
            <h2 className="font-display text-4xl md:text-5xl mb-6">Built on relationships, <span className="italic text-gradient-gold">not transactions</span></h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>What began as a single advisor in Bebek, Istanbul, has grown into Türkiye's most discreet luxury atelier — with offices across Bodrum, Antalya, and London.</p>
              <p>Our philosophy is simple: we represent fewer than 200 properties at any time, and every listing is personally inspected, photographed, and curated by our senior advisors.</p>
              <p>The result is a collection that reflects not just architectural excellence — but the cultural soul of Türkiye itself.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 md:px-8 py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Our values</p>
            <h2 className="font-display text-4xl md:text-5xl">What sets us <span className="italic text-gradient-gold">apart</span></h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}
                className="p-7 rounded-2xl glass shadow-elegant"
              >
                <div className="size-12 rounded-xl bg-gradient-luxury flex items-center justify-center mb-4 shadow-luxury">
                  <v.icon className="size-5 text-gold-foreground" />
                </div>
                <h3 className="font-display text-xl mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 py-20">
        <div className="max-w-6xl mx-auto p-10 md:p-16 rounded-3xl bg-gradient-to-br from-card to-muted/40 border shadow-elegant">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {STATS.map((s) => (
              <Reveal key={s.label} className="text-center">
                <div className="font-display text-4xl md:text-6xl text-gradient-gold">
                  <AnimatedCounter value={s.value} suffix={s.suffix ?? ""} />
                </div>
                <div className="mt-2 text-xs md:text-sm uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 py-20 text-center">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl">Begin your <span className="italic text-gradient-gold">journey</span></h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">A private consultation with one of our advisors is the first step.</p>
          <div className="mt-8 inline-block">
            <Link to="/contact"><MagneticButton>Speak with an Advisor</MagneticButton></Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
