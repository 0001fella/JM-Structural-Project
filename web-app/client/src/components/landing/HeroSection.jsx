import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('residential');

  // Project types for the preview
  const projectTypes = {
    residential: {
      name: "Residential Complex",
      items: [
        { name: "Foundation Work", description: "Reinforced concrete", cost: "₦12,500,000" },
        { name: "Structural Framework", description: "Steel beams & columns", cost: "₦28,750,000" },
        { name: "MEP Systems", description: "Plumbing & electrical", cost: "₦15,300,000" },
        { name: "Finishing Work", description: "Interior & exterior", cost: "₦32,450,000" }
      ],
      total: "₦89,000,000",
      savings: "₦11,200,000"
    },
    commercial: {
      name: "Commercial Tower",
      items: [
        { name: "Core Structure", description: "Reinforced concrete", cost: "₦58,200,000" },
        { name: "Facade System", description: "Glass curtain walls", cost: "₦42,500,000" },
        { name: "HVAC Systems", description: "Centralized cooling", cost: "₦36,750,000" },
        { name: "Smart Systems", description: "Automation & security", cost: "₦28,300,000" }
      ],
      total: "₦165,750,000",
      savings: "₦24,800,000"
    },
    infrastructure: {
      name: "Highway Project",
      items: [
        { name: "Earthworks", description: "Excavation & grading", cost: "₦85,400,000" },
        { name: "Pavement Layers", description: "Asphalt concrete", cost: "₦127,600,000" },
        { name: "Bridge Structures", description: "Pre-stressed concrete", cost: "₦92,300,000" },
        { name: "Drainage Systems", description: "Culverts & channels", cost: "₦45,800,000" }
      ],
      total: "₦351,100,000",
      savings: "₦43,500,000"
    }
  };

  const currentProject = projectTypes[activeTab];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
      {/* Modern building background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-900/60 to-slate-900/80">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
      </div>
      
      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-blue-500/10 animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 3}px`,
            height: `${Math.random() * 10 + 3}px`,
            animationDuration: `${Math.random() * 5 + 5}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Navigation Bar */}
      <nav className="relative z-50 py-5 px-4 md:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center transform hover:rotate-12 transition-transform duration-300 shadow-lg">
              <span className="text-white font-bold text-xl">JT</span>
            </div>
            <span className="ml-3 text-2xl font-bold text-white">JTech AI</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-slate-200 hover:text-cyan-300 transition-colors duration-300 font-medium">
              Services
            </a>
            <a href="#projects" className="text-slate-200 hover:text-cyan-300 transition-colors duration-300 font-medium">
              Projects
            </a>
            <a href="#testimonials" className="text-slate-200 hover:text-cyan-300 transition-colors duration-300 font-medium">
              Testimonials
            </a>
            <a href="#contact" className="text-slate-200 hover:text-cyan-300 transition-colors duration-300 font-medium">
              Contact
            </a>
            <Link 
              to="/login" 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2.5 px-6 rounded-lg font-bold hover:opacity-90 transition-all duration-300 shadow-md"
            >
              Client Login
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-slate-800/90 backdrop-blur-sm rounded-xl py-4 px-6">
            <div className="flex flex-col space-y-4">
              <a 
                href="#services" 
                className="text-slate-200 hover:text-cyan-300 py-2 px-4 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#projects" 
                className="text-slate-200 hover:text-cyan-300 py-2 px-4 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </a>
              <a 
                href="#testimonials" 
                className="text-slate-200 hover:text-cyan-300 py-2 px-4 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
              <a 
                href="#contact" 
                className="text-slate-200 hover:text-cyan-300 py-2 px-4 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <Link 
                to="/login" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-4 rounded-lg font-bold text-center mt-2 hover:opacity-90 transition-opacity"
                onClick={() => setIsMenuOpen(false)}
              >
                Client Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-blue-800/40 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 border border-cyan-400/30">
              <span className="text-cyan-300 font-medium text-lg">AI-Powered Construction Solutions</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              <span className="text-cyan-300">Quantum Estimation</span> <br />For Modern Construction
            </h1>
            <p className="text-xl text-slate-200 mb-8 max-w-xl">
              JTech AI transforms blueprints into precise cost breakdowns with industry-leading accuracy. 
              Our AI engine analyzes your project specs to deliver optimized quotations in minutes.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link 
                to="/dashboard" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl px-8 py-4 text-lg font-bold rounded-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
              <Link 
                to="/demo" 
                className="bg-transparent border-2 border-cyan-400 text-white hover:bg-blue-800/30 transition-all duration-300 px-8 py-4 text-lg font-bold rounded-lg relative overflow-hidden group"
              >
                <span className="relative z-10">View Demo Project</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
            </div>
          </div>
          
          {/* JTech AI Project Preview Container */}
          <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-1 border border-slate-600 relative z-10">
            <div className="p-4 bg-gradient-to-r from-blue-900/40 to-cyan-900/40 flex items-center border-b border-cyan-400/20">
              <div className="flex space-x-2">
                <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
              </div>
              <div className="text-sm text-cyan-300 mx-auto font-mono">JTech AI Quotation Engine</div>
            </div>
            
            <div className="flex border-b border-cyan-400/20">
              {Object.keys(projectTypes).map(type => (
                <button
                  key={type}
                  className={`flex-1 py-2.5 text-xs font-medium transition-all duration-300 ${
                    activeTab === type 
                      ? 'text-cyan-300 bg-blue-900/30 border-b-2 border-cyan-400' 
                      : 'text-gray-400 hover:text-cyan-200'
                  }`}
                  onClick={() => setActiveTab(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold text-cyan-200">{currentProject.name}</h3>
                  <p className="text-xs text-cyan-400">AI-generated quotation preview</p>
                </div>
                <div className="relative">
                  <div className="h-8 w-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                    <div className="h-3 w-3 bg-white rounded-full animate-ping absolute"></div>
                    <span className="text-xs font-bold">JT</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                {currentProject.items.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between p-2.5 bg-slate-700/40 rounded-lg border border-slate-600 hover:border-cyan-400/30 transition-all text-sm"
                  >
                    <div>
                      <div className="font-medium text-cyan-100">{item.name}</div>
                      <div className="text-xs text-cyan-400">{item.description}</div>
                    </div>
                    <div className="font-mono font-bold text-cyan-300">{item.cost}</div>
                  </div>
                ))}
              </div>
              
              <div className="pt-3 border-t border-cyan-400/20">
                <div className="flex justify-between mb-1 text-sm">
                  <div className="text-cyan-300">Total Estimated Cost</div>
                  <div className="font-mono font-bold text-white">{currentProject.total}</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-green-400">AI-Optimized Savings</div>
                  <div className="font-mono font-bold text-green-400">{currentProject.savings}</div>
                </div>
              </div>
            </div>
            
            <div className="p-2 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 text-center text-xs text-cyan-400 border-t border-cyan-400/20">
              Generated in 1.8s by JTech AI Quantum Engine
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-6 border border-slate-700 shadow-lg">
            <div className="text-4xl font-bold text-cyan-300 mb-2">98%</div>
            <div className="text-md text-slate-200">Accuracy Rate</div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-6 border border-slate-700 shadow-lg">
            <div className="text-4xl font-bold text-cyan-300 mb-2">1.8s</div>
            <div className="text-md text-slate-200">Avg. Generation Time</div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-6 border border-slate-700 shadow-lg">
            <div className="text-4xl font-bold text-cyan-300 mb-2">250+</div>
            <div className="text-md text-slate-200">Projects Analyzed</div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-6 border border-slate-700 shadow-lg">
            <div className="text-4xl font-bold text-cyan-300 mb-2">₦1.2B</div>
            <div className="text-md text-slate-200">Total Savings</div>
          </div>
        </div>
      </div>
      
      {/* Construction Elements */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-24 md:h-32 text-slate-900">
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
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;