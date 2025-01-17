import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Switch, Route } from "wouter";
import { Navbar } from "@/components/navigation/navbar";
import { Web3Provider } from "@/components/web3/provider";
import Home from "@/pages/home";
import NFTAvatar from "@/pages/nft-avatar";
import MemberHome from "@/pages/member-home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/member" component={MemberHome} />
      <Route path="/nft-avatar" component={NFTAvatar} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3Provider required={false}>
        <div className="min-h-screen bg-background flex flex-col">
          <Navbar />
          <main className="flex-1 pt-20 w-full max-w-[1440px] mx-auto px-4">
            <Router />
          </main>
        </div>
      </Web3Provider>
      <Toaster />
    </QueryClientProvider>
  );
}