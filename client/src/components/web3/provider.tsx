import { ReactNode, useEffect, useState } from 'react';
import { setupWeb3Provider } from '@/lib/web3/config';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isError, setIsError] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializeWeb3 = async () => {
      try {
        await setupWeb3Provider();
        setIsInitialized(true);
        setIsError(false);

        toast({
          title: "Connected to SOLVY Chain",
          description: "Successfully connected to the Web3 network",
        });
      } catch (error: any) {
        console.error('Failed to initialize Web3:', error);
        setIsError(true);
        toast({
          title: "Web3 Connection Failed",
          description: error.message || "Failed to connect to SOLVY Chain. Please ensure you have a Web3 wallet installed.",
          variant: "destructive"
        });
      }
    };

    initializeWeb3();
  }, []);

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background/95">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Connection Failed</h2>
            <p className="text-muted-foreground">
              Unable to connect to SOLVY Chain. Please ensure you have a Web3 wallet installed and try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background/95">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Connecting to SOLVY Chain</h2>
            <p className="text-muted-foreground">Please wait while we establish connection...</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}