import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { Order } from '../types/product';

// Query keys
export const orderKeys = {
  all: ['orders'] as const,
  list: () => [...orderKeys.all, 'list'] as const,
};

/**
 * Fetch all orders with automatic caching and refetching
 */
export function useOrders() {
  return useQuery({
    queryKey: orderKeys.list(),
    queryFn: () => api.getOrders(),
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  });
}

/**
 * Create a new order
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (order: Partial<Order>) => api.saveOrder(order),
    onSuccess: () => {
      // Invalidate and refetch orders list
      queryClient.invalidateQueries({ queryKey: orderKeys.list() });
    },
  });
}
