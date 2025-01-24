// Documentation References:
// Web Integration: https://docs.stripe.com/crypto/onramp/emeddable-onramp-guide
// iOS SDK: https://stripe.dev/stripe-ios/documentation/stripe
// Android SDK: https://stripe.dev/stripe-android/index.html
// React Native SDK: https://stripe.dev/stripe-react-native/api-reference/index.html

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, Monitor } from "lucide-react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stripe: any;
  }
}

interface OnrampSessionRequest {
  platform: 'web' | 'ios' | 'android';
  firstName?: string;
  lastName?: string;
  email?: string;
}

async function createOnrampSession(data: OnrampSessionRequest) {
  const response = await fetch("/api/crypto/create-onramp-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.details || 'Failed to create onramp session');
  }

  return response.json();
}

export function CryptoOnramp() {
  const { toast } = useToast();
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const { mutate: createSession, isPending } = useMutation({
    mutationFn: createOnrampSession,
    onSuccess: async (data) => {
      try {
        const onramp = await window.stripe.createCryptoOnrampSession({
          clientSecret: data.clientSecret,
          appearance: {
            theme: "dark",
            variables: {
              colorPrimary: "hsl(var(--primary))",
              colorBackground: "hsl(var(--background))",
              colorText: "hsl(var(--foreground))",
              borderRadius: "0.5rem",
            },
          },
        });

        onramp.mount("#crypto-onramp-root");

        toast({
          title: "Ready to buy crypto",
          description: "The crypto purchase interface has been loaded successfully.",
        });
      } catch (error: any) {
        console.error('Stripe onramp error:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to load crypto onramp. Please try again.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      console.error('Session creation error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create onramp session. Please try again.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    // Load Stripe.js
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/crypto-elements-bundle";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createSession({
      platform: 'web',
      ...customerInfo
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buy Crypto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={customerInfo.firstName}
                onChange={(e) => setCustomerInfo(prev => ({...prev, firstName: e.target.value}))}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={customerInfo.lastName}
                onChange={(e) => setCustomerInfo(prev => ({...prev, lastName: e.target.value}))}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo(prev => ({...prev, email: e.target.value}))}
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1"
            >
              {isPending ? "Loading..." : "Start Crypto Purchase"}
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
            <Monitor className="h-4 w-4" />
            <span>Available on Web</span>
            <Smartphone className="h-4 w-4 ml-4" />
            <span>Mobile Apps Coming Soon</span>
          </div>

          <div id="crypto-onramp-root" className="min-h-[600px] mt-4"></div>
        </form>
      </CardContent>
    </Card>
  );
}