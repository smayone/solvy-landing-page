import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="container py-16">
      <div className="rounded-lg bg-primary px-8 py-12 text-center text-primary-foreground">
        <h2 className="text-3xl font-bold tracking-tighter mb-4">
          Join the SOLVY Ecosystem Today
        </h2>
        <p className="text-primary-foreground/80 mb-8 max-w-[600px] mx-auto">
          Experience the future of digital services with our integrated platform.
          Start your journey now.
        </p>
        <Button size="lg" variant="secondary">
          Get Started
        </Button>
      </div>
    </section>
  );
}
