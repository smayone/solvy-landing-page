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
import { ArrowRight, Globe, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const remittanceSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  recipientCountry: z.string().min(1, "Recipient country is required"),
  recipientAddress: z.string().min(1, "Recipient address is required"),
  paymentMethod: z.enum(["crypto", "bank", "mobile"]),
});

type RemittanceForm = z.infer<typeof remittanceSchema>;

// Sample exchange rates - in production, these would come from an API
const exchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 148.45,
  INR: 83.12,
  PHP: 56.43,
  VND: 24585,
  HTG: 131.82,
};

export default function RemittancePage() {
  const { toast } = useToast();
  const [calculatedAmount, setCalculatedAmount] = useState<string | null>(null);
  
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
      // In production, this would call your API
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

  const calculateLocalAmount = (amount: string, country: string) => {
    const rate = exchangeRates[country as keyof typeof exchangeRates] || 1;
    const calculated = parseFloat(amount) * rate;
    setCalculatedAmount(calculated.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">International Money Transfer</h1>
          
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Current Exchange Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(exchangeRates).map(([currency, rate]) => (
                    <div key={currency} className="flex justify-between">
                      <span>{currency}:</span>
                      <span>{rate}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Transfer Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Input 
                      type="number" 
                      placeholder="Amount in USD"
                      onChange={(e) => calculateLocalAmount(e.target.value, form.getValues("recipientCountry"))}
                    />
                    <Select 
                      onValueChange={(value) => calculateLocalAmount(form.getValues("amount"), value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(exchangeRates).map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {calculatedAmount && (
                    <p className="text-sm">
                      Estimated amount: {calculatedAmount} in selected currency
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Send Money</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            {Object.keys(exchangeRates).map((currency) => (
                              <SelectItem key={currency} value={currency}>
                                {currency}
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

                  <Button type="submit" className="w-full">
                    Send Money <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
