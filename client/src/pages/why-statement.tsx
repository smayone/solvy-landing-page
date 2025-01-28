import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function WhyStatement() {
  const [currentChapter, setCurrentChapter] = useState(0);

  const chapters: Chapter[] = [
    {
      id: "surveillance",
      title: "Market Surveillance",
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground">The Inequality of Captive Market Surveillance</h3>
          <p className="text-muted-foreground">
            In today's digital age, we find ourselves trapped in a system of captive market surveillance - where our data 
            is constantly collected, analyzed, and used by corporations without our explicit consent or fair compensation.
          </p>
          <div className="grid gap-4">
            <div className="bg-destructive/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Unequal Benefits</h4>
              <p className="text-sm">
                Corporations profit immensely from our data, while we see little to no direct benefit. Our personal 
                information becomes a commodity, traded and exploited without our meaningful participation in its value.
              </p>
            </div>
            <div className="bg-destructive/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Privacy Violations</h4>
              <p className="text-sm">
                Data breaches and misuse of personal information are rampant, leading to privacy violations and potential harm.
                Our digital footprints are vulnerable to exploitation and unauthorized access.
              </p>
            </div>
            <div className="bg-destructive/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Manipulation & Control</h4>
              <p className="text-sm">
                Our data is used to manipulate our choices, target us with ads, and even influence our political views,
                creating echo chambers that limit exposure to diverse perspectives.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "origins",
      title: "Origins & Foundation",
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground">Early Foundations</h3>
          <p className="text-muted-foreground">
            The United States, a nation built on the promise of freedom and opportunity, has a complex economic history 
            intertwined with the migration and experiences of diverse ethnic groups. From its inception, the nation's 
            economy has been shaped by forces of both progress and exploitation.
          </p>
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="text-sm">
              The arrival of European settlers marked the beginning of a system built on the displacement of indigenous 
              populations and the enslavement of Africans, concentrating wealth and power in the hands of a privileged few.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "industrial-era",
      title: "Industrial Revolution",
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground">The Rise of Industry</h3>
          <p className="text-muted-foreground">
            The 19th and early 20th centuries saw waves of immigration from Europe and Asia, fueling industrial growth 
            while also exacerbating social and economic disparities. The rise of industrial capitalism brought both 
            opportunities and challenges.
          </p>
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="text-sm">
              Workers faced harsh conditions and limited rights, leading to the birth of labor movements 
              and the fight for workers' rights.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "modern-era",
      title: "Modern Economy",
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground">Globalization & Technology</h3>
          <p className="text-muted-foreground">
            The late 20th and early 21st centuries saw the rise of globalization and neoliberal economic policies, 
            leading to increased trade and technological advancements, but also growing inequality.
          </p>
          <div className="bg-destructive/10 p-4 rounded-lg">
            <p className="text-sm">
              The concentration of wealth among the top 1% and the rise of surveillance capitalism 
              have created unprecedented challenges for economic freedom.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "path-outcomes",
      title: "Two Paths Forward",
      content: (
        <div className="space-y-8">
          <h3 className="text-xl font-semibold text-foreground">The Critical Choice</h3>
          <p className="text-muted-foreground">
            As we stand at this pivotal moment, two distinct paths lie before us, each with profound implications 
            for our economic future.
          </p>
          
          <div className="grid gap-6">
            <div className="bg-destructive/10 p-6 rounded-lg border border-destructive/20">
              <h4 className="text-lg font-semibold mb-3">Path 1: Maintaining the Status Quo</h4>
              <p className="mb-4">
                Continuing with surveillance capitalism and centralized control leads to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Severe currency devaluation</li>
                <li>Economic system collapse</li>
                <li>Widening wealth inequality</li>
                <li>Loss of personal privacy and autonomy</li>
                <li>Market manipulation and instability</li>
              </ul>
            </div>
          
            <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
              <h4 className="text-lg font-semibold mb-3">Path 2: Economic Evolution</h4>
              <p className="mb-4">
                Embracing cooperative business models and decentralization leads to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maturation of DAOs (Decentralized Autonomous Organizations)</li>
                <li>Enhanced economic stability and resilience</li>
                <li>Fair wealth distribution</li>
                <li>Individual data sovereignty</li>
                <li>Community-driven growth and innovation</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "solution",
      title: "Our Solution",
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground">Breaking Free with Self-Sovereign Identity</h3>
          <p className="text-muted-foreground">
            SOLVY offers a way to escape the "captive market surveillance" system and reclaim control over our data 
            and digital identities through Self-Sovereign Identity (SSI).
          </p>
          <div className="grid gap-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">DECIDEY NGO</h4>
              <p className="text-sm">
                Drawing the line through foundational education, empowering informed decisions about our economic future
                and providing the knowledge needed to understand and utilize SSI effectively.
              </p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">SOLVY Platform</h4>
              <p className="text-sm">
                The practical implementation of SSI, giving you complete control over your digital identity. You decide 
                what information to share, with whom, and for what purpose.
              </p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">MAN (Mandatory Audit Network)</h4>
              <p className="text-sm">
                Ensuring accountability through comprehensive auditing and reporting of all activities, while maintaining
                your privacy and data sovereignty.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const nextChapter = () => {
    setCurrentChapter((prev) => Math.min(prev + 1, chapters.length - 1));
  };

  const prevChapter = () => {
    setCurrentChapter((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Why SOLVY?</h1>

      <div className="flex overflow-x-auto mb-8 pb-2 gap-2">
        {chapters.map((chapter, index) => (
          <button
            key={chapter.id}
            onClick={() => setCurrentChapter(index)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              currentChapter === index
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {chapter.title}
          </button>
        ))}
      </div>

      <div className="prose prose-lg max-w-none mb-8 dark:prose-invert">
        <div className="min-h-[400px]">
          {chapters[currentChapter].content}
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={prevChapter}
          disabled={currentChapter === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            currentChapter === 0
              ? "text-muted-foreground cursor-not-allowed"
              : "text-primary hover:bg-primary/10"
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
          Previous
        </button>
        <span className="text-muted-foreground">
          {currentChapter + 1} of {chapters.length}
        </span>
        <button
          onClick={nextChapter}
          disabled={currentChapter === chapters.length - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            currentChapter === chapters.length - 1
              ? "text-muted-foreground cursor-not-allowed"
              : "text-primary hover:bg-primary/10"
          }`}
        >
          Next
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}