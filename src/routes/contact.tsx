import { createFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { OFFICES, FAQS } from "@/data/content";
import { FloatingInput, FloatingTextarea } from "@/components/ui/floating-input";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import { contactSchema, type ContactValues } from "@/lib/validation";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nuralux" },
      { name: "description", content: "Speak with a luxury real estate advisor — Istanbul, Bodrum, Antalya, London." },
      { property: "og:title", content: "Contact Nuralux" },
      { property: "og:description", content: "Get in touch with our advisors across Türkiye and London." },
    ],
  }),
  component: Contact,
});

const CARDS = [
  { icon: Phone, title: "Call us", value: "+90 212 555 1001", href: "tel:+902125551001" },
  { icon: Mail, title: "Email", value: "concierge@nuralux.com", href: "mailto:concierge@nuralux.com" },
  { icon: MessageCircle, title: "WhatsApp", value: "+90 532 100 1001", href: "https://wa.me/905321001001" },
  { icon: MapPin, title: "HQ", value: "Levent, Istanbul", href: "#offices" },
];

function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, reset } =
    useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactValues) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Contact submission", data);
    toast.success("Message sent — we'll respond within 24 hours.");
    reset();
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-4 md:px-8 overflow-hidden">
        <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 0.4 }} transition={{ duration: 1.5 }}
          className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=2000&q=80"
            alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </motion.div>
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Get in Touch</p>
            <h1 className="font-display text-5xl md:text-7xl">
              Let's begin a <span className="italic text-gradient-gold">conversation</span>
            </h1>
            <p className="mt-6 text-muted-foreground max-w-xl mx-auto text-lg">
              Whether you're searching for a Bosphorus residence or an Aegean retreat — our advisors are here to listen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Cards */}
      <section className="px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {CARDS.map((c, i) => (
            <motion.a key={c.title} href={c.href}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }}
              className="p-5 rounded-2xl glass shadow-elegant text-center"
            >
              <div className="size-11 rounded-xl bg-gradient-luxury flex items-center justify-center mx-auto mb-3">
                <c.icon className="size-5 text-gold-foreground" />
              </div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.title}</div>
              <div className="text-sm font-medium mt-1">{c.value}</div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
          <motion.form
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 md:p-8 rounded-2xl bg-card border shadow-elegant space-y-5"
          >
            <h2 className="font-display text-3xl">Send a message</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <FloatingInput label="Full name" {...register("fullName")} value={watch("fullName") ?? ""} error={errors.fullName?.message} />
              <FloatingInput label="Email" type="email" {...register("email")} value={watch("email") ?? ""} error={errors.email?.message} />
              <FloatingInput label="Phone" type="tel" {...register("phone")} value={watch("phone") ?? ""} error={errors.phone?.message} />
              <FloatingInput label="Subject" {...register("subject")} value={watch("subject") ?? ""} error={errors.subject?.message} />
            </div>
            <FloatingTextarea label="Your message" {...register("message")} value={watch("message") ?? ""} error={errors.message?.message} />
            <div className="flex justify-end pt-2">
              <MagneticButton type="submit" className={isSubmitting ? "opacity-80 pointer-events-none" : ""}>
                {isSubmitting ? <><Loader2 className="size-4 animate-spin" /> Sending...</> : <><Send className="size-4" /> Send Message</>}
              </MagneticButton>
            </div>
          </motion.form>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden border shadow-elegant min-h-[500px] relative">
            <iframe
              title="Office locations"
              src="https://www.openstreetmap.org/export/embed.html?bbox=26%2C36%2C36%2C42&layer=mapnik"
              className="absolute inset-0 w-full h-full"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Offices */}
      <section id="offices" className="px-4 md:px-8 py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Worldwide Presence</p>
            <h2 className="font-display text-4xl md:text-5xl">Our <span className="italic text-gradient-gold">offices</span></h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {OFFICES.map((o, i) => (
              <motion.div key={o.city}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border shadow-elegant"
              >
                <h3 className="font-display text-xl">{o.city}</h3>
                <p className="text-sm text-muted-foreground mt-2">{o.address}</p>
                <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="text-sm text-gold mt-3 inline-block">{o.phone}</a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">FAQ</p>
            <h2 className="font-display text-4xl md:text-5xl">Frequently <span className="italic text-gradient-gold">asked</span></h2>
          </Reveal>
          <div className="space-y-3">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <motion.div key={f.q}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border bg-card overflow-hidden"
                >
                  <button onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full p-5 flex items-center justify-between text-left">
                    <span className="font-medium">{f.q}</span>
                    <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-gold">
                      <ChevronDown className="size-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }} className={cn("px-5 overflow-hidden text-sm text-muted-foreground")}>
                        <p className="pb-5 leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
