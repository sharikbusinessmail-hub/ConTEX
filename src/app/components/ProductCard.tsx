import React from 'react';
import { Product } from '../types/product';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { usePreference } from '../context/PreferenceContext';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onQuickAdd?: (size: string, color?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onQuickAdd }) => {
  const { formatPrice } = usePreference();
  
  return (
    <Card
      className="group cursor-pointer overflow-hidden border-gray-200 hover:shadow-lg transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <Badge className="absolute top-2 right-2 bg-black text-white">Featured</Badge>
        )}
        {product.stock < 10 && product.stock > 0 && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            Only {product.stock} left
          </Badge>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary" className="text-lg">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm line-clamp-2 flex-1">{product.name}</h3>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">{formatPrice(product.price)}</p>
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-500 ml-1">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>{product.gender}</span>
            <span>•</span>
            <span>{product.sizes.join(', ')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};