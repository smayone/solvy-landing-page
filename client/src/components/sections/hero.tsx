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
    <section className="relative min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img 
              src="/attached_assets/IMG_0615.jpeg" 
              alt="Financial Sovereignitity" 
              className="rounded-lg shadow-xl w-full max-w-2xl mx-auto"
            />
          </div>

          <div className="order-1 lg:order-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              SOLVY
            </h1>

            <p className="text-muted-foreground mb-4">
              In a "vulture economy," businesses circle around individual needs, profiting from vulnerabilities rather than fostering growth. But what if your finances were as resilient as a wildfire-resistant forest, and your data was protected like a vault?
            </p>
            <p className="text-muted-foreground mb-8">
              <span className="font-semibold">Solvy.chain: Solutions Valued You.</span> We're breaking those chains, building a cooperative, DAO-driven future where trade and commerce are mutually beneficial and truly empower individuals.
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

            <div className="flex flex-wrap gap-4">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}