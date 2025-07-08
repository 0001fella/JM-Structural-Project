import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('commercial');
  const [isHovered, setIsHovered] = useState(false);

  const projectTypes = {
    residential: {
      name: "Residential Complex",
      items: [
        { name: "Foundation Work", cost: "₦12,500,000" },
        { name: "Structural Framework", cost: "₦28,750,000" },
        { name: "MEP Systems", cost: "₦15,300,000" },
        { name: "Finishing Work", cost: "₦32,450,000" }
      ],
      total: "₦89,000,000",
      savings: "₦11,200,000"
    },
    commercial: {
      name: "Commercial Tower",
      items: [
        { name: "Core Structure", cost: "₦58,200,000" },
        { name: "Facade System", cost: "₦42,500,000" },
        { name: "HVAC Systems", cost: "₦36,750,000" },
        { name: "Smart Systems", cost: "₦28,300,000" }
      ],
      total: "₦165,750,000",
      savings: "₦24,800,000"
    },
    infrastructure: {
      name: "Highway Project",
      items: [
        { name: "Earthworks", cost: "₦85,400,000" },
        { name: "Pavement Layers", cost: "₦127,600,000" },
        { name: "Bridge Structures", cost: "₦92,300,000" },
        { name: "Drainage Systems", cost: "₦45,800,000" }
      ],
      total: "₦351,100,000",
      savings: "₦43,500,000"
    }
  };

  const currentProject = projectTypes[activeTab];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.7, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
      {/* Modern building background - PRESERVED */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-900/60 to-slate-900/80">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
      </div>
      
      {/* Animated floating particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div 
          key={i}
          className="absolute rounded-full bg-blue-500/10"
          initial={{ 
            y: Math.random() * 100,
            x: Math.random() * 100,
            opacity: 0
          }}
          animate={{ 
            y: [0, -100],
            x: [0, Math.random() * 50 - 25],
            opacity: [0, 0.8, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 8 + 2}px`,
            height: `${Math.random() * 8 + 2}px`,
          }}
        />
      ))}

      {/* Premium Navigation Bar */}
      <nav className="relative z-50 py-5 px-4 md:px-8 lg:px-16 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-12 h-12 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 10 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white font-bold text-xl">JT</span>
            </motion.div>
            <motion.span 
              className="ml-3 text-2xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              JTech AI
            </motion.span>
          </motion.div>
          
          {/* Realistic Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { label: "Features", path: "/features" },
              { label: "Solutions", path: "/solutions" },
              { label: "Pricing", path: "/pricing" },
              { label: "Resources", path: "/resources" }
            ].map((item, index) => (
              <motion.a
                key={item.label}
                href={item.path}
                className="text-slate-200 hover:text-cyan-300 transition-colors duration-300 font-medium group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {item.label}
                <div className="h-0.5 bg-cyan-400 mt-1 w-0 group-hover:w-full transition-all duration-300"></div>
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link 
                to="/login" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2.5 px-6 rounded-lg font-bold hover:opacity-90 transition-all duration-300 shadow-md group"
              >
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
              </Link>
            </motion.div>
          </div>
          
          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden mt-4 bg-slate-800/90 backdrop-blur-sm rounded-xl py-4 px-6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              {[
                { label: "Features", path: "/features" },
                { label: "Solutions", path: "/solutions" },
                { label: "Pricing", path: "/pricing" },
                { label: "Resources", path: "/resources" }
              ].map(item => (
                <Link 
                  key={item.label}
                  to={item.path} 
                  className="text-slate-200 hover:text-cyan-300 py-2 px-4 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link 
                to="/login" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-4 rounded-lg font-bold text-center mt-2 hover:opacity-90 transition-opacity"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Content - Premium Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="inline-block bg-blue-800/40 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 border border-cyan-400/30"
              variants={itemVariants}
            >
              <span className="text-cyan-300 font-medium text-lg">AI-Powered Construction Solutions</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white"
              variants={itemVariants}
            >
              <motion.span 
                className="text-cyan-300"
                animate={{ 
                  textShadow: ["0 0 5px rgba(56,189,248,0)", "0 0 15px rgba(56,189,248,0.5)", "0 0 5px rgba(56,189,248,0)"]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                Quantum Estimation
              </motion.span> 
              <br />For Modern Construction
            </motion.h1>
            
            <motion.p 
              className="text-xl text-slate-200 mb-10 max-w-xl"
              variants={itemVariants}
            >
              Transform blueprints into precise cost breakdowns with industry-leading accuracy. 
              Our AI engine analyzes project specs to deliver optimized quotations in minutes.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-5 mb-12"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/signup" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl px-8 py-4 text-lg font-bold rounded-lg relative overflow-hidden group block"
                >
                  <span className="relative z-10">Start Free Trial</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/demo" 
                  className="bg-transparent border-2 border-cyan-400 text-white hover:bg-blue-800/30 transition-all duration-300 px-8 py-4 text-lg font-bold rounded-lg relative overflow-hidden group block"
                >
                  <span className="relative z-10">View Live Demo</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              variants={itemVariants}
            >
              <div className="flex -space-x-3 mr-4">
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.8 }}
                  />
                ))}
              </div>
              <div className="text-slate-300">
                <p className="font-medium">Trusted by 5,000+ construction professionals</p>
                <p className="text-sm">Engineers, architects, and contractors worldwide</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Premium Project Preview Container */}
          <motion.div 
            className="bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 border border-slate-600 relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.7,
              delay: 0.4
            }}
            whileHover={{ 
              y: -10,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            }}
          >
            <div className="p-4 bg-gradient-to-r from-blue-900/40 to-cyan-900/40 flex items-center justify-between border-b border-cyan-400/20">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm font-medium text-cyan-300">Project Estimation Preview</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-cyan-400/60 rounded-full"></div>
                <div className="w-2 h-2 bg-cyan-400/60 rounded-full"></div>
                <div className="w-2 h-2 bg-cyan-400/60 rounded-full"></div>
              </div>
            </div>
            
            <div className="flex border-b border-cyan-400/20">
              {Object.keys(projectTypes).map(type => (
                <motion.button
                  key={type}
                  className={`flex-1 py-3.5 text-sm font-medium transition-all duration-300 ${
                    activeTab === type 
                      ? 'text-cyan-300 bg-blue-900/30 border-b-2 border-cyan-400' 
                      : 'text-gray-400 hover:text-cyan-200 hover:bg-blue-900/20'
                  }`}
                  onClick={() => setActiveTab(type)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </motion.button>
              ))}
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-cyan-200">{currentProject.name}</h3>
                  <p className="text-xs text-cyan-400">AI-generated quotation preview</p>
                </div>
                <div className="relative">
                  <div className="w-9 h-9 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping absolute"></div>
                    <span className="text-xs font-bold">AI</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                {currentProject.items.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex justify-between p-3.5 bg-slate-700/40 rounded-lg border border-slate-600 hover:border-cyan-400/30 transition-all text-sm"
                    whileHover={{ 
                      backgroundColor: "rgba(30, 58, 138, 0.4)",
                      borderColor: "rgba(56, 189, 248, 0.3)"
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <div className="font-medium text-cyan-100">{item.name}</div>
                    <div className="font-mono font-bold text-cyan-300">{item.cost}</div>
                  </motion.div>
                ))}
              </div>
              
              <div className="pt-5 border-t border-cyan-400/20">
                <div className="flex justify-between mb-3 text-sm">
                  <div className="text-cyan-300 font-medium">Total Estimated Cost</div>
                  <div className="font-mono font-bold text-white text-lg">{currentProject.total}</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-green-400 font-medium">AI-Optimized Savings</div>
                  <div className="font-mono font-bold text-green-400 text-lg">{currentProject.savings}</div>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 text-center text-xs text-cyan-400 border-t border-cyan-400/20">
              Generated in 1.8s by JTech AI Quantum Engine
            </div>
          </motion.div>
        </div>
        
        {/* Animated Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {[
            { value: "98%", label: "Accuracy Rate" },
            { value: "1.8s", label: "Estimation Time" },
            { value: "250+", label: "Projects Analyzed" },
            { value: "₦1.2B", label: "Total Savings" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-slate-800/60 backdrop-blur-md rounded-xl p-6 border border-slate-700 shadow-lg"
              whileHover={{ 
                y: -5,
                backgroundColor: "rgba(30, 41, 59, 0.7)"
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.9 }}
            >
              <div className="text-4xl font-bold text-cyan-300 mb-2">{stat.value}</div>
              <div className="text-md text-slate-200">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Animated Construction Elements */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden">
        <motion.svg 
          viewBox="0 0 1200 120" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-24 md:h-32 text-slate-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <path 
            fill="currentColor" 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
          ></path>
          <path 
            fill="currentColor" 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
          ></path>
          <path 
            fill="currentColor" 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
          ></path>
        </motion.svg>
      </div>
    </div>
  );
};

export default HeroSection;