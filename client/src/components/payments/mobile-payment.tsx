import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, CreditCard, QrCode, Shield, Wallet } from "lucide-react";
import { Web3Provider } from "@ethersproject/providers";
import { getSolvyChainStatus } from "@/lib/web3";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "@/lib/connectors";
import { ethers } from "ethers";

interface PaymentProps {
  amount?: number;
  recipient?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobilePayment({ amount, recipient, open, onOpenChange }: PaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "qr" | "wallet" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { activate, account, library } = useWeb3React();

  const handleWalletConnect = async (walletId: string) => {
    try {
      const connector = connectors[walletId];
      if (!connector) {
        throw new Error("Invalid wallet connector");
      }
      await activate(connector.connector);
      setSelectedWallet(walletId);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      const status = await getSolvyChainStatus();

      if (!status?.isConnected) {
        toast({
          title: "Wallet not connected",
          description: "Please connect your wallet to make payments",
          variant: "destructive",
        });
        return;
      }

      if (paymentMethod === "wallet") {
        // Handle blockchain payment
        if (!library || !account) {
          throw new Error("Wallet not connected");
        }

        const signer = library.getSigner();
        // Example transaction - replace with actual SOLVY contract interaction
        const tx = await signer.sendTransaction({
          to: recipient,
          value: ethers.utils.parseEther(amount?.toString() || "0"),
        });

        await tx.wait();
      } else if (paymentMethod === "card") {
        // Handle SOLVY card payment
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: amount ? amount * 100 : 0 }), // Convert to cents
        });

        if (!response.ok) {
          throw new Error('Payment failed');
        }

        const { clientSecret } = await response.json();
        // Handle card payment confirmation here
      }

      toast({
        title: "Payment Successful",
        description: "Your payment has been processed through SOLVY chain",
      });

      onOpenChange(false);
      setLocation("/dashboard");
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentOptions = [
    {
      id: "wallet" as const,
      title: "Crypto Wallet",
      description: "Pay with your connected wallet",
      icon: Wallet,
    },
    {
      id: "card" as const,
      title: "SOLVY Card",
      description: "Pay with your SOLVY card",
      icon: CreditCard,
    },
    {
      id: "qr" as const,
      title: "QR Code",
      description: "Scan to pay",
      icon: QrCode,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-background pb-4 z-10">
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            SOLVY Mobile Payment
          </DialogTitle>
          <DialogDescription>
            Choose your preferred payment method
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {!paymentMethod ? (
            <div className="grid gap-4">
              {paymentOptions.map((option) => (
                <Card
                  key={option.id}
                  className="cursor-pointer transition-colors hover:bg-muted"
                  onClick={() => setPaymentMethod(option.id)}
                >
                  <CardHeader className="flex flex-row items-center gap-4 py-3">
                    <option.icon className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{option.title}</CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : paymentMethod === "wallet" && !selectedWallet ? (
            <div className="grid gap-4">
              {Object.entries(connectors).map(([id, wallet]) => (
                <Card
                  key={id}
                  className="cursor-pointer transition-colors hover:bg-muted"
                  onClick={() => handleWalletConnect(id)}
                >
                  <CardHeader className="flex flex-row items-center gap-4 py-3">
                    <img src={wallet.icon} alt={wallet.name} className="h-8 w-8" />
                    <div>
                      <CardTitle className="text-lg">{wallet.name}</CardTitle>
                      <CardDescription>{wallet.description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {amount && (
                      <div>
                        <Label>Amount</Label>
                        <div className="text-2xl font-bold">${amount.toFixed(2)}</div>
                      </div>
                    )}
                    {recipient && (
                      <div>
                        <Label>Recipient</Label>
                        <div className="font-medium">{recipient}</div>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      Secured by SOLVY chain on Polygon network
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2 sticky bottom-0 bg-background pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (selectedWallet) {
                      setSelectedWallet(null);
                    } else {
                      setPaymentMethod(null);
                    }
                  }}
                  disabled={isProcessing}
                >
                  Back
                </Button>
                <Button 
                  className="flex-1"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Confirm Payment"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}