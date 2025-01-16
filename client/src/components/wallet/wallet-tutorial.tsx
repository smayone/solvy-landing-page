import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getSolvyChainStatus } from "@/lib/web3";
import { AlertCircle, CheckCircle2, Wallet, Shield, Coins } from "lucide-react";
import { connectors, type WalletConnector } from "@/lib/connectors";
import { useWeb3React } from "@web3-react/core";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const steps = [
  {
    title: "Choose Your Wallet",
    description: "Select your preferred wallet to connect to SOLVY chain.",
    icon: Wallet,
    benefits: ["Multiple wallet support", "Industry standard security", "Easy to use interface"],
  },
  {
    title: "Connect Wallet",
    description: "Connect your selected wallet to access SOLVY chain features.",
    icon: Shield,
    benefits: ["Access to SOLVY ecosystem", "Manage digital assets", "Secure transactions"],
  },
  {
    title: "Switch to SOLVY Chain",
    description: "SOLVY chain operates on the Polygon network for fast, cost-effective transactions.",
    icon: Coins,
    benefits: [
      "Low transaction fees",
      "Fast processing times",
      "Eco-friendly blockchain",
      "VA payment ready"
    ],
  }
];

export function WalletTutorial({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepStatuses, setStepStatuses] = useState<Record<number, boolean>>({});
  const [selectedWallet, setSelectedWallet] = useState<WalletConnector | null>(null);
  const { activate, active, account } = useWeb3React();

  const handleWalletConnect = async (walletId: WalletConnector) => {
    try {
      const connector = connectors[walletId];
      await activate(connector.connector);
      setSelectedWallet(walletId);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  useEffect(() => {
    const checkStatus = async () => {
      if (account) {
        setStepStatuses(prev => ({ ...prev, 1: true }));
        const status = await getSolvyChainStatus();
        if (status?.isConnected) {
          setStepStatuses(prev => ({ ...prev, 2: true }));
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 1000);
    return () => clearInterval(interval);
  }, [account]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect to SOLVY Chain
          </DialogTitle>
          <DialogDescription>
            Choose your preferred wallet to connect with SOLVY chain.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {!selectedWallet ? (
            <div className="grid gap-4">
              {Object.entries(connectors).map(([id, wallet]) => (
                <Card
                  key={id}
                  className="cursor-pointer transition-colors hover:bg-muted"
                  onClick={() => handleWalletConnect(id as WalletConnector)}
                >
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <img src={wallet.icon} alt={wallet.name} className="h-8 w-8 mr-4" />
                    <div>
                      <CardTitle className="text-lg">{wallet.name}</CardTitle>
                      <CardDescription>{wallet.description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            steps.map((step, index) => {
              const isComplete = stepStatuses[index];
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className={`relative pl-8 ${
                    index < steps.length - 1 && isComplete ? "opacity-50" : ""
                  }`}
                >
                  <div className="absolute left-0 top-1">
                    {isComplete ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {step.description}
                  </p>
                  {step.benefits && (
                    <ul className="text-sm text-muted-foreground mb-3 space-y-1">
                      {step.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}