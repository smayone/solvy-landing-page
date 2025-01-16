import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import useSound from "use-sound";
import { Services } from "@/components/sections/services";
import { Features } from "@/components/sections/features";
import { Communities } from "@/components/sections/communities";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [playWelcome] = useSound(`/sounds/welcome-${i18n.language}.mp3`);

  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="relative py-12 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
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

              <div className="max-w-2xl mx-auto text-center">
                <p className="text-xl text-muted-foreground">
                  {t('hero.vulture_economy')}
                </p>
                <p className="mt-4 text-xl text-muted-foreground">
                  {t('hero.solutions_valued')}
                </p>
              </div>
            </motion.div>
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