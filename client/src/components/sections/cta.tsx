import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function CTA() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement subscription logic
    toast({
      title: "Thank you for subscribing!",
      description: "You'll receive updates about SOLVY's journey to financial sovereignitity.",
    });
    setEmail("");
  };

  return (
    <section className="container py-16">
      <div className="rounded-lg bg-primary px-8 py-12 text-center text-primary-foreground">
        <h2 className="text-3xl font-bold tracking-tighter mb-4">
          Join the Path to Sovereignitity
        </h2>
        <p className="text-primary-foreground/80 mb-8 max-w-[600px] mx-auto">
          Break free from traditional financial chains. Subscribe to receive updates
          about our mission to empower individuals through decentralized financial sovereignitity.
        </p>
        <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/10 border-white/20 placeholder:text-white/50"
          />
          <Button type="submit" variant="secondary">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}