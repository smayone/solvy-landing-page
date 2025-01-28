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
    <section className="min-h-screen bg-background flex items-center">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <div>
              <span className="text-sm font-semibold text-primary">Created by SA Nathan LLC</span>
            </div>

            <img
              src="/fulllogo.png"
              alt="SOLVY - Full Logo"
              className="w-full max-w-[400px] h-auto object-contain my-8"
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

            <div className="flex flex-wrap gap-6 mt-8">
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link href={educationDomain ?? "#"}>Learn More</Link>
              </Button>
              <Button size="lg" asChild className="text-lg px-8">
                <Link href="/nft-avatar">Become a Member</Link>
              </Button>
            </div>
          </div>

          {/* Enhanced Image Section with cartoon effect */}
          <div className="relative flex items-center justify-center lg:h-full lg:min-h-[600px]">
            <div className="w-full max-w-[400px] aspect-square relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/attached_assets/Eva&Sean-2012.JPG"
                alt="Eva & Sean"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500 ease-out"
                style={{
                  mixBlendMode: 'color-burn',
                  WebkitFilter: 'url(#cartoonFilter)',
                  filter: 'url(#cartoonFilter)'
                }}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                  console.error('Failed to load image:', img.src);
                }}
              />
              {/* Enhanced SVG filter for cartoon effect */}
              <svg width="0" height="0" className="absolute">
                <defs>
                  <filter id="cartoonFilter">
                    {/* Edge detection */}
                    <feConvolveMatrix order="3" preserveAlpha="true" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1"/>

                    {/* Color adjustments */}
                    <feColorMatrix type="matrix" values="
                      1.1 0 0 0 0
                      0 1.1 0 0 0
                      0 0 1.1 0 0
                      0 0 0 1 0"/>

                    {/* Posterize effect */}
                    <feComponentTransfer>
                      <feFuncR type="discrete" tableValues="0 0.25 0.5 0.75 1"/>
                      <feFuncG type="discrete" tableValues="0 0.25 0.5 0.75 1"/>
                      <feFuncB type="discrete" tableValues="0 0.25 0.5 0.75 1"/>
                    </feComponentTransfer>

                    {/* Smoothing */}
                    <feGaussianBlur stdDeviation="0.5"/>

                    {/* Enhance contrast */}
                    <feComponentTransfer>
                      <feFuncR type="linear" slope="1.5" intercept="-0.25"/>
                      <feFuncG type="linear" slope="1.5" intercept="-0.25"/>
                      <feFuncB type="linear" slope="1.5" intercept="-0.25"/>
                    </feComponentTransfer>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}