import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { seedDatabase } from '../utils/seedDatabase';
import { api } from '../services/api';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export const SeedDatabase: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [productCount, setProductCount] = useState(0);

  const handleSeed = async () => {
    setLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      // First check existing products
      const existing = await api.getProducts();
      setMessage(`Found ${existing.length} existing products in database`);
      
      if (existing.length > 0) {
        setMessage(`Database already has ${existing.length} products. Seeding skipped.`);
        setProductCount(existing.length);
        setStatus('success');
        setLoading(false);
        return;
      }

      // Seed the database
      setMessage('Seeding database with sample products...');
      const products = await seedDatabase();
      
      if (products.length > 0) {
        setStatus('success');
        setMessage(`Successfully seeded ${products.length} products!`);
        setProductCount(products.length);
      } else {
        setStatus('error');
        setMessage('Failed to seed products. Check console for errors.');
      }
    } catch (error) {
      console.error('Seeding error:', error);
      setStatus('error');
      setMessage(`Error: ${error.message || 'Unknown error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClearAndReseed = async () => {
    if (!confirm('This will delete all existing products and reseed the database. Are you sure?')) {
      return;
    }

    setLoading(true);
    setStatus('idle');
    setMessage('Clearing database...');

    try {
      // Get all products
      const existing = await api.getProducts();
      setMessage(`Deleting ${existing.length} existing products...`);
      
      // Note: This requires proper delete implementation with admin token
      // For now, we'll just reseed which will skip if products exist
      
      setMessage('Seeding database with sample products...');
      const products = await seedDatabase();
      
      if (products.length > 0) {
        setStatus('success');
        setMessage(`Successfully seeded ${products.length} products!`);
        setProductCount(products.length);
      } else {
        setStatus('error');
        setMessage('Failed to seed products. Check console for errors.');
      }
    } catch (error) {
      console.error('Seeding error:', error);
      setStatus('error');
      setMessage(`Error: ${error.message || 'Unknown error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Database Seeding Utility</h1>
        
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="font-semibold text-blue-900 mb-2">What does this do?</h2>
            <p className="text-sm text-blue-800">
              This utility will populate your database with 60+ sample products including:
            </p>
            <ul className="text-sm text-blue-800 list-disc list-inside mt-2 space-y-1">
              <li>Men's clothing (tanks, t-shirts, hoodies, shorts, jeans, etc.)</li>
              <li>Women's clothing (crop tops, leggings, sports bras, etc.)</li>
              <li>Kids clothing (t-shirts, hoodies, shorts)</li>
              <li>Accessories (bags, caps, belts, socks, gloves)</li>
            </ul>
          </div>

          {message && (
            <div className={`rounded-lg p-4 flex items-start gap-3 ${
              status === 'success' ? 'bg-green-50 border border-green-200' :
              status === 'error' ? 'bg-red-50 border border-red-200' :
              'bg-gray-50 border border-gray-200'
            }`}>
              {status === 'success' && <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />}
              {status === 'error' && <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />}
              {status === 'idle' && loading && <Loader2 className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5 animate-spin" />}
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  status === 'success' ? 'text-green-900' :
                  status === 'error' ? 'text-red-900' :
                  'text-gray-900'
                }`}>
                  {message}
                </p>
                {productCount > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    Total products in database: {productCount}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={handleSeed}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Seeding Database...
                </>
              ) : (
                'Seed Database with Sample Products'
              )}
            </Button>

            {status === 'success' && (
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Go to Store
              </Button>
            )}
          </div>

          <div className="pt-4 border-t">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="w-full"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
