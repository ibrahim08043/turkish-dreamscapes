import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import { TESTIMONIALS } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const prev = () => setI((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setI((p) => (p + 1) % TESTIMONIALS.length);

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Voices of Our Clients</p>
          <h2 className="font-display text-4xl md:text-6xl mb-12">A <span className="italic text-gradient-gold">trusted</span> partner</h2>
        </Reveal>

        <div className="relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Quote className="size-12 mx-auto text-gold opacity-40" />
              <p className="font-display text-2xl md:text-3xl leading-relaxed italic">"{t.quote}"</p>
              <div className="flex flex-col items-center gap-3">
                <img src={t.photo} alt={t.name} className="size-14 rounded-full object-cover ring-2 ring-gold/40" />
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-10">
          <button onClick={prev} aria-label="Previous" className="size-11 rounded-full glass flex items-center justify-center hover:bg-gold/10">
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-gradient-luxury" : "w-1.5 bg-muted-foreground/30"}`} />
            ))}
          </div>
          <button onClick={next} aria-label="Next" className="size-11 rounded-full glass flex items-center justify-center hover:bg-gold/10">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
