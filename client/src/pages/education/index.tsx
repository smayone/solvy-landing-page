import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { BookOpen, CheckCircle, Circle } from "lucide-react";

export default function Education() {
  const { t } = useTranslation();
  
  const { data: progress } = useQuery<{ completed: string[] }>(["/api/education/progress"]);
  
  const paths = [
    {
      id: "beginner",
      title: t("education.learning_paths.beginner"),
      modules: [
        "blockchain_basics.intro",
        "blockchain_basics.decentralization",
        "blockchain_basics.consensus",
        "blockchain_basics.cryptography",
        "blockchain_basics.smart_contracts"
      ]
    },
    {
      id: "intermediate",
      title: t("education.learning_paths.intermediate"),
      locked: !progress?.completed?.includes("beginner"),
    },
    {
      id: "advanced",
      title: t("education.learning_paths.advanced"),
      locked: !progress?.completed?.includes("intermediate"),
    },
    {
      id: "expert",
      title: t("education.learning_paths.expert"),
      locked: !progress?.completed?.includes("advanced"),
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{t("education.welcome.title")}</h1>
        <p className="text-lg text-muted-foreground">{t("education.welcome.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {paths.map((path) => (
          <Card key={path.id} className={path.locked ? "opacity-75" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {progress?.completed?.includes(path.id) ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
                {path.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {path.modules?.map((module) => (
                <div key={module} className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{t(`education.${module}`)}</span>
                </div>
              ))}
              <Button
                className="mt-4 w-full"
                asChild
                disabled={path.locked}
              >
                <Link href={`/education/${path.id}`}>
                  {t("education.welcome.start_learning")}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
