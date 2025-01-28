import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, Globe, Wallet, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Sample exchange rates - in production, these would come from an API
const exchangeRates = {
  // BRICS
  BRL: 4.95,  // Brazilian Real
  RUB: 89.50, // Russian Ruble
  INR: 83.12, // Indian Rupee
  CNY: 7.18,  // Chinese Yuan
  ZAR: 19.05, // South African Rand

  // BRICS+ Expansion
  EGP: 30.90, // Egyptian Pound
  ETB: 56.50, // Ethiopian Birr
  IRR: 42000, // Iranian Rial
  SAR: 3.75,  // Saudi Riyal
  AED: 3.67,  // UAE Dirham
  ARS: 823.45, // Argentine Peso

  // Target Markets
  EUR: 0.92,   // Euro
  KRW: 148.45, // Korean Won
  VND: 24585,  // Vietnamese Dong
  HTG: 131.82, // Haitian Gourde
  PHP: 56.43,  // Philippine Peso
};

const remittanceSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  recipientCountry: z.string().min(1, "Recipient country is required"),
  recipientAddress: z.string().min(1, "Recipient address is required"),
  paymentMethod: z.enum(["crypto", "bank", "mobile"]),
});

type RemittanceForm = z.infer<typeof remittanceSchema>;

export default function RemittancePage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [calculatedAmount, setCalculatedAmount] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const form = useForm<RemittanceForm>({
    resolver: zodResolver(remittanceSchema),
    defaultValues: {
      amount: "",
      recipientCountry: "",
      recipientAddress: "",
      paymentMethod: "crypto",
    },
  });

  const onSubmit = async (data: RemittanceForm) => {
    try {
      console.log("Processing remittance:", data);
      toast({
        title: "Remittance Initiated",
        description: "Your transfer is being processed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process remittance. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">International Money Transfer</h1>

          {/* Transfer Calculator - Top */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Transfer Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <FormLabel>Amount (USD)</FormLabel>
                  <Input 
                    type="number" 
                    placeholder="Enter amount" 
                    className="w-full"
                  />
                </div>
                <div className="space-y-4">
                  <FormLabel>Select Currency</FormLabel>
                  <Select onValueChange={setSelectedCurrency} value={selectedCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(exchangeRates).map(([code]) => (
                        <SelectItem key={code} value={code}>
                          {code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <FormLabel>Converted Amount</FormLabel>
                  <div className="p-3 bg-muted rounded-md">
                    {calculatedAmount || "0.00"} {selectedCurrency}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Send Money Form - Middle */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Send Money</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount (USD)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="recipientCountry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipient Country</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.keys(exchangeRates).map((code) => (
                                <SelectItem key={code} value={code}>
                                  {code}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Method</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="crypto">Cryptocurrency</SelectItem>
                              <SelectItem value="bank">Bank Transfer</SelectItem>
                              <SelectItem value="mobile">Mobile Money</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="recipientAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipient Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Send Money <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Exchange Rates - Bottom */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Current Exchange Rates
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                {/* BRICS Column */}
                <div>
                  <h3 className="font-semibold mb-4 text-lg">BRICS</h3>
                  <div className="space-y-3">
                    {Object.entries(exchangeRates)
                      .filter(([code]) => ['BRL', 'RUB', 'INR', 'CNY', 'ZAR'].includes(code))
                      .map(([code, rate]) => (
                        <div key={code} className="flex justify-between items-center p-2 bg-muted rounded-lg">
                          <span>{code}</span>
                          <span>{rate}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* BRICS+ Expansion Column */}
                <div>
                  <h3 className="font-semibold mb-4 text-lg">BRICS+</h3>
                  <div className="space-y-3">
                    {Object.entries(exchangeRates)
                      .filter(([code]) => ['EGP', 'ETB', 'IRR', 'SAR', 'AED', 'ARS'].includes(code))
                      .map(([code, rate]) => (
                        <div key={code} className="flex justify-between items-center p-2 bg-muted rounded-lg">
                          <span>{code}</span>
                          <span>{rate}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Target Markets Column */}
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Target Markets</h3>
                  <div className="space-y-3">
                    {Object.entries(exchangeRates)
                      .filter(([code]) => ['EUR', 'KRW', 'VND', 'HTG', 'PHP'].includes(code))
                      .map(([code, rate]) => (
                        <div key={code} className="flex justify-between items-center p-2 bg-muted rounded-lg">
                          <span>{code}</span>
                          <span>{rate}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}