import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, User as UserIcon, MessageSquare, LayoutDashboard } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/login');
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!token) return null;

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 mt-8">
      
      {/* Sidebar */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-64 glass-panel rounded-2xl p-6 flex flex-col gap-4 border border-surface h-fit"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg">
            <UserIcon className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">My Account</h3>
            <span className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span> Online
            </span>
          </div>
        </div>
        
        <hr className="border-surface mb-2" />
        
        <button className="flex items-center gap-3 text-white bg-surface p-3 rounded-xl transition-colors">
          <LayoutDashboard size={20} className="text-primary"/> Overview
        </button>
        <button className="flex items-center gap-3 text-muted hover:text-white hover:bg-surface/50 p-3 rounded-xl transition-colors">
          <UserIcon size={20} className="text-secondary"/> Edit Profile
        </button>
        <button className="flex items-center gap-3 text-muted hover:text-white hover:bg-surface/50 p-3 rounded-xl transition-colors">
          <MessageSquare size={20} className="text-pink-500"/> Messages
        </button>
        
        <div className="mt-auto pt-8">
          <hr className="border-surface mb-4" />
          <button onClick={handleLogout} className="flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 p-3 rounded-xl transition-colors w-full">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 flex flex-col gap-6"
      >
        <div className="glass-panel rounded-2xl p-8 border border-surface relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <h1 className="text-3xl font-bold mb-2">Welcome Dashboard</h1>
          <p className="text-muted max-w-2xl text-lg">
            You successfully logged in! Your JWT token is securely stored and this page is fully protected. In a production app, this area displays collaborative opportunities, analytics, and unread messages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-2xl p-6 border border-surface hover:border-primary/50 transition-colors cursor-pointer group">
            <h3 className="text-xl font-bold mb-2 flex items-center justify-between">
              Find Creators <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </h3>
            <p className="text-muted">Browse through our directory of verified influencers matching your specific niche.</p>
          </div>
          <div className="glass-panel rounded-2xl p-6 border border-surface hover:border-secondary/50 transition-colors cursor-pointer group">
            <h3 className="text-xl font-bold mb-2 flex items-center justify-between">
              Active Deals <span className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </h3>
            <p className="text-muted">View your current negotiations, signed contracts, and payment statuses.</p>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
