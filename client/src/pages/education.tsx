import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShareButtons } from "@/components/ui/share-buttons";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  BookOpen,
  Video,
  ChevronRight,
  Shield,
  Brain,
  Coins,
  Users,
  PlayCircle,
  BookOpenText,
  Globe,
  Building2,
  Landmark,
  Scale,
  BadgeHelp
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";

interface LearningPathRecommendation {
  title: string;
  description: string;
  moduleId: string;
  topicId: string;
}

interface PersonalizedPath {
  recommendations: LearningPathRecommendation[];
}

interface CommunityChannel {
  name: string;
  description: string;
  channelId: string;
  category: string;
  latestVideo?: {
    title: string;
    thumbnailUrl: string;
    publishedAt: string;
    views: string;
  };
}

export default function Education() {
  const [currentConceptIndex, setCurrentConceptIndex] = useState(0); // Added state management here

  const { data: educationalContent } = useQuery({
    queryKey: ['/api/educational-content'],
  });

  const { data: personalizedPath } = useQuery<PersonalizedPath>({
    queryKey: ['/api/learning-path'],
  });

  const glossaryTerms = [
    {
      term: "Sovereignitity",
      definition: "The state of having complete control and authority over one's financial and digital identity, free from external control or influence. This concept combines sovereignty with the ability to monetize and protect one's personal data and financial assets."
    },
    {
      term: "SOLVY",
      definition: "Solutions Valued You - A comprehensive Web3 financial platform designed to empower service-based businesses through blockchain technologies, enabling them to achieve financial sovereignty."
    },
    {
      term: "DECIDEY",
      definition: "Decentralized Empowerment Control Identity Data Economy of Yours - An educational foundation and governance platform that empowers individuals through blockchain education and community-driven decision making."
    },
    {
      term: "ICSID (International Investment Protection)",
      definition: "A World Bank institution that safeguards international investments, similar to how stock market regulations protect investors. Just as stock exchanges provide a regulated environment for trading shares, ICSID provides a framework for resolving disputes between international investors and host countries. This protection is particularly crucial for investments in natural resources and infrastructure projects, helping maintain market stability and investor confidence in global markets."
    },
    {
      term: "BRICS+",
      definition: "A powerful economic alliance originally formed by Brazil, Russia, India, China, and South Africa, now expanded to include more nations. As of January 2025, full members include the original five plus Egypt, Ethiopia, Iran, United Arab Emirates, and Indonesia. Partner countries with observer status include Algeria, Mexico, Nigeria, Kazakhstan, Senegal, Thailand, Turkey, and Vietnam. The alliance represents a significant shift in global economic power, focusing on developing alternative financial systems, promoting economic sovereignty, and establishing new trade settlement mechanisms independent of traditional Western-dominated systems.\n\nKey Objectives:\n- Economic Cooperation: Fostering trade, investment, and development opportunities among members\n- Political Influence: Creating a counterbalance to Western-dominated global institutions\n- Financial Initiatives: Developing mechanisms like the New Development Bank (NDB) and BRICS Contingent Reserve Arrangement\n- Payment Systems: Establishing independent cross-border payment infrastructure and settlement systems\n- Cultural Exchange: Promoting educational and social collaboration between member nations\n- Global Governance: Addressing international challenges including climate change and security\n\nMembership Timeline:\n- Original Members: Brazil, Russia, India, China\n- 2010: South Africa joins\n- 2024: Egypt, Ethiopia, Iran, UAE join\n- 2025: Indonesia becomes full member"
    },
    {
      term: "Economic Imperialism / Neocolonialism",
      definition: "A modern form of economic control where powerful nations and corporations exploit developing economies through unfair resource extraction, labor practices, and market dominance. Similar to how traditional colonialism operated through direct political control, economic imperialism works through financial mechanisms such as predatory investments, market manipulation, and economic dependencies. This system often results in resource depletion, wage suppression, and economic instability in developing nations, while profits primarily benefit foreign investors and corporations. Understanding this concept is crucial for developing alternative economic systems that promote true financial sovereignty and fair economic development."
    }
  ];

  const communityChannels: CommunityChannel[] = [
    {
      name: "Democracy at Work",
      description: "Economic analysis and socialist perspective",
      channelId: "UCK-6FjMu9OI8i0Fo6bkW0VA",
      category: "Economic Analysis",
      latestVideo: {
        title: "Economic Update: Why Workers' Rights Are Key",
        thumbnailUrl: `https://i.ytimg.com/vi/latest-video-id/maxresdefault.jpg`,
        publishedAt: "2025-01-24",
        views: "45K"
      }
    },
    {
      name: "World Affairs In Context",
      description: "Blockchain and cryptocurrency insights",
      channelId: "https://www.youtube.com/@lenapetrova",
      category: "Global Perspectives",
      latestVideo: {
        title: "BRICS+ Expansion: What It Means for Global Finance",
        thumbnailUrl: `https://i.ytimg.com/vi/latest-video-id/maxresdefault.jpg`,
        publishedAt: "2025-01-23",
        views: "32K"
      }
    },
    {
      name: "Geopolitical Economy Report",
      description: "Global economic and political analysis",
      channelId: "https://www.youtube.com/@GeopoliticalEconomyReport",
      category: "Global Perspectives",
      latestVideo: {
        title: "Geopolitical Risks and Investment Strategies",
        thumbnailUrl: `https://i.ytimg.com/vi/latest-video-id/maxresdefault.jpg`,
        publishedAt: "2025-01-22",
        views: "28K"
      }
    },
    {
      name: "Cyrus Janssen",
      description: "International business and cultural perspectives",
      channelId: "https://www.youtube.com/@CyrusJanssen",
      category: "Global Perspectives",
      latestVideo: {
        title: "Understanding Global Trade Dynamics",
        thumbnailUrl: `https://i.ytimg.com/vi/latest-video-id/maxresdefault.jpg`,
        publishedAt: "2025-01-21",
        views: "21K"
      }
    },
    {
      name: "Gary's Economics",
      description: "Economic education and analysis",
      channelId: "https://www.youtube.com/@garyseconomics",
      category: "Economic Analysis",
      latestVideo: {
        title: "Inflation and Monetary Policy Explained",
        thumbnailUrl: `https://i.ytimg.com/vi/latest-video-id/maxresdefault.jpg`,
        publishedAt: "2025-01-20",
        views: "18K"
      }
    },
    {
      name: "Think BRICS",
      description: "Analysis of BRICS nations and global economy",
      channelId: "https://www.youtube.com/@ThinkBRICS",
      category: "Global Perspectives",
      latestVideo: {
        title: "BRICS+ and the Future of Global Development",
        thumbnailUrl: `https://i.ytimg.com/vi/latest-video-id/maxresdefault.jpg`,
        publishedAt: "2025-01-19",
        views: "15K"
      }
    },
    {
      name: "The Money Multiplier",
      description: "Financial education and wealth building",
      channelId: "https://www.youtube.com/@the.money.multiplier",
      category: "Financial Education",
      latestVideo: {
        title: "Building a Solid Financial Foundation",
        thumbnailUrl: `https://i.ytimg.com/vi/latest-video-id/maxresdefault.jpg`,
        publishedAt: "2025-01-18",
        views: "12K"
      }
    },
    {
      name: "Melanin Money",
      description: "Financial literacy and wealth building",
      channelId: "https://www.youtube.com/@melaninmoney",
      category: "Financial Education",
      latestVideo: {
        title: "Investing for Financial Freedom",
        thumbnailUrl: `https://i.ytimg.com/vi/latest-video-id/maxresdefault.jpg`,
        publishedAt: "2025-01-17",
        views: "10K"
      }
    },
    {
      name: "Earn Your Leisure",
      description: "Business and financial education",
      channelId: "https://www.youtube.com/@EarnYourLeisure",
      category: "Financial Education",
      latestVideo: {
        title: "Entrepreneurship and Financial Success",
        thumbnailUrl: `https://i.ytimg.com/vi/latest-video-id/maxresdefault.jpg`,
        publishedAt: "2025-01-16",
        views: "8K"
      }
    },
    {
      name: "Kitco News",
      description: "Precious metals and market analysis",
      channelId: "https://www.youtube.com/@kitco",
      category: "Market Analysis",
      latestVideo: {
        title: "Gold Market Outlook for 2025",
        thumbnailUrl: `https://i.ytimg.com/vi/latest-video-id/maxresdefault.jpg`,
        publishedAt: "2025-01-15",
        views: "6K"
      }
    },
    {
      name: "Jason Sipple",
      description: "Financial markets and trading education",
      channelId: "https://www.youtube.com/@jasonsipple",
      category: "Market Analysis",
      latestVideo: {
        title: "Technical Analysis Techniques",
        thumbnailUrl: `https://i.ytimg.com/vi/latest-video-id/maxresdefault.jpg`,
        publishedAt: "2025-01-14",
        views: "5K"
      }
    },
    {
      name: "Crash Course",
      description: "Educational content covering economics, finance, and more",
      channelId: "https://www.youtube.com/@crashcourse",
      category: "Financial Education",
      latestVideo: {
        title: "Understanding Macroeconomics",
        thumbnailUrl: `https://i.ytimg.com/vi/latest-video-id/maxresdefault.jpg`,
        publishedAt: "2025-01-13",
        views: "4K"
      }
    }
  ];

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

  const channelCategories = [
    "Economic Analysis",
    "Global Perspectives",
    "Financial Education",
    "Market Analysis"
  ];

  const conceptIcons = {
    "Sovereignitity": Globe,
    "SOLVY": Building2,
    "DECIDEY": Shield,
    "ICSID": Scale,
    "BRICS+": Landmark,
    "Economic Imperialism": BadgeHelp
  };


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              DECIDEY Learning Hub
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Your personalized journey to financial sovereignty through comprehensive blockchain education
            </p>
            <div className="flex justify-center">
              <ShareButtons
                title="SOLVY Blockchain Education"
                description="Learn about blockchain technology and achieve Sovereignitity with DECIDEY"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Personalized Learning Path */}
        {personalizedPath && (
          <section className="py-24 border-b">
            <div className="max-w-4xl mx-auto text-center">
              <Brain className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Your Learning Journey</h2>
              <p className="text-xl text-muted-foreground mb-12">
                AI-powered recommendations tailored to your interests
              </p>
              <div className="grid gap-6">
                {personalizedPath.recommendations.map((item, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="flex-1 text-left">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                      <Button variant="outline" size="lg">
                        Start Learning
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Key Concepts Section */}
        <section className="py-24 border-b">
          <div className="text-center mb-16">
            <BookOpenText className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Key Concepts & Terminology</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Essential concepts shaping the future of finance
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  if (currentConceptIndex > 0) {
                    setCurrentConceptIndex(prev => prev - 1);
                  }
                }}
                disabled={currentConceptIndex === 0}
              >
                Previous
              </Button>
              <span className="flex items-center text-lg font-medium">
                {currentConceptIndex + 1} of {glossaryTerms.length}
              </span>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  if (currentConceptIndex < glossaryTerms.length - 1) {
                    setCurrentConceptIndex(prev => prev + 1);
                  }
                }}
                disabled={currentConceptIndex === glossaryTerms.length - 1}
              >
                Next
              </Button>
            </div>
          </div>
          <div className="max-w-2xl mx-auto">
            {glossaryTerms.map((item, index) => {
              const IconComponent = conceptIcons[item.term as keyof typeof conceptIcons] || BookOpenText;
              return (
                <div
                  key={index}
                  className={`transition-opacity duration-300 ${
                    index === currentConceptIndex ? 'block opacity-100' : 'hidden opacity-0'
                  }`}
                >
                  <Card className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-6 rounded-full mb-8">
                        <IconComponent className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-3xl font-bold mb-6">{item.term}</h3>
                      <p className="text-lg text-muted-foreground">
                        {item.definition.split('\n')[0]}
                      </p>
                      {item.definition.split('\n').length > 1 && (
                        <div className="mt-6 space-y-4">
                          {item.definition
                            .split('\n')
                            .slice(1)
                            .filter(line => line.trim())
                            .map((line, i) => (
                              <p key={i} className="text-muted-foreground">
                                {line}
                              </p>
                            ))}
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </section>

        {/* Community Resources Section */}
        <section className="py-24 border-b">
          <div className="text-center mb-16">
            <Users className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Community Resources</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Latest educational content from trusted voices
            </p>
          </div>
          <div className="space-y-24">
            {channelCategories.map((category) => (
              <div key={category} className="scroll-m-20">
                <div className="flex items-center justify-center gap-4 mb-12">
                  {category === "Economic Analysis" && <Landmark className="h-8 w-8 text-primary" />}
                  {category === "Global Perspectives" && <Globe className="h-8 w-8 text-primary" />}
                  {category === "Financial Education" && <BookOpen className="h-8 w-8 text-primary" />}
                  {category === "Market Analysis" && <Coins className="h-8 w-8 text-primary" />}
                  <h3 className="text-3xl font-bold">{category}</h3>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {communityChannels
                    .filter(channel => channel.category === category)
                    .map((channel, index) => (
                      <HoverCard key={index}>
                        <HoverCardTrigger asChild>
                          <Card className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            {channel.latestVideo && (
                              <>
                                <AspectRatio ratio={16 / 9}>
                                  <img
                                    src={channel.latestVideo.thumbnailUrl}
                                    alt={`Latest video from ${channel.name}`}
                                    className="object-cover w-full h-full"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <PlayCircle className="h-16 w-16 text-white" />
                                  </div>
                                </AspectRatio>
                                <CardContent className="p-6">
                                  <h3 className="text-xl font-bold mb-3 line-clamp-1">
                                    {channel.name}
                                  </h3>
                                  <p className="text-primary text-lg mb-4 line-clamp-2">
                                    {channel.latestVideo.title}
                                  </p>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{channel.latestVideo.publishedAt}</span>
                                    <span>•</span>
                                    <span>{channel.latestVideo.views} views</span>
                                  </div>
                                </CardContent>
                              </>
                            )}
                          </Card>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 p-0">
                          <AspectRatio ratio={16 / 9}>
                            <img
                              src={channel.latestVideo?.thumbnailUrl}
                              alt={`Channel preview for ${channel.name}`}
                              className="rounded-t-md object-cover w-full h-full"
                            />
                          </AspectRatio>
                          <div className="p-6 space-y-4">
                            <h4 className="text-xl font-bold">{channel.name}</h4>
                            <p className="text-muted-foreground">
                              {channel.description}
                            </p>
                            <Button variant="outline" size="lg" className="w-full" asChild>
                              <a
                                href={channel.channelId.startsWith('http') ? channel.channelId : `https://youtube.com/channel/${channel.channelId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Visit Channel
                              </a>
                            </Button>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Modules Section */}
        <section className="py-24">
          <div className="text-center mb-16">
            <GraduationCap className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Learning Modules</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Structured learning paths to master blockchain concepts
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="decidey" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3">
                {modules.map((module) => (
                  <TabsTrigger key={module.id} value={module.id} className="flex items-center gap-2">
                    <module.icon className="h-5 w-5" />
                    {module.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {modules.map((module) => (
                <TabsContent key={module.id} value={module.id}>
                  <Card>
                    <CardHeader>
                      <div className="text-center">
                        <module.icon className="h-16 w-16 text-primary mx-auto mb-6" />
                        <CardTitle className="text-2xl mb-4">{module.title}</CardTitle>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                          {module.description}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {module.topics.map((topic, index) => (
                          <Card key={index}>
                            <CardContent className="p-8">
                              <div className="flex items-center justify-between gap-8">
                                <div className="flex-1">
                                  <h3 className="text-2xl font-bold mb-3">
                                    {topic.title}
                                  </h3>
                                  <p className="text-muted-foreground mb-6">
                                    {topic.description}
                                  </p>
                                  <Button
                                    variant="outline"
                                    size="lg"
                                    className="flex items-center gap-2"
                                    onClick={() => window.open(`https://www.youtube.com/watch?v=${topic.videoId}`, '_blank')}
                                  >
                                    <Video className="h-5 w-5" />
                                    Watch Video
                                  </Button>
                                </div>
                                <Progress value={33} className="w-[160px]" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </div>
    </div>
  );
}