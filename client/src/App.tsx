import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { CTA } from "@/components/sections/cta";
import Home from "@/pages/home";
import NFTAvatarPage from "@/pages/nft-avatar";
import MemberHome from "@/pages/member-home";
import EBL from "@/pages/evergreen";
import Analytics from "@/pages/analytics";
import WhyStatement from "@/pages/why-statement";
import CryptoPage from "@/pages/crypto";
import Education from "@/pages/education";
import BusinessCase from "@/pages/education/business-case";
import MonitoringDashboard from "@/pages/monitoring-dashboard";
import NGOTransparencyPage from "@/pages/ngo-transparency";
import NotFound from "@/pages/not-found";
import Reign from "@/pages/reign";
import DAOPage from "@/pages/dao";
import ManDashboard from "@/pages/man";
import { useTheme } from "@/hooks/use-theme";
import "./lib/i18n";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/member" component={MemberHome} />
      <Route path="/nft-avatar" component={NFTAvatarPage} />
      <Route path="/ebl" component={EBL} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/why-statement" component={WhyStatement} />
      <Route path="/crypto" component={CryptoPage} />
      <Route path="/education" component={Education} />
      <Route path="/education/business-case" component={BusinessCase} />
      <Route path="/monitoring-dashboard" component={MonitoringDashboard} />
      <Route path="/reign" component={Reign} />
      <Route path="/reign/dao" component={DAOPage} />
      <Route path="/man" component={ManDashboard} />
      <Route path="/ngo-transparency" component={NGOTransparencyPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col pt-16">
          <div className="flex-1 pb-24 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <Router />
          </div>
          <div className="mt-auto flex flex-col items-center w-full">
            <div className="w-full">
              <CTA />
            </div>
            <Footer />
          </div>
        </main>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}