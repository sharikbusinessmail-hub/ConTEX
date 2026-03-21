import { projectId, publicAnonKey } from '/utils/supabase/info';
import { Product, Order } from '../types/product';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-b379e40b`;

const getHeaders = (accessToken?: string | null) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${accessToken || publicAnonKey}`,
});

export const api = {
  // Auth
  async signUp(email: string, password: string, name: string) {
    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();
      return data;
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
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating admin user:', error);
      return { error: 'Failed to create admin user' };
    }
  },

  // Products
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${BASE_URL}/products`, { headers: getHeaders() });
      const data = await response.json();
      return data.products || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  async seedProducts(products: Partial<Product>[]): Promise<Product[]> {
    try {
      const response = await fetch(`${BASE_URL}/products/seed`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(products),
      });
      const data = await response.json();
      return data.products || [];
    } catch (error) {
      console.error('Error seeding products:', error);
      return [];
    }
  },

  async getProduct(id: string): Promise<Product | null> {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`, { headers: getHeaders() });
      const data = await response.json();
      return data.product || null;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  async createProduct(product: Partial<Product>, accessToken?: string): Promise<Product | null> {
    try {
      const response = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: getHeaders(accessToken),
        body: JSON.stringify(product),
      });
      const data = await response.json();
      return data.product || null;
    } catch (error) {
      console.error('Error creating product:', error);
      return null;
    }
  },

  async updateProduct(id: string, updates: Partial<Product>, accessToken: string): Promise<Product | null> {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: getHeaders(accessToken),
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      return data.product || null;
    } catch (error) {
      console.error('Error updating product:', error);
      return null;
    }
  },

  async deleteProduct(id: string, accessToken: string): Promise<boolean> {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: getHeaders(accessToken),
      });
      const data = await response.json();
      return data.success || false;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  },

  // Orders
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