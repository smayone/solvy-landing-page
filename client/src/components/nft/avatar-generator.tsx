import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarGenerator() {
  const [avatarSeed, setAvatarSeed] = useState("");
  const [generatedAvatarUrl, setGeneratedAvatarUrl] = useState("");

  const generateAvatar = () => {
    // For now, using a placeholder avatar service
    // This will be replaced with actual NFT generation logic
    const newAvatarUrl = `https://api.dicebear.com/7.x/personas/svg?seed=${avatarSeed || Math.random()}`;
    setGeneratedAvatarUrl(newAvatarUrl);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Generate Your NFT Avatar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center mb-6">
          <Avatar className="w-32 h-32">
            <AvatarImage src={generatedAvatarUrl} />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-2">
          <Label htmlFor="seed">Customization Seed</Label>
          <Input
            id="seed"
            placeholder="Enter a seed for your avatar"
            value={avatarSeed}
            onChange={(e) => setAvatarSeed(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <Button onClick={generateAvatar} className="w-full">
            Generate New Avatar
          </Button>
          <Button variant="secondary" className="w-full">
            Mint as NFT
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AvatarGenerator;