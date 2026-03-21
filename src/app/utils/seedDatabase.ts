import { api } from '../services/api';
import { mockProducts } from '../data/products';

export async function seedDatabase() {
  try {
    console.log('📦 Starting database seeding process...');
    console.log(`📊 Total products to seed: ${mockProducts.length}`);
    
    // Check if products already exist
    const existingProducts = await api.getProducts();
    
    if (existingProducts.length > 0) {
      console.log(`✅ Database already contains ${existingProducts.length} products - skipping seed`);
      return existingProducts;
    }

    console.log('⏳ Uploading products to database...');
    
    // Seed with mock products using bulk seed endpoint
    const seededProducts = await api.seedProducts(mockProducts);
    
    if (seededProducts.length > 0) {
      console.log(`✅ Successfully seeded ${seededProducts.length} products to Supabase database!`);
      console.log('📋 Product categories seeded:');
      
      // Log categories breakdown
      const categories = mockProducts.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      Object.entries(categories).forEach(([cat, count]) => {
        console.log(`   - ${cat}: ${count} products`);
      });
    } else {
      console.error('❌ Seeding failed - no products were created');
    }
    
    return seededProducts;
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return [];
  }
}