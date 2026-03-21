import { z } from 'zod';

// Checkout form validation schema
export const checkoutSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'Please enter a valid phone number'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  
  address: z
    .string()
    .min(10, 'Address must be at least 10 characters')
    .max(500, 'Address must be less than 500 characters'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
