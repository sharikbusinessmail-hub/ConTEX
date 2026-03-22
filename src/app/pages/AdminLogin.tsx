import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

export default function AdminLogin() {
  const { signIn, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    // Call the signIn method from your AuthContext
    const { error } = await signIn(email, password);
    
    if (error) {
      setErrorMsg(error.message);
    } else {
      console.log('Logged in successfully!');
      // Send them straight to the products dashboard after logging in
      navigate('/admin/products');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white border rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        
        {errorMsg && <p className="text-red-500 mb-4 text-sm text-center bg-red-50 p-2 rounded">{errorMsg}</p>}
        {isAdmin && <p className="text-green-500 mb-4 text-sm text-center bg-green-50 p-2 rounded">You are already logged in as an Admin!</p>}
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <input 
              type="email" 
              placeholder="admin@yourstore.com" 
              className="w-full border p-2 rounded focus:ring-2 focus:ring-black outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full border p-2 rounded focus:ring-2 focus:ring-black outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition-colors mt-2">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}