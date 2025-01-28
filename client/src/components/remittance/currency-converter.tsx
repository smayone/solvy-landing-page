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
  volume?: number;
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  // Base Currency
  { code: "USD", name: "United States Dollar (United States of America)", symbol: "$", flag: "🇺🇸" },

  // BRICS Full Members
  { code: "BRL", name: "Brazilian Real (Federative Republic of Brazil)", symbol: "R$", flag: "🇧🇷", group: "BRICS-Full" },
  { code: "RUB", name: "Russian Ruble (Russian Federation)", symbol: "₽", flag: "🇷🇺", group: "BRICS-Full" },
  { code: "INR", name: "Indian Rupee (Republic of India)", symbol: "₹", flag: "🇮🇳", group: "BRICS-Full", gdpRatio: 3.3, volume: 129 },
  { code: "CNY", name: "Chinese Yuan (People's Republic of China)", symbol: "¥", flag: "🇨🇳", group: "BRICS-Full", gdpRatio: 0.1, volume: 51 },
  { code: "ZAR", name: "South African Rand (Republic of South Africa)", symbol: "R", flag: "🇿🇦", group: "BRICS-Full" },
  { code: "EGP", name: "Egyptian Pound (Arab Republic of Egypt)", symbol: "£", flag: "🇪🇬", group: "BRICS-Full", gdpRatio: 5.9, volume: 32 },
  { code: "ETB", name: "Ethiopian Birr (Federal Democratic Republic of Ethiopia)", symbol: "Br", flag: "🇪🇹", group: "BRICS-Full" },
  { code: "IDR", name: "Indonesian Rupiah (Republic of Indonesia)", symbol: "Rp", flag: "🇮🇩", group: "BRICS-Full" },
  { code: "IRR", name: "Iranian Rial (Islamic Republic of Iran)", symbol: "﷼", flag: "🇮🇷", group: "BRICS-Full" },
  { code: "AED", name: "UAE Dirham (United Arab Emirates)", symbol: "د.إ", flag: "🇦🇪", group: "BRICS-Full" },

  // Global Markets - Added more currencies for global coverage
  { code: "EUR", name: "Euro (European Union)", symbol: "€", flag: "🇪🇺", group: "Global" },
  { code: "GBP", name: "British Pound (United Kingdom)", symbol: "£", flag: "🇬🇧", group: "Global" },
  { code: "JPY", name: "Japanese Yen (Japan)", symbol: "¥", flag: "🇯🇵", group: "Global" },
  { code: "AUD", name: "Australian Dollar (Australia)", symbol: "$", flag: "🇦🇺", group: "Global" },
  { code: "CAD", name: "Canadian Dollar (Canada)", symbol: "$", flag: "🇨🇦", group: "Global" },
  { code: "CHF", name: "Swiss Franc (Switzerland)", symbol: "Fr", flag: "🇨🇭", group: "Global" },
  { code: "HKD", name: "Hong Kong Dollar (Hong Kong)", symbol: "$", flag: "🇭🇰", group: "Global" },
  { code: "NZD", name: "New Zealand Dollar (New Zealand)", symbol: "$", flag: "🇳🇿", group: "Global" },
  { code: "SGD", name: "Singapore Dollar (Singapore)", symbol: "$", flag: "🇸🇬", group: "Global" },

  // High Volume Markets
  { code: "MXN", name: "Mexican Peso (Mexico)", symbol: "$", flag: "🇲🇽", group: "Markets", gdpRatio: 4.2, volume: 61 },
  { code: "PHP", name: "Philippine Peso (Philippines)", symbol: "₱", flag: "🇵🇭", group: "Markets", gdpRatio: 9.4, volume: 38 },
  { code: "PKR", name: "Pakistani Rupee (Pakistan)", symbol: "₨", flag: "🇵🇰", group: "Markets", gdpRatio: 8.1, volume: 30 },
  { code: "BDT", name: "Bangladeshi Taka (Bangladesh)", symbol: "৳", flag: "🇧🇩", group: "Markets", gdpRatio: 4.7, volume: 21 },
  { code: "VND", name: "Vietnamese Dong (Vietnam)", symbol: "₫", flag: "🇻🇳", group: "Markets" },
  { code: "THB", name: "Thai Baht (Thailand)", symbol: "฿", flag: "🇹🇭", group: "Markets" },

  // Additional High GDP% Markets
  { code: "KRW", name: "South Korean Won (South Korea)", symbol: "₩", flag: "🇰🇷", group: "Markets" },
  { code: "TRY", name: "Turkish Lira (Turkey)", symbol: "₺", flag: "🇹🇷", group: "Markets" },
  { code: "SAR", name: "Saudi Riyal (Saudi Arabia)", symbol: "﷼", flag: "🇸🇦", group: "Markets" }
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
      "USD-TJS": 10.98,
      // Global Markets
      "USD-GBP": 0.78,
      "USD-JPY": 145.00,
      "USD-AUD": 1.50,
      "USD-CAD": 1.35,
      "USD-CHF": 0.90,
      "USD-HKD": 7.80,
      "USD-NZD": 1.65,
      "USD-SGD": 1.38,
      "USD-KRW": 1350.00,
      "USD-SAR": 3.75

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
                      <span className="font-medium">USD</span>
                      <span className="text-muted-foreground">United States of America</span>
                    </span>
                  </SelectItem>
                  {SUPPORTED_CURRENCIES.filter(c => c.code !== "USD").map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <span className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span className="font-medium">{currency.code}</span>
                        <span className="text-muted-foreground">
                          {currency.name.split('(')[1]?.replace(')', '')}
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
                        <span className="font-medium">{currency.code}</span>
                        <span className="text-muted-foreground">
                          {currency.name.split('(')[1]?.replace(')', '')}
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
            <h3 className="font-semibold mb-4">BRICS Full Members</h3>
            <div className="text-xs text-muted-foreground mb-2">As of 2025</div>
            <div className="space-y-2">
              {SUPPORTED_CURRENCIES
                .filter(c => c.group === "BRICS-Full")
                .map((currency) => (
                  <div key={currency.code} className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span className="font-medium">{currency.code}</span>
                      <span className="text-xs text-muted-foreground">
                        {currency.name.split('(')[1]?.replace(')', '')}
                        {currency.volume && ` - $${currency.volume}B`}
                        {currency.gdpRatio && ` (${currency.gdpRatio}% GDP)`}
                      </span>
                    </span>
                    <span className="font-mono">{formatAmount(rate * (currency.code === toCurrency ? 1 : 0.5), currency.code)}</span>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">BRICS Partner Countries</h3>
            <div className="text-xs text-muted-foreground mb-2">As of 2025</div>
            <div className="space-y-2">
              {SUPPORTED_CURRENCIES
                .filter(c => c.group === "BRICS-Partner")
                .map((currency) => (
                  <div key={currency.code} className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span className="font-medium">{currency.code}</span>
                      <span className="text-xs text-muted-foreground">
                        {currency.name.split('(')[1]?.replace(')', '')}
                        {currency.volume && ` - $${currency.volume}B`}
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
                .filter(c => c.group === "Markets" || c.group === "Global") // Include Global Markets
                .sort((a, b) => (b.volume || 0) - (a.volume || 0))
                .map((currency) => (
                  <div key={currency.code} className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span className="font-medium">{currency.code}</span>
                      <span className="text-xs text-muted-foreground">
                        {currency.name.split('(')[1]?.replace(')', '')}
                        {currency.volume && ` - $${currency.volume}B`}
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