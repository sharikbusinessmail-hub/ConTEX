import React from 'react';
import { X, Plus, Minus, ShoppingBag, MessageCircle, CreditCard } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { useCart } from '../context/CartContext';
import { usePreference } from '../context/PreferenceContext';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCheckout: () => void;
  onWhatsAppCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onOpenChange,
  onCheckout,
  onWhatsAppCheckout,
}) => {
  const { items, updateQuantity, removeFromCart, totalAmount, totalItems } = useCart();
  const { formatPrice, t } = usePreference();

  const handleWhatsApp = () => {
    onWhatsAppCheckout();
    onOpenChange(false);
  };

  const handleDirectCheckout = () => {
    onCheckout();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            {t('cart.title')} ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </SheetTitle>
          <SheetDescription>
            Review your items and proceed to checkout
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center space-y-3">
              <ShoppingBag className="h-16 w-16 mx-auto text-gray-300" />
              <p className="text-lg font-medium text-gray-600">{t('cart.empty')}</p>
              <p className="text-sm text-gray-500">Add some items to get started</p>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 py-4">
                {items.map((item, index) => (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm line-clamp-1">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.selectedColor} / {item.selectedSize}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 flex-shrink-0"
                          onClick={() =>
                            removeFromCart(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor
                            )
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor,
                                item.quantity - 1
                              )
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="font-semibold">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('cart.subtotal')}</span>
                  <span className="font-medium">{formatPrice(totalAmount)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button onClick={handleDirectCheckout} className="w-full h-11" size="lg">
                  <CreditCard className="mr-2 h-5 w-5" />
                  {t('checkout.title')}
                </Button>
                <Button
                  onClick={handleWhatsApp}
                  variant="outline"
                  className="w-full h-11"
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t('checkout.whatsapp')}
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};