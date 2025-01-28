import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Users, HandshakeIcon, Shield, Heart } from "lucide-react";

export default function BusinessCase() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Strategic Partnership Opportunity</h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Market Opportunity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The Web3 financial education market is projected to reach $12B by 2026, with 
                upwardly mobile professionals representing 65% of potential users. Our platform 
                is uniquely positioned to capture this high-value segment.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Revenue Potential
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Partners can expect 30-40% revenue share from educational content and 
                certification programs. Additional revenue streams include enterprise 
                licensing and white-label solutions.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                User Base Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Current user base of 50,000+ professionals, with 200% YoY growth. 
                Strategic partnerships expected to accelerate growth to 500,000+ users 
                by 2026.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Partnership Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Early access to emerging blockchain education market</li>
                <li>• Integration with partner's existing products/services</li>
                <li>• Co-branded certification programs</li>
                <li>• Access to valuable user insights and market data</li>
                <li>• Joint marketing and PR opportunities</li>
              </ul>
            </CardContent>
          </Card>

          <div className="bg-primary/5 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Investment & Partnership Structure</h2>
            <div className="space-y-4">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Partnership Tiers:</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Strategic Partner ($500K+): Full platform integration, custom solutions</li>
                  <li>Education Partner ($250K+): Co-branded content and certification</li>
                  <li>Distribution Partner ($100K+): Content distribution and revenue share</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Next Steps:</h3>
                <p className="text-muted-foreground">
                  Schedule a partnership discussion to explore customized solutions and 
                  integration opportunities. Our team will provide detailed financial 
                  projections and integration roadmap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}