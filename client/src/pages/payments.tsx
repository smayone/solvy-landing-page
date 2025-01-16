import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobilePayment } from "@/components/payments/mobile-payment";
import { Wallet, CreditCard, QrCode } from "lucide-react";

export default function Payments() {
  const [showMobilePayment, setShowMobilePayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<{
    amount?: number;
    recipient?: string;
  }>({});

  const demoPayment = (amount: number) => {
    setPaymentDetails({
      amount,
      recipient: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" // Example Polygon address
    });
    setShowMobilePayment(true);
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SOLVY Payments</h1>
          <p className="text-muted-foreground mt-2">
            Experience seamless payments with SOLVY chain on Polygon network
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              <CardTitle>Crypto Payment</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Pay with your crypto wallet on Polygon network
            </p>
            <Button 
              className="w-full"
              onClick={() => demoPayment(0.1)}
            >
              Pay 0.1 MATIC
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <CardTitle>SOLVY Card</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Use your SOLVY card for instant payments
            </p>
            <Button 
              className="w-full"
              onClick={() => demoPayment(10)}
            >
              Pay $10
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-primary" />
              <CardTitle>QR Payment</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Scan and pay instantly with your mobile device
            </p>
            <Button 
              className="w-full"
              onClick={() => demoPayment(5)}
            >
              Pay $5
            </Button>
          </CardContent>
        </Card>
      </div>

      <MobilePayment 
        open={showMobilePayment}
        onOpenChange={setShowMobilePayment}
        amount={paymentDetails.amount}
        recipient={paymentDetails.recipient}
      />
    </div>
  );
}
