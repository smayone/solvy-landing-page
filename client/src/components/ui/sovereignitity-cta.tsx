import { Card, CardContent } from "@/components/ui/card";

interface SovereignitityCTAProps {
  className?: string;
}

export function SovereignitityCTA({ className }: SovereignitityCTAProps) {
  return (
    <div className={`text-center space-y-4 ${className}`}>
      <h1 className="text-3xl font-bold">Sovereignititee Platform</h1>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        We believe in a future where everyone is a Sovereignititee, free to control their own data and identity. 
        We are building a community of Sovereignititees who are leading the way in the data ownership revolution. 
        Our goal is to help more people become Sovereignititees through education and access to the SOLVY platform. 
        The SOLVY platform empowers individuals to become Sovereignititees, taking control of their digital lives. 
        Join our community of Sovereignititees who have achieved Sovereignitity.
      </p>
    </div>
  );
}
