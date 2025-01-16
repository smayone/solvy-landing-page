import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scissors, Sparkles, Gift } from "lucide-react";

const services = [
  {
    category: "Nail Care",
    items: [
      { name: "Manicure", price: 35, duration: "45 min" },
      { name: "Pedicure", price: 45, duration: "60 min" },
      { name: "Gel Polish", price: 30, duration: "30 min" },
    ]
  },
  {
    category: "Hair Care",
    items: [
      { name: "Haircut", price: 65, duration: "45 min" },
      { name: "Color", price: 85, duration: "120 min" },
      { name: "Style", price: 45, duration: "30 min" },
    ]
  },
  {
    category: "Waxing",
    items: [
      { name: "Eyebrow", price: 20, duration: "15 min" },
      { name: "Full Face", price: 40, duration: "30 min" },
      { name: "Full Body", price: 120, duration: "90 min" },
    ]
  }
];

const giftCards = [
  { amount: 50, bonus: 5 },
  { amount: 100, bonus: 15 },
  { amount: 200, bonus: 35 },
];

export default function EvergreenBeauty() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Evergreen Beauty Lounge</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience luxury beauty services with the convenience of SOLVY payments. 
            Book your appointment today and transform your beauty routine.
          </p>
        </div>

        <Tabs defaultValue="services" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="gift-cards">Gift Cards</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-8">
            {services.map((category) => (
              <div key={category.category} className="space-y-4">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  {category.category === "Hair Care" ? <Scissors className="h-6 w-6" /> :
                   category.category === "Nail Care" ? <Sparkles className="h-6 w-6" /> :
                   <Sparkles className="h-6 w-6" />}
                  {category.category}
                </h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {category.items.map((service) => (
                    <Card key={service.name}>
                      <CardHeader>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold">${service.price}</span>
                          <span className="text-muted-foreground">{service.duration}</span>
                        </div>
                        <Button className="w-full" onClick={() => alert("Booking system coming soon!")}>
                          Book Now with SOLVY
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="gift-cards" className="space-y-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                <Gift className="h-6 w-6" />
                SOLVY Gift Cards
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {giftCards.map((card) => (
                  <Card key={card.amount}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        ${card.amount} Gift Card
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Get ${card.bonus} bonus value!
                        </p>
                        <div className="text-2xl font-bold">
                          ${card.amount + card.bonus} Total Value
                        </div>
                        <Button className="w-full" variant="outline">
                          Purchase with SOLVY
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
