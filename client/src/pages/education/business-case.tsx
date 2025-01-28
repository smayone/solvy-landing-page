import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Users, HandshakeIcon, Shield, Heart } from "lucide-react";

export default function BusinessCase() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">The Business Case</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Targeting a High-Value Demographic
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The upwardly mobile market represents a significant opportunity with a strong desire for 
                financial education and empowerment.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Meeting Evolving Needs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                DECIDEY and SOLVY address the specific needs of this demographic, going beyond traditional 
                financial literacy to include data ownership and impact investing.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Building a Loyal Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                By providing valuable resources and fostering a sense of shared purpose, education.solvy.chain 
                can cultivate a loyal and engaged community.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Strategic Partnerships
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Collaborating with top tech companies allows us to leverage their expertise and resources 
                to reach a wider audience and maximize impact.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Positive Brand Alignment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Supporting financial education and empowerment initiatives enhances the brand image of 
                partnering companies, demonstrating a commitment to social responsibility.
              </p>
            </CardContent>
          </Card>

          <div className="bg-primary/5 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Call to Action</h2>
            <p className="text-muted-foreground mb-6">
              We invite top tech companies to partner with us in empowering the upwardly mobile market. 
              By supporting DECIDEY and education.solvy.chain, you are investing in a generation that 
              values both financial success and positive social impact. This is an opportunity to align 
              your brand with innovation, empowerment, and a brighter future.
            </p>
            
            <h3 className="text-xl font-semibold mb-4">Key Changes for Upwardly Mobile Focus:</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Reframed Problem: Focuses on the specific challenges faced by the upwardly mobile demographic.</li>
              <li>Emphasizes Advanced Tools: Highlights the sophisticated nature of the financial tools and education offered.</li>
              <li>Focus on Impact Investing: Introduces the concept of aligning investments with personal values.</li>
              <li>Strategic Partnership Appeal: Directly appeals to top tech companies, emphasizing mutual benefits and positive brand alignment.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
