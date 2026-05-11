## Luxury Turkey Real Estate Platform — Build Plan

A cinematic, animation-rich luxury real estate frontend focused on Turkish properties, with full routing, mock data, booking flow, and premium UI throughout.

### Stack note (important)
Your project is on **TanStack Start + TanStack Router** (not React Router DOM). All "React Router" requirements will be implemented with TanStack Router's file-based routing, dynamic params (`$id`), and `AnimatePresence`-based page transitions. Functionally identical — just type-safe routing. Tailwind v4, shadcn/ui, Framer Motion, Lucide, and Sonner toasts are already available.

### Pages & routes
```
/                       Home (cinematic hero + sections)
/properties             Listing + filters
/properties/$id         Dynamic details page
/booking/$id            Schedule visit (prefilled from property)
/agents                 Luxury agents grid
/about                  About Us
/contact                Contact + FAQ + map
/favorites              Saved properties
*                       Animated 404
```

### Component architecture
```
src/
  routes/                (pages above)
  components/
    layout/              Navbar (scroll hide/blur), Footer, PageTransition, CursorGlow, ScrollProgress
    home/                Hero, FeaturedCarousel, LocationsGrid, Categories, WhyTurkey, Testimonials, StatsCounters, Agents, Newsletter
    property/            PropertyCard, PropertyGallery, Lightbox, AmenitiesList, MortgageCalculator, AgentCard, MapSection, SimilarProperties, PropertyTabs
    filters/             FilterSidebar, PriceRangeSlider, BuyRentToggle, SearchBar
    booking/             BookingForm, BookingSummary, SuccessModal
    contact/             ContactForm, ContactCards, FAQAccordion, OfficeLocations
    ui/                  (existing shadcn) + MagneticButton, GlassCard, AnimatedCounter, RevealOnScroll, SkeletonCard, FloatingLabelInput, Tilt
  data/
    properties.ts        ~20 mock listings (Istanbul, Antalya, Bodrum, Izmir, Ankara, Bursa, Fethiye, Cappadocia)
    agents.ts, locations.ts, testimonials.ts, faqs.ts
  hooks/
    useFavorites.ts      (localStorage)
    useScrollDirection.ts, useMousePosition.ts, useTheme.ts
  lib/
    validation.ts        zod schemas (booking + contact)
    format.ts            currency (TRY/USD/EUR), area
```

### Key features
- **Animations (Framer Motion)**: page transitions via `AnimatePresence` in `__root`, `staggerChildren` lists, `whileHover/whileTap`, `viewport` reveals, shared `layoutId` from card → details hero, parallax hero, scroll progress bar, animated counters, magnetic CTAs, cursor glow follower.
- **Theme**: Dark/Light toggle wired into existing `oklch` token system in `src/styles.css`; add luxury accents (gold/champagne tokens, premium gradients, glass surface tokens, elegant shadows).
- **Typography**: Serif display (e.g. Playfair) + clean sans (Inter) loaded via Google Fonts link in root head.
- **Property card → details**: shared `layoutId` on hero image; details page reads `id` from `Route.useParams()` and looks up mock data; throws `notFound()` if missing.
- **Booking flow**: "Book Visit" links to `/booking/$id`; form uses `react-hook-form` + zod, simulated async submit (800ms), Sonner toast + animated success modal, reset on success, disabled-while-loading button with spinner.
- **Contact**: floating-label inputs, validated form, embedded map (iframe), 4 contact cards, FAQ accordion with motion height animation.
- **Filters**: animated sidebar (drawer on mobile), price slider, bed/bath, city multi-select, amenity chips, buy/rent toggle, search with focus animation; results re-render with stagger.
- **Favorites**: heart toggle with spring animation; persisted in localStorage; `/favorites` lists saved items with empty-state.
- **Loading**: first-load splash animation, skeleton cards while simulated fetch resolves.
- **SEO**: per-route `head()` with unique title, description, og:title/description; og:image on detail pages from property hero.
- **Accessibility**: focus rings, aria labels, reduced-motion respected via `useReducedMotion`.
- **Imagery**: high-quality Unsplash Turkey photography (Istanbul skyline, Bodrum coast, Cappadocia, Antalya, etc.) referenced by URL — no asset generation needed.

### Mock data shape
```ts
type Property = {
  id: string; title: string; city: TurkishCity; neighborhood: string;
  price: number; currency: 'USD'|'EUR'|'TRY'; type: 'Villa'|'Apartment'|'Penthouse'|'Mansion';
  listing: 'sale'|'rent'; beds: number; baths: number; areaM2: number;
  amenities: string[]; description: string; images: string[]; videoUrl?: string;
  coords: { lat: number; lng: number }; agentId: string; featured?: boolean;
};
```

### Dependencies to add
`framer-motion`, `react-hook-form`, `@hookform/resolvers`, `zod` (zod likely present). Sonner/shadcn/lucide already installed.

### Out of scope (frontend-only build)
No backend, no real auth, no real payments, no real map provider key (embed iframe only), no email sending — all forms simulate submission. Lovable Cloud is **not** enabled for this build per the frontend-only spec.

### Deliverable
A polished, production-feel demo: cinematic home, browsable listings with rich filters, dynamic detail pages with shared-layout transitions, working booking + contact forms with validation/toasts/success modals, favorites, agents, about, animated 404, and dark/light theming — all responsive.
