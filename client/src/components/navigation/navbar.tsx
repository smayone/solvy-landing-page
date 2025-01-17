import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { WalletConnection } from "@/components/web3/WalletConnection";
import { Shield, Home, Layout, CreditCard, User } from "lucide-react";

export function Navbar() {
  const mainNavItems = [
    {
      href: "/",
      label: "Home",
      icon: Home
    },
    {
      href: "/member",
      label: "Dashboard",
      icon: Layout
    },
    {
      href: "/nft-avatar",
      label: "NFT Avatar",
      icon: User
    }
  ];

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center mr-6">
          <Link href="/">
            <img 
              src="/attached_assets/fulllogo.png" 
              alt="SOLVY" 
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center space-x-4">
          {mainNavItems.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link href={item.href} className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </div>

        <div className="ml-4">
          <WalletConnection />
        </div>
      </div>
    </nav>
  );
}