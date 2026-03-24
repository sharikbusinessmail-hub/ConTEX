import React, { useState, useMemo } from 'react';
import { ConTEXHeader } from '../components/ConTEXHeader';
import { HeroSection } from '../components/HeroSection';
import { BestSellers } from '../components/BestSellers';
import { NewCollection } from '../components/NewCollection';
import { ProductDetailsModal } from '../components/ProductDetailsModal';
import { CartDrawer } from '../components/CartDrawer';
import { CheckoutModal } from '../components/CheckoutModal';
import { Product, FilterState } from '../types/product';
import { mockProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useProducts } from '../hooks/useProducts';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Footer } from '../components/Footer';

export const ConTEXStorefront: React.FC = () => {
  const { items, totalAmount } = useCart();
  const { data: products = [], isLoading: loading } = useProducts();
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    genders: [],
    sizes: [],
    sort: 'newest',
    search: '',
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) => filters.categories.includes(p.category));
    }

    // Gender filter
    if (filters.genders.length > 0) {
      filtered = filtered.filter((p) => filters.genders.includes(p.gender));
    }

    // Size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter((p) =>
        p.sizes.some((size) => filters.sizes.includes(size))
      );
    }

    // Sort
    switch (filters.sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [products, filters]);

  const handleCategoryClick = (category: string, gender?: string) => {
    const newFilters = { ...filters };
    
    if (category) {
      newFilters.categories = [category];
    } else {
      newFilters.categories = [];
    }
    
    if (gender) {
      newFilters.genders = [gender];
    } else if (!category) {
      newFilters.genders = [];
    }
    
    setFilters(newFilters);
  };

  const handleWhatsAppCheckout = () => {
    const message = `*New Order*\\n\\n*Items:*\\n${items
      .map(
        (item) =>
          `- ${item.product.name}\\n  Size: ${item.selectedSize}, Color: ${item.selectedColor}, Qty: ${item.quantity}\\n  Price: $${(
            item.product.price * item.quantity
          ).toFixed(2)}`
      )
      .join('\\n\\n')}\\n\\n*Total: $${totalAmount.toFixed(2)}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ConTEXHeader
        onSearchChange={(search) => setFilters({ ...filters, search })}
        onCategoryClick={handleCategoryClick}
        onCartOpen={() => setCartOpen(true)}
      />

      {products.length === 0 ? (
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-yellow-900 mb-4">
                No Products Found
              </h2>
              <p className="text-yellow-800 mb-6">
                Your database is empty. Click the button below to seed it with 60+ sample products including clothing, accessories, and more!
              </p>
              <Link to="/seed">
                <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700">
                  Seed Database with Sample Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <HeroSection />

          <BestSellers
            products={filteredAndSortedProducts}
            onProductClick={(product) => setSelectedProduct(product)}
          />

          <NewCollection
            products={filteredAndSortedProducts}
            onProductClick={(product) => setSelectedProduct(product)}
          />
        </>
      )}

      <ProductDetailsModal
        product={selectedProduct}
        open={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
      />

      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        onCheckout={() => setCheckoutOpen(true)}
        onWhatsAppCheckout={handleWhatsAppCheckout}
      />

      <CheckoutModal open={checkoutOpen} onOpenChange={setCheckoutOpen} />
      
    {/* ... your other components like BestSellers, ProductCarousel, etc ... */}
      
      {/* Add the Footer right here! */}
      <Footer />
    </div>
  );
};