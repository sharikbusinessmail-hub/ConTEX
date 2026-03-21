import React, { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { FilterSidebar } from '../components/FilterSidebar';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailsModal } from '../components/ProductDetailsModal';
import { CartDrawer } from '../components/CartDrawer';
import { CheckoutModal } from '../components/CheckoutModal';
import { ProductCarousel } from '../components/ProductCarousel';
import { Product, FilterState } from '../types/product';
import { mockProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Storefront: React.FC = () => {
  const { items, totalAmount } = useCart();
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
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Get featured products for carousel
  const featuredProducts = useMemo(() => {
    return mockProducts.filter((p) => p.featured).slice(0, 10);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...mockProducts];

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
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleCategoryClick = (category: string) => {
    if (category) {
      setFilters({ ...filters, categories: [category] });
    } else {
      setFilters({ ...filters, categories: [] });
    }
  };

  const handleWhatsAppCheckout = () => {
    const message = `*New Order*\n\n*Items:*\n${items
      .map(
        (item) =>
          `- ${item.product.name}\n  Size: ${item.selectedSize}, Color: ${item.selectedColor}, Qty: ${item.quantity}\n  Price: $${(
            item.product.price * item.quantity
          ).toFixed(2)}`
      )
      .join('\n\n')}\n\n*Total: $${totalAmount.toFixed(2)}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearchChange={(search) => setFilters({ ...filters, search })}
        onCategoryClick={handleCategoryClick}
        onCartOpen={() => setCartOpen(true)}
      />

      {/* Product Carousel */}
      {featuredProducts.length > 0 && (
        <ProductCarousel
          products={featuredProducts}
          onProductClick={(product) => setSelectedProduct(product)}
        />
      )}

      <div className="flex">
        <FilterSidebar filters={filters} onFilterChange={setFilters} />

        <main className="flex-1 container mx-auto px-4 py-6 lg:py-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Page Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              {filters.categories.length > 0
                ? filters.categories.join(', ')
                : 'All Products'}
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''} found
              {totalPages > 1 && ` - Page ${currentPage} of ${totalPages}`}
            </p>
          </div>

          {/* Product Grid */}
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No products found</p>
              <p className="text-sm text-gray-500 mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className="min-w-10"
                          >
                            {page}
                          </Button>
                        );
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return (
                          <span key={page} className="px-2 text-gray-500">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

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
    </div>
  );
};