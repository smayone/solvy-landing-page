import { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Trophy, CheckCircle } from "lucide-react";

interface VisitedLink {
  path: string;
  title: string;
  visited: boolean;
}

export function ProgressTracker() {
  const [visitedLinks, setVisitedLinks] = useState<VisitedLink[]>([
    { path: '/education#decidey', title: 'DECIDEY Basics', visited: false },
    { path: '/education#modules', title: 'Interactive Modules', visited: false },
    { path: '/why-statement', title: 'Why SOLVY?', visited: false },
    // Add more educational content links as needed
  ]);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Load visited links from localStorage
    const storedLinks = localStorage.getItem('visitedLinks');
    if (storedLinks) {
      setVisitedLinks(JSON.parse(storedLinks));
    }

    // Track page visits
    const currentPath = window.location.pathname + window.location.hash;
    const updatedLinks = visitedLinks.map(link => ({
      ...link,
      visited: link.visited || link.path === currentPath
    }));

    if (JSON.stringify(updatedLinks) !== JSON.stringify(visitedLinks)) {
      setVisitedLinks(updatedLinks);
      localStorage.setItem('visitedLinks', JSON.stringify(updatedLinks));
    }

    // Calculate progress
    const completedCount = updatedLinks.filter(link => link.visited).length;
    const newProgress = Math.round((completedCount / updatedLinks.length) * 100);
    setProgress(newProgress);
  }, [window.location.pathname, window.location.hash]);

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Your Learning Progress</h3>
      </div>
      
      <Progress value={progress} className="mb-4" />
      <p className="text-sm text-muted-foreground mb-4">
        {progress}% Complete
      </p>

      <div className="space-y-2">
        {visitedLinks.map((link, index) => (
          <div key={index} className="flex items-center gap-2">
            <CheckCircle className={`h-4 w-4 ${link.visited ? 'text-primary' : 'text-muted'}`} />
            <span className={`text-sm ${link.visited ? 'text-foreground' : 'text-muted-foreground'}`}>
              {link.title}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
