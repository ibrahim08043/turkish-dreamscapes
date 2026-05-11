import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/hero";
import { LocationsSection } from "@/components/home/locations-section";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { WhyTurkey } from "@/components/home/why-turkey";
import { Testimonials } from "@/components/home/testimonials";
import { AgentsPreview } from "@/components/home/agents-preview";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nuralux — Luxury Real Estate in Türkiye" },
      { name: "description", content: "Curated luxury villas, penthouses and estates across Istanbul, Bodrum, Antalya, Cappadocia and beyond." },
      { property: "og:title", content: "Nuralux — Luxury Real Estate in Türkiye" },
      { property: "og:description", content: "Curated luxury villas, penthouses and estates across Türkiye." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <LocationsSection />
      <WhyTurkey />
      <Testimonials />
      <AgentsPreview />
    </>
  );
}
