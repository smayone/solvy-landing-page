import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Switch, Route } from "wouter";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { CTA } from "@/components/sections/cta";
import Home from "@/pages/home";
import NFTAvatarPage from "@/pages/nft-avatar";
import MemberHome from "@/pages/member-home";
import TechCompanies from "@/pages/tech-companies";
import Analytics from "@/pages/analytics";
import WhyStatement from "@/pages/why-statement";
import CryptoPage from "@/pages/crypto";
import Education from "@/pages/education";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/member" component={MemberHome} />
      <Route path="/nft-avatar" component={NFTAvatarPage} />
      <Route path="/tech-companies" component={TechCompanies} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/why-statement" component={WhyStatement} />
      <Route path="/crypto" component={CryptoPage} />
      <Route path="/education" component={Education} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col pt-16">
          <div className="flex-1">
            <Router />
          </div>
          <div className="mt-auto">
            <CTA />
            <Footer />
          </div>
        </main>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}