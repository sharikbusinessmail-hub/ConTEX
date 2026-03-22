import React, { useState, useRef } from 'react';
import { Plus, Pencil, Trash2, Search, Package, Upload, Loader2, X, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../hooks/useProducts';
import { Product } from '../types/product';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { AdminHeader } from '../components/AdminHeader';
// --- ENSURE THIS PATH IS CORRECT FOR YOUR PROJECT ---
import { supabase } from '../utils/supabase/client'; 

export default function AdminProducts() {
  const { isAdmin } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Data Hooks
  const { data: products, isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  // Local State
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Input state for tags
  const [colorInput, setColorInput] = useState('');
  const [sizeInput, setSizeInput] = useState('');

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
    stock: 100 // Default stock number
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
      setFormData({ name: '', description: '', price: 0, category: '', gender: 'Unisex', image: '', colors: [], sizes: [], stock: 100 });
    }
    setIsModalOpen(true);
  };

  // --- 1. NEW IMAGE UPLOAD HANDLER ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      
      setIsUploading(true);
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage bucket named 'products'
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

  // --- 2. NEW FILTER TAG HANDLERS (Colors & Sizes) ---
  const addTag = (type: 'colors' | 'sizes', value: string) => {
    if (!value.trim()) return;
    const currentTags = formData[type] || [];
    if (!currentTags.includes(value.trim())) {
      setFormData({ ...formData, [type]: [...currentTags, value.trim()] });
    }
    // Clear inputs
    if (type === 'colors') setColorInput('');
    if (type === 'sizes') setSizeInput('');
  };

  const removeTag = (type: 'colors' | 'sizes', value: string) => {
    const currentTags = formData[type] || [];
    setFormData({ ...formData, [type]: currentTags.filter(tag => tag !== value) });
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, type: 'colors' | 'sizes') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = type === 'colors' ? colorInput : sizeInput;
      addTag(type, value);
    }
  };

  const handleSave = async () => {
    try {
      // Validate mandatory fields
      if (!formData.name || !formData.category || !formData.gender || !formData.image) {
        alert("Please fill in all mandatory fields (Name, Category, Gender, and Image)");
        return;
      }

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
            <h1 className="text-3xl font-bold tracking-tight">Products Catalog</h1>
            <p className="text-gray-500 mt-1">Manage inventory, colors, sizes, and pricing.</p>
          </div>
          <Button onClick={() => handleOpenModal()} className="bg-black text-white hover:bg-gray-800">
            <Plus className="w-4 h-4 mr-2" /> Add New Product
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
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {isLoading ? (
                  <tr><td colSpan={5} className="text-center py-8 text-gray-500">Loading products...</td></tr>
                ) : filteredProducts?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-gray-500">
                      <Package className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      No products found. Add your first product!
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
                      <td className="px-6 py-4">
                        {product.stock && product.stock > 10 ? (
                           <span className="text-green-600 font-medium">{product.stock} in stock</span>
                        ) : product.stock && product.stock > 0 ? (
                            <span className="text-orange-600 font-medium">Limited stock ({product.stock})</span>
                        ) : (
                            <span className="text-red-600 font-medium">Out of stock</span>
                        )}
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

        {/* Complete Upgraded Add/Edit Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{editingId ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4 grid-cols-1 md:grid-cols-2">
              
              {/* Mandatory Left Column */}
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>Name *</Label>
                  <Input 
                    value={formData.name || ''} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    placeholder="e.g., Performance Crew T-Shirt" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Price ($) *</Label>
                    <Input 
                      type="number" 
                      value={formData.price || ''} 
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})} 
                      placeholder="39.99"
                    />
                  </div>
                  {/* --- 3. NEW STOCK/INVENTORY FIELD --- */}
                  <div className="grid gap-2">
                    <Label>Inventory (Stock)</Label>
                    <Input 
                      type="number" 
                      value={formData.stock || 0} 
                      onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value, 10)})} 
                      placeholder="100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Category *</Label>
                    <Input 
                      value={formData.category || ''} 
                      onChange={(e) => setFormData({...formData, category: e.target.value})} 
                      placeholder="e.g., T-Shirts" 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Gender *</Label>
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
                
                {/* --- 4. THE FILE UPLOADER (Fixing previous issue) --- */}
                <div className="grid gap-2 pt-2 border-t">
                  <Label>Product Image *</Label>
                  <div className="flex items-center gap-4 mt-1">
                    {formData.image ? (
                      <div className="relative w-24 h-24 rounded border overflow-hidden shrink-0">
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded border bg-gray-50 flex items-center justify-center shrink-0">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <Input 
                        type="file" 
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        className="hidden" // Hide the standard ugly input
                      />
                      <Button 
                        type="button"
                        variant="outline" 
                        className="w-full flex items-center gap-2"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                      >
                        {isUploading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Upload className="w-4 h-4" />}
                        {formData.image ? 'Change Image' : 'Choose Image'}
                      </Button>
                      {isUploading && <p className="text-xs text-blue-500 flex items-center"><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Uploading to Supabase...</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced/Variants Right Column */}
              <div className="space-y-4 md:border-l md:pl-6">
                <div className="grid gap-2">
                  <Label>Description</Label>
                  <textarea 
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-1 focus-visible:ring-black"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe the product material, fit, etc."
                  />
                </div>

                {/* --- 5. NEW COLOR TAGGING (Fixing filter issue) --- */}
                <div className="grid gap-2 pt-2 border-t">
                  <Label>Available Colors (Filters)</Label>
                  <div className="flex flex-wrap gap-2 mb-2 p-2 border rounded min-h-[40px] bg-gray-50">
                    {(formData.colors || []).map(color => (
                      <Badge key={color} variant="secondary" className="gap-1 bg-white text-gray-700">
                        {color.startsWith('#') && (
                          <div style={{backgroundColor: color}} className="w-3 h-3 rounded-full border border-gray-200" />
                        )}
                        {color}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag('colors', color)} />
                      </Badge>
                    ))}
                    {(formData.colors || []).length === 0 && <span className="text-xs text-gray-400 p-1">No colors added</span>}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      placeholder="Add Color or Hex (#000000)"
                      onKeyDown={(e) => handleTagKeyDown(e, 'colors')}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => addTag('colors', colorInput)}><Tag className="w-4 h-4"/></Button>
                  </div>
                </div>

                {/* --- 6. NEW SIZE TAGGING (Fixing filter issue) --- */}
                <div className="grid gap-2 pt-2 border-t">
                  <Label>Available Sizes (Filters)</Label>
                  <div className="flex flex-wrap gap-2 mb-2 p-2 border rounded min-h-[40px] bg-gray-50">
                    {(formData.sizes || []).map(size => (
                      <Badge key={size} variant="secondary" className="gap-1 bg-white text-gray-700">
                        {size}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag('sizes', size)} />
                      </Badge>
                    ))}
                    {(formData.sizes || []).length === 0 && <span className="text-xs text-gray-400 p-1">No sizes added</span>}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      value={sizeInput}
                      onChange={(e) => setSizeInput(e.target.value)}
                      placeholder="Add Size (S, M, L...)"
                      onKeyDown={(e) => handleTagKeyDown(e, 'sizes')}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => addTag('sizes', sizeInput)}><Tag className="w-4 h-4"/></Button>
                  </div>
                </div>
              </div>

            </div>
            <DialogFooter className="mt-6 border-t pt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={isUploading} className="bg-black text-white hover:bg-gray-800">
                {isUploading ? 'Uploading...' : editingId ? 'Save Changes' : 'Create Product'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}