import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { Product } from '../types/product';
import { seedDatabase } from '../utils/seedDatabase';

// Query keys
export const productKeys = {
  all: ['products'] as const,
  list: () => [...productKeys.all, 'list'] as const,
  detail: (id: string) => [...productKeys.all, 'detail', id] as const,
};

/**
 * Fetch all products with automatic caching and refetching
 */
export function useProducts() {
  return useQuery({
    queryKey: productKeys.list(),
    queryFn: async () => {
      let products = await api.getProducts();
      
      // If no products exist, seed the database automatically
      if (products.length === 0) {
        console.log('No products found, automatically seeding database...');
        const seededProducts = await seedDatabase();
        // Return seeded products directly, or fetch again to confirm
        return seededProducts.length > 0 ? seededProducts : await api.getProducts();
      }
      
      return products;
    },
  });
}

/**
 * Fetch a single product by ID
 */
export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => api.getProduct(id),
    enabled: !!id, // Only run query if ID is provided
  });
}

/**
 * Create a new product (admin only)
 */
export function useCreateProduct(accessToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Partial<Product>) => api.createProduct(product, accessToken),
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: productKeys.list() });
    },
  });
}

/**
 * Update an existing product (admin only)
 */
export function useUpdateProduct(accessToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Product> }) =>
      api.updateProduct(id, updates, accessToken),
    onSuccess: (data, variables) => {
      // Invalidate both list and detail queries
      queryClient.invalidateQueries({ queryKey: productKeys.list() });
      queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) });
    },
  });
}

/**
 * Delete a product (admin only)
 */
export function useDeleteProduct(accessToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.deleteProduct(id, accessToken),
    onSuccess: () => {
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: productKeys.list() });
    },
  });
}