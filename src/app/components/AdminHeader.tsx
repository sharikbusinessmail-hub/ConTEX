import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Package, ShoppingCart, Store, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';

export const AdminHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
  ];

  return (
    <header className="bg-black text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Side: Brand & Links */}
        <div className="flex items-center gap-8">
          <Link to="/admin/products" className="flex items-center gap-2 font-bold text-lg tracking-wider">
            <Store className="w-5 h-5 text-gray-400" />
            ConTEX <span className="text-gray-400 font-normal">Admin</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname.includes(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-white/10 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10 text-sm hidden md:flex">
              View Storefront
            </Button>
          </Link>
          <div className="w-px h-6 bg-gray-800 hidden md:block"></div>
          <Button 
            variant="ghost" 
            onClick={handleSignOut}
            className="text-gray-400 hover:text-red-400 hover:bg-red-400/10 text-sm flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Sign Out</span>
          </Button>
        </div>
      </div>
    </header>
  );
};