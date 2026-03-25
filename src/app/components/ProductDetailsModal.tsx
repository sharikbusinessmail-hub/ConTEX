import React, { useState } from 'react';
import { Product } from '../types/product';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { ShoppingCart, Check, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { usePreference } from '../context/PreferenceContext';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner';

interface ProductDetailsModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  open,
  onOpenChange,
}) => {
  const { addToCart } = useCart();
  const { formatPrice } = usePreference();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }

    addToCart(product, selectedSize, selectedColor, quantity);
    toast.success(`Added ${product.name} to cart`);
    onOpenChange(false);
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
  };

  const isInStock = product.stock > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {product.images.slice(1, 4).map((img, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={img} 
                        alt={`${product.name} ${index + 2}`} 
                        loading="lazy"
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <DialogHeader>
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <DialogTitle className="text-2xl">{product.name}</DialogTitle>
                    {product.featured && (
                      <Badge className="bg-black text-white">Featured</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
                    <Badge variant="outline" className="gap-1">
                      <Package className="h-3 w-3" />
                      {isInStock ? `${product.stock} in stock` : 'Out of stock'}
                    </Badge>
                  </div>
                </div>
                <DialogDescription className="text-base leading-relaxed">
                  {product.description}
                </DialogDescription>
              </DialogHeader>

              {/* Color Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">
                  Color {selectedColor && `- ${selectedColor}`}
                </Label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((rawColor, index) => {
                    // Smart parser: Handles old JSON strings & new simple strings
                    let colorName = '';
                    let colorHex = '';

                    if (typeof rawColor === 'string') {
                      if (rawColor.startsWith('{')) {
                        try {
                          const parsed = JSON.parse(rawColor);
                          colorName = parsed.name || rawColor;
                          colorHex = parsed.hex || rawColor;
                        } catch (e) {
                          colorName = rawColor;
                          colorHex = rawColor;
                        }
                      } else {
                        colorName = rawColor;
                        // CSS supports hex codes AND color words (like 'black') directly!
                        colorHex = rawColor; 
                      }
                    } else if (typeof rawColor === 'object') {
                      colorName = (rawColor as any).name || 'Unknown';
                      colorHex = (rawColor as any).hex || '#ffffff';
                    }

                    return (
                      <button
                        key={`${colorName}-${index}`}
                        onClick={() => setSelectedColor(colorName)}
                        className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === colorName
                            ? 'border-black scale-110'
                            : 'border-gray-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: colorHex }}
                        title={colorName}
                      >
                        {selectedColor === colorName && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full">
                            <Check className="h-5 w-5 text-white drop-shadow-md" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Size</Label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      onClick={() => setSelectedSize(size)}
                      className="w-16"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Quantity</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!isInStock}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={!isInStock}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={!isInStock}
                className="w-full h-12 text-base"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isInStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>

              {/* Product Info */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t text-sm">
                <div>
                  <p className="text-gray-600">Category</p>
                  <p className="font-medium">{product.category}</p>
                </div>
                <div>
                  <p className="text-gray-600">Gender</p>
                  <p className="font-medium">{product.gender}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};