import { AvatarGenerator } from "@/components/nft/avatar-generator";

export default function NFTAvatarPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Create Your NFT Avatar</h1>
      <AvatarGenerator />
    </div>
  );
}