import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import useSound from "use-sound";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Features } from "@/components/sections/features";
import { Communities } from "@/components/sections/communities";
import { CTA } from "@/components/sections/cta";
import { Crown } from "@/components/ui/crown";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [playWelcome] = useSound(`/sounds/welcome-${i18n.language}.mp3`);

  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="relative py-24 overflow-hidden">
          <div className="container mx-auto px-4 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center gap-8 mb-8">
                <h1 className="text-6xl font-bold tracking-tighter">SOLVY</h1>
                <img
                  src="/attached_assets/fulllogo.png"
                  alt="SOLVY Logo"
                  className="h-24 w-auto"
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative mb-12"
              >
                <Crown className="absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-48 text-primary/20" />
                <motion.div
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative z-10"
                >
                  <img
                    src="/images/hero-image.jpg"
                    alt="SOLVY Platform"
                    className="rounded-lg shadow-2xl"
                  />
                </motion.div>
              </motion.div>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('hero.vulture_economy')}
              </p>
              <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('hero.solutions_valued')}
              </p>
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