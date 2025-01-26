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
  BadgeHelp,
  Hash,
  Database
} from "lucide-react";

// First define all constants
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
  "DAO": Users,
  "ICSID": Scale,
  "BRICS+": Landmark,
  "Economic Imperialism": BadgeHelp,
  "Infinite Banking": Coins,
  "BYOB": Landmark,
  "Smart Contract": Hash,
  "Web3": Globe,
  "DeFi": Coins,
  "Blockchain": Database
};

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

const glossaryTerms = [
  {
    term: "Blockchain",
    definition: "A decentralized, immutable digital ledger that records transactions across a network of computers. Each block contains a list of transactions and is cryptographically linked to the previous block, creating a chain of information that cannot be altered without changing all subsequent blocks.\n\nKey Features:\n- Decentralization: No single entity controls the network\n- Immutability: Once recorded, data cannot be changed\n- Transparency: All transactions are publicly verifiable\n- Security: Cryptographic techniques protect data integrity"
  },
  {
    term: "Smart Contract",
    definition: "Self-executing contracts with the terms of the agreement directly written into code. These programs automatically execute actions when predetermined conditions are met, enabling trustless automation of complex transactions.\n\nKey Aspects:\n- Autonomous Execution: No intermediaries needed\n- Transparency: Code is visible on the blockchain\n- Immutable: Cannot be changed once deployed\n- Deterministic: Same input always produces same output\n\nUse Cases in SOLVY:\n- Automated payments\n- Token distribution\n- Governance mechanisms\n- Cross-border transactions"
  },
  {
    term: "Web3",
    definition: "The next evolution of the internet, built on blockchain technology, that emphasizes decentralization, user ownership of data, and peer-to-peer interactions. Following Web1 (the read-only internet of static pages, 1990-2004) and Web2 (the social internet of user-generated content but controlled by large platforms, 2004-2020), Web3 aims to reduce reliance on centralized platforms and give users more control over their digital assets and identity.\n\nKey Components:\n- Decentralized Networks: No central points of control\n- Digital Ownership: True ownership of virtual assets\n- Self-Sovereign Identity: Users control their personal data\n- Token Economics: New models for value exchange\n\nHistorical Context:\n- Web1: Static, read-only pages with limited interaction\n- Web2: Social media, user content, but platform-controlled\n- Web3: User-owned, decentralized, and trustless"
  },
  {
    term: "DeFi (Decentralized Finance)",
    definition: "A financial system built on blockchain technology that removes traditional financial intermediaries. DeFi enables peer-to-peer financial services including lending, borrowing, trading, and insurance through smart contracts.\n\nKey Features:\n- Permissionless: Anyone can access services\n- Transparent: All transactions are verifiable\n- Interoperable: Different protocols can work together\n- Programmable: Automated financial operations\n\nCommon DeFi Services:\n- Decentralized Exchanges (DEX)\n- Lending Platforms\n- Yield Farming\n- Liquidity Pools"
  },
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
    term: "DAO",
    definition: "Decentralized Autonomous Organization (DAO) represents the future of organizational structure, combining blockchain technology with democratic governance. Unlike traditional hierarchical organizations, DAOs operate through smart contracts and community consensus, where rules and decisions are transparently encoded on the blockchain.\n\nKey Aspects:\n- Governance: Members participate directly in decision-making through voting mechanisms\n- Transparency: All transactions and decisions are recorded on the blockchain\n- Automation: Smart contracts execute decisions automatically\n- Token Economics: Utility tokens often represent voting power and ownership\n\nIn the SOLVY ecosystem, DAOs enable:\n- Community-driven development priorities\n- Transparent fund allocation\n- Collective decision-making on platform features\n- Fair distribution of rewards and responsibilities"
  },
  {
    term: "ICSID",
    definition: "A World Bank institution that safeguards international investments, similar to how stock market regulations protect investors. Just as stock exchanges provide a regulated environment for trading shares, ICSID provides a framework for resolving disputes between international investors and host countries. This protection is particularly crucial for investments in natural resources and infrastructure projects, helping maintain market stability and investor confidence in global markets."
  },
  {
    term: "BRICS+",
    definition: "A powerful economic alliance originally formed by Brazil, Russia, India, China, and South Africa, now expanded to include more nations. As of January 2025, full members include the original five plus Egypt, Ethiopia, Iran, United Arab Emirates, and Indonesia. Partner countries with observer status include Algeria, Mexico, Nigeria, Kazakhstan, Senegal, Thailand, Turkey, and Vietnam. The alliance represents a significant shift in global economic power, focusing on developing alternative financial systems, promoting economic sovereignty, and establishing new trade settlement mechanisms independent of traditional Western-dominated systems."
  },
  {
    term: "Economic Imperialism",
    definition: "A modern form of economic control where powerful nations and corporations exploit developing economies through unfair resource extraction, labor practices, and market dominance. Similar to how traditional colonialism operated through direct political control, economic imperialism works through financial mechanisms such as predatory investments, market manipulation, and economic dependencies."
  },
  {
    term: "Infinite Banking Concept (IBC)",
    definition: "A financial strategy developed by Nelson Nash that utilizes specially engineered dividend-paying whole life insurance as a personal banking system. It allows individuals to become their own bankers by borrowing against their policy's cash value for investments and expenses, while maintaining control over their money and earning compound interest.\n\nKey Components:\n- Specially engineered dividend-paying whole life insurance (not typical agent-sold policies)\n- Policy loans for personal financing\n- Tax-advantaged growth under the IRS 7-Pay Test (7-year rule)\n- Uninterrupted compound interest\n- Legacy building\n\nImportant Note: These policies are specifically designed for banking purposes and differ significantly from traditional whole life insurance policies typically sold by agents. The IRS 7-Pay Test is crucial - it determines the maximum amount that can be paid into the policy over the first seven years while maintaining tax advantages and avoiding Modified Endowment Contract (MEC) status. This engineering requires expertise to maximize cash value while staying within these guidelines."
  },
  {
    term: "Banking Policy",
    definition: "A specifically engineered dividend-paying whole life insurance policy structured to maximize cash value growth and banking capabilities within the Infinite Banking Concept framework. Unlike traditional life insurance policies sold by typical agents, these banking policies are specially designed with precise specifications to optimize cash value accumulation while staying within IRS guidelines.\n\nKey Features:\n- High cash value to premium ratio through specific engineering\n- Structured around the IRS 7-Pay Test, which sets premium limits for the first seven years to avoid MEC status\n- Carefully balanced base premium and paid-up additions to maximize growth within IRS guidelines\n- Dividend participation\n- Flexible premium payment structure\n- Quick access to capital through policy loans\n\nNote: These policies require specific design expertise and differ substantially from standard whole life insurance. The 7-Pay Test is a critical IRS rule that determines how much can be contributed to the policy in the first seven years while maintaining its tax advantages. Exceeding these limits converts the policy to a Modified Endowment Contract (MEC), which loses many of the banking benefits."
  },
  {
    term: "Policy Loan",
    definition: "A unique feature of whole life insurance that allows policyholders to borrow against their policy's cash value. Unlike traditional loans, policy loans don't undergo credit checks because you're essentially borrowing against your own money. The insurance company uses your policy's cash value as collateral.\n\nAdvantages:\n- No qualification requirements\n- Flexible repayment terms\n- Lower interest rates than conventional loans\n- Loan doesn't affect policy's cash value growth\n- Death benefit remains intact minus outstanding loan balance"
  },
  {
    term: "Mutual Insurance Company",
    definition: "An insurance company owned by its policyholders rather than external shareholders. In mutual companies, excess profits (dividends) are distributed back to policyholders, aligning with the Infinite Banking Concept's principle of becoming your own banker.\n\nCharacteristics:\n- Policyholder ownership\n- Long-term focus\n- Conservative investment approach\n- Annual dividend payments\n- Emphasis on financial strength"
  },
  {
    term: "Cash Value",
    definition: "The savings component of a whole life insurance policy that grows tax-deferred through premium payments, guaranteed interest, and dividends. In the context of Infinite Banking, cash value serves as your personal banking system's capital base.\n\nGrowth Factors:\n- Premium payments\n- Guaranteed interest rate\n- Non-guaranteed dividends\n- Tax-deferred accumulation\n- Compound growth over time"
  },
  {
    term: "Be Your Own Banker (BYOB)",
    definition: "A financial philosophy and practice derived from the Infinite Banking Concept that emphasizes taking control of your financial life by creating and managing your own banking system. Instead of relying on traditional banks for financing, individuals use specially designed whole life insurance policies to build and access capital.\n\nPrinciples:\n- Financial independence from traditional banking\n- Control over lending terms\n- Wealth building through consistent capitalization\n- Legacy creation\n- Systematic debt reduction"
  },
  {
    term: "Modified Endowment Contract (MEC)",
    definition: "A life insurance policy that has been funded with more money than allowed by the IRS 7-Pay Test, causing it to lose many of its tax advantages and banking benefits. The 7-Pay Test determines the maximum amount that can be paid into a policy during its first seven years to maintain its tax-advantaged status.\n\nKey Points:\n- Set by the Technical and Miscellaneous Revenue Act of 1988\n- Limits premium payments over first seven years\n- Exceeding limits triggers MEC status\n- MECs lose tax advantages for policy loans\n- Critical consideration in IBC policy design\n\nImportant: Proper engineering of banking policies specifically aims to maximize cash value while staying within these 7-Pay Test limits to avoid MEC status."
  },
  {
    term: "Self-Sovereign Identity (SSI)",
    definition: "A digital identity model that gives individuals complete control over their personal information, allowing them to manage and share their credentials without relying on centralized authorities. Also known as Decentralized Identity (DID) or User-Controlled Identity.\n\nKey Components:\n- Decentralized Identifiers (DIDs): Globally unique identifiers anchored on blockchain\n- Verifiable Credentials (VCs): Cryptographically secure digital versions of physical credentials\n- Digital Identity Wallet: Personal storage and management of identity credentials\n- Zero-Knowledge Proofs: Ability to prove claims without revealing unnecessary information\n\nIndustry Terms:\n- DID (Decentralized Identity): Technical term for blockchain-based identity systems\n- W3C DID: Standard specification for decentralized identifiers\n- VC (Verifiable Credentials): Standard for cryptographically verifiable claims\n- KERI (Key Event Receipt Infrastructure): Protocol for managing cryptographic keys\n- DIDComm: Protocol for secure communication between DIDs\n\nUse Cases in SOLVY:\n- KYC/AML Compliance\n- Cross-border Identity Verification\n- Professional Credentials\n- Access Control"
  }
];

// Process terms once
const sortedGlossaryTerms = [...glossaryTerms].sort((a, b) =>
  a.term.localeCompare(b.term)
);

const groupedTerms = sortedGlossaryTerms.reduce((acc, term) => {
  const firstLetter = term.term.charAt(0).toUpperCase();
  if (!acc[firstLetter]) {
    acc[firstLetter] = [];
  }
  acc[firstLetter].push(term);
  return acc;
}, {} as Record<string, typeof glossaryTerms>);

const availableLetters = Object.keys(groupedTerms).sort();

// Community channels data
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
    description: "Financial education and IBC strategies",
    channelId: "https://www.youtube.com/@the.money.multiplier",
    category: "Financial Education",
    latestVideo: {
      title: "Understanding Infinite Banking Concept",
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

// Learning modules
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
  },
  {
    id: 'infinite-banking',
    title: 'Infinite Banking Concept',
    description: 'Master the art of becoming your own banker',
    icon: Coins,
    topics: [
      {
        title: 'IBC Fundamentals',
        videoId: 'ibc101',
        description: 'Introduction to the Infinite Banking Concept and its principles'
      },
      {
        title: 'Banking Policies Explained',
        videoId: 'ibc102',
        description: 'Understanding dividend-paying whole life insurance policies'
      },
      {
        title: 'Policy Loans & Financing',
        videoId: 'ibc103',
        description: 'How to leverage your policy for investments and expenses'
      },
      {
        title: 'Building Your Banking System',
        videoId: 'ibc104',
        description: 'Practical steps to implement your personal banking system'
      }
    ]
  }
];


import { useQuery } from "@tanstack/react-query";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";

export default function Education() {
  const [currentLetter, setCurrentLetter] = useState(availableLetters[0]);
  const [currentConceptIndex, setCurrentConceptIndex] = useState(0);
  const [currentChannelIndices, setCurrentChannelIndices] = useState<Record<string, number>>(() =>
    channelCategories.reduce((acc, category) => ({ ...acc, [category]: 0 }), {})
  );

  const { data: educationalContent } = useQuery({
    queryKey: ['/api/educational-content'],
  });

  const { data: personalizedPath } = useQuery<PersonalizedPath>({
    queryKey: ['/api/learning-path'],
  });


  const handlePrevChannel = (category: string) => {
    setCurrentChannelIndices(prev => ({
      ...prev,
      [category]: Math.max(0, prev[category] - 1)
    }));
  };

  const handleNextChannel = (category: string) => {
    const categoryChannels = communityChannels.filter(c => c.category === category);
    setCurrentChannelIndices(prev => ({
      ...prev,
      [category]: Math.min(categoryChannels.length - 1, prev[category] + 1)
    }));
  };

  const scrollToLetter = (letter: string) => {
    setCurrentLetter(letter);
    const element = document.getElementById(`section-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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

        {/* Conceptualizations & Terminology Section */}
        <section className="py-24 border-b">
          <div className="text-center mb-16">
            <BookOpenText className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Conceptualizations & Terminology</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Essential concepts shaping the future of finance
            </p>

            {/* Alphabetical Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {availableLetters.map((letter) => (
                <Button
                  key={letter}
                  variant={currentLetter === letter ? "default" : "outline"}
                  size="sm"
                  onClick={() => scrollToLetter(letter)}
                  className="w-10 h-10 rounded-full"
                >
                  {letter}
                </Button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {availableLetters.map((letter) => (
              <div key={letter} id={`section-${letter}`} className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Hash className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{letter}</h3>
                </div>
                <div className="grid gap-6">
                  {groupedTerms[letter].map((item, index) => {
                    const IconComponent = conceptIcons[item.term as keyof typeof conceptIcons] || BookOpenText;
                    return (
                      <Card key={index} className="p-8">
                        <div className="flex flex-col items-start">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="bg-primary/10 p-4 rounded-full">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <h4 className="text-2xl font-bold">{item.term}</h4>
                          </div>
                          <div className="space-y-4">
                            {item.definition.split('\n\n').map((paragraph, pIndex) => (
                              <p
                                key={pIndex}
                                className={pIndex === 0 ? "text-lg" : "text-muted-foreground"}
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Resources Section */}
        <section className="py-24 border-b">
          <div className="text-center mb-16">
            <Users className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Community Resources</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Latest educational content from trusted voices
            </p>
          </div>
          <div className="space-y-32">
            {channelCategories.map((category) => {
              const categoryChannels = communityChannels.filter(c => c.category === category);
              const currentIndex = currentChannelIndices[category];
              const currentChannel = categoryChannels[currentIndex];

              return (
                <div key={category} className="scroll-m-20">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    {category === "Economic Analysis" && <Landmark className="h-8 w-8 text-primary" />}
                    {category === "Global Perspectives" && <Globe className="h-8 w-8 text-primary" />}
                    {category === "Financial Education" && <BookOpen className="h-8 w-8 text-primary" />}
                    {category === "Market Analysis" && <Coins className="h-8 w-8 text-primary" />}
                    <h3 className="text-3xl font-bold">{category}</h3>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex justify-center gap-4 mb-8">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handlePrevChannel(category)}
                        disabled={currentIndex === 0}
                      >
                        Previous
                      </Button>
                      <span className="flex items-center text-lg font-medium">
                        {currentIndex + 1} of {categoryChannels.length}
                      </span>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleNextChannel(category)}
                        disabled={currentIndex === categoryChannels.length - 1}
                      >
                        Next
                      </Button>
                    </div>
                    <div className="w-full max-w-3xl mx-auto">
                      {currentChannel && currentChannel.latestVideo && (
                        <Card className="overflow-hidden transition-transform hover:scale-[1.02]">
                          <AspectRatio ratio={16 / 9}>
                            <img
                              src={currentChannel.latestVideo.thumbnailUrl}
                              alt={`Latest video from ${currentChannel.name}`}
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                              <PlayCircle className="h-24 w-24 text-white" />
                            </div>
                          </AspectRatio>
                          <CardContent className="p-8">
                            <div className="space-y-6">
                              <div>
                                <h3 className="text-2xl font-bold mb-2">{currentChannel.name}</h3>
                                <p className="text-muted-foreground">{currentChannel.description}</p>
                              </div>
                              <div className="space-y-4">
                                <h4 className="text-xl font-semibold text-primary">Latest Content</h4>
                                <p className="lg">{currentChannel.latestVideo.title}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span>{currentChannel.latestVideo.publishedAt}</span>
                                  <span>•</span>
                                  <span>{currentChannel.latestVideo.views} views</span>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="lg"
                                className="w-full"
                                asChild
                              >
                                <a
                                  href={currentChannel.channelId.startsWith('http') ? currentChannel.channelId : `https://youtube.com/channel/${currentChannel.channelId}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Visit Channel
                                </a>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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