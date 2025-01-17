import { Button } from "@/components/ui/button";
import { Shield, LineChart, GraduationCap } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "Secure Identity",
      description: "Self-sovereign identity solutions protecting your digital presence"
    },
    {
      icon: LineChart,
      title: "Financial Freedom",
      description: "Advanced blockchain payment technologies for borderless transactions"
    },
    {
      icon: GraduationCap,
      title: "DECIDEY Integration",
      description: "Decentralized decision-making and governance platform"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-[800px] mx-auto">
            <div className="mb-8">
              <img
                src="/attached_assets/fulllogo.png"
                alt="SOLVY Logo"
                className="h-32 w-auto"
              />
            </div>
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Your Gateway to Financial Sovereignty
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              In a world where your data is held captive, SOLVY empowers you with true ownership of your digital identity and financial future.
            </p>
            <Button size="lg" className="text-lg">
              Join the Revolution
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-background border"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Breaking the Chains</h2>
            <p className="text-xl text-muted-foreground">
              Solvy.chain: Solutions Valued You. We're building a cooperative, DAO-driven future where trade and commerce are mutually beneficial and truly empower individuals.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}