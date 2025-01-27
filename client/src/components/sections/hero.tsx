import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Shield, Users, Coins, Book } from "lucide-react";

const storyboardItems = [
  {
    title: "Achieve Sovereignty",
    description: "Where Self-Sovereign Identity Creates Income Potential",
    icon: <Shield className="h-6 w-6" />
  },
  {
    title: "Community First",
    description: "Join a network of shared prosperity and growth",
    icon: <Users className="h-6 w-6" />
  },
  {
    title: "Financial Freedom",
    description: "Take control of your financial destiny",
    icon: <Coins className="h-6 w-6" />
  },
  {
    title: "Learn & Grow",
    description: "Access comprehensive educational resources",
    icon: <Book className="h-6 w-6" />
  }
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % storyboardItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="mb-4">
              <span className="text-sm font-semibold text-primary">Created by SA Nathan LLC</span>
            </div>
            <div className="mb-8">
              <img
                src="/attached_assets/solvy-logo-full.png"
                alt="SOLVY"
                className="h-40 w-auto object-contain"
              />
            </div>

            <div className="space-y-4 mb-8 text-muted-foreground">
              <p>
                We're a modern financial platform that uses secure blockchain technology to help service-businesses manage payments and customer identities more efficiently. Think of it as a smarter, faster, and safer way to handle your business transactions and build trust with your customers.
              </p>
              <p>
                Companies are profiting billions from your data, which they hold captive in their databases-and they're counting on you not realizing its worth. In a vulture economy, businesses circle around individual needs, profiting from vulnerabilities rather than fostering growth. But what if your finances were as resilient as a disaster recovery solution, and your data was protected like a vault?
              </p>
              <p>
                <span className="font-semibold">Solvy.chain: Solutions Valued You.</span> We're breaking those chains, building a cooperative, DAO-driven future where trade and commerce are mutually beneficial and truly empower individuals.
              </p>
            </div>

            <div className="h-24 mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  {storyboardItems[currentIndex].icon}
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {storyboardItems[currentIndex].title}
                    </h3>
                    <p className="text-muted-foreground">
                      {storyboardItems[currentIndex].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>

          <div className="relative lg:h-[500px] flex items-center justify-center">
            <img
              src="/attached_assets/focusgirl.png"
              alt="Girl at Terminal"
              className="w-full h-full rounded-lg shadow-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}