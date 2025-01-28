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
  gdpRatio?: number;
  volume?: number; // Annual remittance volume in billions USD
}

const SUPPORTED_CURRENCIES: Currency[] = [
  // Base Currency
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },

  // Original BRICS
  { code: "BRL", name: "Brazilian Real (Brazil)", symbol: "R$", flag: "🇧🇷", group: "BRICS" },
  { code: "RUB", name: "Russian Ruble (Russia)", symbol: "₽", flag: "🇷🇺", group: "BRICS" },
  { code: "INR", name: "Indian Rupee (India)", symbol: "₹", flag: "🇮🇳", group: "BRICS", gdpRatio: 3.3, volume: 129 },
  { code: "CNY", name: "Chinese Yuan (China)", symbol: "¥", flag: "🇨🇳", group: "BRICS", gdpRatio: 0.1, volume: 51 },
  { code: "ZAR", name: "South African Rand (South Africa)", symbol: "R", flag: "🇿🇦", group: "BRICS" },

  // BRICS+ Current Members
  { code: "EGP", name: "Egyptian Pound (Egypt)", symbol: "£", flag: "🇪🇬", group: "BRICS+", gdpRatio: 5.9, volume: 32 },
  { code: "ETB", name: "Ethiopian Birr (Ethiopia)", symbol: "Br", flag: "🇪🇹", group: "BRICS+" },
  { code: "AED", name: "UAE Dirham (United Arab Emirates)", symbol: "د.إ", flag: "🇦🇪", group: "BRICS+" },

  // BRICS+ Future Expansion
  { code: "IDR", name: "Indonesian Rupiah (Indonesia)", symbol: "Rp", flag: "🇮🇩", group: "BRICS+" },
  { code: "KZT", name: "Kazakhstani Tenge (Kazakhstan)", symbol: "₸", flag: "🇰🇿", group: "BRICS+" },
  { code: "NGN", name: "Nigerian Naira (Nigeria)", symbol: "₦", flag: "🇳🇬", group: "BRICS+", gdpRatio: 4.3, volume: 20 },
  { code: "TRY", name: "Turkish Lira (Turkey)", symbol: "₺", flag: "🇹🇷", group: "BRICS+" },
  { code: "VND", name: "Vietnamese Dong (Vietnam)", symbol: "₫", flag: "🇻🇳", group: "BRICS+" },
  { code: "THB", name: "Thai Baht (Thailand)", symbol: "฿", flag: "🇹🇭", group: "BRICS+" },

  // High Volume Remittance Markets
  { code: "MXN", name: "Mexican Peso (Mexico)", symbol: "$", flag: "🇲🇽", group: "Markets", gdpRatio: 4.2, volume: 61 },
  { code: "PHP", name: "Philippine Peso (Philippines)", symbol: "₱", flag: "🇵🇭", group: "Markets", gdpRatio: 9.4, volume: 38 },
  { code: "PKR", name: "Pakistani Rupee (Pakistan)", symbol: "₨", flag: "🇵🇰", group: "Markets", gdpRatio: 8.1, volume: 30 },
  { code: "EUR", name: "Euro (France)", symbol: "€", flag: "🇫🇷", group: "Markets", gdpRatio: 1.2, volume: 28 },
  { code: "BDT", name: "Bangladeshi Taka (Bangladesh)", symbol: "৳", flag: "🇧🇩", group: "Markets", gdpRatio: 4.7, volume: 21 },
  { code: "DEM", name: "Euro (Germany)", symbol: "€", flag: "🇩🇪", group: "Markets", gdpRatio: 0.5, volume: 19 },

  // Additional High GDP% Markets
  { code: "TOP", name: "Tongan Pa'anga (Tonga)", symbol: "T$", flag: "🇹🇴", group: "Markets", gdpRatio: 37.7 },
  { code: "LBP", name: "Lebanese Pound (Lebanon)", symbol: "£", flag: "🇱🇧", group: "Markets", gdpRatio: 34.0 },
  { code: "WST", name: "Samoan Tala (Samoa)", symbol: "T", flag: "🇼🇸", group: "Markets", gdpRatio: 32.2 },
  { code: "TJS", name: "Tajikistani Somoni (Tajikistan)", symbol: "ЅM", flag: "🇹🇯", group: "Markets", gdpRatio: 31.0 }
];

export function CurrencyConverter() {
  const { t, i18n } = useTranslation();
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("PHP");
  const [rate, setRate] = useState<number>(1);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const langToCurrency: { [key: string]: string } = {
      es: "MXN",
      tl: "PHP",
      vi: "VND",
      th: "THB",
      default: "PHP"
    };
    setToCurrency(langToCurrency[i18n.language] || langToCurrency.default);
  }, [i18n.language]);

  const updateRate = () => {
    const mockRates: { [key: string]: number } = {
      // BRICS
      "USD-INR": 83.10,
      "USD-CNY": 7.18,
      "USD-BRL": 4.95,
      "USD-RUB": 89.50,
      "USD-ZAR": 19.05,

      // BRICS+ Current
      "USD-EGP": 30.90,
      "USD-ETB": 56.50,
      "USD-AED": 3.67,

      // BRICS+ Future
      "USD-IDR": 15750,
      "USD-KZT": 450.25,
      "USD-NGN": 1200.50,
      "USD-TRY": 30.45,
      "USD-VND": 24485,
      "USD-THB": 35.25,

      // High Volume Markets
      "USD-MXN": 17.15,
      "USD-PHP": 56.43,
      "USD-PKR": 279.50,
      "USD-EUR": 0.92,
      "USD-BDT": 109.75,

      // High GDP% Markets
      "USD-TOP": 2.38,
      "USD-LBP": 15000,
      "USD-WST": 2.71,
      "USD-TJS": 10.98
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
                      <span>USD - United States Dollar</span>
                    </span>
                  </SelectItem>
                  {SUPPORTED_CURRENCIES.filter(c => c.code !== "USD").map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <span className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{currency.code} - {currency.name}</span>
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
                        <span className="text-muted-foreground">
                          ({currency.name})
                          {currency.volume && ` - $${currency.volume}B`}
                          {currency.gdpRatio && ` (${currency.gdpRatio}% GDP)`}
                        </span>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-4">BRICS (Original Members)</h3>
            <div className="space-y-2">
              {SUPPORTED_CURRENCIES
                .filter(c => c.group === "BRICS")
                .map((currency) => (
                  <div key={currency.code} className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                      <span className="text-xs text-muted-foreground">
                        {currency.volume && `$${currency.volume}B`}
                        {currency.gdpRatio && ` (${currency.gdpRatio}% GDP)`}
                      </span>
                    </span>
                    <span className="font-mono">{formatAmount(rate * (currency.code === toCurrency ? 1 : 0.5), currency.code)}</span>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">BRICS+ (Expansion)</h3>
            <div className="space-y-2">
              {SUPPORTED_CURRENCIES
                .filter(c => c.group === "BRICS+")
                .map((currency) => (
                  <div key={currency.code} className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                      <span className="text-xs text-muted-foreground">
                        {currency.volume && `$${currency.volume}B`}
                        {currency.gdpRatio && ` (${currency.gdpRatio}% GDP)`}
                      </span>
                    </span>
                    <span className="font-mono">{formatAmount(rate * (currency.code === toCurrency ? 1 : 0.5), currency.code)}</span>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Top Remittance Markets</h3>
            <div className="text-xs text-muted-foreground mb-2">By Volume & GDP Impact</div>
            <div className="space-y-2">
              {SUPPORTED_CURRENCIES
                .filter(c => c.group === "Markets")
                .sort((a, b) => (b.volume || 0) - (a.volume || 0))
                .map((currency) => (
                  <div key={currency.code} className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                      <span className="text-xs text-muted-foreground">
                        {currency.volume && `$${currency.volume}B`}
                        {currency.gdpRatio && ` (${currency.gdpRatio}% GDP)`}
                      </span>
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