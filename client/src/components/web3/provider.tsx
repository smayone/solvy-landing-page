import { ReactNode, useEffect, useState } from 'react';
import { setupWeb3Provider } from '@/lib/web3/config';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Web3ProviderProps {
  children: ReactNode;
  required?: boolean;
}

export function Web3Provider({ children, required = false }: Web3ProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const initializeWeb3 = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      if (required) {
        setIsError(true);
        setErrorMessage('Please install MetaMask to connect to SOLVY chain');
      } else {
        // If Web3 is not required, continue without it
        setIsInitialized(true);
        toast({
          title: "Web3 Not Available",
          description: "Continuing in read-only mode",
          variant: "default",
        });
      }
      return;
    }

    try {
      setIsConnecting(true);
      setIsError(false);
      const provider = await setupWeb3Provider();
      setIsInitialized(true);
    } catch (error: any) {
      console.error('Failed to initialize Web3:', error);
      setIsError(true);
      setErrorMessage(error.message || 'Failed to connect to SOLVY chain');

      if (!required) {
        setIsInitialized(true);
        toast({
          title: "Web3 Not Available",
          description: "Continuing in read-only mode",
          variant: "default",
        });
      }
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    initializeWeb3();
  }, []);

  // If Web3 is not required and there's an error, continue without it
  if (isError && !required) {
    return <>{children}</>;
  }

  if (!isInitialized && required) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background/95">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center space-y-4">
            {isError ? (
              <>
                <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Connection Failed</h2>
                  <p className="text-muted-foreground mb-4">{errorMessage}</p>
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
              </>
            ) : (
              <>
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Connecting to SOLVY Chain</h2>
                  <p className="text-muted-foreground">Initializing Web3 connection...</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}