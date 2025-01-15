import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, LineChart, Shield } from "lucide-react";

export function Services() {
  const services = [
    {
      title: "DECIDEY",
      description: "NGO Education Platform",
      icon: GraduationCap,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    },
    {
      title: "SOLVY",
      description: "Financial Services",
      icon: LineChart,
      image: "https://images.unsplash.com/photo-1683313060361-da015696d16f",
    },
    {
      title: "MAN",
      description: "Mandatory Audit Network",
      icon: Shield,
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
    },
  ];

  return (
    <section className="container py-16" id="services">
      <div className="grid gap-8 md:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{ backgroundImage: `url(${service.image})` }}
            />
            <CardHeader>
              <div className="flex items-center gap-4">
                <service.icon className="h-8 w-8 text-primary" />
                <CardTitle>{service.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
