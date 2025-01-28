import { CurrencyConverter } from "@/components/remittance/currency-converter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { ArrowRight, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// Import the currency list from the converter component
import { SUPPORTED_CURRENCIES } from "@/components/remittance/currency-converter";

const remittanceSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  originCountry: z.string().min(1, "Origin country is required"),
  recipientCountry: z.string().min(1, "Recipient country is required"),
  recipientSovereignititee: z.string().min(1, "Recipient Sovereignititee ID is required"),
  paymentMethod: z.enum(["crypto", "bank", "mobile"]),
});

type RemittanceForm = z.infer<typeof remittanceSchema>;

export default function RemittancePage() {
  const { toast } = useToast();
  const [calculatedAmount, setCalculatedAmount] = useState<string | null>(null);
  const form = useForm<RemittanceForm>({
    resolver: zodResolver(remittanceSchema),
    defaultValues: {
      amount: "",
      originCountry: "",
      recipientCountry: "",
      recipientSovereignititee: "",
      paymentMethod: "crypto",
    },
  });

  const onSubmit = async (data: RemittanceForm) => {
    try {
      console.log("Processing remittance:", data);
      toast({
        title: "Remittance Initiated",
        description: "Your Sovereignititee-to-Sovereignititee transfer is being processed.",
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
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Sovereignititee Money Transfer</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We believe in a future where everyone is a Sovereignititee, free to control their own data and identity. 
              We are building a community of Sovereignititees who are leading the way in the data ownership revolution. 
              Our goal is to help more people achieve Sovereignitity through education and access to the SOLVY platform.
            </p>
          </div>

          {/* Currency Converter - Top */}
          <div className="w-full">
            <CurrencyConverter />
          </div>

          {/* Send Money Form - Middle */}
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span>Sovereignititee-to-Sovereignititee Transfer</span>
                </CardTitle>
                <CardDescription>
                  Send money securely between verified Sovereignititees within the SOLVY ecosystem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-4 gap-6">
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
                        name="originCountry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>From Country</FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select origin country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {SUPPORTED_CURRENCIES.map((currency) => (
                                  <SelectItem key={currency.code} value={currency.code}>
                                    <span className="flex items-center gap-2">
                                      <span>{currency.flag}</span>
                                      <span className="font-medium">{currency.code}</span>
                                      <span className="text-muted-foreground">
                                        {currency.name.split('(')[1]?.replace(')', '')}
                                      </span>
                                    </span>
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
                        name="recipientCountry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>To Country</FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select destination country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {SUPPORTED_CURRENCIES.map((currency) => (
                                  <SelectItem key={currency.code} value={currency.code}>
                                    <span className="flex items-center gap-2">
                                      <span>{currency.flag}</span>
                                      <span className="font-medium">{currency.code}</span>
                                      <span className="text-muted-foreground">
                                        {currency.name.split('(')[1]?.replace(')', '')}
                                      </span>
                                    </span>
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
                      name="recipientSovereignititee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipient Sovereignititee ID</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter recipient's Sovereignititee ID" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      Send to Sovereignititee <ArrowRight className="ml-2 h-4 w-4" />
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