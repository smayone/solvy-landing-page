import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const storyboardItems = [
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
    <section className="container relative flex flex-col items-end justify-center gap-6 pt-32 pb-16 md:pt-40">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block">
        <img 
          src="/attached_assets/IMG_0615.jpeg" 
          alt="Financial Sovereignitity" 
          className="max-w-[500px] rounded-lg shadow-xl"
        />
      </div>

      <div className="text-right max-w-[600px]">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          SOLVY
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Achieve Sovereignitity: Where Self-Sovereign Identity Creates Income Potential
        </p>

        <p className="mt-4 text-muted-foreground text-right">
          In a "vulture economy," businesses circle around individual needs, profiting from vulnerabilities rather than fostering growth. But what if your finances were as resilient as a wildfire-resistant forest, and your data was protected like a vault?
        </p>
        <p className="mt-2 text-muted-foreground text-right">
          <span className="font-semibold">Solvy.chain: Solutions Valued You.</span> We're breaking those chains, building a cooperative, DAO-driven future where trade and commerce are mutually beneficial and truly empower individuals.
        </p>

        <div className="h-24 overflow-hidden my-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-right"
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

        <div className="flex flex-wrap items-center justify-end gap-4 mt-8">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}