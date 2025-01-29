import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Users, Image, LineChart, Sparkles, GraduationCap, Wallet, Heart, ChartBar, BookOpen, Lightbulb, School, Shield, BookMarked, Trophy, Map, Briefcase, Send, CreditCard, BarChart, Laptop, Box, Key } from "lucide-react";
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

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex-shrink-0 mr-4 md:mr-8">
          <Link href="/">
            <img
              src="/SolvyLogo-1024.png"
              alt="SOLVY"
              className="h-8 md:h-10 w-auto object-contain hover:opacity-90 transition-opacity cursor-pointer"
            />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-between md:justify-center space-x-2 md:space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9 px-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span className="inline">Education</span>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] md:w-[500px] lg:w-[600px] gap-3 p-4 lg:grid-cols-[.75fr_1fr]">
                    {/* Learning Path Section */}
                    <ListItem href="/education/progress">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4" />
                        <div className="text-sm font-medium">Your Progress</div>
                      </div>
                      <div className="space-y-2">
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Track your learning journey
                        </p>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '60%' }} />
                        </div>
                      </div>
                    </ListItem>

                    {/* Learning Modules Section */}
                    <div className="lg:col-span-2">
                      <h4 className="mb-3 text-sm font-medium leading-none">Learning Modules</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <ListItem href="/education/modules/blockchain">
                          <div className="flex items-center gap-2">
                            <Box className="h-4 w-4" />
                            <div className="text-sm font-medium">Introduction to Blockchain</div>
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            Start with the fundamentals of blockchain technology
                          </p>
                        </ListItem>

                        <ListItem href="/education/modules/decidey">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            <div className="text-sm font-medium">DECIDEY Foundation</div>
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            Community empowerment through blockchain
                          </p>
                        </ListItem>

                        <ListItem href="/education/modules/identity">
                          <div className="flex items-center gap-2">
                            <Key className="h-4 w-4" />
                            <div className="text-sm font-medium">Digital Identity</div>
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            Self-sovereign identity principles
                          </p>
                        </ListItem>

                        <ListItem href="/education/modules/web3">
                          <div className="flex items-center gap-2">
                            <Laptop className="h-4 w-4" />
                            <div className="text-sm font-medium">Web3 Development</div>
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            Build decentralized applications
                          </p>
                        </ListItem>

                        <ListItem href="/education/modules/tokenomics">
                          <div className="flex items-center gap-2">
                            <LineChart className="h-4 w-4" />
                            <div className="text-sm font-medium">Tokenomics</div>
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            Understanding token economics and design
                          </p>
                        </ListItem>

                        <ListItem href="/education/modules/defi">
                          <div className="flex items-center gap-2">
                            <Wallet className="h-4 w-4" />
                            <div className="text-sm font-medium">DeFi Fundamentals</div>
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            Explore decentralized finance concepts
                          </p>
                        </ListItem>
                      </div>
                    </div>

                    {/* Why SOLVY Section */}
                    <li className="lg:col-span-2">
                      <NavigationMenuLink asChild>
                        <Link href="/why-statement" className="flex w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md">
                          <BookOpen className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-base font-medium">
                            Why SOLVY?
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Discover our mission and vision
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="block md:inline-block">
                <NavigationMenuTrigger className="h-9 px-3">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    <span className="inline">{t('nav.buy_crypto')}</span>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link href="/crypto" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md">
                          <CreditCard className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-base font-medium">
                            Crypto & Payments
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Buy crypto and manage your digital assets
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/remittance">
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        <div className="text-sm font-medium">{t('nav.remittance')}</div>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Send money to loved ones worldwide
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
            <Link href="/man" className="flex items-center gap-2">
              <ChartBar className="h-4 w-4" />
              MAN
            </Link>
          </Button>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}