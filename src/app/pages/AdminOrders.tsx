import React from 'react';
import { OrderManagementTable } from '../components/OrderManagementTable';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export const AdminOrders: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">LUXE Admin</h1>
                <p className="text-sm text-gray-600">Order Management Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <OrderManagementTable />
      </main>
    </div>
  );
};
