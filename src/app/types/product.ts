export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'T-Shirts' | 'Dresses' | 'Outerwear' | 'Denim' | 'Accessories';
  gender: 'Men' | 'Women' | 'Unisex' | 'Kids';
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL')[];
  colors: {
    name: string;
    hex: string;
  }[];
  images: string[];
  stock: number;
  featured?: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered';
  createdAt: string;
}

export type SortOption = 'price-asc' | 'price-desc' | 'newest';

export interface FilterState {
  categories: string[];
  genders: string[];
  sizes: string[];
  sort: SortOption;
  search: string;
}
