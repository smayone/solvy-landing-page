import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitMerge, Lock, Users, Vote, Wallet, Heart, PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DAOPage() {
  const { t } = useTranslation();

  const features = [
    { icon: Users, key: "governance", title: "Community Governance" },
    { icon: Lock, key: "transparency", title: "Transparent Operations" },
    { icon: Vote, key: "voting", title: "Democratic Voting" },
    { icon: Heart, key: "charity", title: "Charity Integration" },
    { icon: GitMerge, key: "proposals", title: "Community Proposals" },
    { icon: Wallet, key: "treasury", title: "DAO Treasury" }
  ];

  const charityInitiatives = [
    {
      title: "Period Poverty Campaign",
      description: "Supporting menstrual health and accessibility through blockchain-verified distribution.",
      status: "Active",
      votes: 156,
      fundingGoal: "$50,000",
      currentFunding: "$32,450"
    },
    {
      title: "JewelPads Integration",
      description: "Direct integration with jewelpads.charity for transparent donation tracking.",
      status: "Proposed",
      votes: 89,
      fundingGoal: "$25,000",
      currentFunding: "$12,300"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Community DAO
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Empowering community-driven decisions and charitable initiatives through decentralized governance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {features.map(({ icon: Icon, key, title }) => (
            <Card key={key} className="bg-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {t(`dao.features.${key}`)}
                </p>
                <Badge variant="outline" className="mt-2">
                  {key}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="initiatives" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="initiatives">Active Initiatives</TabsTrigger>
            <TabsTrigger value="propose">Create Proposal</TabsTrigger>
          </TabsList>

          <TabsContent value="initiatives">
            <div className="grid gap-6 mt-6">
              {charityInitiatives.map((initiative) => (
                <Card key={initiative.title}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{initiative.title}</CardTitle>
                        <CardDescription>{initiative.description}</CardDescription>
                      </div>
                      <Badge variant={initiative.status === "Active" ? "default" : "outline"}>
                        {initiative.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Funding Goal</p>
                        <p className="text-lg font-semibold">{initiative.fundingGoal}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Funding</p>
                        <p className="text-lg font-semibold">{initiative.currentFunding}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button className="flex-1">
                        <Vote className="mr-2 h-4 w-4" /> Vote ({initiative.votes})
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Heart className="mr-2 h-4 w-4" /> Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="propose">
            <Card>
              <CardHeader>
                <CardTitle>Create New Initiative</CardTitle>
                <CardDescription>
                  Propose a new charitable initiative or integration with existing platforms.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Proposal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}