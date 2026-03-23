import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SearchCreators from './components/SearchCreators';
import SearchBrands from './components/SearchBrands';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // Full reload to clear state cleanly
  };

  return (
    <nav className="w-full py-4 px-6 md:px-12 border-b border-surface/50 flex flex-col md:flex-row justify-between items-center gap-4 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Collabstr
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/search/creators" className={`font-medium transition-colors ${location.pathname.includes('creators') ? 'text-white' : 'text-muted hover:text-white'}`}>
            Find Creators
          </Link>
          <Link to="/search/brands" className={`font-medium transition-colors ${location.pathname.includes('brands') ? 'text-white' : 'text-muted hover:text-white'}`}>
            Find Brands
          </Link>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="px-4 py-2 rounded-lg font-medium text-muted hover:text-white hover:bg-surface transition-all duration-300">Login</Link>
            <Link to="/register" className="px-5 py-2.5 rounded-lg bg-primary font-medium hover:bg-blue-600 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transform hover:-translate-y-0.5">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="px-4 py-2 rounded-lg font-medium text-white bg-surface hover:bg-surface/80 border border-white/5 transition-all">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="px-4 py-2 rounded-lg font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
              Log Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-text flex flex-col font-sans selection:bg-primary/30">
        <Navigation />
        
        <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-12 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search/creators" element={<SearchCreators />} />
            <Route path="/search/brands" element={<SearchBrands />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
