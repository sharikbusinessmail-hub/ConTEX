# Authentication & Admin Setup Guide

This guide explains how to set up and use the Supabase authentication system with admin role-based access control.

## Overview

The application now includes:
- **React Query** for automatic data caching and refetching
- **Zod schema validation** for the checkout form
- **Supabase Auth** with role-based access control (admin/customer)

## Authentication Architecture

### User Roles

1. **Customer** (default) - Can browse products, place orders, view their own data
2. **Admin** - Can create, update, and delete products; view all orders

### How It Works

1. User metadata stores the role (`customer` or `admin`)
2. Server middleware verifies JWT tokens and checks user roles
3. Admin endpoints are protected and require an admin role
4. Frontend uses `AuthContext` to manage authentication state

## Initial Setup

### Step 1: Create Your First Admin User

Since admin users can only be created by other admins, you need to manually create the first admin user directly in Supabase:

#### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Add User** → **Create new user**
4. Fill in:
   - Email: `admin@yourdomain.com`
   - Password: Choose a secure password
   - Auto Confirm User: ✓ (checked)
5. Click **Create User**
6. After creation, click on the user to edit
7. In the **User Metadata** section, add:
   ```json
   {
     "role": "admin",
     "name": "Admin User"
   }
   ```
8. Save changes

#### Option B: Using Supabase SQL Editor

Run this SQL in your Supabase SQL Editor:

```sql
-- Create admin user (replace email and encrypted password)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@yourdomain.com',
  crypt('your-secure-password', gen_salt('bf')),
  NOW(),
  '{"role": "admin", "name": "Admin User"}'::jsonb,
  NOW(),
  NOW()
);
```

### Step 2: Sign In as Admin

Use the `useAuth` hook in your components:

```typescript
import { useAuth } from '../context/AuthContext';

function AdminLogin() {
  const { signIn, isAdmin } = useAuth();
  
  const handleLogin = async () => {
    const { error } = await signIn('admin@yourdomain.com', 'password');
    if (!error) {
      console.log('Logged in as admin!');
    }
  };
  
  return <button onClick={handleLogin}>Sign In</button>;
}
```

## Using the Auth System

### Frontend - AuthContext

The `AuthContext` provides these methods and properties:

```typescript
const {
  user,           // Current user object
  session,        // Current session
  isAdmin,        // Boolean - is user an admin?
  loading,        // Boolean - auth loading state
  signIn,         // (email, password) => Promise
  signUp,         // (email, password, name) => Promise
  signOut,        // () => Promise
  getAccessToken, // () => string | null
} = useAuth();
```

### Creating New Admin Users

Once you're logged in as an admin, you can create other admin users:

```typescript
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

function CreateAdminForm() {
  const { getAccessToken } = useAuth();
  
  const handleCreateAdmin = async () => {
    const token = getAccessToken();
    const result = await api.createAdminUser(
      'newadmin@domain.com',
      'secure-password',
      'New Admin Name',
      token!
    );
    
    if (result.success) {
      console.log('Admin created!');
    }
  };
}
```

### Creating Customer Accounts

Regular users can sign up through the frontend:

```typescript
const { signUp } = useAuth();

const handleSignUp = async () => {
  const { error } = await signUp(
    'customer@email.com',
    'password',
    'Customer Name'
  );
  
  if (!error) {
    console.log('Account created! Please sign in.');
  }
};
```

Or via API endpoint:

```typescript
await api.signUp('customer@email.com', 'password', 'Customer Name');
```

## Protected Admin Operations

### Product Management

Admin operations now require authentication:

```typescript
import { useAuth } from '../context/AuthContext';
import { useCreateProduct, useUpdateProduct, useDeleteProduct } from '../hooks/useProducts';

function AdminProductPanel() {
  const { getAccessToken, isAdmin } = useAuth();
  const token = getAccessToken()!;
  
  const createProduct = useCreateProduct(token);
  const updateProduct = useUpdateProduct(token);
  const deleteProduct = useDeleteProduct(token);
  
  if (!isAdmin) {
    return <div>Access Denied</div>;
  }
  
  const handleCreate = async () => {
    await createProduct.mutateAsync({
      name: 'New Product',
      price: 99.99,
      // ... other fields
    });
  };
  
  return (
    <button onClick={handleCreate}>
      Create Product
    </button>
  );
}
```

## React Query Benefits

### Automatic Caching

Products and orders are automatically cached:

```typescript
// First call - fetches from API
const { data: products } = useProducts();

// Subsequent calls within 5 minutes - returns cached data
const { data: sameProducts } = useProducts();
```

### Automatic Refetching

Orders automatically refetch every 30 seconds:

```typescript
const { data: orders } = useOrders(); // Refetches every 30 seconds
```

### Optimistic Updates

You can implement optimistic updates for better UX:

```typescript
const updateProduct = useUpdateProduct(token);

updateProduct.mutate(
  { id: '123', updates: { name: 'New Name' } },
  {
    onMutate: async (newData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['products'] });
      
      // Snapshot current data
      const previous = queryClient.getQueryData(['products']);
      
      // Optimistically update
      queryClient.setQueryData(['products'], (old) => {
        // Update logic
      });
      
      return { previous };
    },
    onError: (err, newData, context) => {
      // Rollback on error
      queryClient.setQueryData(['products'], context.previous);
    },
  }
);
```

## Form Validation with Zod

The checkout form now uses Zod for robust validation:

```typescript
// Schema definition in /src/app/schemas/checkout.ts
export const checkoutSchema = z.object({
  name: z.string().min(2).max(100).regex(/^[a-zA-Z\s'-]+$/),
  phone: z.string().min(10).max(20).regex(/^[+]?[(]?[0-9]...$/),
  email: z.string().email().max(255),
  address: z.string().min(10).max(500),
});

// Usage in component
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<CheckoutFormData>({
  resolver: zodResolver(checkoutSchema),
});
```

### Benefits

- **Type-safe**: TypeScript knows the exact shape of your form data
- **Client-side validation**: Immediate feedback to users
- **Reusable schemas**: Use the same schema for frontend and backend validation
- **Better error messages**: Detailed, user-friendly error messages

## Security Best Practices

### 1. Never Expose Service Role Key

The `SUPABASE_SERVICE_ROLE_KEY` is only used server-side and never sent to the frontend.

### 2. Use Row Level Security (Optional)

For additional security, you can set up RLS policies in Supabase:

```sql
-- Example: Only admins can modify products
CREATE POLICY "Admins can modify products"
ON products
FOR ALL
USING (
  auth.jwt() ->> 'user_metadata'->>'role' = 'admin'
);
```

### 3. Token Refresh

Supabase automatically handles token refresh. The `AuthContext` listens for auth state changes.

### 4. Logout Inactive Users

Implement session timeout if needed:

```typescript
useEffect(() => {
  const timeout = setTimeout(() => {
    signOut();
  }, 60 * 60 * 1000); // 1 hour
  
  return () => clearTimeout(timeout);
}, [session]);
```

## Testing Admin Functionality

1. Create first admin via Supabase dashboard
2. Sign in with admin credentials
3. Try creating a product - should work
4. Sign out and try as non-admin - should fail with 403 error
5. Create a second admin user using the create-admin endpoint

## Troubleshooting

### "Unauthorized - Invalid token"

- Check that you're passing the correct access token
- Verify token hasn't expired (sign in again)
- Ensure `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set in server environment

### "Forbidden - Admin access required"

- User doesn't have `role: 'admin'` in their user metadata
- Update user metadata in Supabase dashboard

### "Auto-confirm not working"

- Email confirmation is auto-enabled in the signup endpoint
- If using Supabase's built-in auth UI, configure email settings in dashboard

## API Endpoints

### Public Endpoints
- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `POST /orders` - Create order
- `GET /orders` - Get all orders
- `POST /auth/signup` - Create customer account

### Admin-Only Endpoints (Require JWT with admin role)
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `POST /auth/create-admin` - Create admin user

## Next Steps

1. Create your first admin user
2. Sign in and test admin functionality
3. Set up additional admin users as needed
4. Customize user roles and permissions as needed
5. Consider implementing Row Level Security (RLS) for database-level protection
