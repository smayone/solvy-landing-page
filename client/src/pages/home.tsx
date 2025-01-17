import { useTranslation } from "react-i18next";
import { Services } from "@/components/sections/services";
import { Features } from "@/components/sections/features";
import { Communities } from "@/components/sections/communities";
import { CTA } from "@/components/sections/cta";
import { CartoonAvatar } from "@/components/ui/cartoon-avatar";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4">
                <h1 className="text-2xl font-bold tracking-tighter text-center mb-4">
                  SOLVY
                </h1>
                <img
                  src="/attached_assets/fulllogo.png"
                  alt="SOLVY Logo"
                  className="h-48 w-auto" 
                />
                <CartoonAvatar
                  src="/attached_assets/IMG_0615.jpeg"
                  alt="Profile"
                  className="h-32 w-32 border-4 border-background shadow-xl"
                />
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