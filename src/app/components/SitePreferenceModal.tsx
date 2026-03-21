import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { usePreference } from '../context/PreferenceContext';

interface SitePreferenceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface Currency {
  code: string;
  country: string;
  symbol: string;
}

export const currencies: Currency[] = [
  { code: 'LKR', country: 'Sri Lanka', symbol: 'රු' },
  { code: 'USD', country: 'USA', symbol: '$' },
  { code: 'INR', country: 'India', symbol: '₹' },
  { code: 'AUD', country: 'Australia', symbol: 'A$' },
  { code: 'SGD', country: 'Singapore', symbol: 'S$' },
  { code: 'KRW', country: 'Korea', symbol: '₩' },
  { code: 'QAR', country: 'Qatar', symbol: 'ر.ق' },
  { code: 'AED', country: 'UAE', symbol: 'د.إ' },
  { code: 'PKR', country: 'Pakistan', symbol: '₨' },
];

export const languages = [
  { code: 'en', name: 'ENGLISH' },
  { code: 'si', name: 'SINHALA' },
];

export const SitePreferenceModal: React.FC<SitePreferenceModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { t } = usePreference();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('LKR');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency') || 'LKR';
    const savedLanguage = localStorage.getItem('language') || 'en';
    setSelectedCurrency(savedCurrency);
    setSelectedLanguage(savedLanguage);
  }, [open]);

  const handleSave = () => {
    localStorage.setItem('currency', selectedCurrency);
    localStorage.setItem('language', selectedLanguage);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('preferenceChange', {
      detail: { currency: selectedCurrency, language: selectedLanguage }
    }));
    
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset to saved values
    const savedCurrency = localStorage.getItem('currency') || 'LKR';
    const savedLanguage = localStorage.getItem('language') || 'en';
    setSelectedCurrency(savedCurrency);
    setSelectedLanguage(savedLanguage);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-0 gap-0">
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <DialogTitle className="text-lg font-bold">{t('preference.title')}</DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">{t('preference.close')}</span>
            </button>
          </div>
          
          <DialogDescription className="sr-only">
            {t('preference.description')}
          </DialogDescription>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Country/Currency Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('preference.country')}</label>
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger className="w-full h-12 text-sm">
                  <SelectValue>
                    {currencies.find(c => c.code === selectedCurrency)?.country} ({selectedCurrency} {currencies.find(c => c.code === selectedCurrency)?.symbol})
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.country} ({currency.code} {currency.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Language Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('preference.language')}</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-full h-12">
                  <SelectValue>
                    {languages.find(l => l.code === selectedLanguage)?.name}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.code} value={language.code}>
                      {language.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-4 p-6 pt-0">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 h-12 bg-black text-white hover:bg-gray-800 hover:text-white rounded-full"
            >
              {t('preference.cancel')}
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 h-12 bg-black text-white hover:bg-gray-800 rounded-full"
            >
              {t('preference.save')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};