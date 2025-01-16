import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, CreditCard, QrCode, Shield, Wallet, Award, Info } from "lucide-react";
import { ethers } from "ethers";
import { getSolvyChainStatus } from "@/lib/web3";

interface PaymentProps {
  amount?: number;
  recipient?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobilePayment({ amount, recipient, open, onOpenChange }: PaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "qr" | "wallet" | "va" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [vaNumber, setVaNumber] = useState("");
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleWalletConnect = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('Please install MetaMask or another Web3 wallet');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      await signer.getAddress();

      // Check if we're on Polygon network
      const network = await provider.getNetwork();
      if (network.chainId !== 137) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${(137).toString(16)}` }],
          });
        } catch (error: any) {
          if (error.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: `0x${(137).toString(16)}`,
                chainName: 'Polygon Mainnet',
                nativeCurrency: {
                  name: 'MATIC',
                  symbol: 'MATIC',
                  decimals: 18
                },
                rpcUrls: ['https://polygon-rpc.com'],
                blockExplorerUrls: ['https://polygonscan.com/']
              }]
            });
          } else {
            throw error;
          }
        }
      }

      setIsWalletConnected(true);
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to SOLVY chain",
      });
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

      if (paymentMethod === "va") {
        if (!vaNumber) {
          throw new Error('Please enter your VA number');
        }
        // VA payment processing logic here
        // This would integrate with your VA payment system
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated processing
        toast({
          title: "VA Payment Successful",
          description: "Your VA payment has been processed",
        });
      } else if (paymentMethod === "wallet") {
        const status = await getSolvyChainStatus();
        if (!status?.isConnected) {
          throw new Error('Please connect your wallet to make payments');
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tx = await signer.sendTransaction({
          to: recipient,
          value: ethers.utils.parseEther(amount?.toString() || "0"),
        });
        await tx.wait();
      } else if (paymentMethod === "card") {
        // SOLVY card payment processing
        const response = await fetch('/api/solvy-card-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, recipient }),
        });

        if (!response.ok) {
          throw new Error('SOLVY card payment failed');
        }
      }

      toast({
        title: "Payment Successful",
        description: "Your payment has been processed through SOLVY chain",
      });

      onOpenChange(false);
      setLocation("/dashboard");
    } catch (error: any) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: error.message || "There was an error processing your payment",
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
      id: "va" as const,
      title: "VA Payment",
      description: "Pay using VA benefits",
      icon: Award,
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
      <DialogContent className="sm:max-w-[425px] max-h-[85vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-background pb-4 z-10">
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            SOLVY Mobile Payment
          </DialogTitle>
          <DialogDescription>
            Choose your preferred payment method
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {!paymentMethod ? (
            <div className="grid gap-4">
              {paymentOptions.map((option) => (
                <Button
                  key={option.id}
                  variant="outline"
                  className="w-full p-6 h-auto flex items-center justify-start gap-4 hover:bg-accent"
                  onClick={() => setPaymentMethod(option.id)}
                >
                  <option.icon className="h-6 w-6 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-semibold">{option.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {option.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          ) : paymentMethod === "va" ? (
            <div className="space-y-4">
              <div className="rounded-lg border bg-card p-6 text-card-foreground">
                <div className="space-y-4">
                  <div>
                    <Label>VA Number</Label>
                    <Input
                      value={vaNumber}
                      onChange={(e) => setVaNumber(e.target.value)}
                      placeholder="Enter your VA number"
                    />
                  </div>
                  {amount && (
                    <div>
                      <Label>Amount</Label>
                      <div className="text-2xl font-bold">${amount.toFixed(2)}</div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-blue-500">
                    <Info className="h-4 w-4" />
                    VA verification required
                  </div>
                </div>
              </div>
            </div>
          ) : paymentMethod === "wallet" && !isWalletConnected ? (
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="w-full p-6 h-auto flex items-center justify-start gap-4 hover:bg-accent"
                onClick={handleWalletConnect}
              >
                <img src="/wallet-icons/metamask.svg" alt="MetaMask" className="h-8 w-8 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-semibold">MetaMask</div>
                  <div className="text-sm text-muted-foreground">
                    Connect with your MetaMask wallet
                  </div>
                </div>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-6 text-card-foreground">
                <div className="space-y-4">
                  {amount && (
                    <div>
                      <Label>Amount</Label>
                      <div className="text-2xl font-bold">
                        {paymentMethod === "wallet" ? `${amount} MATIC` : `$${amount.toFixed(2)}`}
                      </div>
                    </div>
                  )}
                  {recipient && (
                    <div>
                      <Label>Recipient</Label>
                      <div className="font-medium break-all">{recipient}</div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    Secured by SOLVY chain on Polygon network
                  </div>
                </div>
              </div>

              <div className="flex gap-2 sticky bottom-0 bg-background pt-4">
                <Button
                  variant="outline"
                  onClick={() => setPaymentMethod(null)}
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