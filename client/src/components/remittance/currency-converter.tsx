import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, RefreshCw } from "lucide-react";

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

const SUPPORTED_CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  { code: "KRW", name: "Korean Won", symbol: "₩", flag: "🇰🇷" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫", flag: "🇻🇳" },
  { code: "HTG", name: "Haitian Gourde", symbol: "G", flag: "🇭🇹" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽" },
  { code: "COP", name: "Colombian Peso", symbol: "$", flag: "🇨🇴" },
];

export function CurrencyConverter() {
  const { t, i18n } = useTranslation();
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [rate, setRate] = useState<number>(1);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Set default 'to' currency based on user's language
  useEffect(() => {
    const langToCurrency: { [key: string]: string } = {
      es: "MXN",
      zh: "CNY",
      ko: "KRW",
      vi: "VND",
      fr: "EUR",
      "fr-HT": "HTG"
    };
    setToCurrency(langToCurrency[i18n.language] || "EUR");
  }, [i18n.language]);

  // Simulated exchange rate update - in production, this would call a real API
  const updateRate = () => {
    // Simulated rates - replace with actual API call
    const mockRates: { [key: string]: number } = {
      "USD-EUR": 0.92,
      "USD-CNY": 7.18,
      "USD-KRW": 1330.45,
      "USD-VND": 24485,
      "USD-HTG": 132.50,
      "USD-MXN": 17.15,
      "USD-COP": 3950.25
    };
    
    const key = `${fromCurrency}-${toCurrency}`;
    setRate(mockRates[key] || 1);
    setLastUpdated(new Date());
  };

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      updateRate();
    }
  }, [fromCurrency, toCurrency]);

  const convertedAmount = parseFloat(amount || "0") * rate;

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t('remittance.conversion_widget.title')}</span>
          <button 
            onClick={updateRate}
            className="p-2 hover:bg-muted rounded-full transition-colors"
            title={t('remittance.conversion_widget.update_rates')}
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>{t('remittance.conversion_widget.from')}</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_CURRENCIES.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <span className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                      <span className="text-muted-foreground">({currency.name})</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <Label>{t('remittance.conversion_widget.to')}</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_CURRENCIES.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <span className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                      <span className="text-muted-foreground">({currency.name})</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>{t('remittance.conversion_widget.amount')}</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label>{t('remittance.conversion_widget.converted')}</Label>
            <div className="p-2 bg-muted rounded-md">
              {new Intl.NumberFormat(i18n.language, {
                style: 'currency',
                currency: toCurrency,
                maximumFractionDigits: 2
              }).format(convertedAmount)}
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>{t('remittance.conversion_widget.rate')}: 1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}</p>
          <p className="text-xs">
            {t('remittance.conversion_widget.last_updated')}: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
