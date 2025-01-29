import { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Trophy, CheckCircle, BarChart, Check } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Checkbox } from "@/components/ui/checkbox";

interface VisitedLink {
  path: string;
  title: string;
  visited: boolean;
  completed: boolean;
}

interface LearningProgress {
  totalModules: number;
  completedModules: number;
  avgProgress: number;
}

export function ProgressTracker() {
  const { data: progressData } = useQuery<{ progress: LearningProgress }>({
    queryKey: ['/api/learning-progress'],
  });

  const [visitedLinks, setVisitedLinks] = useState<VisitedLink[]>([
    { path: '/education/blockchain-basics', title: 'Blockchain Basics', visited: false, completed: false },
    { path: '/education/decidey-foundation', title: 'DECIDEY Foundation', visited: false, completed: false },
    { path: '/education/digital-identity', title: 'Digital Identity', visited: false, completed: false },
    { path: '/education/web3-development', title: 'Web3 Development', visited: false, completed: false },
  ]);

  useEffect(() => {
    // Load visited and completed status from localStorage
    const storedLinks = localStorage.getItem('visitedLinks');
    if (storedLinks) {
      setVisitedLinks(JSON.parse(storedLinks));
    }

    // Track page visits
    const currentPath = window.location.pathname;
    const updatedLinks = visitedLinks.map(link => ({
      ...link,
      visited: link.visited || link.path === currentPath
    }));

    if (JSON.stringify(updatedLinks) !== JSON.stringify(visitedLinks)) {
      setVisitedLinks(updatedLinks);
      localStorage.setItem('visitedLinks', JSON.stringify(updatedLinks));
    }
  }, [window.location.pathname]);

  const toggleCompleted = (index: number) => {
    const updatedLinks = visitedLinks.map((link, i) => 
      i === index ? { ...link, completed: !link.completed } : link
    );
    setVisitedLinks(updatedLinks);
    localStorage.setItem('visitedLinks', JSON.stringify(updatedLinks));
  };

  const progress = progressData?.progress.avgProgress || 0;
  const completedModules = progressData?.progress.completedModules || 0;
  const totalModules = progressData?.progress.totalModules || 0;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Your Learning Progress</h3>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <BarChart className="h-4 w-4" />
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </div>

      <Progress value={progress} className="mb-4" />

      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Completed {completedModules} of {totalModules} modules
        </p>
      </div>

      <div className="space-y-2">
        {visitedLinks.map((link, index) => (
          <div key={index} className="flex items-center gap-2 p-2 rounded-md hover:bg-accent">
            <Checkbox
              checked={link.completed}
              onCheckedChange={() => toggleCompleted(index)}
              className="h-4 w-4"
            />
            <Link href={link.path}>
              <div className="flex items-center gap-2 cursor-pointer flex-1">
                <CheckCircle 
                  className={`h-4 w-4 ${link.visited ? 'text-primary' : 'text-muted'}`} 
                />
                <span className={`text-sm ${link.visited ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {link.title}
                </span>
                {link.completed && (
                  <Check className="h-4 w-4 text-green-500 ml-auto" />
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Card>
  );
}