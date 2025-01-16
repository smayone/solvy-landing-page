import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { connectWallet, getSolvyChainStatus } from "@/lib/web3";
import { AlertCircle, CheckCircle2, Wallet } from "lucide-react";

const steps = [
  {
    title: "Install MetaMask",
    description: "First, install the MetaMask browser extension to manage your digital assets.",
    action: () => window.open("https://metamask.io/download/", "_blank"),
    actionText: "Get MetaMask",
    checkCondition: () => typeof window.ethereum !== "undefined",
  },
  {
    title: "Connect Your Wallet",
    description: "Connect your MetaMask wallet to access SOLVY chain features.",
    action: connectWallet,
    actionText: "Connect Wallet",
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
    title: "Switch to Polygon Network",
    description: "SOLVY chain operates on the Polygon network for fast and cost-effective transactions.",
    action: async () => {
      const status = await getSolvyChainStatus();
      if (!status?.isConnected) {
        await connectWallet(); // This will handle network switching
      }
    },
    actionText: "Switch Network",
    checkCondition: async () => {
      const status = await getSolvyChainStatus();
      return status?.isConnected;
    },
  },
];

export function WalletTutorial({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepStatuses, setStepStatuses] = useState<Record<number, boolean>>({});

  const checkStepStatus = async (step: number) => {
    const status = await steps[step].checkCondition();
    setStepStatuses(prev => ({ ...prev, [step]: status }));
    return status;
  };

  const handleStepAction = async (step: number) => {
    try {
      await steps[step].action();
      await checkStepStatus(step);
    } catch (error) {
      console.error('Error in step action:', error);
    }
  };

  // Check status of current step on mount and when step changes
  useState(() => {
    const interval = setInterval(async () => {
      const status = await checkStepStatus(currentStep);
      if (status && currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect to SOLVY Chain
          </DialogTitle>
          <DialogDescription>
            Follow these steps to connect your wallet and access SOLVY features.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          {steps.map((step, index) => {
            const isComplete = stepStatuses[index];
            const isCurrent = currentStep === index;

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
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {step.description}
                </p>
                {isCurrent && !isComplete && (
                  <Button
                    size="sm"
                    onClick={() => handleStepAction(index)}
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
