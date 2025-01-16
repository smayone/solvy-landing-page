import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWeb3React } from '@web3-react/core';
import { injected } from '@/lib/web3/connectors';
import { Wallet } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export function WalletConnection() {
  const [isConnecting, setIsConnecting] = useState(false);
  const { active, account, activate, deactivate } = useWeb3React();
  const { toast } = useToast();

  const connect = async () => {
    setIsConnecting(true);
    try {
      await activate(injected);
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to SOLVY chain",
      });
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    try {
      deactivate();
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected",
      });
    } catch (error: any) {
      toast({
        title: "Disconnection Failed",
        description: error.message || "Failed to disconnect wallet",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="text-sm">
            {active ? (
              <div className="text-green-500">Connected</div>
            ) : (
              <div className="text-yellow-500">Not Connected</div>
            )}
          </div>
          {account && (
            <div className="text-sm break-all">
              <span className="text-muted-foreground">Account: </span>
              {account}
            </div>
          )}
          <Button
            onClick={active ? disconnect : connect}
            variant={active ? "destructive" : "default"}
            className="w-full"
            disabled={isConnecting}
          >
            <Wallet className="mr-2 h-4 w-4" />
            {isConnecting ? "Connecting..." : active ? "Disconnect Wallet" : "Connect Wallet"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}