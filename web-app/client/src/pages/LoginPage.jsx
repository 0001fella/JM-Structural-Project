// src/pages/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isLogin) {
        await login(email, password);
        navigate('/dashboard');
      } else {
        await signup(name, email, password);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Failed to authenticate. Please check your credentials.');
      setLoading(false);
    }
  };

  // AI particles for background
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    speed: Math.random() * 2 + 1
  }));

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#0A142F] to-[#1C2C65] font-sans relative overflow-hidden">
      {/* AI Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Floating AI Particles */}
        <div className="absolute inset-0">
          {particles.map(particle => (
            <motion.div
              key={`particle-${particle.id}`}
              className="absolute rounded-full bg-cyan-400"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                boxShadow: '0 0 10px 2px rgba(59, 130, 246, 0.7)'
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * 30],
                y: [0, (Math.random() - 0.5) * 30]
              }}
              transition={{
                duration: particle.speed * 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Neural Network Connections */}
        <div className="absolute inset-0 opacity-15">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute bg-blue-500 rounded-full"
              initial={{ 
                width: 0,
                height: 1,
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%'
              }}
              animate={{ 
                width: Math.random() * 200 + 100 + 'px',
                rotate: Math.random() * 360
              }}
              transition={{ 
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
        
        {/* Large Floating Elements */}
        <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-[15%] w-80 h-80 rounded-full bg-blue-600/10 blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>

      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-[#1C2C65]/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-10 border border-[#2A3D7A] relative overflow-hidden"
        >
          {/* Back Button */}
          <motion.button 
            onClick={() => navigate('/')}
            className="absolute top-5 left-5 flex items-center text-white bg-[#0A142F]/50 rounded-full p-2 hover:bg-[#0A142F] transition-all shadow-sm backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </motion.button>
          
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="mx-auto mb-6"
              whileHover={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 w-16 h-16 rounded-xl flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
              JTech AI
            </h1>
            <p className="text-[#FFC947] mt-2 font-medium">
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </p>
          </motion.div>
          
          {/* Toggle Buttons */}
          <motion.div 
            className="flex mb-8 bg-[#0A142F]/50 backdrop-blur-sm rounded-xl p-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl text-center font-medium transition-all duration-300 ${
                isLogin 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl text-center font-medium transition-all duration-300 ${
                !isLogin 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </motion.div>
          
          {/* Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0A142F]/50 backdrop-blur-sm border border-[#2A3D7A] rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 text-white placeholder-slate-400"
                  placeholder="John Smith"
                  required={!isLogin}
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A142F]/50 backdrop-blur-sm border border-[#2A3D7A] rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 text-white placeholder-slate-400"
                placeholder="name@company.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A142F]/50 backdrop-blur-sm border border-[#2A3D7A] rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 text-white placeholder-slate-400"
                placeholder="••••••••"
                required
              />
            </div>
            
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#2A3D7A] rounded bg-[#0A142F]/50"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link to="/" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>
            )}
            
            {error && (
              <div className="text-red-400 text-sm font-medium py-2 px-4 bg-red-900/30 backdrop-blur-sm rounded-lg border border-red-500/30">
                {error}
              </div>
            )}
            
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </motion.button>
          </motion.form>
          
          {!isLogin && (
            <p className="mt-6 text-center text-sm text-slate-400">
              By signing up, you agree to our 
              <a href="#" className="font-medium text-cyan-400 hover:text-cyan-300 ml-1 transition-colors">Terms of Service</a> and 
              <a href="#" className="font-medium text-cyan-400 hover:text-cyan-300 ml-1 transition-colors">Privacy Policy</a>.
            </p>
          )}
          
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-slate-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Column - Content */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A142F]/90 to-[#1C2C65]/90 z-10"></div>
        
        {/* Floating AI Elements */}
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 animate-float animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 animate-float animation-delay-4000"></div>
        
        {/* AI Neural Network Visualization */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`node-${i}`}
              className="absolute w-4 h-4 bg-cyan-500 rounded-full"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${30 + Math.sin(i) * 20}%`
              }}
              animate={{ 
                boxShadow: [
                  '0 0 0 0 rgba(59, 130, 246, 0.7)',
                  '0 0 0 10px rgba(59, 130, 246, 0)'
                ] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
        
        {/* Content */}
        <motion.div 
          className="max-w-lg text-center z-30 p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.div 
            className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 mb-10 inline-block"
            whileHover={{ 
              scale: 1.05,
              rotate: [0, 2, -2, 0]
            }}
            transition={{ duration: 0.8 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </motion.div>
          
          <h2 className="text-4xl font-bold mb-6 text-white">
            Where <span className="text-cyan-400">AI</span> Meets <span className="text-[#FFC947]">Construction</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            JTech AI transforms architectural design with predictive analytics, generative modeling, and real-time optimization.
          </p>
          
          <div className="flex justify-center space-x-6">
            {[
              { icon: 'shield', label: 'Secure', color: 'text-cyan-400' },
              { icon: 'brain', label: 'Intelligent', color: 'text-amber-400' },
              { icon: 'scale', label: 'Scalable', color: 'text-emerald-400' }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 border border-white/20">
                  {feature.icon === 'shield' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${feature.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ) : feature.icon === 'brain' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${feature.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${feature.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  )}
                </div>
                <span className="font-medium text-slate-300">{feature.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Global styles */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;