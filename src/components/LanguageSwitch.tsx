import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

type Language = {
  code: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧'
  },
  {
    code: 'my',
    name: 'Myanmar',
    flag: '🇲🇲'
  },
  {
    code: 'th',
    name: 'Thailand',
    flag: '🇹🇭'
  }
];

export function LanguageSwitch() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set initial language from localStorage or default to 'en'
    const savedLang = localStorage.getItem('i18nextLng') || 'en';
    const lang = languages.find(l => l.code === savedLang) || languages[0];
    handleLanguageChange(lang);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    i18n.changeLanguage(lang.code);
    localStorage.setItem('i18nextLng', lang.code);
  };

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang)}
            className={`flex items-center gap-2 ${
              currentLang.code === lang.code ? 'bg-accent' : ''
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
