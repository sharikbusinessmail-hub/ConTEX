import React from 'react';
import { Link } from 'react-router';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { usePreference } from '../context/PreferenceContext';
import contexLogo from '@/assets/7d1a34fd0bd65681f1012805d92d665c0a3052d9.png';

export const Footer = () => {
  const { t } = usePreference();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="inline-block">
              <img src={contexLogo} alt="ConTEX" className="h-8 opacity-90" />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Elevate your game with performance apparel that meets style. Designed for athletes, worn by everyone.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="font-bold text-sm tracking-wider mb-4 uppercase">{t('menu.collections')}</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link to="/collections/men" className="hover:text-black transition-colors">{t('header.men')}</Link></li>
              <li><Link to="/collections/women" className="hover:text-black transition-colors">{t('header.women')}</Link></li>
              <li><Link to="/collections/accessories" className="hover:text-black transition-colors">{t('header.accessories')}</Link></li>
              <li><Link to="/collections/sale" className="hover:text-black transition-colors text-red-600">{t('header.sale')}</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-bold text-sm tracking-wider mb-4 uppercase">{t('footer.help')}</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link to="/faq" className="hover:text-black transition-colors">{t('footer.faq')}</Link></li>
              <li><Link to="/shipping" className="hover:text-black transition-colors">{t('footer.shipping')}</Link></li>
              <li><Link to="/returns" className="hover:text-black transition-colors">{t('footer.returns')}</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">{t('footer.contact')}</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-bold text-sm tracking-wider mb-4 uppercase">{t('footer.about')}</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link to="/about" className="hover:text-black transition-colors">Our Story</Link></li>
              <li><Link to="/privacy" className="hover:text-black transition-colors">{t('footer.privacy')}</Link></li>
              <li><Link to="/terms" className="hover:text-black transition-colors">{t('footer.terms')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {currentYear} ConTEX Store. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
};