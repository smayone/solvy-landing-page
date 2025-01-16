import { useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AvatarGenerator } from "./avatar-generator";
import SolvyNFTAbi from "../../../contracts/SolvyNFT.json";

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Will be set after deployment

export function NFTMinter() {
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const uploadToIPFS = async (imageUrl: string): Promise<string> => {
    // In production, implement IPFS upload
    // For now, we'll just return the data URL
    return imageUrl;
  };

  const mintNFT = async () => {
    if (!avatarUrl) {
      toast({
        title: "No Avatar Generated",
        description: "Please generate an avatar first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("Please install MetaMask to mint NFTs");
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, SolvyNFTAbi, signer);

      // Upload image to IPFS
      const imageUrl = await uploadToIPFS(avatarUrl);

      // Create metadata
      const metadata = {
        name: "SOLVY Avatar NFT",
        description: "A unique avatar generated on the SOLVY platform",
        image: imageUrl,
      };

      // In production, upload metadata to IPFS
      const tokenUri = JSON.stringify(metadata);

      // Mint NFT
      const transaction = await contract.mintNFT(accounts[0], tokenUri);
      await transaction.wait();

      toast({
        title: "NFT Minted Successfully",
        description: "Your avatar has been minted as an NFT on Polygon",
      });
    } catch (error: any) {
      toast({
        title: "Minting Failed",
        description: error.message || "Failed to mint NFT",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Your SOLVY NFT Avatar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <AvatarGenerator onGenerate={setAvatarUrl} />
          
          <Button
            onClick={mintNFT}
            disabled={isLoading || !avatarUrl}
            className="w-full"
          >
            {isLoading ? "Minting..." : "Mint as NFT"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
