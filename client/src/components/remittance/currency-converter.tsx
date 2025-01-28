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
  { code: "USD", name: "United States Dollar", symbol: "$", flag: "🇺🇸" },

  // BRICS Full Members
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷", group: "BRICS-Full" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", flag: "🇷🇺", group: "BRICS-Full" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳", group: "BRICS-Full", gdpRatio: 3.3, volume: 129 },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳", group: "BRICS-Full", gdpRatio: 0.1, volume: 51 },
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦", group: "BRICS-Full" },
  { code: "EGP", name: "Egyptian Pound", symbol: "£", flag: "🇪🇬", group: "BRICS-Full", gdpRatio: 5.9, volume: 32 },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br", flag: "🇪🇹", group: "BRICS-Full" },
  { code: "IRR", name: "Iranian Rial", symbol: "﷼", flag: "🇮🇷", group: "BRICS-Full" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪", group: "BRICS-Full" },

  // Major Global Markets
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", group: "Global-Major" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧", group: "Global-Major" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵", group: "Global-Major" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭", group: "Global-Major" },

  // Asia Pacific
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", flag: "🇮🇩", group: "Asia" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾", group: "Asia" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", flag: "🇵🇭", group: "Asia", gdpRatio: 9.4, volume: 38 },
  { code: "SGD", name: "Singapore Dollar", symbol: "$", flag: "🇸🇬", group: "Asia" },
  { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭", group: "Asia" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫", flag: "🇻🇳", group: "Asia" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷", group: "Asia" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨", flag: "🇵🇰", group: "Asia", gdpRatio: 8.1, volume: 30 },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳", flag: "🇧🇩", group: "Asia", gdpRatio: 4.7, volume: 21 },
  { code: "NPR", name: "Nepalese Rupee", symbol: "₨", flag: "🇳🇵", group: "Asia" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "₨", flag: "🇱🇰", group: "Asia" },
  { code: "MMK", name: "Myanmar Kyat", symbol: "Ks", flag: "🇲🇲", group: "Asia" },
  { code: "KHR", name: "Cambodian Riel", symbol: "៛", flag: "🇰🇭", group: "Asia" },
  { code: "LAK", name: "Lao Kip", symbol: "₭", flag: "🇱🇦", group: "Asia" },

  // Americas
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽", group: "Americas", gdpRatio: 4.2, volume: 61 },
  { code: "CAD", name: "Canadian Dollar", symbol: "$", flag: "🇨🇦", group: "Americas" },
  { code: "ARS", name: "Argentine Peso", symbol: "$", flag: "🇦🇷", group: "Americas" },
  { code: "COP", name: "Colombian Peso", symbol: "$", flag: "🇨🇴", group: "Americas" },
  { code: "CLP", name: "Chilean Peso", symbol: "$", flag: "🇨🇱", group: "Americas" },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/", flag: "🇵🇪", group: "Americas" },
  { code: "UYU", name: "Uruguayan Peso", symbol: "$", flag: "🇺🇾", group: "Americas" },
  { code: "BOB", name: "Bolivian Boliviano", symbol: "Bs.", flag: "🇧🇴", group: "Americas" },
  { code: "VES", name: "Venezuelan Bolívar", symbol: "Bs.", flag: "🇻🇪", group: "Americas" },
  { code: "GTQ", name: "Guatemalan Quetzal", symbol: "Q", flag: "🇬🇹", group: "Americas" },
  { code: "DOP", name: "Dominican Peso", symbol: "RD$", flag: "🇩🇴", group: "Americas" },
  { code: "CRC", name: "Costa Rican Colón", symbol: "₡", flag: "🇨🇷", group: "Americas" },
  { code: "HNL", name: "Honduran Lempira", symbol: "L", flag: "🇭🇳", group: "Americas" },
  { code: "NIO", name: "Nicaraguan Córdoba", symbol: "C$", flag: "🇳🇮", group: "Americas" },
  { code: "PAB", name: "Panamanian Balboa", symbol: "B/.", flag: "🇵🇦", group: "Americas" },

  // Europe
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴", group: "Europe" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "🇸🇪", group: "Europe" },
  { code: "DKK", name: "Danish Krone", symbol: "kr", flag: "🇩🇰", group: "Europe" },
  { code: "PLN", name: "Polish Złoty", symbol: "zł", flag: "🇵🇱", group: "Europe" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč", flag: "🇨🇿", group: "Europe" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft", flag: "🇭🇺", group: "Europe" },
  { code: "RON", name: "Romanian Leu", symbol: "lei", flag: "🇷🇴", group: "Europe" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв", flag: "🇧🇬", group: "Europe" },
  { code: "HRK", name: "Croatian Kuna", symbol: "kn", flag: "🇭🇷", group: "Europe" },
  { code: "ISK", name: "Icelandic Króna", symbol: "kr", flag: "🇮🇸", group: "Europe" },

  // Middle East & Africa
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦", group: "MEA" },
  { code: "QAR", name: "Qatari Riyal", symbol: "﷼", flag: "🇶🇦", group: "MEA" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك", flag: "🇰🇼", group: "MEA" },
  { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب", flag: "🇧🇭", group: "MEA" },
  { code: "OMR", name: "Omani Rial", symbol: "﷼", flag: "🇴🇲", group: "MEA" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "د.ا", flag: "🇯🇴", group: "MEA" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", flag: "🇳🇬", group: "MEA" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", flag: "🇰🇪", group: "MEA" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", flag: "🇬🇭", group: "MEA" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh", flag: "🇺🇬", group: "MEA" },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh", flag: "🇹🇿", group: "MEA" },
  { code: "RWF", name: "Rwandan Franc", symbol: "FRw", flag: "🇷🇼", group: "MEA" },

  // Oceania
  { code: "AUD", name: "Australian Dollar", symbol: "$", flag: "🇦🇺", group: "Oceania" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "$", flag: "🇳🇿", group: "Oceania" },
  { code: "FJD", name: "Fijian Dollar", symbol: "$", flag: "🇫🇯", group: "Oceania" },
  { code: "SBD", name: "Solomon Islands Dollar", symbol: "$", flag: "🇸🇧", group: "Oceania" },
  { code: "VUV", name: "Vanuatu Vatu", symbol: "Vt", flag: "🇻🇺", group: "Oceania" },
  { code: "TOP", name: "Tongan Paʻanga", symbol: "T$", flag: "🇹🇴", group: "Oceania" },
  { code: "WST", name: "Samoan Tālā", symbol: "T", flag: "🇼🇸", group: "Oceania" }
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
                .filter(c => c.group === "Markets" || c.group === "Global" || c.group === "Global-Major" || c.group === "Asia" || c.group === "Americas" || c.group === "Europe" || c.group === "MEA" || c.group === "Oceania")
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