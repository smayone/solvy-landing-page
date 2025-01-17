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
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex-1 flex justify-center">
                <img
                  src="/attached_assets/fulllogo.png"
                  alt="SOLVY Logo"
                  className="h-56 w-auto object-contain" 
                />
              </div>
              <div className="flex-1 flex justify-center">
                <CartoonAvatar
                  src="/attached_assets/IMG_0615.jpeg"
                  alt="Profile"
                  className="h-56 w-56 border-4 border-background shadow-xl"
                />
              </div>
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
        </section>

        <Services />
        <Features />
        <Communities />
        <CTA />
      </main>
    </div>
  );
}