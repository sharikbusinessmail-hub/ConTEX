import { projectId, publicAnonKey } from '/utils/supabase/info';
import { Product, Order } from '../types/product';
import { createClient } from '@supabase/supabase-js';

// 1. Create a direct Supabase client for the new database
const supabaseUrl = `https://${projectId}.supabase.co`;
const supabase = createClient(supabaseUrl, publicAnonKey);

const BASE_URL = `${supabaseUrl}/functions/v1/make-server-b379e40b`;

const getHeaders = (accessToken?: string | null) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${accessToken || publicAnonKey}`,
});

export const api = {
  // ==========================================
  // AUTH (Unchanged - Keeps your logins working)
  // ==========================================
  async signUp(email: string, password: string, name: string) {
    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password, name }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error signing up:', error);
      return { error: 'Failed to sign up' };
    }
  },

  async createAdminUser(email: string, password: string, name: string, accessToken: string) {
    try {
      const response = await fetch(`${BASE_URL}/auth/create-admin`, {
        method: 'POST',
        headers: getHeaders(accessToken),
        body: JSON.stringify({ email, password, name }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating admin user:', error);
      return { error: 'Failed to create admin user' };
    }
  },

  // ==========================================
  // PRODUCTS (NEW! Pointed to relational table)
  // ==========================================
// ==========================================
  // PRODUCTS (Pointed to relational table with Safety Check)
  // ==========================================

  // HELPER: This prevents the "reading '0'" crash by ensuring arrays always exist
  sanitizeProduct(product: any): Product {
    return {
      ...product,
      colors: Array.isArray(product.colors) ? product.colors : [],
      sizes: Array.isArray(product.sizes) ? product.sizes : [],
      // If your old code used an 'images' array instead of a single 'image' string, uncomment the line below:
      // images: Array.isArray(product.images) ? product.images : [], 
    };
  },

  async getProducts(): Promise<Product[]> {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      
      // Run the data through our sanitizer before sending to the UI
      return (data || []).map(this.sanitizeProduct);
    } catch (error) {
      console.error('Error fetching products from new table:', error);
      return [];
    }
  },

  async seedProducts(products: Partial<Product>[]): Promise<Product[]> {
    try {
      const { data, error } = await supabase.from('products').insert(products).select();
      if (error) throw error;
      return (data || []).map(this.sanitizeProduct);
    } catch (error) {
      console.error('Error seeding to new table:', error);
      return [];
    }
  },

  async getProduct(id: string): Promise<Product | null> {
    try {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (error) throw error;
      return data ? this.sanitizeProduct(data) : null;
    } catch (error) {
      console.error('Error fetching single product:', error);
      return null;
    }
  },
  async createProduct(product: Partial<Product>, accessToken?: string): Promise<Product | null> {
    try {
      const { data, error } = await supabase.from('products').insert([product]).select().single();
      if (error) throw error;
      return data || null;
    } catch (error) {
      console.error('Error creating product:', error);
      return null;
    }
  },

  async updateProduct(id: string, updates: Partial<Product>, accessToken: string): Promise<Product | null> {
    try {
      const { data, error } = await supabase.from('products').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data || null;
    } catch (error) {
      console.error('Error updating product:', error);
      return null;
    }
  },

  async deleteProduct(id: string, accessToken: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  },

  // ==========================================
  // ORDERS (Unchanged - Keeps checkout working)
  // ==========================================
  async saveOrder(order: Partial<Order>): Promise<Order | null> {
    try {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(order),
      });
      const data = await response.json();
      return data.order || null;
    } catch (error) {
      console.error('Error saving order:', error);
      return null;
    }
  },

  async getOrders(): Promise<Order[]> {
    try {
      const response = await fetch(`${BASE_URL}/orders`, { headers: getHeaders() });
      const data = await response.json();
      return data.orders || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },
};