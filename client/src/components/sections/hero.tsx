import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Shield, Users, Coins, Book } from "lucide-react";
import { Link } from "wouter";
import { solvyDomains } from "@/lib/domains";

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
  const educationDomain = solvyDomains.find(d => d.name === "Education")?.domain;

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
                <Link href="/nft-avatar" className="font-semibold hover:text-primary transition-colors">
                  Solvy.chain
                </Link>: Solutions Valued You. We're breaking those chains, building a cooperative, DAO-driven future where trade and commerce are mutually beneficial and truly empower individuals.
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
                <Button size="lg" variant="outline" asChild>
                  <Link href={educationDomain ?? "#"}>Learn More</Link>
                </Button>
                <Button size="lg" asChild>
                  <Link href="/nft-avatar">Become a Member</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-8 items-center">
            {/* Original Image */}
            <div className="w-full">
              <img
                src="/attached_assets/IMG_0615.jpeg"
                alt="SOLVY Innovation"
                className="w-full h-auto rounded-xl shadow-xl object-cover"
              />
            </div>
            {/* Cartoonized Image */}
            <div className="w-full">
              <img
                src="/hero-cartoon.png"
                alt="SOLVY Innovation"
                className="w-full h-auto rounded-xl shadow-xl object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}