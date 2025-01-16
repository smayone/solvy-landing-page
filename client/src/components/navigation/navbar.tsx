import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { solvyDomains } from "@/lib/domains";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const mainNavItems = [
    {
      href: "/",
      label: "Home",
      description: "Return to the main page"
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      description: "View your financial analytics"
    },
    {
      href: "/payments",
      label: "Payments",
      description: "Make payments using SOLVY chain"
    },
    {
      href: "/nft-avatar",
      label: "NFT Avatar",
      description: "Create your unique NFT avatar"
    }
  ];

  return (
    <nav className="w-full border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center mr-6">
          <Link href="/" className="flex items-center gap-4">
            <span className="text-2xl font-bold">SOLVY</span>
            <img 
              src="/attached_assets/fulllogo.png" 
              alt="SOLVY" 
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            {/* Main Navigation Items */}
            {mainNavItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}

            {/* SOLVY Domains Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>SOLVY Domains</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {solvyDomains.map((domain) => (
                    <li key={domain.domain}>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href={`https://${domain.domain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="text-sm font-medium leading-none">{domain.name}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {domain.description}
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}