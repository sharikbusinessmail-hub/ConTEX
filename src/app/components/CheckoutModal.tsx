import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useCart } from '../context/CartContext';
import { Order } from '../types/product';
import { toast } from 'sonner';
import { useCreateOrder } from '../hooks/useOrders';

// 1. THE INLINE SCHEMA (Guarantees relaxed rules are used)
const formSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(9, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  address: z.string().min(5, 'Please enter your full shipping address'),
});

type FormData = z.infer<typeof formSchema>;

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ open, onOpenChange }) => {
  const { items, totalAmount, clearCart } = useCart();
  const createOrder = useCreateOrder();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    // 2. THE CRITICAL FIX: This tells React Hook Form to actively track the text fields!
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
    }
  });

  const onSubmit = async (data: FormData) => {
    const order: Order = {
      id: `ORD-${Date.now()}`,
      customerName: data.name,
      customerPhone: data.phone,
      customerEmail: data.email,
      shippingAddress: data.address,
      items: items,
      totalAmount: totalAmount,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    try {
      const savedOrder = await createOrder.mutateAsync(order);
      
      if (savedOrder) {
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));

        // --- WHATSAPP INTEGRATION ---
        const adminWhatsAppNumber = '94770000000'; 
        
        const itemsListText = items.map(item => 
          `▪ ${item.quantity}x ${item.name} (${item.selectedSize}, ${item.selectedColor})`
        ).join('\n');

        const whatsappMessage = 
`*🛍️ NEW ORDER RECEIVED!*
Order ID: #${order.id}

*👤 Customer Details:*
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}

*📍 Delivery Address:*
${data.address}

*📦 Order Items:*
${itemsListText}

*💰 Total Amount:* $${totalAmount.toFixed(2)}

Please confirm my order!`;

        const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        
        reset();
        clearCart();
        toast.success('Order placed! Redirecting to WhatsApp...');
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
          <DialogDescription>
            Please provide your details to complete the purchase.
          </DialogDescription>
        </DialogHeader>

        {/* 3. noValidate stops the browser from interfering with our rules */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="077 123 4567"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Shipping Address *</Label>
            <Textarea
              id="address"
              {...register('address')}
              placeholder="123 Main St, Colombo"
              rows={3}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          <div className="pt-4 border-t space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-bold text-lg">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1 bg-black text-white hover:bg-gray-800">
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};