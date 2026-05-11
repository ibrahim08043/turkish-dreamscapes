import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

export function MagneticButton({
  children, className, onClick, type = "button",
}: { children: ReactNode; className?: string; onClick?: () => void; type?: "button" | "submit" }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const tx = useTransform(sx, (v) => v * 0.4);
  const ty = useTransform(sy, (v) => v * 0.4);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - (r.left + r.width / 2));
    y.set(e.clientY - (r.top + r.height / 2));
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: tx, y: ty }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 font-medium",
        "bg-gradient-luxury text-gold-foreground shadow-luxury",
        "transition-shadow hover:shadow-[0_25px_70px_-15px_oklch(0.78_0.14_80/0.55)]",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
