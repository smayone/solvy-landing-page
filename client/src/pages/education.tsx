import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShareButtons } from "@/components/ui/share-buttons";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Video, ChevronRight, Shield, Brain, Coins } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Education() {
  const { data: educationalContent } = useQuery({
    queryKey: ['/api/educational-content'],
  });

  const modules = [
    {
      id: 'decidey',
      title: 'DECIDEY Foundation',
      description: 'Decentralized Empowerment Control Identity Data Economy of Yours',
      icon: Shield,
      topics: [
        {
          title: 'Understanding DECIDEY',
          videoId: '6WG7D47tGb0',
          description: 'Introduction to DECIDEY and its mission for community empowerment'
        },
        {
          title: 'Community Education Initiative',
          videoId: 'HNC-BhJO_zQ',
          description: 'How DECIDEY empowers communities through blockchain education'
        },
        {
          title: 'Digital Identity Fundamentals',
          videoId: 'wZR4f3cqtr0',
          description: 'Understanding the basics of digital identity and self-sovereignty'
        },
        {
          title: 'Path to Sovereignitity',
          videoId: 'xyz123',
          description: 'The journey from education to self-sovereign identity through DECIDEY'
        }
      ]
    },
    {
      id: 'blockchain',
      title: 'Blockchain Fundamentals',
      description: 'Master core blockchain concepts for your journey to Sovereignitity',
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
          videoId: 'abc456',
          description: 'How blockchain networks achieve agreement'
        }
      ]
    },
    {
      id: 'solvy',
      title: 'SOLVY Integration',
      description: 'Solutions Valued You - Your Vehicle for Financial Sovereignty',
      icon: Coins,
      topics: [
        {
          title: 'SOLVY Platform Overview',
          videoId: 'qFBYB4W2tqU',
          description: 'Understanding SOLVY as your monetization vehicle'
        },
        {
          title: 'Sovereignitity in Practice',
          videoId: 'ZE2HxTmxfrI',
          description: 'Applying DECIDEY education through SOLVY platform'
        },
        {
          title: 'Self-Sovereign Identity',
          videoId: '2tTVJL4bpTU',
          description: 'Managing your digital identity and financial sovereignty'
        },
        {
          title: 'Advanced SOLVY Features',
          videoId: 'ClnnLI1SClA',
          description: 'Maximizing your potential with SOLVY tools'
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
              Your journey from education to Sovereignitity through DECIDEY and SOLVY
            </p>
          </div>
          <ShareButtons 
            title="SOLVY Blockchain Education"
            description="Learn about blockchain technology and achieve Sovereignitity with DECIDEY"
          />
        </div>

        <Tabs defaultValue="decidey" className="space-y-8">
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