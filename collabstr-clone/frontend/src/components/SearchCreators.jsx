import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axiosConfig';
import { Search, Star, Youtube, DollarSign, User } from 'lucide-react';

export default function SearchCreators() {
  const [creators, setCreators] = useState([]);
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      try {
        const query = niche ? `?niche=${niche}` : '';
        const res = await api.get(`/public/influencers${query}`);
        setCreators(res.data);
      } catch (err) {
        console.error("Failed to fetch influencers", err);
      } finally {
        setLoading(false);
      }
    };
    
    // Add a small debounce if typing fast
    const timer = setTimeout(fetchCreators, 300);
    return () => clearTimeout(timer);
  }, [niche]);

  return (
    <div className="w-full flex flex-col pt-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Find <span className="text-pink-500">Creators</span></h1>
          <p className="text-muted text-lg">Discover and connect with top influencers for your next campaign.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
          <input 
            type="text" 
            placeholder="Search by niche... (e.g. tech)"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full bg-surface border border-surface/50 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-pink-500 transition-colors"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      ) : creators.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center text-muted">
          No creators found matching "{niche}"
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {creators.map((creator, i) => (
            <motion.div 
              key={creator.id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="glass-panel rounded-2xl p-6 border border-surface flex flex-col group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-pink-500/10 transition-colors"></div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 flex items-center justify-center shadow-lg">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{creator.name}</h3>
                  <span className="text-xs font-semibold px-2 py-1 bg-surface rounded-md text-pink-400 border border-pink-500/20">{creator.niche}</span>
                </div>
              </div>
              
              <p className="text-muted text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                {creator.bio}
              </p>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-300 bg-surface/50 px-3 py-2 rounded-lg">
                  <Youtube className="text-red-500" size={16} /> {creator.youtubeChannelHandle || 'N/A'}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300 bg-surface/50 px-3 py-2 rounded-lg">
                  <Star className="text-yellow-500" size={16} /> {creator.instagramFollowers ? `${(creator.instagramFollowers / 1000).toFixed(1)}k IG` : 'N/A'}
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-surface">
                <div className="flex items-center gap-1 font-bold text-lg">
                  <DollarSign size={18} className="text-green-400"/> {creator.hourlyRate}/hr
                </div>
                <button className="px-5 py-2 rounded-xl bg-pink-500/10 text-pink-400 hover:bg-pink-500 hover:text-white font-medium transition-colors">
                  Contact
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
