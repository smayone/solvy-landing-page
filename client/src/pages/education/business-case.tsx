import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Users, Shield } from "lucide-react";

export default function BusinessCase() {
  return (
    <div className="min-h-screen bg-background">
      {/* Make header section responsive */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8">Strategic Early Adoption Opportunity</h1>

          {/* Responsive grid for cards */}
          <div className="grid gap-4 md:gap-8">
            <Card className="mb-4 md:mb-8">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Target className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                  <span className="break-words">Market Evolution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-muted-foreground">
                  The Web3 financial education landscape is in its early stages, presenting a unique 
                  opportunity for forward-thinking organizations. Early adopters will shape the future 
                  of decentralized financial education and community governance.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-4 md:mb-8">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                  <span className="break-words">Cooperative to DAO Transition</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-muted-foreground">
                  Understanding the natural progression from traditional cooperative business models 
                  to Decentralized Autonomous Organizations (DAOs) is crucial. This transition represents 
                  the future of community-driven financial education and empowerment.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-4 md:mb-8">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Users className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                  <span className="break-words">Community Evolution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-muted-foreground">
                  Early understanding of decentralized governance allows communities to mature 
                  organically. Delaying this understanding risks missing the opportunity to 
                  shape the foundation of future financial communities and educational systems.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-4 md:mb-8">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Shield className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                  <span className="break-words">First-Mover Advantage</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Shape the future of decentralized education governance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Build deep understanding before mass adoption</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Establish thought leadership in Web3 education</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Influence the development of community standards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Create lasting impact on financial education</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Bottom section with improved mobile layout */}
            <div className="bg-primary/5 rounded-lg p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4">Missed Opportunities Without Early Understanding</h2>
              <div className="space-y-4">
                <div className="mb-4 md:mb-6">
                  <h3 className="text-lg font-semibold mb-2">Critical Areas:</h3>
                  <ul className="list-disc pl-4 md:pl-6 space-y-2 text-sm md:text-base text-muted-foreground">
                    <li>Community governance structure development and evolution</li>
                    <li>Educational content alignment with Web3 principles</li>
                    <li>Early participation in standard-setting discussions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Next Steps:</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
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
    </div>
  );
}