import { CartoonAvatar } from "@/components/ui/cartoon-avatar";
import { Services } from "@/components/sections/services";
import { Communities } from "@/components/sections/communities";
import { ShareButtons } from "@/components/ui/share-buttons";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
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

            <div className="max-w-[800px] mx-auto mt-8">
              <p className="text-xl text-muted-foreground">
                Companies are profiting billions from your data, which they hold captive in their databases-and they're counting on you not realizing its worth. In a vulture economy, businesses circle around individual needs, profiting from vulnerabilities rather than fostering growth. But what if your finances were as resilient as a disaster recovery solution, and your data was protected like a vault?
              </p>
              <p className="mt-4 text-xl text-muted-foreground">
                Solvy.chain: Solutions Valued You. We're breaking those chains, building a cooperative, DAO-driven future where trade and commerce are mutually beneficial and truly empower individuals.
              </p>

              <div className="mt-8 flex justify-center">
                <ShareButtons 
                  title="SOLVY - Solutions Valued You"
                  description="Breaking chains, building futures. Join us in creating a cooperative, DAO-driven future where trade and commerce truly empower individuals."
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