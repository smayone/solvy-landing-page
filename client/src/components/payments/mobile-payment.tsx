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
import { Smartphone, CreditCard, QrCode, Shield } from "lucide-react";
import { Web3Provider } from "@ethersproject/providers";
import { getSolvyChainStatus } from "@/lib/web3";

interface PaymentProps {
  amount?: number;
  recipient?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobilePayment({ amount, recipient, open, onOpenChange }: PaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "qr" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

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

      // Here we'll integrate with Polygon network for payment processing
      const provider = new Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      // TODO: Add actual payment processing logic here
      // This is where we'll integrate with the Polygon network
      
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            SOLVY Mobile Payment
          </DialogTitle>
          <DialogDescription>
            Choose your preferred payment method
          </DialogDescription>
        </DialogHeader>
        
        {!paymentMethod ? (
          <div className="grid gap-4">
            {paymentOptions.map((option) => (
              <Card
                key={option.id}
                className="cursor-pointer transition-colors hover:bg-muted"
                onClick={() => setPaymentMethod(option.id)}
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <option.icon className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
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

            <div className="flex gap-2">
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
      </DialogContent>
    </Dialog>
  );
}
