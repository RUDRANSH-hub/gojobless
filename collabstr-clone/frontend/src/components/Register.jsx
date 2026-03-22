import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import { Mail, Lock, Briefcase, Loader2, Star, User, Link as LinkIcon, DollarSign, Insignt, Users, Youtube } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState('BRAND');
  
  // Create state to handle both DTOs
  const [formData, setFormData] = useState({ 
    email: '', password: '', 
    // Brand fields
    companyName: '', description: '', websiteUrl: '',
    // Shared
    niche: '',
    // Influencer fields
    name: '', bio: '', youtubeChannelHandle: '', instagramFollowers: '', platform: '', hourlyRate: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      let endpoint = '';
      let payload = {};
      
      if (role === 'BRAND') {
        endpoint = '/auth/register/brand';
        payload = {
          email: formData.email,
          password: formData.password,
          companyName: formData.companyName,
          niche: formData.niche,
          description: formData.description,
          websiteUrl: formData.websiteUrl
        };
      } else {
        endpoint = '/auth/register/influencer';
        payload = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          bio: formData.bio,
          niche: formData.niche,
          youtubeChannelHandle: formData.youtubeChannelHandle,
          instagramFollowers: parseInt(formData.instagramFollowers) || 0,
          platform: formData.platform,
          hourlyRate: parseFloat(formData.hourlyRate) || 0
        };
      }

      const response = await api.post(endpoint, payload);
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

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-6 pb-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl p-8 rounded-3xl glass-panel relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-pink-500"></div>
        <h2 className="text-3xl font-bold mb-2 text-center">Join Collabstr</h2>
        <p className="text-muted text-center mb-6">Create your account to start connecting</p>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center">
            {error}
          </motion.div>
        )}

        <div className="flex gap-4 mb-6">
          <button
            type="button"
            onClick={() => setRole('BRAND')}
            className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 border transition-all ${role === 'BRAND' ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-surface border-surface/50 text-muted hover:bg-surface/80'}`}
          >
            <Briefcase size={18} /> I'm a Brand
          </button>
          <button
            type="button"
            onClick={() => setRole('INFLUENCER')}
            className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 border transition-all ${role === 'INFLUENCER' ? 'bg-pink-500/20 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.2)]' : 'bg-surface border-surface/50 text-muted hover:bg-surface/80'}`}
          >
            <Star size={18} /> I'm a Creator
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="relative group col-span-2 md:col-span-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-white transition-colors" size={20} />
              <input type="email" name="email" placeholder="Email address" required
                className="w-full bg-surface border border-surface/50 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-secondary transition-colors"
                value={formData.email} onChange={handleChange} />
            </div>
            
            <div className="relative group col-span-2 md:col-span-1">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-white transition-colors" size={20} />
              <input type="password" name="password" placeholder="Create a password" required minLength={6}
                className="w-full bg-surface border border-surface/50 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-secondary transition-colors"
                value={formData.password} onChange={handleChange} />
            </div>
          </div>

          <hr className="border-surface my-2" />

          {role === 'BRAND' && (
            <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="flex flex-col gap-4">
              <div className="relative group">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
                <input type="text" name="companyName" placeholder="Company Name (e.g. Nike)" required
                  className="w-full bg-surface border border-surface/50 rounded-xl py-3 pl-12 pr-4 text-white focus:border-primary"
                  value={formData.companyName} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative group col-span-2 md:col-span-1">
                  <Star className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
                  <input type="text" name="niche" placeholder="Niche (e.g. Fitness)" required
                    className="w-full bg-surface border border-surface/50 rounded-xl py-3 pl-12 pr-4 text-white focus:border-primary"
                    value={formData.niche} onChange={handleChange} />
                </div>
                <div className="relative group col-span-2 md:col-span-1">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
                  <input type="url" name="websiteUrl" placeholder="Website URL" required
                    className="w-full bg-surface border border-surface/50 rounded-xl py-3 pl-12 pr-4 text-white focus:border-primary"
                    value={formData.websiteUrl} onChange={handleChange} />
                </div>
              </div>
              <textarea name="description" placeholder="Describe your brand and the campaigns you want to run..." required rows={3}
                className="w-full bg-surface border border-surface/50 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                value={formData.description} onChange={handleChange}></textarea>
            </motion.div>
          )}

          {role === 'INFLUENCER' && (
            <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative group col-span-2 md:col-span-1">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
                  <input type="text" name="name" placeholder="Full Name" required
                    className="w-full bg-surface border border-surface/50 rounded-xl py-3 pl-12 pr-4 text-white focus:border-pink-500"
                    value={formData.name} onChange={handleChange} />
                </div>
                <div className="relative group col-span-2 md:col-span-1">
                  <Star className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
                  <input type="text" name="niche" placeholder="Niche (e.g. Tech, Beauty)" required
                    className="w-full bg-surface border border-surface/50 rounded-xl py-3 pl-12 pr-4 text-white focus:border-pink-500"
                    value={formData.niche} onChange={handleChange} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative group col-span-2 md:col-span-1">
                  <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
                  <input type="text" name="youtubeChannelHandle" placeholder="YouTube Handle"
                    className="w-full bg-surface border border-surface/50 rounded-xl py-3 pl-12 pr-4 text-white focus:border-pink-500"
                    value={formData.youtubeChannelHandle} onChange={handleChange} />
                </div>
                <div className="relative group col-span-2 md:col-span-1">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
                  <input type="number" name="instagramFollowers" placeholder="IG Followers"
                    className="w-full bg-surface border border-surface/50 rounded-xl py-3 pl-12 pr-4 text-white focus:border-pink-500"
                    value={formData.instagramFollowers} onChange={handleChange} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative group col-span-2 md:col-span-1">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
                  <input type="text" name="platform" placeholder="Main Platform (e.g. TikTok)" required
                    className="w-full bg-surface border border-surface/50 rounded-xl py-3 pl-12 pr-4 text-white focus:border-pink-500"
                    value={formData.platform} onChange={handleChange} />
                </div>
                <div className="relative group col-span-2 md:col-span-1">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
                  <input type="number" name="hourlyRate" placeholder="Hourly Rate ($)" required
                    className="w-full bg-surface border border-surface/50 rounded-xl py-3 pl-12 pr-4 text-white focus:border-pink-500"
                    value={formData.hourlyRate} onChange={handleChange} />
                </div>
              </div>

              <textarea name="bio" placeholder="Write a short, engaging bio about the content you make..." required rows={2}
                className="w-full bg-surface border border-surface/50 rounded-xl p-4 text-white focus:outline-none focus:border-pink-500 transition-colors resize-none"
                value={formData.bio} onChange={handleChange}></textarea>
            </motion.div>
          )}

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-secondary to-pink-500 text-white font-bold flex justify-center items-center shadow-[0_0_20px_rgba(236,72,153,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : 'Complete Registration'}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-muted text-sm">
          Already have an account? <Link to="/login" className="text-secondary hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
