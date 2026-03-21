import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useCart } from '../context/CartContext';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface HeaderProps {
  onSearchChange: (search: string) => void;
  onCategoryClick: (category: string) => void;
  onCartOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchChange, onCategoryClick, onCartOpen }) => {
  const { totalItems } = useCart();
  const [search, setSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = ['T-Shirts', 'Dresses', 'Outerwear', 'Denim', 'Accessories'];

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => window.location.reload()}
              className="text-2xl font-bold tracking-tight hover:text-gray-700 transition-colors"
            >
              LUXE
            </button>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <button
                onClick={() => onCategoryClick('')}
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryClick(category)}
                  className="text-sm font-medium hover:text-gray-600 transition-colors"
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-9 w-64"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            {/* Cart Button */}
            <Button
              variant="outline"
              size="icon"
              className="relative"
              onClick={onCartOpen}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 py-6">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <nav className="flex flex-col gap-4">
                    <button
                      onClick={() => {
                        onCategoryClick('');
                        setMobileMenuOpen(false);
                      }}
                      className="text-left text-sm font-medium hover:text-gray-600 transition-colors"
                    >
                      All Products
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          onCategoryClick(category);
                          setMobileMenuOpen(false);
                        }}
                        className="text-left text-sm font-medium hover:text-gray-600 transition-colors"
                      >
                        {category}
                      </button>
                    ))}
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
              placeholder="Search products..."
              className="pl-9 w-full"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};