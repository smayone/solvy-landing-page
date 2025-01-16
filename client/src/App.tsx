import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ConnectionStatus } from "@/components/web3/connection-status";
import NotFound from "@/pages/not-found";

function getLibrary(provider: any) {
  return new Web3Provider(provider);
}

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          SOLVY Web3
        </h1>
        <p className="text-lg text-muted-foreground">
          Connect your wallet to interact with SOLVY Chain
        </p>
        <ConnectionStatus />
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </Web3ReactProvider>
  );
}

export default App;