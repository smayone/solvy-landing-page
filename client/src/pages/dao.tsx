import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitMerge, Lock, Users, Vote, Wallet } from "lucide-react";

export default function DAOPage() {
  const { t } = useTranslation();

  const features = [
    { icon: Users, key: "governance" },
    { icon: Lock, key: "transparency" },
    { icon: Vote, key: "voting" },
    { icon: GitMerge, key: "proposals" },
    { icon: Wallet, key: "treasury" }
  ];

  const participationActions = [
    { key: "join", variant: "default" as const },
    { key: "propose", variant: "outline" as const },
    { key: "vote", variant: "secondary" as const },
    { key: "stake", variant: "outline" as const }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {t('dao.title')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('dao.description')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {features.map(({ icon: Icon, key }) => (
            <Card key={key} className="bg-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">
                    {t(`dao.features.${key}`)}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="mt-2">
                  {key}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{t('dao.participation.join')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {participationActions.map(({ key, variant }) => (
                <Button key={key} variant={variant}>
                  {t(`dao.participation.${key}`)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
