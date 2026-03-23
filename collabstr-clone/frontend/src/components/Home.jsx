import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-20 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Connect <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Brands</span> & <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-pink-500">Creators</span>
        </h1>
        <p className="text-xl text-muted mb-10 leading-relaxed">
          The ultimate platform for seamless collaborations. Find the perfect match, negotiate rates, and grow together in a single, unified workspace.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/register">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg flex items-center gap-2 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-shadow"
            >
              Get Started <ArrowRight size={20} />
            </motion.button>
          </Link>
          <Link to="/login">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl glass-panel text-text font-bold text-lg hover:bg-surface transition-colors"
            >
              Log In
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full"
      >
        {[
          { icon: <Users className="text-primary mb-4" size={32}/>, title: "Curated Network", desc: "Access thousands of vetted creators and premium brands ready to collaborate." },
          { icon: <Star className="text-secondary mb-4" size={32}/>, title: "Secure Transactions", desc: "Built-in chat and JWT-secured api layer making sure your data is safe." },
          { icon: <TrendingUp className="text-pink-500 mb-4" size={32}/>, title: "Analytics Driven", desc: "Match based on actual performance metrics, not just vanity follower counts." }
        ].map((feature, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="p-8 rounded-2xl glass-panel flex flex-col items-start border border-surface"
          >
            {feature.icon}
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-muted leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
