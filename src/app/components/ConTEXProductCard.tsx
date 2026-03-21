import React, { useState } from 'react';
import { Product } from '../types/product';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Badge } from './ui/badge';
import { useCart } from '../context/CartContext';
import { usePreference } from '../context/PreferenceContext';
import { toast } from 'sonner';

interface ConTEXProductCardProps {
  product: Product;
  onClick: () => void;
  showQuickAdd?: boolean;
}

export const ConTEXProductCard: React.FC<ConTEXProductCardProps> = ({
  product,
  onClick,
  showQuickAdd = true,
}) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { formatPrice, t } = usePreference();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Open the product details modal instead of auto-adding
    // This prevents accidentally adding the wrong size
    onClick();
  };

  const handleColorClick = (e: React.MouseEvent, colorName: string) => {
    e.stopPropagation();
    setSelectedColor(colorName);
  };

  // Calculate discount percentage
  const hasDiscount = product.featured; // Using featured as sale indicator
  const discountPercent = hasDiscount ? 25 : 0;

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-0 shadow-none"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        {hasDiscount && (
          <Badge className="absolute top-2 right-2 z-10 bg-red-500 text-white">
            {t('product.sale')} -{discountPercent}%
          </Badge>
        )}
        <img
          src={product.images[isHovered && product.images[1] ? 1 : 0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>

      <CardContent className="p-4 space-y-3">
        {showQuickAdd && (
          <>
            <Button
              variant="outline"
              className="w-full justify-between border-black hover:bg-black hover:text-white transition-all"
              onClick={handleQuickAdd}
            >
              {t('product.quick-add')}
              <Plus className="h-4 w-4" />
            </Button>

            {product.colors.length > 0 && (
              <div className="flex gap-2 justify-center flex-wrap">
                {product.colors.slice(0, 5).map((color) => (
                  <button
                    key={color.name}
                    onClick={(e) => handleColorClick(e, color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? 'border-black scale-110'
                        : 'border-gray-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            )}
          </>
        )}

        <div className="text-center">
          <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
          <p className="text-base font-semibold mt-1">{formatPrice(product.price)}</p>
        </div>
      </CardContent>
    </Card>
  );
};
