import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client for auth verification
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

/**
 * Middleware to verify Supabase JWT and check for admin role
 */
const requireAdmin = async (c, next) => {
  const authHeader = c.req.header('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token) {
    console.log('No authorization token provided');
    return c.json({ error: 'Unauthorized - No token provided' }, 401);
  }

  try {
    // Verify the JWT token
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      console.log('Invalid token or user not found:', error);
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }

    // Check if user has admin role in metadata
    const isAdmin = user.user_metadata?.role === 'admin';
    
    if (!isAdmin) {
      console.log('User is not an admin:', user.id);
      return c.json({ error: 'Forbidden - Admin access required' }, 403);
    }

    // Store user in context for use in route handlers
    c.set('user', user);
    await next();
  } catch (error) {
    console.log('Auth verification error:', error);
    return c.json({ error: 'Unauthorized - Auth verification failed' }, 401);
  }
};

// Health check endpoint
app.get("/make-server-b379e40b/health", (c) => {
  return c.json({ status: "ok" });
});

// Get all products (public)
app.get("/make-server-b379e40b/products", async (c) => {
  try {
    const products = await kv.getByPrefix("product:");
    return c.json({ products: products || [] });
  } catch (error) {
    console.log("Error fetching products:", error);
    return c.json({ error: "Failed to fetch products", products: [] }, 500);
  }
});

// Seed products endpoint (public, for initial setup)
app.post("/make-server-b379e40b/products/seed", async (c) => {
  try {
    console.log("📦 Seed endpoint called - checking for existing products...");
    
    // Check if products already exist
    const existingProducts = await kv.getByPrefix("product:");
    if (existingProducts && existingProducts.length > 0) {
      console.log(`✅ Products already exist (${existingProducts.length} found), skipping seed`);
      return c.json({ success: true, message: "Products already seeded", count: existingProducts.length, products: existingProducts });
    }

    const products = await c.req.json();
    
    if (!Array.isArray(products)) {
      console.log("❌ Invalid request - expected array of products");
      return c.json({ error: "Expected array of products" }, 400);
    }

    console.log(`⏳ Seeding ${products.length} products to database...`);
    
    const savedProducts = [];
    for (const product of products) {
      const id = product.id || `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await kv.set(`product:${id}`, { ...product, id });
      savedProducts.push({ ...product, id });
    }

    console.log(`✅ Successfully seeded ${savedProducts.length} products to KV store!`);
    console.log(`📊 Sample product IDs: ${savedProducts.slice(0, 5).map(p => p.id).join(', ')}...`);
    
    return c.json({ success: true, products: savedProducts, count: savedProducts.length });
  } catch (error) {
    console.log("❌ Error seeding products:", error);
    return c.json({ error: "Failed to seed products" }, 500);
  }
});

// Get single product (public)
app.get("/make-server-b379e40b/products/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const product = await kv.get(`product:${id}`);
    if (!product) {
      return c.json({ error: "Product not found" }, 404);
    }
    return c.json({ product });
  } catch (error) {
    console.log("Error fetching product:", error);
    return c.json({ error: "Failed to fetch product" }, 500);
  }
});

// Create product (admin endpoint)
app.post("/make-server-b379e40b/products", requireAdmin, async (c) => {
  try {
    const product = await c.req.json();
    const id = product.id || `prod_${Date.now()}`;
    await kv.set(`product:${id}`, { ...product, id });
    return c.json({ success: true, product: { ...product, id } });
  } catch (error) {
    console.log("Error creating product:", error);
    return c.json({ error: "Failed to create product" }, 500);
  }
});

// Update product (admin endpoint)
app.put("/make-server-b379e40b/products/:id", requireAdmin, async (c) => {
  try {
    const id = c.req.param("id");
    const updates = await c.req.json();
    const existing = await kv.get(`product:${id}`);
    if (!existing) {
      return c.json({ error: "Product not found" }, 404);
    }
    const updated = { ...existing, ...updates, id };
    await kv.set(`product:${id}`, updated);
    return c.json({ success: true, product: updated });
  } catch (error) {
    console.log("Error updating product:", error);
    return c.json({ error: "Failed to update product" }, 500);
  }
});

// Delete product (admin endpoint)
app.delete("/make-server-b379e40b/products/:id", requireAdmin, async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`product:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log("Error deleting product:", error);
    return c.json({ error: "Failed to delete product" }, 500);
  }
});

// Save order
app.post("/make-server-b379e40b/orders", async (c) => {
  try {
    const order = await c.req.json();
    const id = order.id || `order_${Date.now()}`;
    await kv.set(`order:${id}`, { ...order, id, createdAt: new Date().toISOString() });
    return c.json({ success: true, order: { ...order, id } });
  } catch (error) {
    console.log("Error saving order:", error);
    return c.json({ error: "Failed to save order" }, 500);
  }
});

// Get all orders
app.get("/make-server-b379e40b/orders", async (c) => {
  try {
    const orders = await kv.getByPrefix("order:");
    return c.json({ orders: orders || [] });
  } catch (error) {
    console.log("Error fetching orders:", error);
    return c.json({ error: "Failed to fetch orders", orders: [] }, 500);
  }
});

// Auth endpoints

/**
 * Sign up endpoint - Creates a new user with customer role by default
 * Admin users must be created manually with admin role in metadata
 */
app.post("/make-server-b379e40b/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name,
        role: 'customer' // Default role for new users
      },
      email_confirm: true, // Auto-confirm since email server may not be configured
    });

    if (error) {
      console.log('Sign up error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      success: true,
      message: 'User created successfully. Please sign in.',
    });
  } catch (error) {
    console.log('Sign up error:', error);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

/**
 * Create admin user endpoint - Requires existing admin authentication
 * Use this to create additional admin users
 */
app.post("/make-server-b379e40b/auth/create-admin", requireAdmin, async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name,
        role: 'admin' // Admin role
      },
      email_confirm: true,
    });

    if (error) {
      console.log('Create admin error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      success: true,
      message: 'Admin user created successfully.',
      user: data.user,
    });
  } catch (error) {
    console.log('Create admin error:', error);
    return c.json({ error: 'Failed to create admin user' }, 500);
  }
});

Deno.serve(app.fetch);