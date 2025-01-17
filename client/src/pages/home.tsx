import { CartoonAvatar } from "@/components/ui/cartoon-avatar";

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
                  alt="Profile"
                  className="h-56 w-56 border-4 border-background shadow-xl"
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}