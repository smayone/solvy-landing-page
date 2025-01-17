import { useTranslation } from "react-i18next";
import { Services } from "@/components/sections/services";
import { Features } from "@/components/sections/features";
import { Communities } from "@/components/sections/communities";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="relative py-16 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <h1 className="text-6xl font-bold tracking-tighter">SOLVY</h1>
                <img
                  src="/attached_assets/fulllogo.png"
                  alt="SOLVY Logo"
                  className="h-16 w-auto"
                />
                <img
                  src="/images/hero-image.jpg"
                  alt="SOLVY Platform"
                  className="h-48 w-auto rounded-lg shadow-2xl"
                />
              </div>

              <div className="max-w-[800px] mx-auto">
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