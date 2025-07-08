import React, { useState, useEffect } from "react";
import { FaCalculator, FaDraftingCompass, FaDatabase, FaArrowRight, FaChartLine, FaRobot, FaSync, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaCalculator className="text-2xl" />,
    title: "AI-Powered Estimates",
    description: "Generate accurate construction cost estimates in seconds using advanced AI models.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <FaDraftingCompass className="text-2xl" />,
    title: "Blueprint Analysis",
    description: "Extract dimensions and details directly from PDF drawings and blueprints.",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: <FaDatabase className="text-2xl" />,
    title: "Smart Material Database",
    description: "Access real-time material pricing and quantities with editable entries.",
    gradient: "from-violet-500 to-purple-500"
  },
  {
    icon: <FaChartLine className="text-2xl" />,
    title: "Project Analytics",
    description: "Track project costs and progress with predictive analytics and visual dashboards.",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    icon: <FaRobot className="text-2xl" />,
    title: "Automated Reporting",
    description: "Generate comprehensive project reports with a single click using AI templates.",
    gradient: "from-rose-500 to-pink-500"
  },
  {
    icon: <FaSync className="text-2xl" />,
    title: "Real-time Collaboration",
    description: "Work simultaneously with team members on the same project documents.",
    gradient: "from-indigo-500 to-blue-500"
  }
];

const FeaturesGrid = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Futuristic background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-1/3 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 w-full h-full">
            {[...Array(144)].map((_, i) => (
              <div key={i} className="border border-gray-300 rounded-sm"></div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Why JTech AI?
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Transform your construction workflow with intelligent automation
          </motion.p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`bg-white p-8 rounded-xl shadow-lg relative overflow-hidden border border-gray-100 transition-all duration-300 ${
                activeIndex === idx ? 'ring-2 ring-blue-500 shadow-xl' : ''
              }`}
            >
              {/* Gradient Highlight */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${feature.gradient}`}></div>
              
              {/* Animated Icon */}
              <motion.div 
                className="flex items-center justify-center mb-6"
                animate={isVisible ? { 
                  scale: activeIndex === idx ? [1, 1.1, 1] : 1 
                } : {}}
                transition={{ 
                  duration: 0.5, 
                  repeat: activeIndex === idx ? Infinity : 0,
                  repeatType: "loop"
                }}
              >
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-md`}>
                  {feature.icon}
                </div>
              </motion.div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              
              <motion.button 
                whileHover={{ x: 5 }}
                className="flex items-center text-sm font-medium text-blue-600 group"
              >
                <span className="mr-2">Learn more</span>
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
              
              {/* Hover effect */}
              <div 
                className={`absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 ${
                  activeIndex === idx ? 'opacity-5' : ''
                }`}
                style={{
                  background: `linear-gradient(120deg, ${feature.gradient.replace('from-', '').replace('to-', '').replace(/\s+/g, ', ')}, transparent 70%)`
                }}
              ></div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          className="mt-24 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 md:p-12 shadow-inner border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Trusted by Industry Leaders</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">JTech AI is transforming construction estimation for top firms worldwide</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "85%", label: "Faster Estimates" },
                { value: "99.7%", label: "Accuracy Rate" },
                { value: "4.8/5", label: "User Rating" },
                { value: "10K+", label: "Projects" }
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  className="text-center bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-700">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Workflow?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-gray-800 font-medium rounded-xl border-2 border-gray-300 hover:border-blue-500 transition-all"
            >
              Schedule a Demo
            </motion.button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-4 text-gray-600">
            <FaShieldAlt className="text-blue-500" />
            <span>Enterprise-grade security · No credit card required</span>
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
      `}</style>
    </section>
  );
};

export default FeaturesGrid;