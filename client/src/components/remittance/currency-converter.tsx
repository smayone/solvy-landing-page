import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  // BRICS+ Current Members
  { code: "EGP", name: "Egyptian Pound", symbol: "£", flag: "🇪🇬", group: "BRICS+" },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br", flag: "🇪🇹", group: "BRICS+" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦", group: "BRICS+" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪", group: "BRICS+" },
  { code: "ARS", name: "Argentine Peso", symbol: "$", flag: "🇦🇷", group: "BRICS+" },

  // BRICS+ Future Expansion
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", flag: "🇮🇩", group: "BRICS+" },
  { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸", flag: "🇰🇿", group: "BRICS+" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", flag: "🇳🇬", group: "BRICS+" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", flag: "🇹🇷", group: "BRICS+" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫", flag: "🇻🇳", group: "BRICS+" },
  { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭", group: "BRICS+" },

  // Target Markets
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", group: "Target" },
  { code: "KRW", name: "Korean Won", symbol: "₩", flag: "🇰🇷", group: "Target" },
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
      fr: "EUR"
    };
    setToCurrency(langToCurrency[i18n.language] || "EUR");
  }, [i18n.language]);

  const updateRate = () => {
    // Simulated rates - would be replaced with actual API call
    const mockRates: { [key: string]: number } = {
      // BRICS
      "USD-BRL": 4.95,
      "USD-RUB": 89.50,
      "USD-INR": 83.10,
      "USD-CNY": 7.18,
      "USD-ZAR": 19.05,

      // BRICS+ Current
      "USD-EGP": 30.90,
      "USD-ETB": 56.50,
      "USD-SAR": 3.75,
      "USD-AED": 3.67,
      "USD-ARS": 823.45,

      // BRICS+ Future
      "USD-IDR": 15750,
      "USD-KZT": 450.25,
      "USD-NGN": 1200.50,
      "USD-TRY": 30.45,
      "USD-VND": 24485,
      "USD-THB": 35.25,

      // Target Markets
      "USD-EUR": 0.92,
      "USD-KRW": 1330.45,
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

  const formatAmount = (value: number, currencyCode: string) => {
    try {
      return new Intl.NumberFormat(i18n.language, {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value) + ' ' + currencyCode;
    } catch (error) {
      return value.toFixed(2) + ' ' + currencyCode;
    }
  };

  const convertedAmount = parseFloat(amount || "0") * rate;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            <span>{t('remittance.conversion_widget.title')}</span>
          </div>
          <Button
            onClick={updateRate}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title={t('remittance.conversion_widget.update_rates')}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Currency Selection */}
          <div className="space-y-4">
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
          </div>

          <div className="space-y-4">
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

          <div className="space-y-4">
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
          </div>
        </div>

        <div className="w-full p-4 bg-muted rounded-lg text-center">
          <div className="text-2xl font-semibold">
            {formatAmount(convertedAmount, toCurrency)}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {t('remittance.conversion_widget.last_updated')}: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>

        {/* Exchange Rates Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* BRICS Column */}
          <div>
            <h3 className="font-semibold mb-4">BRICS</h3>
            <div className="space-y-2">
              {SUPPORTED_CURRENCIES
                .filter(c => c.group === "BRICS")
                .map((currency) => (
                  <div key={currency.code} className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                    </span>
                    <span className="font-mono">{formatAmount(rate * (currency.code === toCurrency ? 1 : 0.5), currency.code)}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* BRICS+ Column */}
          <div>
            <h3 className="font-semibold mb-4">BRICS+ Expansion</h3>
            <div className="space-y-2">
              {SUPPORTED_CURRENCIES
                .filter(c => c.group === "BRICS+")
                .map((currency) => (
                  <div key={currency.code} className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                    </span>
                    <span className="font-mono">{formatAmount(rate * (currency.code === toCurrency ? 1 : 0.5), currency.code)}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Target Markets Column */}
          <div>
            <h3 className="font-semibold mb-4">Target Markets</h3>
            <div className="space-y-2">
              {SUPPORTED_CURRENCIES
                .filter(c => c.group === "Target")
                .map((currency) => (
                  <div key={currency.code} className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                    </span>
                    <span className="font-mono">{formatAmount(rate * (currency.code === toCurrency ? 1 : 0.5), currency.code)}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}