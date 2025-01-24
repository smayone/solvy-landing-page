import { CryptoOnramp } from "@/components/payments/crypto-onramp";

export default function CryptoPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Buy Crypto with SOLVY</h1>
      <div className="max-w-2xl mx-auto">
        <CryptoOnramp />
      </div>
    </div>
  );
}
