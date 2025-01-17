import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ethers } from 'ethers';
import { Wallet, Loader2, ShieldCheck } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { SOLVY_CHAIN_CONFIG } from '@/lib/web3/config';

export function WalletConnection() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const connect = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast({
        title: "Web3 Wallet Required",
        description: "Please install MetaMask to connect to SOLVY chain",
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

      // Switch to SOLVY chain
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: SOLVY_CHAIN_CONFIG.chainId }],
        });
      } catch (switchError: any) {
        // Chain hasn't been added to MetaMask
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [SOLVY_CHAIN_CONFIG]
            });
          } catch (addError) {
            throw new Error('Failed to add SOLVY chain. Please try again.');
          }
        } else {
          throw switchError;
        }
      }

      setAccount(address);
      setIsConnected(true);
      toast({
        title: "Connected to SOLVY Chain",
        description: "Your wallet is now connected to SOLVY network",
      });
    } catch (error: any) {
      console.error('Connection error:', error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect to SOLVY chain",
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
      title: "Disconnected",
      description: "Your wallet has been disconnected from SOLVY chain",
    });
  };

  return (
    <div className="flex items-center gap-2">
      {isConnected && (
        <div className="hidden md:flex items-center gap-2 text-sm text-green-500">
          <ShieldCheck className="h-4 w-4" />
          <span>SOLVY Chain</span>
        </div>
      )}
      <Button
        onClick={isConnected ? disconnect : connect}
        variant={isConnected ? "secondary" : "default"}
        size="sm"
        className="min-w-[140px]"
        disabled={isConnecting}
      >
        {isConnecting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            {isConnected ? "Disconnect" : "Connect Wallet"}
          </>
        )}
      </Button>
    </div>
  );
}