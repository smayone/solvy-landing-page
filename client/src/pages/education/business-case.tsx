import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Users, HandshakeIcon, Shield, Heart } from "lucide-react";

export default function BusinessCase() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Strategic Early Adoption Opportunity</h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Market Evolution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The Web3 financial education landscape is in its early stages, presenting a unique 
                opportunity for forward-thinking organizations. Early adopters will shape the future 
                of decentralized financial education and community governance.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Cooperative to DAO Transition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Understanding the natural progression from traditional cooperative business models 
                to Decentralized Autonomous Organizations (DAOs) is crucial. This transition represents 
                the future of community-driven financial education and empowerment.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Community Evolution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Early understanding of decentralized governance allows communities to mature 
                organically. Delaying this understanding risks missing the opportunity to 
                shape the foundation of future financial communities and educational systems.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                First-Mover Advantage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Shape the future of decentralized education governance</li>
                <li>• Build deep understanding before mass adoption</li>
                <li>• Establish thought leadership in Web3 education</li>
                <li>• Influence the development of community standards</li>
                <li>• Create lasting impact on financial education</li>
              </ul>
            </CardContent>
          </Card>

          <div className="bg-primary/5 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Missed Opportunities Without Early Understanding</h2>
            <div className="space-y-4">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Critical Areas:</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Community governance structure development and evolution</li>
                  <li>Educational content alignment with Web3 principles</li>
                  <li>Early participation in standard-setting discussions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Next Steps:</h3>
                <p className="text-muted-foreground">
                  Join us in shaping the future of decentralized financial education. Our team is ready 
                  to explore how your organization can participate in this transformative journey from 
                  traditional cooperation to decentralized autonomy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}