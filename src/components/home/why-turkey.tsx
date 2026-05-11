import { motion } from "framer-motion";
import { Award, Globe2, ShieldCheck, TrendingUp } from "lucide-react";
import { STATS } from "@/data/content";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Reveal } from "@/components/ui/reveal";

const REASONS = [
  { icon: TrendingUp, title: "Strong Capital Growth", text: "Turkish luxury real estate has outperformed global averages for the past decade." },
  { icon: Globe2, title: "Strategic Location", text: "A global crossroads bridging Europe, Asia & the Middle East." },
  { icon: ShieldCheck, title: "Citizenship by Investment", text: "Qualifying investments grant Turkish citizenship within months." },
  { icon: Award, title: "Discreet White-Glove Service", text: "End-to-end concierge from search to closing and beyond." },
];

export function WhyTurkey() {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">The Investment Case</p>
          <h2 className="font-display text-4xl md:text-6xl">Why Invest in <span className="italic text-gradient-gold">Türkiye</span></h2>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="p-7 rounded-2xl glass shadow-elegant"
            >
              <div className="size-12 rounded-xl bg-gradient-luxury flex items-center justify-center mb-5 shadow-luxury">
                <r.icon className="size-5 text-gold-foreground" />
              </div>
              <h3 className="font-display text-xl mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-card to-muted/40 border shadow-elegant">
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
  );
}
