import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";

interface Slide {
  id: string;
  title: string;
  content: React.ReactNode;
  background?: string;
  link: string;
}

const slides: Slide[] = [
  // Module 1: The Data Problem
  {
    id: "data-problem-intro",
    title: "Are You in Control of Your Data?",
    link: "/education#data-control",
    content: (
      <div className="space-y-4">
        <p className="text-xl">Think about how much time you spend online...</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Every click is tracked</li>
          <li>Every search is recorded</li>
          <li>Every post is monitored</li>
        </ul>
        <p className="text-lg text-muted-foreground mt-4">
          But who really benefits from all this data?
        </p>
        <Link href="/education#data-control" className="inline-block mt-4">
          <Button variant="link" className="p-0">Learn more about data control →</Button>
        </Link>
      </div>
    ),
    background: "bg-red-50 dark:bg-red-950/30"
  },
  {
    id: "data-problem-impact",
    title: "Your Data, Their Profits",
    link: "/education#data-profits",
    content: (
      <div className="space-y-4">
        <div className="grid gap-4">
          <Card className="p-4 bg-red-100/50 dark:bg-red-900/30">
            <h3 className="font-semibold mb-2">Companies Profit</h3>
            <p>While you create the data, companies make billions from it</p>
          </Card>
          <Card className="p-4 bg-red-100/50 dark:bg-red-900/30">
            <h3 className="font-semibold mb-2">No Real Consent</h3>
            <p>Complex terms and conditions hide how your data is really used</p>
          </Card>
          <Card className="p-4 bg-red-100/50 dark:bg-red-900/30">
            <h3 className="font-semibold mb-2">Beyond Ads</h3>
            <p>Your data influences elections, manipulates opinions, and shapes society</p>
          </Card>
        </div>
        <Link href="/education#data-profits" className="inline-block mt-4">
          <Button variant="link" className="p-0">Explore data monetization →</Button>
        </Link>
      </div>
    ),
    background: "bg-red-50 dark:bg-red-950/30"
  },
  {
    id: "decidey-intro",
    title: "Meet DECIDEY: Your Data, Your Rules",
    link: "/education#decidey-intro",
    content: (
      <div className="space-y-6">
        <p className="text-xl">Take back control of your digital identity</p>
        <div className="grid gap-4">
          <Card className="p-4 bg-primary/10">
            <h3 className="font-semibold mb-2">Self-Sovereign Identity (SSI)</h3>
            <p>Own your digital identity, just like your physical wallet</p>
          </Card>
          <Card className="p-4 bg-primary/10">
            <h3 className="font-semibold mb-2">You Decide</h3>
            <p>Control what data to share, with whom, and for what purpose</p>
          </Card>
          <Card className="p-4 bg-primary/10">
            <h3 className="font-semibold mb-2">Monetize Your Data</h3>
            <p>If someone profits from your data, it should be you</p>
          </Card>
        </div>
        <Link href="/education#ssi-basics" className="inline-block mt-4">
          <Button variant="link" className="p-0">Learn about Self-Sovereign Identity →</Button>
        </Link>
      </div>
    ),
    background: "bg-primary/5"
  },
  {
    id: "decidey-how",
    title: "DECIDEY: It's Easier Than You Think",
    link: "/education#get-started",
    content: (
      <div className="space-y-6">
        <div className="grid gap-4">
          <Card className="p-4 bg-green-100/50 dark:bg-green-900/30">
            <h3 className="font-semibold mb-2">Secure By Design</h3>
            <p>Built on blockchain technology for unmatched security</p>
          </Card>
          <Card className="p-4 bg-green-100/50 dark:bg-green-900/30">
            <h3 className="font-semibold mb-2">User-Friendly</h3>
            <p>No technical expertise needed - designed for everyone</p>
          </Card>
          <Card className="p-4 bg-green-100/50 dark:bg-green-900/30">
            <h3 className="font-semibold mb-2">Start Today</h3>
            <p>Begin your journey to data sovereignty in minutes</p>
          </Card>
        </div>
        <Link href="/education#quick-start" className="block">
          <Button className="w-full" size="lg">
            <Play className="mr-2 h-4 w-4" />
            Start Quick Tutorial
          </Button>
        </Link>
      </div>
    ),
    background: "bg-green-50 dark:bg-green-950/30"
  }
];

export function DecideySlides() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className={`relative rounded-lg overflow-hidden ${slides[currentSlide].background}`}>
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[currentSlide].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <Link href={slides[currentSlide].link}>
                <h2 className="text-3xl font-bold hover:text-primary transition-colors cursor-pointer">
                  {slides[currentSlide].title}
                </h2>
              </Link>
              {slides[currentSlide].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <Button
          variant="outline"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          {currentSlide + 1} of {slides.length}
        </span>
        <Button
          variant="outline"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}