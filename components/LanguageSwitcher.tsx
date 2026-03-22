'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type Language = 'en' | 'zh-CN' | 'zh-TW';

const languages = {
  'en': { name: 'English', flag: '🇺🇸' },
  'zh-CN': { name: '简体中文', flag: '🇨🇳' },
  'zh-TW': { name: '繁體中文', flag: '🇹🇼' },
};

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<Language>('zh-CN');
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Get language from localStorage or default to zh-CN
    const savedLang = localStorage.getItem('preferred-language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'zh-CN' || savedLang === 'zh-TW')) {
      setCurrentLang(savedLang);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('preferred-language', lang);
    setIsOpen(false);

    // Set HTML lang attribute
    document.documentElement.lang = lang;

    // You can add routing logic here if you want language-specific URLs
    // For now, it will change the UI language if you implement i18n
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
        aria-label="Change language"
      >
        <span className="text-lg">{languages[currentLang].flag}</span>
        <span className="text-sm font-medium text-gray-700">
          {languages[currentLang].name}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
          {Object.entries(languages).map(([code, { name, flag }]) => (
            <button
              key={code}
              onClick={() => changeLanguage(code as Language)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition ${
                currentLang === code
                  ? 'bg-pink-50 text-pink-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{flag}</span>
              <span>{name}</span>
              {currentLang === code && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
