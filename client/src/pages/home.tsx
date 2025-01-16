import { Navbar } from "@/components/navigation/navbar";
import { ConnectionStatus } from "@/components/web3/connection-status";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Features } from "@/components/sections/features";
import { Communities } from "@/components/sections/communities";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate pt-14">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            SOLVY Web3 Platform
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Connect your wallet to get started with SOLVY chain
          </p>
          <div className="mt-8">
            <ConnectionStatus />
          </div>
        </div>
      </main>
    </div>
  );
}