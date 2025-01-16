import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ethers } from 'ethers';
import { Wallet } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Polygon Network ID
const CHAIN_ID = 137;

export function WalletConnection() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const connect = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast({
        title: "Wallet Not Found",
        description: "Please install MetaMask or another Web3 wallet",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Request account access
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      // Check if we're on the correct network
      const network = await provider.getNetwork();
      if (network.chainId !== CHAIN_ID) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
          });
        } catch (error: any) {
          if (error.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: `0x${CHAIN_ID.toString(16)}`,
                chainName: 'Polygon Mainnet',
                nativeCurrency: {
                  name: 'MATIC',
                  symbol: 'MATIC',
                  decimals: 18
                },
                rpcUrls: ['https://polygon-rpc.com'],
                blockExplorerUrls: ['https://polygonscan.com/']
              }]
            });
          }
        }
      }

      setAccount(address);
      setIsConnected(true);
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
    setAccount(null);
    setIsConnected(false);
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
            {isConnected ? (
              <div className="text-green-500">Connected to SOLVY Chain</div>
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
            onClick={isConnected ? disconnect : connect}
            variant={isConnected ? "destructive" : "default"}
            className="w-full"
            disabled={isConnecting}
          >
            <Wallet className="mr-2 h-4 w-4" />
            {isConnecting ? "Connecting..." : isConnected ? "Disconnect Wallet" : "Connect Wallet"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}