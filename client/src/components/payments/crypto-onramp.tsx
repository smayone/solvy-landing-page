import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, Monitor, Loader2, AlertCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

declare global {
  interface Window {
    Stripe: any;
    stripe: any;
  }
}

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address")
});

type FormData = z.infer<typeof formSchema>;

interface OnrampSessionRequest {
  platform: 'web' | 'ios' | 'android';
  firstName: string;
  lastName: string;
  email: string;
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
  const [isStripeLoaded, setIsStripeLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: ''
    }
  });

  const { mutate: createSession, isPending } = useMutation({
    mutationFn: createOnrampSession,
    onSuccess: async (data) => {
      try {
        if (!window.stripe) {
          throw new Error("Stripe.js hasn't loaded yet");
        }

        const onramp = await window.stripe.createCryptoOnrampSession({
          clientSecret: data.clientSecret,
          appearance: {
            theme: document.documentElement.classList.contains('dark') ? "dark" : "light",
            variables: {
              colorPrimary: "hsl(var(--primary))",
              colorBackground: "hsl(var(--background))",
              colorText: "hsl(var(--foreground))",
              borderRadius: "0.5rem",
              fontFamily: "inherit"
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
    const loadStripe = async () => {
      try {
        setLoadingError(null);
        const script = document.createElement("script");
        script.src = "https://js.stripe.com/v3/crypto-elements-bundle";
        script.async = true;

        const handleLoad = () => {
          try {
            window.stripe = new window.Stripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
            setIsStripeLoaded(true);
            script.removeEventListener('load', handleLoad);
          } catch (err: any) {
            setLoadingError(err.message || 'Failed to initialize Stripe');
            console.error('Stripe initialization error:', err);
          }
        };

        script.addEventListener('load', handleLoad);
        document.body.appendChild(script);

        return () => {
          document.body.removeChild(script);
          script.removeEventListener('load', handleLoad);
        };
      } catch (err: any) {
        setLoadingError(err.message || 'Failed to load Stripe script');
        console.error('Script loading error:', err);
      }
    };

    loadStripe();
  }, []);

  const onSubmit = (data: FormData) => {
    createSession({
      platform: 'web',
      ...data
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Buy Crypto</CardTitle>
        <CardDescription>
          Purchase cryptocurrency using your preferred payment method
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loadingError && (
          <div className="mb-4 p-4 border border-destructive/50 rounded-lg bg-destructive/10 text-destructive flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm">{loadingError}</p>
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...form.register("firstName")}
                aria-invalid={!!form.formState.errors.firstName}
              />
              {form.formState.errors.firstName && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...form.register("lastName")}
                aria-invalid={!!form.formState.errors.lastName}
              />
              {form.formState.errors.lastName && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                aria-invalid={!!form.formState.errors.email}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!isStripeLoaded || isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : !isStripeLoaded ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading Stripe...
              </>
            ) : (
              "Start Crypto Purchase"
            )}
          </Button>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
            <Monitor className="h-4 w-4" />
            <span>Available on Web</span>
            <Smartphone className="h-4 w-4 ml-4" />
            <span>Mobile Apps Coming Soon</span>
          </div>

          <div id="crypto-onramp-root" className="min-h-[600px] mt-4 bg-card rounded-lg"></div>
        </form>
      </CardContent>
    </Card>
  );
}