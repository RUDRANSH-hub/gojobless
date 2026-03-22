import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-text flex flex-col font-sans">
        <nav className="w-full py-4 px-8 border-b border-surface/50 flex justify-between items-center backdrop-blur-md sticky top-0 z-50">
          <Link to="/" className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Collabstr
          </Link>
          <div className="flex gap-4 items-center">
            <Link to="/login" className="px-4 py-2 rounded-lg font-medium text-muted hover:text-white hover:bg-surface transition-all duration-300">Login</Link>
            <Link to="/register" className="px-5 py-2.5 rounded-lg bg-primary font-medium hover:bg-blue-600 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transform hover:-translate-y-0.5">
              Sign Up
            </Link>
          </div>
        </nav>
        
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-8 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
