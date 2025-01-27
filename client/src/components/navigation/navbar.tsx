import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Users, Image, LineChart, Sparkles, GraduationCap, Wallet, Heart } from "lucide-react";
import { solvyDomains } from "@/lib/domains";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const { t } = useTranslation();
  const educationDomain = solvyDomains.find(d => d.name === "Education")?.domain;

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex-shrink-0 mr-8">
          <Link href="/">
            <img 
              src="/attached_assets/fulllogo.png" 
              alt="SOLVY" 
              className="h-12 w-auto object-contain hover:opacity-90 transition-opacity cursor-pointer"
            />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              {t('nav.home')}
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/member" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {t('nav.member')}
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/nft-avatar" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              {t('nav.nft_avatar')}
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/ebl" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              {t('nav.ebl')}
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/analytics" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              {t('nav.analytics')}
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Education
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/reign" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              {t('nav.reign')}
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/crypto" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              {t('nav.buy_crypto')}
            </Link>
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}