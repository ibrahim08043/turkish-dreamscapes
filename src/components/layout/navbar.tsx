import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, Moon, Sun, X, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useTheme } from "@/hooks/useTheme";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/agents", label: "Agents" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { hidden, scrolled } = useScrollDirection();
  const { theme, toggle } = useTheme();
  const { ids } = useFavorites();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => { setOpen(false); }, [path]);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled ? "glass shadow-elegant" : "bg-transparent",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8 h-18 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display text-xl tracking-wide">
              Nura<span className="text-gradient-gold">lux</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => {
              const active = path === item.to || (item.to !== "/" && path.startsWith(item.to));
              return (
                <Link key={item.to} to={item.to} className="relative px-4 py-2 text-sm">
                  <span className={cn("transition-colors", active ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
                    {item.label}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-[2px] bg-gradient-luxury rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/favorites"
              aria-label="Favorites"
              className="relative size-10 rounded-full glass flex items-center justify-center hover:scale-105 transition-transform"
            >
              <Heart className="size-4" />
              {ids.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 size-5 rounded-full bg-gold text-gold-foreground text-[10px] font-semibold flex items-center justify-center"
                >
                  {ids.length}
                </motion.span>
              )}
            </Link>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="size-10 rounded-full glass flex items-center justify-center hover:scale-105 transition-transform"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <button
              onClick={() => setOpen(true)}
              aria-label="Menu"
              className="md:hidden size-10 rounded-full glass flex items-center justify-center"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] md:hidden"
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-card border-l p-6 flex flex-col"
            >
              <div className="flex justify-end">
                <button onClick={() => setOpen(false)} aria-label="Close" className="size-10 rounded-full glass flex items-center justify-center">
                  <X className="size-4" />
                </button>
              </div>
              <nav className="mt-8 flex flex-col gap-1">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link to={item.to} className="block py-3 px-4 rounded-xl hover:bg-muted font-display text-2xl">
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
