import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, CheckCircle2, Loader2, MapPin } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getPropertyById } from "@/data/properties";
import { FloatingInput, FloatingTextarea } from "@/components/ui/floating-input";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import { bookingSchema, type BookingValues } from "@/lib/validation";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/booking/$id")({
  loader: ({ params }) => {
    const property = getPropertyById(params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Schedule a Visit — ${loaderData?.property.title}` },
      { name: "description", content: `Book a private viewing of ${loaderData?.property.title} in ${loaderData?.property.city}.` },
    ],
  }),
  notFoundComponent: () => <div className="pt-40 text-center"><Link to="/properties" className="text-gold">Browse properties</Link></div>,
  errorComponent: ({ error }) => <div className="pt-40 text-center text-destructive">{error.message}</div>,
  component: BookingPage,
});

function BookingPage() {
  const { property } = Route.useLoaderData();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, reset } =
    useForm<BookingValues>({
      resolver: zodResolver(bookingSchema),
      defaultValues: { visitors: 2, date: "", time: "", message: "" },
    });

  const onSubmit = async (data: BookingValues) => {
    await new Promise((r) => setTimeout(r, 1100));
    console.log("Booking submitted", { propertyId: property.id, ...data });
    toast.success("Booking confirmed! We'll be in touch shortly.");
    setSuccess(true);
    reset();
  };

  return (
    <div className="pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/properties/$id" params={{ id: property.id }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold mb-6 transition-colors">
          <ArrowLeft className="size-4" /> Back to property
        </Link>

        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Schedule a Visit</p>
          <h1 className="font-display text-4xl md:text-6xl">Reserve your <span className="italic text-gradient-gold">private tour</span></h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Submit your details and one of our advisors will confirm the viewing within 24 hours.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 mt-12">
          <motion.form
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 md:p-8 rounded-2xl bg-card border shadow-elegant space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <FloatingInput label="Full name" {...register("fullName")} value={watch("fullName") ?? ""} error={errors.fullName?.message} />
              <FloatingInput label="Email" type="email" {...register("email")} value={watch("email") ?? ""} error={errors.email?.message} />
              <FloatingInput label="Phone" type="tel" {...register("phone")} value={watch("phone") ?? ""} error={errors.phone?.message} />
              <FloatingInput label="Number of visitors" type="number" min={1} max={20} {...register("visitors", { valueAsNumber: true })} value={watch("visitors") ?? ""} error={errors.visitors?.message} />
              <FloatingInput label="Preferred date" type="date" {...register("date")} value={watch("date") ?? ""} error={errors.date?.message} />
              <FloatingInput label="Preferred time" type="time" {...register("time")} value={watch("time") ?? ""} error={errors.time?.message} />
            </div>
            <FloatingTextarea label="Special message (optional)" {...register("message")} value={watch("message") ?? ""} error={errors.message?.message} />

            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-muted-foreground">By submitting, you agree to our privacy policy.</p>
              <MagneticButton type="submit" className={isSubmitting ? "opacity-80 pointer-events-none" : ""}>
                {isSubmitting ? <><Loader2 className="size-4 animate-spin" /> Sending...</> : <><Calendar className="size-4" /> Confirm Booking</>}
              </MagneticButton>
            </div>
          </motion.form>

          <motion.aside initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="rounded-2xl overflow-hidden bg-card border shadow-luxury h-fit sticky top-28">
            <div className="relative h-56">
              <img src={property.images[0]} alt={property.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <div className="text-[10px] uppercase tracking-wider opacity-80">{property.type}</div>
                <h3 className="font-display text-xl">{property.title}</h3>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-gold" /> {property.neighborhood}, {property.city}
              </div>
              <div className="flex justify-between items-end pt-3 border-t">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">Price</span>
                <span className="font-display text-2xl text-gradient-gold">{formatPrice(property.price, property.currency)}</span>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setSuccess(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-md w-full p-8 rounded-3xl bg-card border shadow-luxury text-center"
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
                className="mx-auto size-20 rounded-full bg-gradient-luxury flex items-center justify-center shadow-luxury mb-5">
                <CheckCircle2 className="size-10 text-gold-foreground" />
              </motion.div>
              <h3 className="font-display text-2xl mb-2">Visit Confirmed</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Thank you. Your private viewing of <span className="text-foreground">{property.title}</span> has been requested.
                Our advisor will contact you within 24 hours.
              </p>
              <div className="flex gap-2">
                <button onClick={() => setSuccess(false)} className="flex-1 py-2.5 rounded-full border text-sm">Close</button>
                <button onClick={() => navigate({ to: "/properties" })} className="flex-1 py-2.5 rounded-full bg-gradient-luxury text-gold-foreground text-sm">
                  Explore more
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
