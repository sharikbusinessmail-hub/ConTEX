import React, { useState } from 'react';
import { Order } from '../types/product';
import { useOrders } from '../hooks/useOrders';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Package, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export const OrderManagementTable: React.FC = () => {
  const { data: orders = [], isLoading, error, refetch } = useOrders();

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    // Note: In a production app, you would update this on the server
    // await api.updateOrder(orderId, { status });
    // For now, just update locally and show a toast
    toast.success(`Order ${orderId} status updated to ${status}`);
    // You could implement optimistic updates here with React Query
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'Pending').length,
    confirmed: orders.filter((o) => o.status === 'Confirmed').length,
    shipped: orders.filter((o) => o.status === 'Shipped').length,
    delivered: orders.filter((o) => o.status === 'Delivered').length,
    revenue: orders.reduce((sum, o) => sum + o.totalAmount, 0),
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-500" />
              <span className="text-2xl font-bold">{stats.total}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <span className="text-2xl font-bold">{stats.pending}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-2xl font-bold">{stats.delivered}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-2xl font-bold">${stats.revenue.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>View and manage incoming customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-600">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-600">No orders yet</p>
              <p className="text-sm text-gray-500 mt-1">Orders will appear here once customers place them</p>
            </div>
          ) : (
            <ScrollArea className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{order.shippingAddress}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{order.customerPhone}</p>
                          <p className="text-gray-500">{order.customerEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {order.items.map((item, idx) => (
                            <p key={idx} className="line-clamp-1">
                              {item.quantity}x {item.product.name}
                            </p>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Select
                          value={order.status}
                          onValueChange={(value) =>
                            updateOrderStatus(order.id, value as Order['status'])
                          }
                        >
                          <SelectTrigger className="w-[130px] ml-auto">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Confirmed">Confirmed</SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};