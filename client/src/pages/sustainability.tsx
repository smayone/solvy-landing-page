import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { GraduationCap, Leaf, Recycle, Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface SustainabilityMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
}

const defaultMetrics: SustainabilityMetric[] = [
  {
    id: "carbon_offset",
    name: "Carbon Offset",
    value: 2500,
    target: 5000,
    unit: "kg CO2"
  },
  {
    id: "recycled_materials",
    name: "Recycled Materials Used",
    value: 75,
    target: 100,
    unit: "%"
  },
  {
    id: "water_saved",
    name: "Water Saved",
    value: 15000,
    target: 20000,
    unit: "liters"
  }
];

export default function Sustainability() {
  const { data: metrics = defaultMetrics } = useQuery<SustainabilityMetric[]>({
    queryKey: ['/api/sustainability/metrics'],
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              Sustainability Tracking
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Transparent blockchain-verified tracking of our environmental and social impact
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <Card key={metric.id} className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {metric.id === "carbon_offset" && <Leaf className="h-5 w-5" />}
                  {metric.id === "recycled_materials" && <Recycle className="h-5 w-5" />}
                  {metric.id === "water_saved" && <Heart className="h-5 w-5" />}
                  {metric.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={(metric.value / metric.target) * 100} />
                  <p className="text-sm text-muted-foreground">
                    {metric.value} / {metric.target} {metric.unit}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            View Blockchain Verification
          </Button>
        </div>
      </div>

      {/* Impact Section */}
      <section className="bg-primary/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Commitment to Sustainability</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our products are made with sustainably sourced materials and eco-friendly production processes.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Social Responsibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We're committed to addressing period poverty and promoting menstrual health education.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All our sustainability metrics are verified and tracked on the blockchain for complete transparency.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
