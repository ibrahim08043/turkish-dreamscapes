import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Search, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { MagneticButton } from "@/components/ui/magnetic-button";

const HERO_BG = "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=2400&q=85";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={HERO_BG} alt="Bosphorus skyline" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass w-fit text-xs uppercase tracking-[0.2em] text-white/90"
        >
          <Sparkles className="size-3 text-gold" />
          Curated Luxury · Türkiye
        </motion.div>

        <h1 className="mt-6 font-display text-white text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-4xl">
          {"Where Legacy".split(" ").map((w, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-3"
            >{w}</motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="text-gradient-gold italic font-normal"
          >meets Horizon</motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-6 max-w-xl text-white/80 text-lg"
        >
          Turkey's most distinguished residences — Bosphorus mansions, Aegean villas,
          and skyline penthouses — privately curated for discerning collectors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link to="/properties">
            <MagneticButton>
              <Search className="size-4" />
              Explore Portfolio
            </MagneticButton>
          </Link>
          <Link to="/contact" className="px-6 py-3 rounded-full glass text-white text-sm hover:bg-white/15 transition-colors">
            Speak with an Advisor
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="size-4" />
      </motion.div>
    </section>
  );
}
