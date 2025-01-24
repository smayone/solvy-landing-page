import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stripe: any;
  }
}

async function createOnrampSession() {
  const response = await fetch("/api/crypto/create-onramp-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create onramp session");
  }

  const data = await response.json();
  return data.clientSecret;
}

export function CryptoOnramp() {
  const { toast } = useToast();

  const { mutate: createSession, isPending } = useMutation({
    mutationFn: createOnrampSession,
    onSuccess: async (clientSecret) => {
      try {
        const onramp = await window.stripe.createCryptoOnrampSession({
          clientSecret,
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
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load crypto onramp. Please try again.",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create onramp session. Please try again.",
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buy Crypto</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            onClick={() => createSession()}
            disabled={isPending}
            className="w-full"
          >
            {isPending ? "Loading..." : "Start Crypto Purchase"}
          </Button>
          <div id="crypto-onramp-root" className="min-h-[600px]"></div>
        </div>
      </CardContent>
    </Card>
  );
}
