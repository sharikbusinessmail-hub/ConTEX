import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCarousel from '../components/ProductCarousel';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { Loader2 } from 'lucide-react';

export default function ConTEXStorefront() {
  const { data: allProducts, isLoading, isError } = useProducts();

  // 1. Handle Loading State
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
      </div>
    );
  }

  // 2. Handle Error State
  if (isError) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 font-semibold">Failed to connect to the database.</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-black text-white rounded">Retry</button>
      </div>
    );
  }

  // 3. Safety Net: Ensure products is always an array
  const products = allProducts || [];

  // 4. Filtering Logic for Carousels
  const bestSellers = products.filter(p => p.category === 'Best Sellers' || p.stock < 20);
  const newArrivals = products.slice(0, 10);
  const accessories = products.filter(p => p.category === 'Accessories');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Hero />
      
      <main className="flex-grow space-y-12 py-12">
        {bestSellers.length > 0 && (
          <ProductCarousel title="BEST SELLERS" products={bestSellers} />
        )}

        {newArrivals.length > 0 && (
          <ProductCarousel title="NEW COLLECTION" products={newArrivals} />
        )}

        {accessories.length > 0 && (
          <ProductCarousel title="ESSENTIAL ACCESSORIES" products={accessories} />
        )}

        {products.length === 0 && (
          <div className="text-center py-20 bg-gray-50 mx-4 rounded-xl border-2 border-dashed">
            <h2 className="text-xl font-bold">No Products Found</h2>
            <p className="text-gray-500">Your new relational database is ready. Go to Admin to add products!</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}