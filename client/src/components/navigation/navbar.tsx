import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Users, Image, LineChart, Building2, GraduationCap, Wallet } from "lucide-react";
import { solvyDomains } from "@/lib/domains";

export function Navbar() {
  const educationDomain = solvyDomains.find(d => d.name === "Education")?.domain;

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center mr-6">
          <Link href="/">
            <img 
              src="attached_assets/fulllogo.png" 
              alt="SOLVY" 
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/member" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Member
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/nft-avatar" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              NFT Avatar
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/tech-companies" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Companies
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/analytics" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Analytics
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Education
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/crypto" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Buy Crypto
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}