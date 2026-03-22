import React from 'react';
import { Product } from '../types/product';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Use a fallback image if none exists
  const displayImage = product.image || 'https://via.placeholder.com/400';

  return (
    <div className="group relative flex flex-col gap-3">
      <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 relative">
        <img 
          src={displayImage} 
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
            LIMITED STOCK
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 px-1">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-medium text-gray-900 truncate pr-2">{product.name}</h3>
          <p className="text-sm font-bold">LKR {product.price}</p>
        </div>
        
        <p className="text-xs text-gray-500">{product.category}</p>

        {/* Updated Color Swatches for Relational Table */}
        <div className="flex gap-1.5 mt-2">
          {product.colors && product.colors.map((color) => (
            <div 
              key={color}
              className="w-3.5 h-3.5 rounded-full border border-gray-200"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        <Button className="mt-4 w-full bg-white text-black border border-black hover:bg-black hover:text-white transition-all text-xs h-9 uppercase tracking-widest flex items-center justify-center gap-2">
          Quick Add <Plus className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}