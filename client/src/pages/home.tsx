import { Navbar } from "@/components/navigation/navbar";
import { ConnectionStatus } from "@/components/web3/ConnectionStatus";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Features } from "@/components/sections/features";
import { Communities } from "@/components/sections/communities";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Features />
        <Communities />
        <CTA />
      </main>
    </div>
  );
}