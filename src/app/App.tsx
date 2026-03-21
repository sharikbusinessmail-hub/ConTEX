import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { PreferenceProvider } from './context/PreferenceContext';
import { Toaster } from './components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DatabaseInitializer } from './components/DatabaseInitializer';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PreferenceProvider>
          <CartProvider>
            <DatabaseInitializer />
            <RouterProvider router={router} />
            <Toaster position="top-center" />
          </CartProvider>
        </PreferenceProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}