import React, { useState } from 'react';
import { Product } from '../types/product';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ConTEXProductCard } from './ConTEXProductCard';
import { Badge } from './ui/badge';
import { usePreference } from '../context/PreferenceContext';

interface NewCollectionProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export const NewCollection: React.FC<NewCollectionProps> = ({ products, onProductClick }) => {
  const { t } = usePreference();
  const newProducts = products.slice(0, 8);

  const scrollLeft = () => {
    const container = document.getElementById('newcollection-scroll');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('newcollection-scroll');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">{t('section.new-collection')}</h2>
            <Badge className="bg-black text-white rounded-full px-4 py-1">
              + RESTOCKS
            </Badge>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outline"
              className="rounded-full border-black hover:bg-black hover:text-white"
            >
              {t('menu.women.shop-all')}
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={scrollLeft}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={scrollRight}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div
          id="newcollection-scroll"
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {newProducts.map((product) => (
            <div key={product.id} className="flex-none w-[280px]">
              <ConTEXProductCard
                product={product}
                onClick={() => onProductClick(product)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};