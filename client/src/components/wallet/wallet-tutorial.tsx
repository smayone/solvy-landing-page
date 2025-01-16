import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { connectWallet, getSolvyChainStatus } from "@/lib/web3";
import { AlertCircle, CheckCircle2, Wallet, Shield, Coins, Building2, CreditCard, Smartphone, DollarSign } from "lucide-react";

const steps = [
  {
    title: "Install MetaMask",
    description: "First, install the MetaMask browser extension to manage your digital assets securely.",
    icon: Shield,
    action: () => window.open("https://metamask.io/download/", "_blank"),
    actionText: "Get MetaMask",
    benefits: ["Secure wallet management", "Industry standard security", "Easy to use interface"],
    checkCondition: () => typeof window.ethereum !== "undefined",
  },
  {
    title: "Connect Your Wallet",
    description: "Connect your MetaMask wallet to access SOLVY chain features and start managing your assets.",
    icon: Wallet,
    action: connectWallet,
    actionText: "Connect Wallet",
    benefits: ["Access to SOLVY ecosystem", "Manage digital assets", "Secure transactions"],
    checkCondition: async () => {
      try {
        const accounts = await window.ethereum?.request({ method: "eth_accounts" });
        return accounts?.length > 0;
      } catch {
        return false;
      }
    },
  },
  {
    title: "Switch to SOLVY Chain (Polygon)",
    description: "SOLVY chain operates on the Polygon network for fast, cost-effective transactions and maximum security.",
    icon: Coins,
    action: async () => {
      const status = await getSolvyChainStatus();
      if (!status?.isConnected) {
        await connectWallet();
      }
    },
    actionText: "Switch to SOLVY Chain",
    benefits: [
      "Low transaction fees",
      "Fast processing times",
      "Eco-friendly blockchain",
      "Compatible with VA payments"
    ],
    checkCondition: async () => {
      const status = await getSolvyChainStatus();
      return status?.isConnected;
    },
  },
  {
    title: "Set Up VA Payment Integration",
    description: "Configure your account to receive VA payments directly into your SOLVY wallet.",
    icon: DollarSign,
    benefits: [
      "Direct VA payment deposits",
      "Automatic payment scheduling",
      "Secure payment verification",
      "Transaction history tracking"
    ],
    checkCondition: async () => {
      const status = await getSolvyChainStatus();
      return status?.isConnected;
    },
  },
  {
    title: "SOLVY Card Setup",
    description: "Get your SOLVY card for seamless payments both online and in-person.",
    icon: CreditCard,
    benefits: [
      "Physical and virtual card options",
      "Direct VA payment access",
      "Instant transaction notifications",
      "Worldwide acceptance"
    ],
    checkCondition: async () => {
      const status = await getSolvyChainStatus();
      return status?.isConnected;
    },
  },
  {
    title: "Mobile Access",
    description: "Access your SOLVY wallet and make payments on the go with our mobile app.",
    icon: Smartphone,
    benefits: [
      "Secure mobile payments",
      "Real-time balance updates",
      "Payment notifications",
      "Biometric authentication"
    ],
    checkCondition: async () => {
      const status = await getSolvyChainStatus();
      return status?.isConnected;
    },
  },
  {
    title: "Setup Complete",
    description: "You're now ready to use the complete SOLVY ecosystem! Manage your VA payments, use your SOLVY card, and access your account from anywhere.",
    icon: Building2,
    benefits: [
      "VA payment integration complete",
      "SOLVY card ready for use",
      "Mobile access enabled",
      "Full financial sovereignty achieved"
    ],
    checkCondition: async () => {
      const status = await getSolvyChainStatus();
      return status?.isConnected;
    },
  }
];

export function WalletTutorial({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepStatuses, setStepStatuses] = useState<Record<number, boolean>>({});

  const checkStepStatus = async (step: number) => {
    if (!steps[step].checkCondition) return true;
    const status = await steps[step].checkCondition();
    setStepStatuses((prev) => ({ ...prev, [step]: !!status }));
    return status;
  };

  const handleStepAction = async (step: number) => {
    try {
      if (steps[step].action) {
        await steps[step].action();
        await checkStepStatus(step);
      }
    } catch (error) {
      console.error('Error in step action:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const status = await checkStepStatus(currentStep);
      if (status && currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect to SOLVY Chain
          </DialogTitle>
          <DialogDescription>
            Follow these steps to connect your wallet and set up VA payments with your SOLVY card.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          {steps.map((step, index) => {
            const isComplete = stepStatuses[index];
            const isCurrent = currentStep === index;
            const Icon = step.icon;

            return (
              <div
                key={index}
                className={`relative pl-8 ${
                  index < currentStep ? "opacity-50" : ""
                }`}
              >
                <div className="absolute left-0 top-1">
                  {isComplete ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : isCurrent ? (
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
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
                {isCurrent && !isComplete && step.action && (
                  <Button
                    size="sm"
                    onClick={() => handleStepAction(index)}
                    className="mt-2"
                  >
                    {step.actionText}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}