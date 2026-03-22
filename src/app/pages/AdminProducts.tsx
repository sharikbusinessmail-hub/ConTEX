import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Package, Upload, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../hooks/useProducts';
import { Product } from '../types/product';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { AdminHeader } from '../components/AdminHeader';
// NOTE: Make sure this path points to your actual Supabase client file!
import { supabase } from '../utils/supabase'; 

export default function AdminProducts() {
  const { getAccessToken, isAdmin } = useAuth();
  const token = getAccessToken() || '';
  
  // Data Hooks
  const { data: products, isLoading } = useProducts();
  const createProduct = useCreateProduct(token);
  const updateProduct = useUpdateProduct(token);
  const deleteProduct = useDeleteProduct(token);

  // Local State
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    gender: 'Unisex',
    image: '',
    colors: [],
    sizes: [],
  });

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-xl text-red-500 font-semibold">Access Denied: Admin privileges required.</p>
      </div>
    );
  }

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData(product);
    } else {
      setEditingId(null);
      setFormData({ name: '', description: '', price: 0, category: '', gender: 'Unisex', image: '', colors: [], sizes: [] });
    }
    setIsModalOpen(true);
  };

  // NEW: Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      
      setIsUploading(true);
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL to save in the database
      const { data } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      // Update the form data with the new live URL
      setFormData({ ...formData, image: data.publicUrl });
    } catch (error) {
      console.error('Error uploading image: ', error);
      alert('Error uploading image. Make sure your Supabase bucket is named "products" and is set to Public.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateProduct.mutateAsync({ id: editingId, updates: formData });
      } else {
        await createProduct.mutateAsync(formData as Omit<Product, 'id'>);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct.mutateAsync(id);
    }
  };

  const filteredProducts = products?.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl flex-grow">
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-gray-500 mt-1">Manage your store's inventory and catalog.</p>
          </div>
          <Button onClick={() => handleOpenModal()} className="bg-black text-white hover:bg-gray-800">
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center space-x-2 mb-6 bg-white p-4 rounded-lg border shadow-sm">
          <Search className="w-5 h-5 text-gray-400" />
          <Input 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none shadow-none focus-visible:ring-0"
          />
        </div>

        {/* Data Table */}
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {isLoading ? (
                  <tr><td colSpan={4} className="text-center py-8 text-gray-500">Loading products...</td></tr>
                ) : filteredProducts?.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-gray-500">
                      <Package className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      No products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts?.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded bg-gray-100 flex-shrink-0 overflow-hidden border">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-6 h-6 m-auto text-gray-400 mt-3" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.gender}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                          {product.category}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-medium">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenModal(product)}>
                            <Pencil className="w-4 h-4 text-blue-600" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input 
                  value={formData.name || ''} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  placeholder="Classic T-Shirt" 
                />
              </div>
              <div className="grid gap-2">
                <Label>Price ($)</Label>
                <Input 
                  type="number" 
                  value={formData.price || ''} 
                  onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Input 
                    value={formData.category || ''} 
                    onChange={(e) => setFormData({...formData, category: e.target.value})} 
                    placeholder="e.g., T-Shirts" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Gender</Label>
                  <select 
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.gender || 'Unisex'}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>
              
              {/* NEW: File Upload UI */}
              <div className="grid gap-2">
                <Label>Product Image</Label>
                <div className="flex items-center gap-4">
                  {formData.image ? (
                    <div className="relative w-16 h-16 rounded border overflow-hidden">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded border bg-gray-50 flex items-center justify-center">
                      <Upload className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <Input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="cursor-pointer"
                    />
                    {isUploading && <p className="text-xs text-blue-500 mt-1 flex items-center"><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Uploading...</p>}
                  </div>
                </div>
              </div>
              
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={isUploading} className="bg-black text-white hover:bg-gray-800">
                {editingId ? 'Save Changes' : 'Create Product'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}