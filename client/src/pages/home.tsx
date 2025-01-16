import { Navbar } from "@/components/navigation/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Features } from "@/components/sections/features";
import { Communities } from "@/components/sections/communities";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate">
          <Hero />
          <Services />
          <Features />
          <Communities />
          <CTA />
        </div>
      </main>
    </div>
  );
}