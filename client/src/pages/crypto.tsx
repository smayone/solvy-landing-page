import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CryptoOnramp } from "@/components/payments/crypto-onramp";
import { MobilePayment } from "@/components/payments/mobile-payment";
import { Wallet, CreditCard, QrCode, Shield } from "lucide-react";

export default function CryptoPage() {
  const [showCryptoOnramp, setShowCryptoOnramp] = useState(false);
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Buy Crypto with SOLVY
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Seamlessly purchase cryptocurrency using your preferred payment method.
                Secure, fast, and integrated with the Polygon network.
              </p>
              <Button 
                size="lg"
                onClick={() => setShowCryptoOnramp(true)}
                className="mb-4"
              >
                Buy Crypto Now
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V5C20 3.89543 19.1046 3 18 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21ZM16 11L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Bank transfers and major credit cards accepted</span>
              </div>
            </div>
            <div className="relative">
              <img
                src="/focusgirl.png"
                alt="Crypto purchase experience"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options Section */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Payment Options</h2>
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  <CardTitle>Buy Crypto</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Purchase cryptocurrency directly with your preferred payment method
                </p>
                <Button 
                  className="w-full"
                  onClick={() => setShowCryptoOnramp(true)}
                >
                  Buy Crypto Now
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
                  Use your SOLVY card for instant payments, including VA benefits
                </p>
                <div className="space-y-2">
                  <Button 
                    className="w-full"
                    onClick={() => demoPayment(10)}
                  >
                    Pay $10
                  </Button>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3" />
                    VA Payment Ready
                  </div>
                </div>
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
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Simple & Secure</h3>
              <p className="text-muted-foreground">
                Purchase crypto directly with your preferred payment method through our secure Stripe integration.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Instant Delivery</h3>
              <p className="text-muted-foreground">
                Receive your crypto instantly on the Polygon network after your purchase is confirmed.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Low Fees</h3>
              <p className="text-muted-foreground">
                Enjoy competitive rates and minimal transaction fees on all crypto purchases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dialogs */}
      <CryptoOnramp 
        open={showCryptoOnramp}
        onOpenChange={setShowCryptoOnramp}
      />

      <MobilePayment 
        open={showMobilePayment}
        onOpenChange={setShowMobilePayment}
        amount={paymentDetails.amount}
        recipient={paymentDetails.recipient}
      />
    </div>
  );
}