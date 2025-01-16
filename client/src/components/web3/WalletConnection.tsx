import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { connectWallet } from '@/lib/web3';
import { Wallet } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export function WalletConnection() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const provider = await connectWallet();
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to Polygon network",
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

  const handleDisconnect = () => {
    setAccount(null);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="text-sm">
            {account ? (
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
            onClick={account ? handleDisconnect : handleConnect}
            variant={account ? "destructive" : "default"}
            className="w-full"
            disabled={isConnecting}
          >
            <Wallet className="mr-2 h-4 w-4" />
            {isConnecting ? "Connecting..." : account ? "Disconnect Wallet" : "Connect Wallet"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
