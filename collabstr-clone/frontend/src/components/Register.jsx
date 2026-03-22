import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import { Mail, Lock, Briefcase, Loader2, Star } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', role: 'BRAND' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/register', formData);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-10 pb-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg p-8 rounded-3xl glass-panel relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-pink-500"></div>
        <h2 className="text-3xl font-bold mb-2 text-center">Join Collabstr</h2>
        <p className="text-muted text-center mb-8">Create your account to start connecting</p>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center">
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <div className="flex gap-4 mb-2">
            <button
              type="button"
              onClick={() => setFormData({...formData, role: 'BRAND'})}
              className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 border transition-all ${formData.role === 'BRAND' ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-surface border-surface/50 text-muted hover:bg-surface/80'}`}
            >
              <Briefcase size={18} /> I'm a Brand
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, role: 'INFLUENCER'})}
              className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 border transition-all ${formData.role === 'INFLUENCER' ? 'bg-pink-500/20 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.2)]' : 'bg-surface border-surface/50 text-muted hover:bg-surface/80'}`}
            >
              <Star size={18} /> I'm a Creator
            </button>
          </div>

          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-white transition-colors" size={20} />
            <input 
              type="email" 
              placeholder="Email address"
              required
              className="w-full bg-surface border border-surface/50 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-secondary transition-colors focus:ring-1 focus:ring-secondary"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-white transition-colors" size={20} />
            <input 
              type="password" 
              placeholder="Create a password"
              required
              minLength={6}
              className="w-full bg-surface border border-surface/50 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-secondary transition-colors focus:ring-1 focus:ring-secondary"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-secondary to-pink-500 text-white font-bold flex justify-center items-center shadow-[0_0_20px_rgba(236,72,153,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : 'Create Account'}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-muted text-sm">
          Already have an account? <Link to="/login" className="text-secondary hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
