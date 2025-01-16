import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Switch, Route } from "wouter";
import { Navbar } from "@/components/navigation/navbar";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import TechCompanies from "@/pages/tech-companies";
import Payments from "@/pages/payments";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/tech-companies" component={TechCompanies} />
      <Route path="/payments" component={Payments} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20">
          <Router />
        </main>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}