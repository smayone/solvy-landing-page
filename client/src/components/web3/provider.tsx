import { ReactNode, useEffect, useState } from 'react';
import { setupWeb3Provider } from '@/lib/web3/config';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isConnecting, setIsConnecting] = useState(true);
  const { toast } = useToast();

  const initializeWeb3 = async () => {
    setIsConnecting(true);
    setIsError(false);
    setErrorMessage('');

    try {
      await setupWeb3Provider();
      setIsInitialized(true);

      toast({
        title: "Connected to SOLVY Chain",
        description: "Successfully connected to the blockchain network",
        variant: "default"
      });
    } catch (error: any) {
      console.error('Failed to initialize Web3:', error);
      setIsError(true);
      setErrorMessage(error.message);

      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect to SOLVY Chain",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    initializeWeb3();
  }, []);

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background/95">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Connection Failed</h2>
              <p className="text-muted-foreground mb-4">
                {errorMessage || "Unable to connect to SOLVY Chain"}
              </p>
              <Button 
                onClick={initializeWeb3}
                className="w-full"
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Retry Connection'
                )}
              </Button>
            </div>
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
            <p className="text-muted-foreground">Please approve the connection request in your wallet...</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}