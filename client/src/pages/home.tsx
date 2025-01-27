import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Communities } from "@/components/sections/communities";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <Services />
        <Communities />
      </main>
    </div>
  );
}