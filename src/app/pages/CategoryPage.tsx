import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import { ConTEXHeader } from '../components/ConTEXHeader';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailsModal } from '../components/ProductDetailsModal';
import { CartDrawer } from '../components/CartDrawer';
import { CheckoutModal } from '../components/CheckoutModal';
import { Product } from '../types/product';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '../components/ui/sheet';
import { Footer } from '../components/Footer';

// Helper function to normalize category names for comparison
const normalizeCategory = (category: string): string => {
  return category
    .toLowerCase()
    .replace(/\s*&\s*/g, '-')  // Replace " & " with "-"
    .replace(/\s+/g, '-');      // Replace spaces with "-"
};

export const CategoryPage: React.FC = () => {
  const { gender, category } = useParams();
  const { data: products = [], isLoading } = useProducts();
  const { addItem } = useCart();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Filter states
  const [availability, setAvailability] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [genderFilter, setGenderFilter] = useState<string[]>([]);
  const [fit, setFit] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('manual');

  // Get breadcrumb title
  const categoryTitle = category 
    ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : gender 
    ? `${gender.charAt(0).toUpperCase() + gender.slice(1)}'s Collection` 
    : 'All Products';

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by gender from URL
    if (gender) {
      filtered = filtered.filter(p => p.gender.toLowerCase() === gender.toLowerCase());
    }

    // Filter by category from URL
    if (category) {
      const normalizedUrlCategory = normalizeCategory(category);
      filtered = filtered.filter(p => {
        const normalizedProductCategory = normalizeCategory(p.category);
        return normalizedProductCategory === normalizedUrlCategory;
      });
    }

    // Availability filter
    if (availability.includes('in-stock')) {
      filtered = filtered.filter(p => p.stock > 0);
    }

    // Price range filter
    if (priceRange.length > 0) {
      filtered = filtered.filter(p => {
        return priceRange.some(range => {
          if (range === 'under-50') return p.price < 50;
          if (range === '50-100') return p.price >= 50 && p.price <= 100;
          if (range === '100-200') return p.price > 100 && p.price <= 200;
          if (range === 'over-200') return p.price > 200;
          return true;
        });
      });
    }

    // Size filter
    if (sizes.length > 0) {
      filtered = filtered.filter(p => 
        p.sizes.some(size => sizes.includes(size))
      );
    }

    // Color filter
    if (colors.length > 0) {
      filtered = filtered.filter(p =>
        p.colors?.some(color => colors.includes(color.name.toLowerCase())) ?? false
      );
    }

    // Gender filter
    if (genderFilter.length > 0) {
      filtered = filtered.filter(p => genderFilter.includes(p.gender.toLowerCase()));
    }

    // Sort
    switch (sortBy) {
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
  }, [products, gender, category, availability, priceRange, sizes, colors, genderFilter, sortBy]);

  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    const setters = {
      availability: setAvailability,
      priceRange: setPriceRange,
      sizes: setSizes,
      colors: setColors,
      gender: setGenderFilter,
      fit: setFit,
    };

    const setter = setters[filterType as keyof typeof setters];
    if (setter) {
      setter((prev: string[]) =>
        checked ? [...prev, value] : prev.filter(v => v !== value)
      );
    }
  };

  const FilterSidebar = () => (
    <div className="space-y-1">
      <Accordion type="multiple" defaultValue={['availability', 'price', 'size', 'color', 'gender', 'fit', 'sort']} className="w-full">
        {/* Availability */}
        <AccordionItem value="availability">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            Availability
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 py-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={availability.includes('in-stock')}
                  onCheckedChange={(checked) => 
                    handleFilterChange('availability', 'in-stock', checked as boolean)
                  }
                />
                <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
                  In Stock
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 py-2">
              {[
                { value: 'under-50', label: 'Under LKR 50' },
                { value: '50-100', label: 'LKR 50 - LKR 100' },
                { value: '100-200', label: 'LKR 100 - LKR 200' },
                { value: 'over-200', label: 'Over LKR 200' },
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={priceRange.includes(option.value)}
                    onCheckedChange={(checked) =>
                      handleFilterChange('priceRange', option.value, checked as boolean)
                    }
                  />
                  <Label htmlFor={option.value} className="text-sm font-normal cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Size */}
        <AccordionItem value="size">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            Size
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 py-2">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={sizes.includes(size)}
                    onCheckedChange={(checked) =>
                      handleFilterChange('sizes', size, checked as boolean)
                    }
                  />
                  <Label htmlFor={`size-${size}`} className="text-sm font-normal cursor-pointer">
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Color */}
        <AccordionItem value="color">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            Color
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 py-2">
              {['black', 'white', 'blue', 'red', 'green', 'grey'].map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={colors.includes(color)}
                    onCheckedChange={(checked) =>
                      handleFilterChange('colors', color, checked as boolean)
                    }
                  />
                  <Label htmlFor={`color-${color}`} className="text-sm font-normal cursor-pointer capitalize">
                    {color}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Gender */}
        <AccordionItem value="gender">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            Gender
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 py-2">
              {['men', 'women', 'unisex'].map((g) => (
                <div key={g} className="flex items-center space-x-2">
                  <Checkbox
                    id={`gender-${g}`}
                    checked={genderFilter.includes(g)}
                    onCheckedChange={(checked) =>
                      handleFilterChange('gender', g, checked as boolean)
                    }
                  />
                  <Label htmlFor={`gender-${g}`} className="text-sm font-normal cursor-pointer capitalize">
                    {g}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Fit */}
        <AccordionItem value="fit">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            Fit
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 py-2">
              {['regular', 'slim', 'oversize'].map((f) => (
                <div key={f} className="flex items-center space-x-2">
                  <Checkbox
                    id={`fit-${f}`}
                    checked={fit.includes(f)}
                    onCheckedChange={(checked) =>
                      handleFilterChange('fit', f, checked as boolean)
                    }
                  />
                  <Label htmlFor={`fit-${f}`} className="text-sm font-normal cursor-pointer capitalize">
                    {f} Fit
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Sort By */}
        <AccordionItem value="sort">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">
            Sort By: {sortBy === 'manual' ? 'Manual' : sortBy === 'price-asc' ? 'Price: Low to High' : sortBy === 'price-desc' ? 'Price: High to Low' : 'Newest'}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 py-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <ConTEXHeader
        onSearchChange={() => {}}
        onCategoryClick={() => {}}
        onCartOpen={() => setCartOpen(true)}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <ChevronRight className="h-4 w-4" />
          {gender && (
            <>
              <Link to={`/collections/${gender.toLowerCase()}`} className="hover:text-gray-900 capitalize">
                {gender}
              </Link>
              {category && <ChevronRight className="h-4 w-4" />}
            </>
          )}
          {category && (
            <span className="text-gray-900 capitalize">{category}</span>
          )}
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-8">{categoryTitle}</h1>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Mobile Filters */}
          <div className="lg:hidden fixed bottom-4 right-4 z-40">
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button className="rounded-full shadow-lg">
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm text-gray-600">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => setSelectedProduct(product)}
                      onQuickAdd={(size, color) => {
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.images[0],
                          size,
                          color: color || product.colors?.[0]?.name || 'Default',
                          quantity: 1,
                        });
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProductDetailsModal
        product={selectedProduct}
        open={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
      />

      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
      />
      <Footer />
    </div>
  );
};