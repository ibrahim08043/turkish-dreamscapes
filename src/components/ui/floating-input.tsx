import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

type FloatingProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const FloatingInput = forwardRef<HTMLInputElement, FloatingProps>(
  ({ label, error, className, value, onChange, onBlur, onFocus, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const filled = value !== undefined && value !== "";
    const float = focused || filled || !!props.placeholder || props.type === "date" || props.type === "time";

    return (
      <div className="relative">
        <input
          ref={ref}
          {...props}
          value={value}
          onChange={onChange}
          onFocus={(e) => { setFocused(true); onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); onBlur?.(e); }}
          className={cn(
            "peer w-full rounded-xl border bg-background/50 px-4 pt-5 pb-2 text-sm outline-none",
            "border-input transition-all focus:border-gold focus:ring-2 focus:ring-gold/20",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            className,
          )}
        />
        <label
          className={cn(
            "pointer-events-none absolute left-4 text-muted-foreground transition-all",
            float ? "top-1.5 text-[11px] uppercase tracking-wider text-gold" : "top-1/2 -translate-y-1/2 text-sm",
          )}
        >
          {label}
        </label>
        {error && <p className="mt-1 text-xs text-destructive animate-in fade-in slide-in-from-top-1">{error}</p>}
      </div>
    );
  },
);
FloatingInput.displayName = "FloatingInput";

type FloatingAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};
export const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingAreaProps>(
  ({ label, error, className, value, onChange, onBlur, onFocus, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const filled = value !== undefined && value !== "";
    const float = focused || filled;

    return (
      <div className="relative">
        <textarea
          ref={ref}
          {...props}
          value={value}
          onChange={onChange}
          onFocus={(e) => { setFocused(true); onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); onBlur?.(e); }}
          className={cn(
            "peer w-full rounded-xl border bg-background/50 px-4 pt-6 pb-2 text-sm outline-none min-h-[120px]",
            "border-input transition-all focus:border-gold focus:ring-2 focus:ring-gold/20",
            error && "border-destructive",
            className,
          )}
        />
        <label
          className={cn(
            "pointer-events-none absolute left-4 text-muted-foreground transition-all",
            float ? "top-2 text-[11px] uppercase tracking-wider text-gold" : "top-4 text-sm",
          )}
        >
          {label}
        </label>
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
    );
  },
);
FloatingTextarea.displayName = "FloatingTextarea";
