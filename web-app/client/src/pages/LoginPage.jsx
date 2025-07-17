import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Placeholder for useAuth hook.
// In a real application, you would replace this with your actual AuthContext setup.
const useAuth = () => {
  const login = async (email, password) => {
    console.log('Attempting to log in with:', email, password);
    // Simulate API call delay
    return new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, you'd call your authentication service here (e.g., Firebase auth)
    // throw new Error("Login failed: Invalid credentials (placeholder error)");
  };

  const signup = async (name, email, password) => {
    console.log('Attempting to sign up with:', name, email, password);
    // Simulate API call delay
    return new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, you'd call your authentication service here (e.g., Firebase auth)
    // throw new Error("Signup failed: Email already in use (placeholder error)");
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
  const isMounted = useRef(true); // Track mounted state

  const { login, signup } = useAuth();

  useEffect(() => {
    return () => {
      // Set to false when component unmounts
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        if (isMounted.current) {
          setCurrentPage('dashboard'); // Redirect to dashboard
        }
      } else {
        await signup(name, email, password);
        if (isMounted.current) {
          setCurrentPage('dashboard'); // Redirect to dashboard
        }
      }
    } catch (err) {
      if (isMounted.current) {
        setError('Failed to authenticate. Please check your credentials and try again.');
        setLoading(false);
      }
    }
  };

  // Construction-themed particles for background (kept for existing aesthetic)
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    speed: Math.random() * 2 + 1
  }));

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row font-sans relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url('/login.jpg')`,
      }}
    >
      {/* Dark Overlay for readability over the background image */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Background Elements (Grid, Blurs, Particles) - Z-index adjusted for image */}
      <div className="absolute inset-0 -z-10">
        {/* Blueprint Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>

        {/* Floating Construction Elements */}
        <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-[15%] w-80 h-80 rounded-full bg-blue-600/5 blur-3xl animate-pulse-slow animation-delay-2000"></div>

        {/* Construction Particles */}
        <div className="absolute inset-0">
          {particles.map(particle => (
            <motion.div
              key={`particle-${particle.id}`}
              className="absolute rounded-full bg-blue-400"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                boxShadow: '0 0 8px 1px rgba(59, 130, 246, 0.5)'
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * 20],
                y: [0, (Math.random() - 0.5) * 20]
              }}
              transition={{
                duration: particle.speed * 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Left Column - Form (Glassmorphic) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-10 border border-white/20 relative overflow-hidden"
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
        >
          {/* Back Button */}
          <motion.button
            onClick={() => setCurrentPage('home')}
            className="absolute top-5 left-5 flex items-center text-white bg-white/10 rounded-full p-2 hover:bg-white/20 transition-all shadow-sm backdrop-blur-sm"
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
              <div className="bg-gradient-to-br from-[#0084C8]/80 to-[#005A9E]/80 w-16 h-16 rounded-xl flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00C2FF] to-[#0084C8]">
                ConstructIQ
              </span>
            </h1>
            <p className="text-white mt-2 font-medium">
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </p>
          </motion.div>

          {/* Toggle Buttons */}
          <motion.div
            className="flex mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl text-center font-medium transition-all duration-300 ${
                isLogin
                  ? 'bg-gradient-to-r from-[#0084C8] to-[#005A9E] text-white shadow-md'
                  : 'text-white hover:bg-white/5'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl text-center font-medium transition-all duration-300 ${
                !isLogin
                  ? 'bg-gradient-to-r from-[#0084C8] to-[#005A9E] text-white shadow-md'
                  : 'text-white hover:bg-white/5'
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
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C2FF] transition-all duration-300 text-white placeholder-white/70"
                  placeholder="John Smith"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C2FF] transition-all duration-300 text-white placeholder-white/70"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C2FF] transition-all duration-300 text-white placeholder-white/70"
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
                      className="h-4 w-4 text-[#00C2FF] focus:ring-[#00C2FF] border-white/20 rounded bg-white/5"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <button onClick={() => setCurrentPage('forgot-password')} className="font-medium text-[#00C2FF] hover:text-[#0084C8] transition-colors">
                      Forgot password?
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-red-300 text-sm font-medium py-2 px-4 bg-red-900/40 backdrop-blur-sm rounded-lg border border-red-500/40">
                  {error}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#0084C8] to-[#005A9E] text-white py-3 px-4 rounded-xl font-medium hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00C2FF] shadow-lg flex items-center justify-center"
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
              <p className="mt-6 text-center text-sm text-white/70">
                By signing up, you agree to our
                <a href="#" className="font-medium text-[#00C2FF] hover:text-[#0084C8] ml-1 transition-colors">Terms of Service</a> and
                <a href="#" className="font-medium text-[#00C2FF] hover:text-[#0084C8] ml-1 transition-colors">Privacy Policy</a>.
              </p>
            )}

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-white/70">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-[#00C2FF] hover:text-[#0084C8] transition-colors"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column - Content (Glassmorphic) */}
        <div className="hidden md:flex md:w-1/2 relative overflow-hidden items-center justify-center p-12 z-10">
          <motion.div
            className="max-w-lg text-center bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20"
            style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#00C2FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </motion.div>

            <h2 className="text-4xl font-bold mb-6 text-white">
              <span className="text-[#00C2FF]">Advanced Construction</span> Intelligence
            </h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              Revolutionize your construction projects with AI-powered estimation, planning, and resource management.
            </p>

            <div className="flex justify-center space-x-6">
              {[
                { icon: '📊', label: 'Precision Estimation', color: 'text-[#00C2FF]' },
                { icon: '🏗️', label: '3D Modeling', color: 'text-[#FFB81C]' },
                { icon: '⚡', label: 'Real-time Insights',
                  color: 'text-[#00C2FF]'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 border border-white/20">
                    <span className={`text-2xl ${feature.color}`}>{feature.icon}</span>
                  </div>
                  <span className="font-medium text-white/80">{feature.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4">
              {[
                { label: '2D Takeoff', color: 'bg-[#0084C8]/60' },
                { label: 'BIM', color: 'bg-[#005A9E]/60' },
                { label: 'AI Analytics', color: 'bg-[#00C2FF]/60' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`${item.color} py-2 px-4 rounded-lg text-white font-medium`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Global styles */}
        <style>{`
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
        `}</style>
      </div>
    );
  };

  // Placeholder for Dashboard Page
  const DashboardPage = ({ setCurrentPage }) => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-3xl p-4">
        <h1 className="text-5xl font-bold mb-8">Welcome to your Dashboard!</h1>
        <p className="text-xl mb-8 text-gray-400">This is a placeholder page.</p>
        <button
          onClick={() => setCurrentPage('login')}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          Go back to Login
        </button>
      </div>
    );
  };

  // Main App component to handle simple routing
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