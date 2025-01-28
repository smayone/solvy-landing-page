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
  group?: string;
}

const SUPPORTED_CURRENCIES: Currency[] = [
  // Base Currency
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },

  // Original BRICS
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷", group: "BRICS" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", flag: "🇷🇺", group: "BRICS" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳", group: "BRICS" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳", group: "BRICS" },
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦", group: "BRICS" },

  // BRICS+ Expansion
  { code: "EGP", name: "Egyptian Pound", symbol: "E£", flag: "🇪🇬", group: "BRICS+" },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br", flag: "🇪🇹", group: "BRICS+" },
  { code: "IRR", name: "Iranian Rial", symbol: "﷼", flag: "🇮🇷", group: "BRICS+" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦", group: "BRICS+" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪", group: "BRICS+" },
  { code: "ARS", name: "Argentine Peso", symbol: "$", flag: "🇦🇷", group: "BRICS+" },

  // Current Target Markets
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", group: "Target" },
  { code: "KRW", name: "Korean Won", symbol: "₩", flag: "🇰🇷", group: "Target" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫", flag: "🇻🇳", group: "Target" },
  { code: "HTG", name: "Haitian Gourde", symbol: "G", flag: "🇭🇹", group: "Target" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽", group: "Target" },
  { code: "COP", name: "Colombian Peso", symbol: "$", flag: "🇨🇴", group: "Target" },
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
      // BRICS
      "USD-BRL": 4.95,
      "USD-RUB": 89.50,
      "USD-INR": 83.10,
      "USD-CNY": 7.18,
      "USD-ZAR": 19.05,

      // BRICS+
      "USD-EGP": 30.90,
      "USD-ETB": 56.50,
      "USD-IRR": 42000,
      "USD-SAR": 3.75,
      "USD-AED": 3.67,
      "USD-ARS": 823.45,

      // Target Markets
      "USD-EUR": 0.92,
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Transfer Calculator */}
      <Card className="col-span-full">
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
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('remittance.conversion_widget.from')}</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">
                    <span className="flex items-center gap-2">
                      <span>🇺🇸</span>
                      <span>USD</span>
                      <span className="text-muted-foreground">(US Dollar)</span>
                    </span>
                  </SelectItem>
                  {SUPPORTED_CURRENCIES.filter(c => c.code !== "USD").map((currency) => (
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

          <div className="grid md:grid-cols-2 gap-4">
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

      {/* Current Exchange Rates Box */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Current Exchange Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* BRICS Rates */}
            <div>
              <h3 className="font-semibold mb-2">BRICS</h3>
              <div className="space-y-2">
                {SUPPORTED_CURRENCIES.filter(c => c.group === "BRICS").map((currency) => (
                  <div key={currency.code} className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <span className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Intl.NumberFormat(i18n.language, {
                        style: 'currency',
                        currency: currency.code,
                        maximumFractionDigits: 2
                      }).format(100)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* BRICS+ Expansion Rates */}
            <div>
              <h3 className="font-semibold mb-2">BRICS+</h3>
              <div className="space-y-2">
                {SUPPORTED_CURRENCIES.filter(c => c.group === "BRICS+").map((currency) => (
                  <div key={currency.code} className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <span className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Intl.NumberFormat(i18n.language, {
                        style: 'currency',
                        currency: currency.code,
                        maximumFractionDigits: 2
                      }).format(100)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Market Rates */}
            <div>
              <h3 className="font-semibold mb-2">Target Markets</h3>
              <div className="space-y-2">
                {SUPPORTED_CURRENCIES.filter(c => c.group === "Target").map((currency) => (
                  <div key={currency.code} className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <span className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Intl.NumberFormat(i18n.language, {
                        style: 'currency',
                        currency: currency.code,
                        maximumFractionDigits: 2
                      }).format(100)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}