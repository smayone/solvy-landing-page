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

  // BRICS Partner Countries
  { code: "BYN", name: "Belarusian Ruble", symbol: "Br", flag: "🇧🇾", group: "BRICS-Partner" },
  { code: "BOB", name: "Bolivian Boliviano", symbol: "Bs.", flag: "🇧🇴", group: "BRICS-Partner" },
  { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸", flag: "🇰🇿", group: "BRICS-Partner" },
  { code: "CUP", name: "Cuban Peso", symbol: "₱", flag: "🇨🇺", group: "BRICS-Partner" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾", group: "BRICS-Partner" },
  { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭", group: "BRICS-Partner" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh", flag: "🇺🇬", group: "BRICS-Partner" },
  { code: "UZS", name: "Uzbekistani Som", symbol: "soʻm", flag: "🇺🇿", group: "BRICS-Partner" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", flag: "🇳🇬", group: "BRICS-Partner", gdpRatio: 4.3, volume: 20 },

  // High Volume Remittance Markets
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽", group: "Markets", gdpRatio: 4.2, volume: 61 },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", flag: "🇵🇭", group: "Markets", gdpRatio: 9.4, volume: 38 },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨", flag: "🇵🇰", group: "Markets", gdpRatio: 8.1, volume: 30 },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", group: "Markets", gdpRatio: 1.2, volume: 28 },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳", flag: "🇧🇩", group: "Markets", gdpRatio: 4.7, volume: 21 },
  { code: "DEM", name: "Euro", symbol: "€", flag: "🇩🇪", group: "Markets", gdpRatio: 0.5, volume: 19 },

  // Global Markets (for form dropdown only)
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧", group: "Global" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵", group: "Global" },
  { code: "AUD", name: "Australian Dollar", symbol: "$", flag: "🇦🇺", group: "Global" },
  { code: "CAD", name: "Canadian Dollar", symbol: "$", flag: "🇨🇦", group: "Global" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭", group: "Global" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "$", flag: "🇭🇰", group: "Global" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "$", flag: "🇳🇿", group: "Global" },
  { code: "SGD", name: "Singapore Dollar", symbol: "$", flag: "🇸🇬", group: "Global" }
];

const ALL_COUNTRIES_FOR_TRANSFER: Currency[] = [
  ...SUPPORTED_CURRENCIES,
  { code: "AFN", name: "Afghan Afghani (Afghanistan)", symbol: "؋", flag: "🇦🇫", group: "Global" },
  { code: "ALL", name: "Albanian Lek (Albania)", symbol: "L", flag: "🇦🇱", group: "Global" },
  { code: "DZD", name: "Algerian Dinar (Algeria)", symbol: "د.ج", flag: "🇩🇿", group: "Global" },
  { code: "AOA", name: "Angolan Kwanza (Angola)", symbol: "Kz", flag: "🇦🇴", group: "Global" },
  { code: "ARS", name: "Argentine Peso (Argentina)", symbol: "$", flag: "🇦🇷", group: "Global" },
  { code: "AMD", name: "Armenian Dram (Armenia)", symbol: "֏", flag: "🇦🇲", group: "Global" },
  { code: "AWG", name: "Aruban Florin (Aruba)", symbol: "ƒ", flag: "🇦🇼", group: "Global" },
  { code: "AZN", name: "Azerbaijani Manat (Azerbaijan)", symbol: "₼", flag: "🇦🇿", group: "Global" },
  { code: "BSD", name: "Bahamian Dollar (Bahamas)", symbol: "$", flag: "🇧🇸", group: "Global" },
  { code: "BHD", name: "Bahraini Dinar (Bahrain)", symbol: ".د.ب", flag: "🇧🇭", group: "Global" },
  { code: "BBD", name: "Barbadian Dollar (Barbados)", symbol: "$", flag: "🇧🇧", group: "Global" },
  { code: "BZD", name: "Belize Dollar (Belize)", symbol: "BZ$", flag: "🇧🇿", group: "Global" },
  { code: "BMD", name: "Bermudian Dollar (Bermuda)", symbol: "$", flag: "🇧🇲", group: "Global" },
  { code: "BTN", name: "Bhutanese Ngultrum (Bhutan)", symbol: "Nu.", flag: "🇧🇹", group: "Global" },
  { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark (Bosnia)", symbol: "KM", flag: "🇧🇦", group: "Global" },
  { code: "BWP", name: "Botswanan Pula (Botswana)", symbol: "P", flag: "🇧🇼", group: "Global" },
  { code: "BND", name: "Brunei Dollar (Brunei)", symbol: "$", flag: "🇧🇳", group: "Global" },
  { code: "BGN", name: "Bulgarian Lev (Bulgaria)", symbol: "лв", flag: "🇧🇬", group: "Global" },
  { code: "BIF", name: "Burundian Franc (Burundi)", symbol: "FBu", flag: "🇧🇮", group: "Global" },
  { code: "KHR", name: "Cambodian Riel (Cambodia)", symbol: "៛", flag: "🇰🇭", group: "Global" },
  { code: "CVE", name: "Cape Verdean Escudo (Cape Verde)", symbol: "$", flag: "🇨🇻", group: "Global" },
  { code: "KYD", name: "Cayman Islands Dollar (Cayman Islands)", symbol: "$", flag: "🇰🇾", group: "Global" },
  { code: "XAF", name: "Central African CFA Franc (CEMAC)", symbol: "FCFA", flag: "🌍", group: "Global" },
  { code: "XOF", name: "West African CFA Franc (WAEMU)", symbol: "CFA", flag: "🌍", group: "Global" },
  { code: "CDF", name: "Congolese Franc (DR Congo)", symbol: "FC", flag: "🇨🇩", group: "Global" },
  { code: "CRC", name: "Costa Rican Colón (Costa Rica)", symbol: "₡", flag: "🇨🇷", group: "Global" },
  { code: "HRK", name: "Croatian Kuna (Croatia)", symbol: "kn", flag: "🇭🇷", group: "Global" },
  { code: "DJF", name: "Djiboutian Franc (Djibouti)", symbol: "Fdj", flag: "🇩🇯", group: "Global" },
  { code: "DOP", name: "Dominican Peso (Dominican Republic)", symbol: "RD$", flag: "🇩🇴", group: "Global" },

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
      "USD-EGP": 30.90,
      "USD-ETB": 56.50,
      "USD-AED": 3.67,

      // BRICS+Partner
      "USD-BYN": 2.6,
      "USD-BOB": 6.86,
      "USD-KZT": 450.25,
      "USD-CUP": 24,
      "USD-MYR": 4.6,
      "USD-THB": 35.25,
      "USD-UGX": 3700,
      "USD-UZS": 10800,
      "USD-NGN": 780,


      // High Volume Markets
      "USD-MXN": 17.15,
      "USD-PHP": 56.43,
      "USD-PKR": 279.50,
      "USD-EUR": 0.92,
      "USD-BDT": 109.75,
      "USD-DEM": 0.5,


      // Global Markets
      "USD-GBP": 0.78,
      "USD-JPY": 145.00,
      "USD-AUD": 1.50,
      "USD-CAD": 1.35,
      "USD-CHF": 0.90,
      "USD-HKD": 7.80,
      "USD-NZD": 1.65,
      "USD-SGD": 1.38,
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
                  {ALL_COUNTRIES_FOR_TRANSFER.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <span className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span className="font-medium">{currency.code}</span>
                        <span className="text-muted-foreground">
                          {currency.name}
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
                  {ALL_COUNTRIES_FOR_TRANSFER.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <span className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span className="font-medium">{currency.code}</span>
                        <span className="text-muted-foreground">
                          {currency.name}
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
                        {currency.name}
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
                        {currency.name}
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
                .filter(c => c.group === "Markets")
                .sort((a, b) => (b.volume || 0) - (a.volume || 0))
                .map((currency) => (
                  <div key={currency.code} className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                    <span className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span className="font-medium">{currency.code}</span>
                      <span className="text-xs text-muted-foreground">
                        {currency.name}
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