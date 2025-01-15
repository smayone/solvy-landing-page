import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="container flex flex-col items-center justify-center gap-4 pt-32 pb-16 md:pt-40 text-center">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
        The Future of Digital Services
      </h1>
      <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
        A Web3-powered ecosystem bringing together education, finance, and security
        monitoring in one transparent platform.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button size="lg">Get Started</Button>
        <Button size="lg" variant="outline">
          Learn More
        </Button>
      </div>
    </section>
  );
}
