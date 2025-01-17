import { useTranslation } from "react-i18next";
import { Services } from "@/components/sections/services";
import { Features } from "@/components/sections/features";
import { Communities } from "@/components/sections/communities";
import { CTA } from "@/components/sections/cta";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="relative py-8">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4">
                <h1 className="text-6xl font-bold tracking-tighter">SOLVY</h1>
                <img
                  src="/attached_assets/fulllogo.png"
                  alt="SOLVY Logo"
                  className="h-32 w-auto" // Increased from h-24 to h-32
                />
                <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                  <AvatarImage 
                    src="/attached_assets/IMG_0615.jpeg" 
                    alt="Profile"
                    className="object-cover"
                  />
                  <AvatarFallback>
                    <User className="h-16 w-16" />
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="max-w-[800px] mx-auto mt-8">
                <p className="text-xl text-muted-foreground">
                  {t('hero.vulture_economy')}
                </p>
                <p className="mt-4 text-xl text-muted-foreground">
                  {t('hero.solutions_valued')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <Services />
        <Features />
        <Communities />
        <CTA />
      </main>
    </div>
  );
}