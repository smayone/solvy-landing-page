import { Hero } from "@/components/sections/hero";
import { CartoonAvatar } from "@/components/ui/cartoon-avatar";
import { Services } from "@/components/sections/services";
import { Communities } from "@/components/sections/communities";
import { ShareButtons } from "@/components/ui/share-buttons";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto">
              <div className="flex-1 flex justify-center mb-8 md:mb-0">
                <img
                  src="attached_assets/fulllogo.png"
                  alt="SOLVY Logo"
                  className="h-56 w-auto object-contain" 
                />
              </div>
              <div className="flex-1 flex justify-center">
                <CartoonAvatar
                  src="attached_assets/focusgirl.png"
                  alt="Girl at Terminal"
                  className="h-72 w-96 rounded-lg border-4 border-primary/20 shadow-xl bg-background"
                />
              </div>
            </div>
          </div>
        </section>
        <Services />
        <Communities />
      </main>
    </div>
  );
}