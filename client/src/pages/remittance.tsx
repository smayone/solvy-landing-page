import { CurrencyConverter } from "@/components/remittance/currency-converter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react"; // Added this import back in


// Sample exchange rates - in production, these would come from an API
const exchangeRates = {
  // BRICS
  BRL: 4.95, // Brazilian Real
  RUB: 89.50, // Russian Ruble
  INR: 83.12, // Indian Rupee
  CNY: 7.18, // Chinese Yuan
  ZAR: 19.05, // South African Rand

  // BRICS+ Expansion
  EGP: 30.90, // Egyptian Pound
  ETB: 56.50, // Ethiopian Birr
  IRR: 42000, // Iranian Rial
  SAR: 3.75, // Saudi Riyal
  AED: 3.67, // UAE Dirham
  ARS: 823.45, // Argentine Peso

  // Target Markets
  EUR: 0.92, // Euro
  KRW: 148.45, // Korean Won
  VND: 24585, // Vietnamese Dong
  HTG: 131.82, // Haitian Gourde
  PHP: 56.43, // Philippine Peso
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
  const [calculatedAmount, setCalculatedAmount] = useState<string | null>(null); // Added this back in
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
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold">International Money Transfer</h1>

          {/* Currency Converter - Top */}
          <div className="w-full">
            <CurrencyConverter />
          </div>

          {/* Send Money Form - Middle */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-full">
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
                            <FormLabel>Amount</FormLabel>
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
                                {/* Countries will be populated from the currency list */}
                                <SelectItem value="BRL">Brazil</SelectItem>
                                <SelectItem value="RUB">Russia</SelectItem>
                                <SelectItem value="INR">India</SelectItem>
                                <SelectItem value="CNY">China</SelectItem>
                                <SelectItem value="ZAR">South Africa</SelectItem>
                                {/* Add other countries here */}
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
          </div>
        </div>
      </div>
    </div>
  );
}