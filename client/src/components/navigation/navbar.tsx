import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { GlobeIcon, Menu, Wallet } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { WalletTutorial } from "@/components/wallet/wallet-tutorial";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getSolvyChainStatus } from "@/lib/web3";
import { domains } from "@/lib/domains";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWalletTutorial, setShowWalletTutorial] = useState(false);
  const [walletStatus, setWalletStatus] = useState<{
    isConnected: boolean;
    chainName: string;
  } | null>(null);
  const { t, i18n } = useTranslation();

  // Generate navigation links from domains
  const links = Object.entries(domains.subdomains).map(([key, value]) => ({
    href: `#${key}`,
    label: t(`nav.${key}`),
    description: value.description
  }));

  // Add application routes
  links.push(
    { 
      href: "/dashboard", 
      label: "Dashboard",
      description: "View your financial dashboard"
    },
    { 
      href: "/analytics", 
      label: "Analytics",
      description: "Analyze your financial data"
    },
    { 
      href: "/tech-companies", 
      label: "Tech Companies",
      description: "View tech company analytics"
    },
    {
      href: "/payments",
      label: "Payments",
      description: "Make payments using SOLVY chain"
    }
  );

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'zh', label: '中文' },
    { code: 'ko', label: '한국어' },
  ];

  useEffect(() => {
    const checkWalletStatus = async () => {
      const status = await getSolvyChainStatus();
      if (status) {
        setWalletStatus({
          isConnected: status.isConnected,
          chainName: status.chainName,
        });
      }
    };

    checkWalletStatus();
    const interval = setInterval(checkWalletStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="fixed w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/attached_assets/fulllogo.png" 
                alt="SOLVY" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <GlobeIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant={walletStatus?.isConnected ? "outline" : "default"}
              onClick={() => setShowWalletTutorial(true)}
              className="hidden sm:flex"
            >
              <Wallet className="mr-2 h-4 w-4" />
              {walletStatus?.isConnected ? walletStatus.chainName : t('nav.connect_wallet')}
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-4">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm font-medium transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button 
                    variant={walletStatus?.isConnected ? "outline" : "default"}
                    onClick={() => {
                      setShowWalletTutorial(true);
                      setIsOpen(false);
                    }}
                    className="w-full"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    {walletStatus?.isConnected ? walletStatus.chainName : t('nav.connect_wallet')}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <WalletTutorial 
        open={showWalletTutorial} 
        onOpenChange={setShowWalletTutorial}
      />
    </nav>
  );
}