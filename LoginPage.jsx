// Updated LoginSignupPage.js for JM Structural Project
// Includes text changes, validation, background blur, and animations

import { Link } from 'react-router-dom';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import DashboardPage from './DashboardPage';

const useAuth = () => {
  const login = async (email, password) => {
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const signup = async (name, email, password) => {
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  return { login, signup };
};

const LoginPage = ({ setCurrentPage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);
  const { login, signup } = useAuth();

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    if (!isLogin && name.trim().length < 2) {
      setError('Please enter your full name.');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await login(email, password);
        if (isMounted.current) window.location.href = '/dashboard';
      } else {
        await signup(name, email, password);
        if (isMounted.current) window.location.href = '/dashboard';
      }
    } catch (err) {
      if (isMounted.current) {
        setError('Authentication failed. ' + err);
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative backdrop-blur-2xl"
      style={{ backgroundImage: "url('/login.jpg')" }}>
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl p-10 border border-white/30"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          {isLogin ? 'Welcome back! Log in to get started' : 'Create an account to begin'}
        </h2>

        <div className="flex mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-l-xl ${isLogin ? 'bg-blue-600 text-white' : 'bg-white/20 text-white'}`}>Sign In</button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-r-xl ${!isLogin ? 'bg-blue-600 text-white' : 'bg-white/20 text-white'}`}>Create Account</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 rounded-lg border border-white/30 text-white placeholder-white/70"
                required
              />
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 rounded-lg border border-white/30 text-white placeholder-white/70"
              required
            />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 rounded-lg border border-white/30 text-white placeholder-white/70"
              required
            />
          </motion.div>

          {isLogin && (
  <div className="text-right">
    <Link to="/forgot-password" className="text-sm text-white/70 hover:underline">
      Forgot password?
    </Link>
  </div>
)}

          {error && (
            <motion.div
              className="text-sm text-red-200 bg-red-900/40 border border-red-400/40 p-2 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 rounded-xl"
          >
            {loading ? (isLogin ? 'Signing in...' : 'Creating...') : (isLogin ? 'Sign In' : 'Create Account')}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  return (
    <>
      {currentPage === 'login' && <LoginPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'dashboard' && <DashboardPage setCurrentPage={setCurrentPage} />}
    </>
  );
};

export default App;
