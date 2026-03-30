'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, t } from './translations';

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: ReturnType<typeof t>;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('preferred-language') as Language;
    if (saved && ['en', 'zh-CN', 'zh-TW'].includes(saved)) {
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('preferred-language', newLang);
    document.documentElement.lang = newLang;
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: t(lang) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
