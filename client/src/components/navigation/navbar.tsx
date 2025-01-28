import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Users, Image, LineChart, Sparkles, GraduationCap, Wallet, Heart, ChartBar, BookOpen, Lightbulb, School, Shield, BookMarked, Trophy, Map, Briefcase } from "lucide-react";
import { solvyDomains } from "@/lib/domains";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useTranslation } from "react-i18next";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavbarProps {
  userRole?: string;
}

const ListItem = ({ children, className, ...props }: React.ComponentProps<"a">) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
          {...props}
        >
          {children}
        </a>
      </NavigationMenuLink>
    </li>
  );
};

export function Navbar({ userRole }: NavbarProps) {
  const { t } = useTranslation();
  const educationDomain = solvyDomains.find(d => d.name === "Education")?.domain;

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex-shrink-0 mr-8">
          <Link href="/">
            <img 
              src="/SolvyLogo-1024.png" 
              alt="SOLVY" 
              className="h-10 w-auto object-contain hover:opacity-90 transition-opacity cursor-pointer"
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

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Education
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-7">
                      <NavigationMenuLink asChild>
                        <Link href="/education" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                          <BookOpen className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Education Hub
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Your gateway to comprehensive blockchain and financial education
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/education/business-case">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <div className="text-sm font-medium">Business Case</div>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Strategic value proposition for upwardly mobile markets
                      </p>
                    </ListItem>
                    <ListItem href="/education/learning-paths">
                      <div className="flex items-center gap-2">
                        <Map className="h-4 w-4" />
                        <div className="text-sm font-medium">Learning Paths</div>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Personalized educational journeys tailored to your goals
                      </p>
                    </ListItem>
                    <ListItem href="/education/courses">
                      <div className="flex items-center gap-2">
                        <School className="h-4 w-4" />
                        <div className="text-sm font-medium">Courses</div>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Structured learning paths for blockchain and finance
                      </p>
                    </ListItem>
                    <ListItem href="/education/progress">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4" />
                        <div className="text-sm font-medium">My Progress</div>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Track your educational achievements and certifications
                      </p>
                    </ListItem>
                    <ListItem href="/education/bookmarks">
                      <div className="flex items-center gap-2">
                        <BookMarked className="h-4 w-4" />
                        <div className="text-sm font-medium">Saved Resources</div>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Access your bookmarked educational content
                      </p>
                    </ListItem>
                    <ListItem href="/education/tutorials">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        <div className="text-sm font-medium">Tutorials</div>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Step-by-step guides for using SOLVY platform
                      </p>
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
          <Button variant="ghost" asChild>
            <Link href="/man" className="flex items-center gap-2">
              <ChartBar className="h-4 w-4" />
              MAN
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