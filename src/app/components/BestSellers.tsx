import React, { useRef, useState } from 'react';
import { Product } from '../types/product';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ConTEXProductCard } from './ConTEXProductCard';
import { usePreference } from '../context/PreferenceContext';

interface BestSellersProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({ products, onProductClick }) => {
  const { t } = usePreference();
  const [activeTab, setActiveTab] = useState<'men' | 'women'>('men');
  const [scrollPosition, setScrollPosition] = useState(0);

  const filteredProducts = products.filter(
    (p) => p.gender.toLowerCase() === (activeTab === 'men' ? 'men' : 'women')
  ).slice(0, 8);

  const scrollLeft = () => {
    const container = document.getElementById('bestsellers-scroll');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('bestsellers-scroll');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl md:text-3xl font-bold">{t('section.best-sellers')}</h2>
            <div className="flex items-center gap-2 border border-black rounded-full overflow-hidden">
              <button
                onClick={() => setActiveTab('men')}
                className={`px-6 py-2 text-sm font-medium transition-all ${
                  activeTab === 'men'
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {t('header.men')}
              </button>
              <button
                onClick={() => setActiveTab('women')}
                className={`px-6 py-2 text-sm font-medium transition-all ${
                  activeTab === 'women'
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {t('header.women')}
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outline"
              className="rounded-full border-black hover:bg-black hover:text-white"
            >
              {t('section.view-all')}
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
          id="bestsellers-scroll"
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProducts.map((product) => (
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