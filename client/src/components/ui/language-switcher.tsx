import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "fr-HT", name: "Français (Haïti)" },
  { code: "es-MX", name: "Español (México)" },
  { code: "es-PR", name: "Español (Puerto Rico)" },
  { code: "es-DO", name: "Español (República Dominicana)" },
  { code: "tl", name: "Filipino" },
  { code: "ko", name: "한국어" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
  { code: "th", name: "ไทย" },
  { code: "vi", name: "Tiếng Việt" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <Select
      value={i18n.language}
      onValueChange={(value) => i18n.changeLanguage(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent className="max-h-[400px]">
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}