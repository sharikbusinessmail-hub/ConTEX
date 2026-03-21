import { useEffect, useState } from 'react';
import { seedDatabase } from '../utils/seedDatabase';
import { api } from '../services/api';

/**
 * This component automatically seeds the database with sample products
 * on first load if the database is empty.
 */
export const DatabaseInitializer = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeDatabase = async () => {
      if (initialized) return;

      try {
        console.log('🔍 Checking database for products...');
        const products = await api.getProducts();

        if (products.length === 0) {
          console.log('📦 Database is empty. Starting automatic seeding...');
          console.log('⏳ Seeding 48+ sample products (this may take a moment)...');
          
          const seededProducts = await seedDatabase();
          
          if (seededProducts.length > 0) {
            console.log(`✅ Successfully seeded ${seededProducts.length} products to database!`);
            console.log('🎉 Your store is now ready with sample products!');
          } else {
            console.error('❌ Failed to seed products. Check server logs.');
          }
        } else {
          console.log(`✅ Database already contains ${products.length} products.`);
        }
        
        setInitialized(true);
      } catch (error) {
        console.error('❌ Error initializing database:', error);
        setInitialized(true);
      }
    };

    initializeDatabase();
  }, [initialized]);

  // This component doesn't render anything
  return null;
};
