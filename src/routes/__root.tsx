import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, Link, createRootRouteWithContext,
  useRouter, HeadContent, Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { PageTransition } from "@/components/layout/page-transition";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-gradient-gold">404</h1>
        <h2 className="mt-4 font-display text-2xl">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The address you're looking for doesn't exist in our portfolio.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-gradient-luxury px-6 py-2.5 text-sm font-medium text-gold-foreground shadow-luxury">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-gradient-luxury px-5 py-2 text-sm text-gold-foreground"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border px-5 py-2 text-sm">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nuralux — Luxury Real Estate in Turkey" },
      { name: "description", content: "Discover Turkey's most distinguished addresses. Curated luxury villas, penthouses & estates across Istanbul, Bodrum, Antalya, Cappadocia and more." },
      { name: "author", content: "Nuralux" },
      { property: "og:title", content: "Nuralux — Luxury Real Estate in Turkey" },
      { property: "og:description", content: "Discover Turkey's most distinguished addresses. Curated luxury villas, penthouses & estates across Istanbul, Bodrum, Antalya, Cappadocia and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Nuralux — Luxury Real Estate in Turkey" },
      { name: "twitter:description", content: "Discover Turkey's most distinguished addresses. Curated luxury villas, penthouses & estates across Istanbul, Bodrum, Antalya, Cappadocia and more." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ee2cd784-1bcf-4988-b9e3-89e2244e24b7/id-preview-6386d174--e893d743-6475-44e0-936f-09283cdafbe0.lovable.app-1778505348026.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ee2cd784-1bcf-4988-b9e3-89e2244e24b7/id-preview-6386d174--e893d743-6475-44e0-936f-09283cdafbe0.lovable.app-1778505348026.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <Toaster position="top-center" richColors theme="dark" toastOptions={{ className: "font-sans" }} />
    </QueryClientProvider>
  );
}
