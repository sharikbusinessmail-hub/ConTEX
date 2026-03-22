import React, { useState, useMemo } from 'react';
// RESTORING ALL ORIGINAL IMPORTS
import { ConTEXHeader } from '../components/ConTEXHeader';
import { HeroSection } from '../components/HeroSection';
import { BestSellers } from '../components/BestSellers';
import { NewCollection } from '../components/NewCollection';
import { ProductDetailsModal } from '../components/ProductDetailsModal';
import { CartDrawer } from '../components/CartDrawer';
import { CheckoutModal } from '../components/CheckoutModal';
import Footer from '../components/Footer';
import { Product, FilterState } from '../types/product';
import { useCart } from '../context/CartContext';
import { useProducts } from '../hooks/useProducts';
import { Loader2 } from 'lucide-react';

// Use Named Export to keep routes.ts happy
export const ConTEXStorefront: React.FC = () => {
  const { items, totalAmount } = useCart();
  
  // NEW RELATIONAL HOOK
  const { data: allProducts = [], isLoading } = useProducts();

  // RESTORING ALL ORIGINAL STATES
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    genders: [],
    sizes: [],
    sort: 'newest',
    search: '',
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // RESTORING ORIGINAL FILTERING LOGIC
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (filters.search) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.description?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }

    if (filters.genders.length > 0) {
      result = result.filter(p => filters.genders.includes(p.gender));
    }

    if (filters.sort === 'price-low') result.sort((a, b) => a.price - b.price);
    if (filters.sort === 'price-high') result.sort((a, b) => b.price - a.price);
    
    return result;
  }, [allProducts, filters]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-black" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-black selection:text-white">
      {/* RESTORING ORIGINAL COMPONENTS */}
      <ConTEXHeader 
        onCartClick={() => setIsCartOpen(true)} 
        cartCount={items.reduce((acc, item) => acc + item.quantity, 0)}
        filters={filters}
        setFilters={setFilters}
      />
      
      <HeroSection />

      <main className="flex-grow">
        {/* Pass the filtered data to your original sections */}
        <BestSellers 
          products={allProducts.filter(p => p.category === 'Best Sellers' || p.stock < 15)} 
          onProductClick={setSelectedProduct}
        />
        
        <NewCollection 
          products={allProducts.slice(0, 8)} 
          onProductClick={setSelectedProduct}
        />
      </main>

      <Footer />

      {/* RESTORING ALL ORIGINAL MODALS */}
      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </div>
  );
};

// Also keep default export to prevent any other build crashes
export default ConTEXStorefront;