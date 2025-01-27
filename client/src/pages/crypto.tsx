import { CryptoOnramp } from "@/components/payments/crypto-onramp";

export default function CryptoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Buy Crypto with SOLVY
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Seamlessly purchase cryptocurrency using your preferred payment method.
                Secure, fast, and integrated with the Polygon network.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V5C20 3.89543 19.1046 3 18 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21ZM16 11L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Bank transfers and major credit cards accepted</span>
              </div>
            </div>
            <div className="relative">
              <img
                src="/focusgirl.png"
                alt="Crypto purchase experience"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Onramp Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <CryptoOnramp />
        </div>
      </section>
    </div>
  );
}