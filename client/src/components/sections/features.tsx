import { CheckCircle } from "lucide-react";

export function Features() {
  const features = [
    "Multi-domain support (.solvy.chain)",
    "Role-based access control",
    "Blockchain card integration",
    "Membership management",
    "Payment processing with Stripe",
    "Polygon network integration",
  ];

  return (
    <section className="container py-16 bg-muted/50">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter mb-4">
            Powerful Features for the Web3 Era
          </h2>
          <p className="text-muted-foreground mb-8">
            Our ecosystem combines cutting-edge technology with user-friendly
            interfaces to deliver a seamless experience.
          </p>
          <ul className="space-y-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 rounded-lg opacity-10" />
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a"
            alt="Technology"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
