import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axiosConfig';
import { Search, Briefcase, Link as LinkIcon, Building } from 'lucide-react';

export default function SearchBrands() {
  const [brands, setBrands] = useState([]);
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const query = niche ? `?niche=${niche}` : '';
        const res = await api.get(`/public/brands${query}`);
        setBrands(res.data);
      } catch (err) {
        console.error("Failed to fetch brands", err);
      } finally {
        setLoading(false);
      }
    };
    
    const timer = setTimeout(fetchBrands, 300);
    return () => clearTimeout(timer);
  }, [niche]);

  return (
    <div className="w-full flex flex-col pt-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Find <span className="text-primary">Brands</span></h1>
          <p className="text-muted text-lg">Discover amazing companies actively looking for partnerships.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
          <input 
            type="text" 
            placeholder="Search by niche... (e.g. fitness)"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full bg-surface border border-surface/50 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : brands.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center text-muted">
          No brands found matching "{niche}"
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {brands.map((brand, i) => (
            <motion.div 
              key={brand.id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="glass-panel rounded-2xl p-6 border border-surface flex flex-col group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors"></div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center shadow-lg">
                  <Building size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{brand.companyName}</h3>
                  <span className="text-xs font-semibold px-2 py-1 bg-surface rounded-md text-blue-400 border border-primary/20">{brand.niche}</span>
                </div>
              </div>
              
              <p className="text-muted text-sm mb-6 flex-1 leading-relaxed">
                {brand.description}
              </p>
              
              <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-surface">
                {brand.websiteUrl && (
                  <a href={brand.websiteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                    <LinkIcon className="text-primary" size={16} /> {brand.websiteUrl.replace(/^https?:\/\//, '')}
                  </a>
                )}
                
                <button className="w-full py-2.5 mt-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white font-bold transition-all duration-300 border border-primary/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  Apply for Campaign
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
