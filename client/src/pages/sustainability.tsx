import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ShareButtons } from "@/components/ui/share-buttons";
import {
  GraduationCap,
  Leaf,
  Recycle,
  Heart,
  Globe,
  UserCheck,
  Factory,
  Droplets,
  Users,
  Building2
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface SustainabilityMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  category: "environmental" | "social" | "production";
}

const defaultMetrics: SustainabilityMetric[] = [
  {
    id: "carbon_offset",
    name: "Carbon Offset",
    value: 2500,
    target: 5000,
    unit: "kg CO2",
    category: "environmental"
  },
  {
    id: "recycled_materials",
    name: "Recycled Materials Used",
    value: 75,
    target: 100,
    unit: "%",
    category: "environmental"
  },
  {
    id: "water_saved",
    name: "Water Saved",
    value: 15000,
    target: 20000,
    unit: "liters",
    category: "environmental"
  },
  {
    id: "organic_materials",
    name: "Organic Materials",
    value: 95,
    target: 100,
    unit: "%",
    category: "production"
  },
  {
    id: "sustainable_packaging",
    name: "Sustainable Packaging",
    value: 80,
    target: 100,
    unit: "%",
    category: "production"
  },
  {
    id: "community_impact",
    name: "People Supported",
    value: 5000,
    target: 10000,
    unit: "individuals",
    category: "social"
  },
  {
    id: "education_programs",
    name: "Education Programs",
    value: 24,
    target: 50,
    unit: "workshops",
    category: "social"
  }
];

const periodPovertyMetrics = {
  peopleHelped: 2500,
  productsDistributed: 25000,
  communitiesServed: 15,
  monthlyGrowthRate: 12
};

export default function Sustainability() {
  const { data: metrics = defaultMetrics } = useQuery<SustainabilityMetric[]>({
    queryKey: ['/api/sustainability/metrics'],
  });

  const categorizedMetrics = {
    environmental: metrics.filter(m => m.category === "environmental"),
    production: metrics.filter(m => m.category === "production"),
    social: metrics.filter(m => m.category === "social")
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              Blockchain-Verified Sustainability
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Transparent tracking of our environmental and social impact through immutable blockchain records
            </p>
            <ShareButtons
              title="SOLVY Sustainability Metrics"
              description="Track our verified sustainability and social impact metrics"
            />
          </div>
        </div>
      </section>

      {/* New Period Poverty DAO Section */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Users className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Period Poverty DAO Initiative</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A community-driven approach to addressing period poverty through blockchain transparency and collective action
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  People Helped
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  {periodPovertyMetrics.peopleHelped.toLocaleString()}
                </div>
                <Progress value={75} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Direct impact through our DAO initiatives
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Products Distributed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  {periodPovertyMetrics.productsDistributed.toLocaleString()}
                </div>
                <Progress value={80} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Sustainable products provided
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Communities Served
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  {periodPovertyMetrics.communitiesServed}
                </div>
                <Progress value={60} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Global community reach
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Monthly Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  {periodPovertyMetrics.monthlyGrowthRate}%
                </div>
                <Progress value={85} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Continuous impact expansion
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="gap-2">
              <Users className="h-5 w-5" />
              Join Our DAO Initiative
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Participate in governance and help shape the future of period poverty initiatives
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Environmental Impact */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Leaf className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold">Environmental Impact</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categorizedMetrics.environmental.map((metric) => (
              <Card key={metric.id} className="bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {metric.id === "carbon_offset" && <Leaf className="h-5 w-5" />}
                    {metric.id === "recycled_materials" && <Recycle className="h-5 w-5" />}
                    {metric.id === "water_saved" && <Droplets className="h-5 w-5" />}
                    {metric.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress value={(metric.value / metric.target) * 100} />
                    <p className="text-sm text-muted-foreground">
                      {metric.value.toLocaleString()} / {metric.target.toLocaleString()} {metric.unit}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Production Standards */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Factory className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold">Production Standards</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categorizedMetrics.production.map((metric) => (
              <Card key={metric.id} className="bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Factory className="h-5 w-5" />
                    {metric.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress value={(metric.value / metric.target) * 100} />
                    <p className="text-sm text-muted-foreground">
                      {metric.value.toLocaleString()} / {metric.target.toLocaleString()} {metric.unit}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Social Impact */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <UserCheck className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold">Social Impact</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categorizedMetrics.social.map((metric) => (
              <Card key={metric.id} className="bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {metric.id === "community_impact" && <Heart className="h-5 w-5" />}
                    {metric.id === "education_programs" && <GraduationCap className="h-5 w-5" />}
                    {metric.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress value={(metric.value / metric.target) * 100} />
                    <p className="text-sm text-muted-foreground">
                      {metric.value.toLocaleString()} / {metric.target.toLocaleString()} {metric.unit}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Blockchain Verification */}
        <div className="mt-12 text-center space-y-4">
          <Button variant="outline" size="lg" className="gap-2">
            <Globe className="h-5 w-5" />
            View Blockchain Verification
          </Button>
          <p className="text-sm text-muted-foreground">
            All metrics are verified and stored on the blockchain for complete transparency
          </p>
        </div>
      </div>

      {/* Impact Details */}
      <section className="bg-primary/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Commitment to Sustainability</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our products use sustainably sourced materials and eco-friendly production processes,
                  with a focus on organic ingredients and minimal environmental impact.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Social Responsibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We're actively addressing period poverty through community initiatives and
                  partnerships with local organizations to provide access to essential products.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Transparency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All our sustainability metrics are verified and tracked on the blockchain,
                  ensuring complete transparency and accountability in our operations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}