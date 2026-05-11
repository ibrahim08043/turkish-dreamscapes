import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Building2, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { OFFICES } from "@/data/content";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative mt-32 border-t bg-card"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-9 rounded-xl bg-gradient-luxury flex items-center justify-center">
              <Building2 className="size-5 text-gold-foreground" />
            </div>
            <span className="font-display text-xl">Nura<span className="text-gradient-gold">lux</span></span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Curating Turkey's most distinguished addresses for a discerning international clientele since 2008.
          </p>
          <div className="flex gap-2 pt-2">
            {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
              <motion.a key={i} href="#" whileHover={{ y: -3 }} className="size-9 rounded-full glass flex items-center justify-center">
                <Icon className="size-4" />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/properties" className="hover:text-foreground transition-colors">All Properties</Link></li>
            <li><Link to="/agents" className="hover:text-foreground transition-colors">Our Agents</Link></li>
            <li><Link to="/about" className="hover:text-foreground transition-colors">About Nuralux</Link></li>
            <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            <li><Link to="/favorites" className="hover:text-foreground transition-colors">Saved Properties</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4">Offices</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {OFFICES.map((o) => (
              <li key={o.city}>
                <div className="text-foreground">{o.city}</div>
                <div className="text-xs">{o.address}</div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Private listings & market intelligence — once a month, never spam.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 rounded-full px-4 py-2 bg-background border text-sm outline-none focus:border-gold"
            />
            <button className="rounded-full px-4 py-2 bg-gradient-luxury text-gold-foreground text-sm font-medium">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-6 flex flex-col md:flex-row justify-between text-xs text-muted-foreground gap-2">
          <span>© {new Date().getFullYear()} Nuralux Real Estate. All rights reserved.</span>
          <span>Crafted with elegance in İstanbul · London · Bodrum</span>
        </div>
      </div>
    </motion.footer>
  );
}
