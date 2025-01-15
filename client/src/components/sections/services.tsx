import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, LineChart, Shield } from "lucide-react";

export function Services() {
  const services = [
    {
      title: "DECIDEY",
      description: "Decentralized Empowerment Control Identity Data Economy of Yours",
      longDescription: "Control Your Identity, Data, and Economy. Our NGO Operations focus on tech company revenue tax repatriation, transparent donation management, and community-focused initiatives.",
      icon: GraduationCap,
      features: [
        "Comprehensive blockchain and DeFi education",
        "Interactive learning modules",
        "Community-driven knowledge sharing",
        "AI-driven financial education content"
      ],
      logo: "/attached_assets/SolvyLogo-1024.png" 
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
      logo: "/attached_assets/SolvyLogo-1024.png"
    },
    {
      title: "MAN",
      description: "Mandatory Audit Network",
      longDescription: "Comprehensive tracking and monitoring system ensuring transparency and accountability across all platform activities.",
      icon: Shield,
      features: [
        "Real-time transaction monitoring",
        "Automated compliance checks",
        "Transparent audit trails",
        "Multi-level access control"
      ],
      logo: "/attached_assets/SolvyLogo-1024.png" 
    },
  ];

  return (
    <section className="container py-16" id="ecosystem">
      <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">
        The SOLVY Ecosystem
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="relative overflow-hidden">
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
        ))}
      </div>
    </section>
  );
}