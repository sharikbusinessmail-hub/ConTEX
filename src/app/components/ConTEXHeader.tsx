import React, { useState } from 'react';
import { Link } from 'react-router';
import { Search, User, ShoppingCart, Menu, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useCart } from '../context/CartContext';
import { usePreference } from '../context/PreferenceContext';
import { MegaMenu } from './MegaMenu';
import { SitePreferenceModal } from './SitePreferenceModal';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import contexLogo from 'figma:asset/7d1a34fd0bd65681f1012805d92d665c0a3052d9.png';

interface ConTEXHeaderProps {
  onSearchChange: (search: string) => void;
  onCategoryClick: (category: string, gender?: string) => void;
  onCartOpen: () => void;
}

export const ConTEXHeader: React.FC<ConTEXHeaderProps> = ({
  onSearchChange,
  onCategoryClick,
  onCartOpen,
}) => {
  const { totalItems } = useCart();
  const { currency, t } = usePreference();
  const [search, setSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [preferenceModalOpen, setPreferenceModalOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };

  // Men's mega menu configuration
  const menColumns = [
    {
      title: t('menu.men.title'),
      links: [
        { label: t('menu.men.tanks'), href: '/collections/men/tanks' },
        { label: t('menu.men.compressions'), href: '/collections/men/compressions' },
        { label: t('menu.men.hoodies-jackets'), href: '/collections/men/hoodies-jackets' },
        { label: t('menu.men.shorts'), href: '/collections/men/shorts' },
        { label: t('menu.men.jeans'), href: '/collections/men/jeans' },
        { label: t('menu.men.joggers-pants'), href: '/collections/men/joggers-pants' },
        { label: t('menu.men.underwear'), href: '/collections/men/underwear' },
      ],
    },
    {
      title: t('menu.women.shop-all'),
      links: [
        { label: t('menu.men.tshirts'), href: '/collections/men/t-shirts' },
        { label: t('menu.men.shirts'), href: '/collections/men/shirts' },
        { label: t('menu.men.polos'), href: '/collections/men/polos' },
        { label: t('menu.men.shorts'), href: '/collections/men/shorts' },
      ],
    },
    {
      title: t('menu.collections'),
      links: [
        { label: t('menu.premium'), href: '/collections/men/premium' },
        { label: t('menu.oversize-tee'), href: '/collections/men/oversize-tee' },
        { label: t('menu.essentials'), href: '/collections/men/essentials' },
        { label: t('menu.seamless'), href: '/collections/men/seamless' },
      ],
    },
  ];

  // Women's mega menu configuration
  const womenColumns = [
    {
      title: t('menu.women.title'),
      links: [
        { label: t('menu.women.shop-all'), href: '/collections/women' },
        { label: t('menu.women.tshirts'), href: '/collections/women/t-shirts' },
        { label: t('menu.women.polos'), href: '/collections/women/polos' },
        { label: t('menu.women.crop-tops'), href: '/collections/women/crop-tops' },
        { label: t('menu.women.tanks'), href: '/collections/women/tanks' },
        { label: t('menu.women.leggings'), href: '/collections/women/leggings' },
        { label: t('menu.women.skirts'), href: '/collections/women/skirts' },
        { label: t('menu.women.shorts'), href: '/collections/women/shorts' },
        { label: t('menu.women.hoodies-jackets'), href: '/collections/women/hoodies-jackets' },
        { label: t('menu.women.joggers-pants'), href: '/collections/women/joggers-pants' },
        { label: t('menu.women.one-piece'), href: '/collections/women/one-piece' },
        { label: t('menu.women.sports-bra'), href: '/collections/women/sports-bra' },
        { label: t('menu.women.underwear'), href: '/collections/women/underwear' },
      ],
    },
    {
      title: t('menu.collections'),
      links: [
        { label: t('menu.premium'), href: '/collections/women/premium' },
        { label: t('menu.oversize-tee'), href: '/collections/women/oversize-tee' },
        { label: t('menu.essentials'), href: '/collections/women/essentials' },
        { label: t('menu.seamless'), href: '/collections/women/seamless' },
      ],
    },
  ];

  // Accessories mega menu
  const accessoriesColumns = [
    {
      title: t('menu.accessories.title'),
      links: [
        { label: t('menu.accessories.shop-all'), href: '/collections/accessories' },
        { label: t('menu.accessories.bags'), href: '/collections/accessories/bags' },
        { label: t('menu.accessories.caps'), href: '/collections/accessories/hats' },
        { label: t('menu.accessories.belts'), href: '/collections/accessories/belts' },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img src={contexLogo} alt="ConTEX" className="h-8" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <MegaMenu trigger={t('header.men')} columns={menColumns} />
            <MegaMenu trigger={t('header.women')} columns={womenColumns} />
            <MegaMenu trigger={t('header.accessories')} columns={accessoriesColumns} />

            <Link
              to="/collections/gifts"
              className="text-sm font-medium hover:text-gray-600 transition-colors uppercase tracking-wide"
            >
              GIFTS
            </Link>

            <Link
              to="/collections/last-chance"
              className="text-sm font-medium hover:text-gray-600 transition-colors uppercase tracking-wide"
            >
              LAST CHANCE
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder={t('common.search-placeholder')}
                className="pl-9 w-64 border-gray-300"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            {/* Account Icon */}
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            {/* Currency */}
            <button
              onClick={() => setPreferenceModalOpen(true)}
              className="hidden md:flex items-center text-sm font-medium hover:text-gray-600 transition-colors"
            >
              {currency} <ChevronDown className="h-4 w-4 ml-1" />
            </button>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartOpen}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Explore our categories</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-6 py-6">
                  <nav className="flex flex-col gap-4">
                    <button
                      onClick={() => {
                        onCategoryClick('', 'Men');
                        setMobileMenuOpen(false);
                      }}
                      className="text-left text-sm font-medium hover:text-gray-600 transition-colors"
                    >
                      {t('header.men')}
                    </button>
                    <button
                      onClick={() => {
                        onCategoryClick('', 'Women');
                        setMobileMenuOpen(false);
                      }}
                      className="text-left text-sm font-medium hover:text-gray-600 transition-colors"
                    >
                      {t('header.women')}
                    </button>
                    <button
                      onClick={() => {
                        onCategoryClick('Accessories');
                        setMobileMenuOpen(false);
                      }}
                      className="text-left text-sm font-medium hover:text-gray-600 transition-colors"
                    >
                      {t('header.accessories')}
                    </button>
                    <button
                      onClick={() => {
                        onCategoryClick('', '');
                        setMobileMenuOpen(false);
                      }}
                      className="text-left text-sm font-medium hover:text-gray-600 transition-colors"
                    >
                      GIFTS
                    </button>
                    <button
                      onClick={() => {
                        onCategoryClick('', '');
                        setMobileMenuOpen(false);
                      }}
                      className="text-left text-sm font-medium hover:text-gray-600 transition-colors"
                    >
                      LAST CHANCE
                    </button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder={t('common.search-placeholder')}
              className="pl-9 w-full border-gray-300"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Site Preference Modal */}
      <SitePreferenceModal
        open={preferenceModalOpen}
        onOpenChange={setPreferenceModalOpen}
      />
    </header>
  );
};
