import React from 'react';
// RESTORING YOUR ORIGINAL IMPORTS
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import ProductCarousel from '../components/ProductCarousel';
import { ConTEXHeader } from '../components/ConTEXHeader'; 
import { useProducts } from '../hooks/useProducts';
import { Loader2 } from 'lucide-react';

// Using NAMED EXPORT to satisfy routes.ts
export function ConTEXStorefront() {
  const { data: allProducts, isLoading, isError } = useProducts();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 font-semibold">Failed to connect to the database.</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-black text-white rounded">Retry</button>
      </div>
    );
  }

  // Safety net: ensure products is always an array
  const products = allProducts || [];

  // RESTORING YOUR ORIGINAL FILTERING LOGIC
  const bestSellers = products.filter(p => p.category === 'Best Sellers' || p.stock < 20);
  const newArrivals = products.slice(0, 10);
  const accessories = products.filter(p => p.category === 'Accessories');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ConTEXHeader />
      <Hero />
      
      <main className="flex-grow space-y-12 py-12">
        {/* RESTORING YOUR ORIGINAL CAROUSELS */}
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
            <p className="text-gray-500">Your new database is ready. Add products via Admin to see them here!</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Keep default export as a fallback
export default ConTEXStorefront;