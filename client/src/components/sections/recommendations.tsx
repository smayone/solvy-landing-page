import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, TrendingUp, LineChart, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";

type Recommendation = {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: "investment" | "savings" | "spending" | "general";
  icon: any;
};

// This would normally come from an AI service
const generateRecommendations = (userData: any): Recommendation[] => {
  // Placeholder recommendations - in production, this would use real AI analysis
  return [
    {
      title: "Increase Emergency Savings",
      description: "Based on your spending patterns, we recommend increasing your emergency fund by 15%",
      impact: "high",
      category: "savings",
      icon: DollarSign,
    },
    {
      title: "Investment Opportunity",
      description: "Market analysis suggests potential in sustainable energy sectors",
      impact: "medium",
      category: "investment",
      icon: TrendingUp,
    },
    {
      title: "Budget Optimization",
      description: "AI analysis shows potential savings in subscription services",
      impact: "high",
      category: "spending",
      icon: LineChart,
    },
  ];
};

export function FinancialRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    // In production, this would fetch real user data
    const mockUserData = {
      spending: [],
      savings: [],
      investments: [],
    };
    setRecommendations(generateRecommendations(mockUserData));
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">AI Recommendations</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((recommendation, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="rounded-full bg-primary/10 p-2 mr-4">
                <recommendation.icon className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-sm font-medium">
                {recommendation.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {recommendation.description}
              </p>
              <div className="mt-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
                <span className="text-xs font-medium">
                  {recommendation.impact.toUpperCase()} Impact
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
