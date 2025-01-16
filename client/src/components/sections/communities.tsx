import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield, Briefcase, Building2, Wallet, Coins, Users2 } from "lucide-react";

export function Communities() {
  const communities = [
    {
      title: "Military Veterans",
      description: "Specialized financial solutions honoring those who served, with dedicated support for military benefits and transitions.",
      Icon: Shield
    },
    {
      title: "Self-Employed & Small Businesses",
      description: "Tailored services for entrepreneurs and small business owners, supporting sustainable growth and financial independence.",
      Icon: Briefcase
    },
    {
      title: "Employee-Owned Companies",
      description: "Supporting shared ownership models with collaborative financial tools and cooperative banking solutions.",
      Icon: Building2
    },
    {
      title: "IBC/BYOB Entrepreneurs",
      description: "Specialized support for Infinite Banking Concept practitioners and Be Your Own Banker strategies.",
      Icon: Wallet
    },
    {
      title: "NFT Enthusiasts & Creators",
      description: "Integrated solutions for NFT trading, creation, and monetization with seamless fiat-to-crypto conversion.",
      Icon: Coins
    },
    {
      title: "Un/Underbanked Individuals",
      description: "Inclusive financial services breaking down traditional banking barriers, ensuring access for all and get rid of poverty to make our economy stronger.",
      Icon: Users2
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-4">
          Communities We Serve
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-[800px] mx-auto">
          Empowering diverse communities with tailored financial solutions for true economic sovereignty.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {communities.map((community) => (
            <Card key={community.title} className="relative overflow-hidden">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <community.Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{community.title}</h3>
                    <p className="text-sm text-muted-foreground">{community.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}