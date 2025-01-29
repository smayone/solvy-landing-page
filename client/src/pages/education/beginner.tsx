import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, PlayCircle, Trophy } from "lucide-react";
import { useState } from "react";

const MODULES = [
  {
    id: "blockchain-basics",
    title: "Introduction to Blockchain",
    content: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">What is Blockchain?</h3>
        <p>A blockchain is a distributed, decentralized ledger that records transactions across a network of computers.</p>

        <h3 class="text-lg font-semibold">Key Concepts:</h3>
        <ul class="list-disc pl-6 space-y-2">
          <li>Decentralization: No single authority controls the network</li>
          <li>Immutability: Once recorded, data cannot be altered</li>
          <li>Transparency: All transactions are visible to network participants</li>
          <li>Consensus: Network participants agree on the state of the ledger</li>
        </ul>

        <h3 class="text-lg font-semibold">Benefits of Blockchain:</h3>
        <ul class="list-disc pl-6 space-y-2">
          <li>Enhanced security through cryptography</li>
          <li>Reduced need for intermediaries</li>
          <li>Improved transparency and traceability</li>
          <li>Lower transaction costs</li>
        </ul>
      </div>
    `
  },
  {
    id: "crypto-fundamentals",
    title: "Understanding Cryptocurrency",
    content: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">What is Cryptocurrency?</h3>
        <p>Cryptocurrency is a digital or virtual form of currency that uses cryptography for security.</p>

        <h3 class="text-lg font-semibold">Types of Cryptocurrencies:</h3>
        <ul class="list-disc pl-6 space-y-2">
          <li>Bitcoin: The first and most well-known cryptocurrency</li>
          <li>Ethereum: Platform for smart contracts and decentralized applications</li>
          <li>Stablecoins: Cryptocurrencies pegged to stable assets</li>
        </ul>

        <h3 class="text-lg font-semibold">Key Features:</h3>
        <ul class="list-disc pl-6 space-y-2">
          <li>Decentralized nature</li>
          <li>Limited supply</li>
          <li>Peer-to-peer transactions</li>
          <li>Borderless transfers</li>
        </ul>
      </div>
    `
  },
  {
    id: "web3-intro",
    title: "Web3 and Decentralized Finance",
    content: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">What is Web3?</h3>
        <p>Web3 represents the next evolution of the internet, built on decentralized networks.</p>

        <h3 class="text-lg font-semibold">Components of Web3:</h3>
        <ul class="list-disc pl-6 space-y-2">
          <li>Decentralized Applications (dApps)</li>
          <li>Smart Contracts</li>
          <li>Tokenization</li>
          <li>Decentralized Finance (DeFi)</li>
        </ul>

        <h3 class="text-lg font-semibold">DeFi Applications:</h3>
        <ul class="list-disc pl-6 space-y-2">
          <li>Lending and borrowing</li>
          <li>Decentralized exchanges</li>
          <li>Yield farming</li>
          <li>Insurance</li>
        </ul>
      </div>
    `
  },
  {
    id: "digital-identity",
    title: "Digital Identity and Privacy",
    content: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Digital Identity in Web3</h3>
        <p>Digital identity in Web3 empowers users with control over their personal data and online presence.</p>

        <h3 class="text-lg font-semibold">Key Concepts:</h3>
        <ul class="list-disc pl-6 space-y-2">
          <li>Self-sovereign identity</li>
          <li>Decentralized identifiers (DIDs)</li>
          <li>Verifiable credentials</li>
          <li>Privacy-preserving protocols</li>
        </ul>

        <h3 class="text-lg font-semibold">Benefits:</h3>
        <ul class="list-disc pl-6 space-y-2">
          <li>User data ownership</li>
          <li>Reduced risk of identity theft</li>
          <li>Selective disclosure of information</li>
          <li>Interoperable identity systems</li>
        </ul>
      </div>
    `
  }
];

export default function BeginnerCourse() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentModule, setCurrentModule] = useState(0);

  // Query for user progress
  const { data: progressData } = useQuery({
    queryKey: ["/api/education/progress/beginner"],
    queryFn: async () => {
      const res = await fetch("/api/education/progress/beginner");
      if (!res.ok) throw new Error("Failed to fetch progress");
      return res.json();
    }
  });

  // Mutation for completing modules
  const completeMutation = useMutation({
    mutationFn: async (moduleId: string) => {
      const res = await fetch("/api/education/progress/beginner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, completed: true }),
      });
      if (!res.ok) throw new Error("Failed to mark as complete");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/education/progress/beginner"] });
      toast({
        title: "Progress Saved",
        description: data.isBeginnerCompleted 
          ? "Congratulations! You've completed the beginner course and unlocked basic membership!" 
          : "Module completed successfully!",
      });
    },
  });

  const completedModules = progressData?.progress?.filter(p => p.progress === 100) || [];
  const progressPercentage = (completedModules.length / MODULES.length) * 100;
  const currentModuleCompleted = completedModules.some(
    m => m.moduleId === MODULES[currentModule].id
  );

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Blockchain Basics</h1>
        <Progress value={progressPercentage} className="w-full" />
        <p className="text-sm text-muted-foreground mt-2">
          {completedModules.length} of {MODULES.length} modules completed
        </p>
        {progressData?.membership?.isActive && (
          <div className="flex items-center gap-2 mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
            <Trophy className="h-5 w-5" />
            <span>Basic membership activated!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Course Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {MODULES.map((module, index) => (
                  <Button
                    key={module.id}
                    variant={currentModule === index ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setCurrentModule(index)}
                  >
                    {completedModules.some(m => m.moduleId === module.id) ? (
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    ) : (
                      <PlayCircle className="w-4 h-4 mr-2" />
                    )}
                    {module.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {MODULES[currentModule] && (
                <>
                  <h2 className="text-2xl font-bold mb-4">{MODULES[currentModule].title}</h2>
                  <div 
                    className="prose prose-slate max-w-none dark:prose-invert" 
                    dangerouslySetInnerHTML={{ __html: MODULES[currentModule].content }} 
                  />
                  <Button
                    className="mt-6"
                    disabled={currentModuleCompleted}
                    onClick={() => completeMutation.mutate(MODULES[currentModule].id)}
                  >
                    {currentModuleCompleted ? "Completed" : "Mark as Complete"}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}