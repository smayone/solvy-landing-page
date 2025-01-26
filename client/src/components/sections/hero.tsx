import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const storyboardItems = [
  {
    title: "Achieve Sovereignitity",
    description: "Where Self-Sovereign Identity Creates Income Potential",
  },
  {
    title: "Financial sovereignitity",
    description: "Take control of your identity, data, and financial destiny.",
  },
  {
    title: "Data protection",
    description: "Secure your digital footprint with blockchain technology.",
  },
  {
    title: "Community empowerment",
    description: "Join a network of shared prosperity and growth.",
  },
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
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="mb-4">
              <span className="text-sm font-semibold text-primary">Created by SA Nathan LLC</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              SOLVY
            </h1>

            <p className="text-muted-foreground mb-4">
              Companies are profiting billions from your data, which they hold captive in their databases—and they're counting on you not realizing its worth. In a "vulture economy," businesses circle around individual needs, profiting from vulnerabilities rather than fostering growth. But what if your finances were as resilient as a disaster recovery solution, and your data was protected like a vault?
            </p>
            <p className="text-muted-foreground mb-8">
              <span className="font-semibold">Solvy.chain: Solutions Valued You.</span> A comprehensive Web3 financial ecosystem by SA Nathan LLC, breaking those chains, building a cooperative, DAO-driven future where trade and commerce are mutually beneficial and truly empower individuals.
            </p>

            <div className="h-24 mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {storyboardItems[currentIndex].title}
                  </h3>
                  <p className="text-muted-foreground">
                    {storyboardItems[currentIndex].description}
                  </p>
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

          <div className="relative mt-8 lg:mt-0">
            <div className="absolute -top-4 right-4 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <p className="text-sm font-medium">
                Product Owner: SA Nathan LLC
              </p>
            </div>
            <img 
              src="/attached_assets/IMG_0615.jpeg" 
              alt="Financial Sovereignitity" 
              className="rounded-lg shadow-xl w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}