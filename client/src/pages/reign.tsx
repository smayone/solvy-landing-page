import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Heart, Play, BookOpen, CheckCircle } from "lucide-react";

interface EducationalContent {
  id: string;
  title: string;
  description: string;
  moduleId: string;
  topicId: string;
  content: {
    videoUrl?: string;
    text?: string;
    resources?: string[];
  };
  type: "video" | "article" | "interactive";
}

interface LearningProgress {
  moduleId: string;
  topicId: string;
  progress: number;
  completedAt?: string;
}

export default function ReignEducation() {
  const { t } = useTranslation();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  // Fetch educational content
  const { data: content = [] } = useQuery<EducationalContent[]>({
    queryKey: ['/api/reign/educational-content'],
  });

  // Fetch user's learning progress
  const { data: progress = [] } = useQuery<LearningProgress[]>({
    queryKey: ['/api/reign/learning-progress'],
  });

  // Group content by modules
  const modules = content.reduce((acc: Record<string, EducationalContent[]>, item) => {
    if (!acc[item.moduleId]) {
      acc[item.moduleId] = [];
    }
    acc[item.moduleId].push(item);
    return acc;
  }, {});

  // Calculate progress for each module
  const moduleProgress = Object.keys(modules).reduce((acc: Record<string, number>, moduleId) => {
    const moduleItems = modules[moduleId].length;
    const completedItems = progress.filter(p => p.moduleId === moduleId && p.completedAt).length;
    acc[moduleId] = (completedItems / moduleItems) * 100;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Heart className="h-12 w-12 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Reign Education Hub</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering through knowledge: Explore our comprehensive educational resources 
              on sustainability, women's health, and social impact.
            </p>
          </div>
        </div>
      </section>

      {/* Learning Modules */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(modules).map(([moduleId, items]) => (
            <Card key={moduleId} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{items[0]?.title}</CardTitle>
                <CardDescription>
                  {items.length} lessons • {Math.round(moduleProgress[moduleId] || 0)}% complete
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={moduleProgress[moduleId] || 0} className="mb-4" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Play className="h-4 w-4" />
                    <span>{items.filter(i => i.type === 'video').length} videos</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>{items.filter(i => i.type === 'article').length} articles</span>
                  </div>
                  {moduleProgress[moduleId] === 100 && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>Completed</span>
                    </div>
                  )}
                </div>
                <Button 
                  className="w-full mt-4"
                  variant={selectedModule === moduleId ? "secondary" : "default"}
                  onClick={() => setSelectedModule(moduleId)}
                >
                  {selectedModule === moduleId ? "Currently Viewing" : "Start Learning"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Selected Module Content */}
      {selectedModule && (
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Course Content</h2>
            <div className="grid gap-4">
              {modules[selectedModule]?.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {item.type === 'video' && <Play className="h-5 w-5" />}
                      {item.type === 'article' && <BookOpen className="h-5 w-5" />}
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    {item.content.videoUrl && (
                      <div className="aspect-video mb-4">
                        <iframe
                          src={item.content.videoUrl}
                          className="w-full h-full rounded-lg"
                          allowFullScreen
                        />
                      </div>
                    )}
                    {item.content.text && (
                      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: item.content.text }} />
                    )}
                    {progress.find(p => p.topicId === item.topicId)?.completedAt ? (
                      <Button variant="secondary" className="mt-4" disabled>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </Button>
                    ) : (
                      <Button className="mt-4">Mark as Complete</Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
