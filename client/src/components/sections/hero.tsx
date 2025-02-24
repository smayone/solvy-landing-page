import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Shield, Users, Coins, Book } from "lucide-react";
import { Link } from "wouter";
import { solvyDomains } from "@/lib/domains";
import { Card } from "@/components/ui/card";

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const educationDomain = solvyDomains.find(d => d.name === "Education")?.domain;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % storyboardItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen bg-background flex items-center">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div>
              <span className="text-sm font-semibold text-primary">Created by SA Nathan LLC</span>
            </div>

            <img
              src="/fulllogo.png"
              alt="SOLVY - Full Logo"
              className="w-full max-w-[400px] h-auto object-contain my-8"
              loading="lazy"
            />

            <div className="space-y-6 text-lg text-muted-foreground">
              <p className="leading-relaxed">
                We're a modern financial platform that uses secure blockchain technology to help service-businesses manage payments and customer identities more efficiently. Think of it as a smarter, faster, and safer way to handle your business transactions and build trust with your customers.
              </p>
              <p className="leading-relaxed">
                Companies are profiting billions from your data, which they hold captive in their databases-and they're counting on you not realizing its worth. In a vulture economy, businesses circle around individual needs, profiting from vulnerabilities rather than fostering growth.
              </p>
              <p className="leading-relaxed">
                <Link href="/nft-avatar" className="font-semibold hover:text-primary transition-colors">
                  Solvy.chain
                </Link>: Solutions Valued You. We're breaking those chains, building a cooperative, DAO-driven future where trade and commerce are mutually beneficial and truly empower individuals.
              </p>
            </div>

            <div className="h-32 mt-8">
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
                    <h3 className="text-2xl font-semibold text-primary mb-2">
                      {storyboardItems[currentIndex].title}
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {storyboardItems[currentIndex].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Web of Debt Section */}
            <div className="mt-12 space-y-6 border-t pt-8">
              <h3 className="text-2xl font-semibold text-primary">Understanding the Banking System</h3>
              <p className="text-lg text-muted-foreground">
                Ellen Brown's "Web of Debt" reveals how the private banking system has created a complex web of financial control, often misunderstood by the general public.
              </p>
              <div className="grid gap-4">
                <Card className="p-4 bg-destructive/10">
                  <h4 className="font-semibold mb-2">Key Revelations</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Money creation is controlled by private banks</li>
                    <li>Federal Reserve serves private interests</li>
                    <li>Public banking alternatives work</li>
                    <li>Current system creates unnecessary debt</li>
                  </ul>
                </Card>
                <Card className="p-4 bg-primary/10">
                  <h4 className="font-semibold mb-2">SOLVY's Alternative</h4>
                  <p>
                    We're building a transparent, community-controlled financial ecosystem that returns power to the people.
                  </p>
                </Card>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mt-8">
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link href={educationDomain ?? "#"}>Learn More</Link>
              </Button>
              <Button size="lg" asChild className="text-lg px-8">
                <Link href="/nft-avatar">Become a Member</Link>
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:h-full lg:min-h-[600px]">
            <div className="w-full max-w-[400px] aspect-square relative overflow-hidden rounded-2xl shadow-2xl">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted/10 animate-pulse" />
              )}
              <img
                src="Eva&Sean-2012.JPG"
                alt="Eva & Sean"
                className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
                  !imageLoaded ? 'opacity-0' : 'opacity-100'
                }`}
                loading="lazy"
                decoding="async"
                onLoad={(e) => {
                  console.log('Image loaded successfully');
                  setImageLoaded(true);
                }}
                onError={(e) => {
                  console.error('Failed to load image:', (e.target as HTMLImageElement).src);
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}