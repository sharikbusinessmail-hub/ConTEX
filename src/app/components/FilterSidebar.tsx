import React from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { FilterState, SortOption } from '../types/product';
import { usePreference } from '../context/PreferenceContext';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  const { t } = usePreference();
  const genders = ['Men', 'Women', 'Unisex', 'Kids'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleGenderToggle = (gender: string) => {
    const updated = filters.genders.includes(gender)
      ? filters.genders.filter((g) => g !== gender)
      : [...filters.genders, gender];
    onFilterChange({ ...filters, genders: updated });
  };

  const handleSizeToggle = (size: string) => {
    const updated = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: updated });
  };

  const handleSortChange = (sort: SortOption) => {
    onFilterChange({ ...filters, sort });
  };

  const clearFilters = () => {
    onFilterChange({
      categories: [],
      genders: [],
      sizes: [],
      sort: 'newest',
      search: filters.search,
    });
  };

  const activeFilterCount =
    filters.genders.length + filters.sizes.length;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Sort */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Sort By</Label>
        <Select value={filters.sort} onValueChange={handleSortChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Gender */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">{t('filter.gender')}</Label>
        <div className="space-y-2">
          {genders.map((gender) => (
            <div key={gender} className="flex items-center space-x-2">
              <Checkbox
                id={`gender-${gender}`}
                checked={filters.genders.includes(gender)}
                onCheckedChange={() => handleGenderToggle(gender)}
              />
              <Label
                htmlFor={`gender-${gender}`}
                className="text-sm font-normal cursor-pointer"
              >
                {gender}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">{t('filter.size')}</Label>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <Button
              key={size}
              variant={filters.sizes.includes(size) ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSizeToggle(size)}
              className="w-12"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          <X className="mr-2 h-4 w-4" />
          {t('filter.clear-all')} ({activeFilterCount})
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r bg-white h-[calc(100vh-73px)] sticky top-[73px]">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">{t('filter.title')}</h2>
          <ScrollArea className="h-[calc(100vh-150px)]">
            <FilterContent />
          </ScrollArea>
        </div>
      </aside>

      {/* Mobile Filter Button & Sheet */}
      <div className="lg:hidden w-full">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              {t('filter.title')}
              {activeFilterCount > 0 && (
                <span className="ml-2 rounded-full bg-black text-white px-2 py-0.5 text-xs">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>{t('filter.title')}</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-80px)] mt-6">
              <div className="pr-4">
                <FilterContent />
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};