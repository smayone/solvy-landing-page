import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Shield, Fingerprint, User } from "lucide-react";

interface BiometricData {
  name: string;
  biometricHash: string;
  sovereignIdentity: string;
}

export function AvatarGenerator() {
  const [biometricData, setBiometricData] = useState<BiometricData>({
    name: "",
    biometricHash: "",
    sovereignIdentity: ""
  });
  const [generatedAvatarUrl, setGeneratedAvatarUrl] = useState("");
  const { toast } = useToast();

  const generateBiometricAvatar = async () => {
    try {
      // In production, this would integrate with a self-sovereign identity system
      // and use actual biometric data to generate a unique avatar
      const hashedIdentity = await window.crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(biometricData.name + biometricData.sovereignIdentity)
      );
      const hashArray = Array.from(new Uint8Array(hashedIdentity));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      // Using the hash to generate a deterministic but unique avatar
      const newAvatarUrl = `https://api.dicebear.com/7.x/personas/svg?seed=${hashHex}`;
      setGeneratedAvatarUrl(newAvatarUrl);

      toast({
        title: "Biometric Avatar Generated",
        description: "Your sovereign identity has been used to create a unique avatar.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Could not generate avatar from biometric data",
        variant: "destructive"
      });
    }
  };

  const handleMintNFT = async () => {
    try {
      // This would integrate with the NFT minting contract
      toast({
        title: "NFT Minting Initiated",
        description: "Your biometric avatar is being minted as an NFT...",
      });
    } catch (error) {
      toast({
        title: "Minting Failed",
        description: "Could not mint NFT. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Create Your Sovereign NFT Avatar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center mb-6">
          <Avatar className="w-32 h-32">
            <AvatarImage src={generatedAvatarUrl} />
            <AvatarFallback>
              <User className="h-16 w-16 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="flex gap-2">
              <User className="h-4 w-4 mt-2.5 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Enter your legal name"
                value={biometricData.name}
                onChange={(e) => setBiometricData({
                  ...biometricData,
                  name: e.target.value
                })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sovereignId">Sovereign Identity</Label>
            <div className="flex gap-2">
              <Shield className="h-4 w-4 mt-2.5 text-muted-foreground" />
              <Input
                id="sovereignId"
                placeholder="Enter your sovereign identity token"
                value={biometricData.sovereignIdentity}
                onChange={(e) => setBiometricData({
                  ...biometricData,
                  sovereignIdentity: e.target.value
                })}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={generateBiometricAvatar}
            className="w-full flex items-center gap-2"
            disabled={!biometricData.name || !biometricData.sovereignIdentity}
          >
            <Fingerprint className="h-4 w-4" />
            Generate Avatar
          </Button>
          <Button 
            variant="secondary" 
            className="w-full"
            onClick={handleMintNFT}
            disabled={!generatedAvatarUrl}
          >
            Mint as NFT
          </Button>
        </div>

        <div className="text-sm text-muted-foreground flex items-center gap-2 mt-4">
          <Shield className="h-4 w-4" />
          Your biometric data is processed locally and never stored
        </div>
      </CardContent>
    </Card>
  );
}

export default AvatarGenerator;