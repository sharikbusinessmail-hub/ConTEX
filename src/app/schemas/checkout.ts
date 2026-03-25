import { z } from 'zod';

export const checkoutSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name'),
  
  phone: z
    .string()
    .trim()
    .min(9, 'Please enter a valid phone number'),
  
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address'),
  
  address: z
    .string()
    .trim()
    .min(5, 'Please enter your full shipping address'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;