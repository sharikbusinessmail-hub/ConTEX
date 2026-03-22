import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { Loader2, ShoppingBag } from 'lucide-react';

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

  // 3. Safety Net
  const products = allProducts || [];

  // 4. Basic Sections
  const bestSellers = products.slice(0, 4);
  const others = products.slice(4);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Simple Header */}
      <header className="border-b py-4 px-6 flex justify-between items-center bg-white sticky top-0 z-50">
        <h1 className="text-2xl font-black tracking-tighter">ConTEX</h1>
        <div className="flex gap-4 items-center">
          <ShoppingBag className="w-5 h-5" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 py-20 px-6 text-center">
        <h2 className="text-5xl font-bold mb-4">PERFORMANCE APPAREL</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">Elevate your game with gear designed for athletes, worn by everyone.</p>
        <button className="bg-black text-white px-8 py-3 font-bold uppercase tracking-widest text-sm">Shop Now</button>
      </section>
      
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Best Sellers Grid */}
        {bestSellers.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-8 tracking-widest uppercase">Best Sellers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {bestSellers.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* All Products Grid */}
        {others.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-8 tracking-widest uppercase">New Arrivals</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {others.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed">
            <h2 className="text-xl font-bold">No Products Found</h2>
            <p className="text-gray-500 mt-2">The database is connected but empty. Use the Admin Panel to add items!</p>
          </div>
        )}
      </main>

      <footer className="border-t py-12 px-6 bg-gray-50 mt-auto text-center text-sm text-gray-500">
        <p>© 2026 ConTEX Store. All rights reserved.</p>
      </footer>
    </div>
  );
}