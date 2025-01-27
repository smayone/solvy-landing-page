import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, LineChart, Shield, ChartBar } from "lucide-react";
import { Link } from "wouter";

export function Services() {
  const services = [
    {
      title: "DECIDEY (dee-see-day)",
      description: "Decentralized Empowerment Control Identity Data Economy of Yours",
      longDescription: "Control Your Identity, Data, and Economy. Our NGO Operations focus on tech company revenue tax repatriation, transparent donation management, and community-focused initiatives.",
      icon: GraduationCap,
      features: [
        "Tax repatriation monitoring",
        "DOJ privacy case tracking",
        "Transparent donation management",
        "Community-focused initiatives"
      ],
      logo: "/attached_assets/SolvyLogo-1024.png",
      route: "/education"
    },
    {
      title: "SOLVY",
      description: "Revolutionary Vehicle Mechanism Platform",
      longDescription: "A platform enabling secure, transparent, and efficient financial transactions across borders.",
      icon: LineChart,
      features: [
        "Cross-border payment solutions",
        "Decentralized remittance system",
        "Smart contract automation",
        "Comprehensive financial tools"
      ],
      logo: "/attached_assets/SolvyLogo-1024.png",
      route: "/crypto"
    },
    {
      title: "MAN",
      description: "Mandatory Audit Network",
      longDescription: "Comprehensive tracking and monitoring system ensuring transparency and accountability across all platform activities, integrated with Stripe's automated tax services.",
      icon: ChartBar,
      features: [
        "Real-time transaction monitoring",
        "Automated tax calculations & compliance",
        "Transparent audit trails with blockchain",
        "Financial reporting & analytics"
      ],
      logo: "/attached_assets/SolvyLogo-1024.png",
      route: "/man"
    },
  ];

  return (
    <section className="py-16" id="ecosystem">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">
          The SOLVY Ecosystem
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <Link key={service.title} href={service.route}>
              <Card className="relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img 
                      src={service.logo} 
                      alt={service.title}
                      className="h-12 w-12"
                    />
                    <CardTitle>{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-primary mb-2">{service.description}</p>
                  <p className="text-muted-foreground mb-4">{service.longDescription}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <service.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}