// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#0c3d5a] to-[#1b6b9e] font-sans">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-12">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 border border-white/30 transform transition-all hover:shadow-2xl relative">
          {/* Back Button - Visible on all screens */}
          <button 
            onClick={() => navigate('/')}
            className="absolute top-5 left-5 flex items-center text-[#0c3d5a] bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-all shadow-sm"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          
          <div className="text-center mb-10">
            <div className="mx-auto mb-6">
              <div className="bg-gradient-to-br from-[#0c3d5a] to-[#1b6b9e] w-16 h-16 rounded-xl flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-[#0c3d5a] to-[#1b6b9e] tracking-tight">
              JTech AI
            </h1>
            <p className="text-gray-600 mt-2 font-medium">
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </p>
          </div>
          
          {/* Toggle Buttons */}
          <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl text-center font-medium transition-all duration-300 ${
                isLogin 
                  ? 'bg-gradient-to-r from-[#0c3d5a] to-[#1b6b9e] text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl text-center font-medium transition-all duration-300 ${
                !isLogin 
                  ? 'bg-gradient-to-r from-[#0c3d5a] to-[#1b6b9e] text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign Up
            </button>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b6b9e]/70 focus:border-transparent transition-all duration-300 shadow-sm"
                  placeholder="John Smith"
                  required={!isLogin}
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b6b9e]/70 focus:border-transparent transition-all duration-300 shadow-sm"
                placeholder="name@company.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b6b9e]/70 focus:border-transparent transition-all duration-300 shadow-sm"
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
                    className="h-4 w-4 text-[#0c3d5a] focus:ring-[#1b6b9e] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link to="/" className="font-medium text-[#0c3d5a] hover:text-[#1b6b9e] transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>
            )}
            
            {error && (
              <div className="text-red-500 text-sm font-medium py-2 px-4 bg-red-50 rounded-lg border border-red-100">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#0c3d5a] to-[#1b6b9e] text-white py-3 px-4 rounded-xl font-medium hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1b6b9e] shadow-lg flex items-center justify-center"
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
            </button>
          </form>
          
          {!isLogin && (
            <p className="mt-6 text-center text-sm text-gray-500">
              By signing up, you agree to our 
              <a href="#" className="font-medium text-[#0c3d5a] hover:text-[#1b6b9e] ml-1 transition-colors">Terms of Service</a> and 
              <a href="#" className="font-medium text-[#0c3d5a] hover:text-[#1b6b9e] ml-1 transition-colors">Privacy Policy</a>.
            </p>
          )}
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-[#0c3d5a] hover:text-[#1b6b9e] transition-colors"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Content (Hidden on small screens) */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c3d5a]/90 to-[#1b6b9e]/90 z-10"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-float animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-float animation-delay-4000"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 p-12">
          <div className="max-w-lg text-center">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 mb-10 inline-block transform transition-all duration-500 hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            
            <h2 className="text-4xl font-bold mb-6">
              Where <span className="text-blue-200">AI</span> Meets Architectural Innovation
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              JTech AI transforms architectural design with predictive analytics, generative modeling, and real-time optimization.
            </p>
            
            <div className="flex justify-center space-x-6">
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 border border-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="font-medium">Secure</span>
              </div>
              
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 border border-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-medium">Intelligent</span>
              </div>
              
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 border border-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <span className="font-medium">Scalable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;