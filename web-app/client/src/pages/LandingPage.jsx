import React, { useEffect } from 'react';
import HeroSection from '../components/landing/HeroSection';
import FeaturesGrid from '../components/landing/FeaturesGrid';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaChartLine, FaUsers, FaRocket, FaBuilding, FaShieldAlt, FaLightbulb } from 'react-icons/fa';

const LandingPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const stats = [
    { value: '95%', label: 'Accuracy Rate', icon: <FaChartLine className="text-2xl" /> },
    { value: '10x', label: 'Faster Estimates', icon: <FaRocket className="text-2xl" /> },
    { value: '500+', label: 'Active Projects', icon: <FaBuilding className="text-2xl" /> },
    { value: '98%', label: 'Client Satisfaction', icon: <FaUsers className="text-2xl" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white overflow-hidden">
      {/* Enhanced Background with Clearer Visuals */}
      <div className="fixed inset-0 -z-10">
        {/* Clearer background image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30"></div>
        
        {/* Enhanced floating elements */}
        <div className="absolute top-1/4 left-[10%] w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-[15%] w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-[70%] w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-3000"></div>
        
        {/* Clearer grid pattern */}
        <div className="absolute inset-0 bg-[url('https://assets-global.website-files.com/5f5a53e153805db840dae2db/64e9d9f9b0d8c8b8d8b0e3c9_Grid%20Pattern.svg')] opacity-20"></div>
      </div>
      
      <HeroSection />
      
      {/* Stats Section - Enhanced */}
      <div className="py-16 bg-gradient-to-r from-blue-800/40 to-cyan-700/40 backdrop-blur-lg border-t border-b border-blue-500/20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            ref={ref}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center p-6 bg-gradient-to-b from-gray-800/40 to-blue-900/40 backdrop-blur-sm rounded-2xl border border-cyan-400/20 shadow-lg"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="mx-auto mb-4 text-cyan-400">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-blue-200 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Value Proposition - Enhanced */}
      <div className="py-20 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-16 h-16 rounded-xl flex items-center justify-center shadow-lg">
                  <FaLightbulb className="text-white text-2xl" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Revolutionize Your <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Construction Workflow</span>
                </h2>
              </div>
              
              <p className="text-blue-200 mb-8 text-lg leading-relaxed">
                JTech AI integrates cutting-edge technology to transform how construction professionals create quotations and manage projects. Our AI-powered platform reduces estimation time by 90% while improving accuracy to industry-leading levels.
              </p>
              
              <div className="space-y-5">
                {[
                  "AI-powered blueprint analysis with millimeter precision",
                  "Real-time material cost database with global pricing",
                  "Collaborative project management dashboard",
                  "Automated report generation in multiple formats",
                  "Predictive cost analytics with risk assessment"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mt-1 w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                    </div>
                    <span className="ml-4 text-blue-100">{item}</span>
                  </div>
                ))}
              </div>
              
              <motion.button
                className="mt-10 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Explore Our Technology</span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Enhanced Construction Visualization */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-500/30 transform perspective-1000 rotate-y-6">
                <div className="bg-gradient-to-br from-gray-800 to-blue-900 p-1">
                  <div className="bg-gray-900 h-96 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[url('https://assets-global.website-files.com/5f5a53e153805db840dae2db/64e9d9f9b0d8c8b8d8b0e3c9_Grid%20Pattern.svg')] opacity-20"></div>
                    <div className="relative z-10 text-center p-8">
                      <div className="mx-auto bg-gradient-to-br from-gray-800/70 to-blue-900/70 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-6 w-80 shadow-xl">
                        <div className="flex justify-between mb-4">
                          <div className="h-3 w-24 bg-cyan-400/40 rounded animate-pulse"></div>
                          <div className="flex gap-1">
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          </div>
                        </div>
                        
                        {/* Enhanced building visualization */}
                        <div className="mb-6">
                          <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-md shadow-md transform rotate-12"></div>
                            <div className="w-20 h-20 bg-gradient-to-b from-blue-600 to-blue-400 rounded-md shadow-md -ml-4 transform -rotate-6"></div>
                            <div className="w-14 h-18 bg-gradient-to-b from-blue-700 to-blue-500 rounded-md shadow-md -ml-4 transform rotate-3"></div>
                          </div>
                          <div className="h-1 w-full bg-cyan-400/40 rounded-full mb-1"></div>
                          <div className="h-1 w-4/5 bg-cyan-400/30 rounded-full mx-auto"></div>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex justify-between">
                              <div className="h-3 bg-blue-500/40 rounded" style={{ width: `${60 - i*10}%` }}></div>
                              <div className="h-3 w-16 bg-cyan-400/40 rounded"></div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="pt-4 border-t border-cyan-400/20 flex justify-between items-center">
                          <div className="h-3 w-20 bg-blue-500/40 rounded"></div>
                          <div className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full text-xs font-bold text-gray-900 shadow-md">
                            ANALYZE
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-cyan-500/20 animate-pulse-slow z-0"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full bg-blue-600/20 animate-pulse-slow animation-delay-2000 z-0"></div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <FeaturesGrid />
      
      {/* Testimonials - Enhanced */}
      <div className="py-20 bg-gradient-to-b from-gray-900/90 to-blue-900/80 backdrop-blur">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Trusted by <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Industry Leaders</span>
            </motion.h2>
            <motion.p 
              className="text-blue-200 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Don't just take our word for it. Here's what industry professionals say about JTech AI.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item}
                className="bg-gradient-to-br from-gray-800/60 to-blue-900/60 p-8 rounded-3xl shadow-xl border border-cyan-400/30 backdrop-blur-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item * 0.2 }}
                whileHover={{ y: -10, borderColor: 'rgba(34, 211, 238, 0.5)' }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-blue-200 mb-6 italic">
                  "JTech AI has revolutionized our estimation process. What used to take days now takes hours, with significantly improved accuracy that's transformed our bidding strategy."
                </p>
                <div className="flex items-center">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-cyan-400 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center">
                      <span className="font-bold text-gray-900">MR</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-gray-900"></div>
                  </div>
                  <div className="ml-4">
                    <div className="font-bold">Michael Reynolds</div>
                    <div className="text-cyan-400">Senior Project Manager, ConstructCo</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Final CTA - Enhanced */}
      <div className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-cyan-900 opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://assets-global.website-files.com/5f5a53e153805db840dae2db/64e9d9f9b0d8c8b8d8b0e3c9_Grid%20Pattern.svg')] opacity-10 z-0"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-cyan-500/10 animate-pulse-slow z-0"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-blue-600/10 animate-pulse-slow animation-delay-2000 z-0"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="mx-auto mb-6 pulse-glow"
              animate={{ 
                y: [0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaRocket className="text-cyan-400 text-5xl mx-auto drop-shadow-lg" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Construction Workflow?
            </h2>
            <p className="text-cyan-200 mb-10 text-xl max-w-2xl mx-auto">
              Join thousands of engineers and surveyors who are already building smarter with JTech AI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all text-lg transform hover:scale-105 group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Start Free Trial</span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
              <motion.button
                className="px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold rounded-xl hover:bg-cyan-400/10 transition-all text-lg transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer - Enhanced */}
      <footer className="bg-gray-900/90 backdrop-blur-lg border-t border-blue-800/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">JT</span>
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  JTech AI
                </span>
              </div>
              <p className="text-blue-200 mb-6">
                AI-powered construction estimation for engineers and quantity surveyors.
              </p>
              <div className="flex space-x-4">
                {[...Array(4)].map((_, i) => (
                  <a key={i} href="#" className="text-blue-300 hover:text-cyan-400 transition-colors">
                    <div className="bg-blue-900/30 w-10 h-10 rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition-all hover:shadow-lg">
                      <div className="bg-cyan-400 rounded-xl w-5 h-5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-6">Product</h3>
              <ul className="space-y-3">
                {['Features', 'Solutions', 'Pricing', 'Templates', 'Releases'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-200 hover:text-cyan-400 transition-colors flex items-center">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-6">Resources</h3>
              <ul className="space-y-3">
                {['Documentation', 'Tutorials', 'Blog', 'Events', 'Help Center'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-200 hover:text-cyan-400 transition-colors flex items-center">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-6">Contact</h3>
              <ul className="space-y-3 text-blue-200">
                <li className="flex items-start">
                  <div className="mt-1.5 mr-3 text-cyan-400">
                    <div className="bg-cyan-400 rounded-xl w-5 h-5" />
                  </div>
                  <span>123 Innovation Blvd, Tech City</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1.5 mr-3 text-cyan-400">
                    <div className="bg-cyan-400 rounded-xl w-5 h-5" />
                  </div>
                  <span>contact@jtechai.com</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1.5 mr-3 text-cyan-400">
                    <div className="bg-cyan-400 rounded-xl w-5 h-5" />
                  </div>
                  <span>+1 (555) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-400 mb-4 md:mb-0">
              © 2025 JTech AI. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a key={item} href="#" className="text-blue-400 hover:text-cyan-400 transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;