import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShareButtons } from "@/components/ui/share-buttons";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Video, ChevronRight, Shield, Brain } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Education() {
  const { data: educationalContent } = useQuery({
    queryKey: ['/api/educational-content'],
  });

  const modules = [
    {
      id: 'basics',
      title: 'Blockchain Fundamentals',
      description: 'Master the core concepts of blockchain technology',
      icon: BookOpen,
      topics: [
        {
          title: 'What is Blockchain?',
          videoId: '6WG7D47tGb0',
          description: 'Introduction to blockchain technology and its fundamental principles'
        },
        {
          title: 'Decentralization Explained',
          videoId: 'HNC-BhJO_zQ',
          description: 'Understanding the power of decentralized systems'
        },
        {
          title: 'Cryptography Basics',
          videoId: 'wZR4f3cqtr0',
          description: 'Essential cryptographic concepts in blockchain'
        },
        {
          title: 'Consensus Mechanisms',
          videoId: 'wZR4f3cqtr0',
          description: 'How blockchain networks achieve agreement'
        }
      ]
    },
    {
      id: 'decidey',
      title: 'DECIDEY Integration',
      description: 'Understanding Decentralized Empowerment Control Identity Data Economy',
      icon: Shield,
      topics: [
        {
          title: 'Introduction to DECIDEY',
          videoId: 'xyz123',
          description: 'The foundation of decentralized identity and economic control'
        },
        {
          title: 'Identity Sovereignty',
          videoId: 'abc456',
          description: 'Taking control of your digital identity'
        },
        {
          title: 'Economic Empowerment',
          videoId: 'def789',
          description: 'Building financial sovereignty through blockchain'
        },
        {
          title: 'Data Control',
          videoId: 'ghi012',
          description: 'Managing and protecting your personal data'
        }
      ]
    },
    {
      id: 'defi',
      title: 'DeFi & Financial Sovereignty',
      description: 'Understanding decentralized finance and financial independence',
      icon: Brain,
      topics: [
        {
          title: 'Introduction to DeFi',
          videoId: 'qFBYB4W2tqU',
          description: 'The basics of decentralized finance'
        },
        {
          title: 'Smart Contracts',
          videoId: 'ZE2HxTmxfrI',
          description: 'Understanding automated, trustless agreements'
        },
        {
          title: 'Decentralized Exchanges',
          videoId: '2tTVJL4bpTU',
          description: 'Trading without intermediaries'
        },
        {
          title: 'Yield Farming',
          videoId: 'ClnnLI1SClA',
          description: 'Advanced DeFi strategies'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              DECIDEY Learning Hub
            </h1>
            <p className="text-muted-foreground">
              Your journey to financial sovereignty through blockchain education
            </p>
          </div>
          <ShareButtons 
            title="SOLVY Blockchain Education"
            description="Learn about blockchain technology and decentralized finance with DECIDEY"
          />
        </div>

        <Tabs defaultValue="basics" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            {modules.map((module) => (
              <TabsTrigger key={module.id} value={module.id} className="flex items-center gap-2">
                <module.icon className="h-4 w-4" />
                {module.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {modules.map((module) => (
            <TabsContent key={module.id} value={module.id}>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <module.icon className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle>{module.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {module.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {module.topics.map((topic, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h3 className="text-lg font-medium mb-1">
                                  {topic.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {topic.description}
                                </p>
                                <div className="mt-4">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-2"
                                    onClick={() => window.open(`https://www.facebook.com/SANathanLLC/videos/${topic.videoId}`, '_blank')}
                                  >
                                    <Video className="h-4 w-4" />
                                    Watch Video
                                  </Button>
                                </div>
                              </div>
                              <Progress value={33} className="w-[100px]" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}