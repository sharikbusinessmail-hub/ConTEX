import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminHeader } from '../components/AdminHeader';
import { OrderManagementTable } from '../components/OrderManagementTable';

export default function AdminOrders() {
  const { isAdmin } = useAuth();

  // Security Check: Block non-admins
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-xl text-red-500 font-semibold">Access Denied: Admin privileges required.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-gray-500 mt-1">View and manage customer orders.</p>
        </div>
        
        {/* We drop in your existing table component here! */}
        <div className="bg-white border rounded-lg shadow-sm p-4 md:p-6">
          <OrderManagementTable />
        </div>
      </div>
    </div>
  );
}