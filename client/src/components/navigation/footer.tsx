import { Link } from "wouter";
import { SiGithub, SiFacebook } from "react-icons/si";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
      <div className="container mx-auto py-10 px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex flex-col items-center lg:items-start">
              <Link href="/">
                <img 
                  src="/attached_assets/fulllogo.png" 
                  alt="SOLVY" 
                  className="h-16 w-auto mb-6 transition-transform hover:scale-105"
                />
              </Link>
              <p className="text-sm text-muted-foreground text-center lg:text-left max-w-md">
                Breaking chains, building futures. Empowering individuals through decentralized financial sovereignitity - the ultimate path to economic freedom and self-determination.
              </p>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h3 className="font-semibold mb-3">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/member" className="text-sm text-muted-foreground hover:text-primary">
                  Member Services
                </Link>
              </li>
              <li>
                <Link href="/nft-avatar" className="text-sm text-muted-foreground hover:text-primary">
                  NFT Avatar
                </Link>
              </li>
              <li>
                <Link href="/tech-companies" className="text-sm text-muted-foreground hover:text-primary">
                  Tech Companies
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center lg:text-left">
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/analytics" className="text-sm text-muted-foreground hover:text-primary">
                  Analytics
                </Link>
              </li>
              <li>
                <a 
                  href="https://explorer.solvy.chain" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Explorer
                </a>
              </li>
              <li>
                <a 
                  href="https://docs.solvy.chain" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center lg:text-left">
            <h3 className="font-semibold mb-3">Sovereignitity</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/why-statement" className="text-sm text-muted-foreground hover:text-primary">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/why-statement#evolution" className="text-sm text-muted-foreground hover:text-primary">
                  Economic Evolution
                </Link>
              </li>
              <li>
                <Link href="/why-statement#solution" className="text-sm text-muted-foreground hover:text-primary">
                  The Solution
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-8 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <a 
              href="https://www.facebook.com/SANathanLLC" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              title="Follow us on Facebook for educational content"
            >
              <SiFacebook className="h-6 w-6" />
            </a>
            <a 
              href="https://github.com/solvychain" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <SiGithub className="h-6 w-6" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            © {currentYear} SOLVY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}