import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { currencies } from '../components/SitePreferenceModal';
import { translations, TranslationKey, Language } from '../utils/translations';

interface PreferenceContextType {
  currency: string;
  language: string;
  getCurrencySymbol: () => string;
  formatPrice: (price: number) => string;
  t: (key: TranslationKey) => string;
}

const PreferenceContext = createContext<PreferenceContextType | undefined>(undefined);

export const PreferenceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<string>('LKR');
  const [language, setLanguage] = useState<string>('en');

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency') || 'LKR';
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrency(savedCurrency);
    setLanguage(savedLanguage);
  }, []);

  // Listen for preference changes
  useEffect(() => {
    const handlePreferenceChange = (event: CustomEvent) => {
      setCurrency(event.detail.currency);
      setLanguage(event.detail.language);
    };

    window.addEventListener('preferenceChange', handlePreferenceChange as EventListener);
    return () => {
      window.removeEventListener('preferenceChange', handlePreferenceChange as EventListener);
    };
  }, []);

  const getCurrencySymbol = () => {
    // If the currency is LKR, show "LKR" for English and "රු" for Sinhala
    if (currency === 'LKR') {
      return language === 'en' ? 'LKR' : 'රු';
    }
    
    // For all other currencies, use their standard symbol (or fallback to the code)
    const curr = currencies.find(c => c.code === currency);
    return curr?.symbol || currency;
  };

  // Simple exchange rates (these should ideally come from an API)
  const exchangeRates: Record<string, number> = {
    'LKR': 1,
    'USD': 0.0031,
    'INR': 0.25,
    'AUD': 0.0048,
    'SGD': 0.0042,
    'KRW': 4.1,
    'QAR': 0.011,
    'AED': 0.011,
    'PKR': 0.87,
  };

  const formatPrice = (price: number) => {
    const rate = exchangeRates[currency] || 1;
    const convertedPrice = price * rate;
    const symbol = getCurrencySymbol();
    
    // Format based on currency
    const formattedAmount = convertedPrice.toLocaleString(undefined, {
      minimumFractionDigits: currency === 'KRW' ? 0 : 2,
      maximumFractionDigits: currency === 'KRW' ? 0 : 2,
    });

    return `${symbol} ${formattedAmount}`;
  };

  // Translation function
  const t = (key: TranslationKey): string => {
    const lang = language as Language;
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  return (
    <PreferenceContext.Provider value={{ currency, language, getCurrencySymbol, formatPrice, t }}>
      {children}
    </PreferenceContext.Provider>
  );
};

export const usePreference = () => {
  const context = useContext(PreferenceContext);
  if (context === undefined) {
    throw new Error('usePreference must be used within a PreferenceProvider');
  }
  return context;
};