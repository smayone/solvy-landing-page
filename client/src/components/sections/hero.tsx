import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const storyboardItems = [
  {
    title: "Financial autonomy",
    description: "Take control of your money, your way.",
  },
  {
    title: "Data security",
    description: "Protect your identity and assets with blockchain technology.",
  },
  {
    title: "Community strength",
    description: "Join a network of support and shared prosperity.",
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
    <section className="container flex flex-col items-center justify-center gap-6 pt-32 pb-16 md:pt-40 text-center">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
        SOLVY: Gain Financial Sovereignty
      </h1>
      <div className="max-w-[800px] space-y-4">
        <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          In a "vulture economy," businesses circle around individual needs, profiting from vulnerabilities rather than fostering growth. But what if your finances were as resilient as a wildfire-resistant forest, and your data was protected like a vault?
        </p>
        <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          <span className="font-semibold">Solvy.chain: Solutions Valued You.</span> We're breaking those chains, building a cooperative, DAO-driven future where trade and commerce are mutually beneficial and truly empower individuals.
        </p>
      </div>

      <div className="h-24 overflow-hidden my-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
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

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button size="lg">Get Started</Button>
        <Button size="lg" variant="outline">
          Learn More
        </Button>
      </div>
    </section>
  );
}