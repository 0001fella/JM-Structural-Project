import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const HeroSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5"
          alt="Construction site"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/60"></div>
      </div>

      {/* Hero Content */}
      
      <div className="relative z-10 container mx-auto px-6 md:px-12 pt-32 md:pt-40 lg:pt-36 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side - Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.div
              className="inline-block bg-blue-800/40 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 border border-cyan-400/30"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="text-cyan-300 font-medium text-lg">
                AI-Powered Construction Estimation Software
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Instant Smart <span className="text-cyan-400">Estimates at </span>Your Fingertips
            </motion.h1>

            <motion.h2
              className="text-xl md:text-2xl font-light text-cyan-400 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Accurate material & cost estimates in seconds
            </motion.h2>

            <motion.p
              className="text-base md:text-lg text-slate-300 mb-10 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Build smarter, not harder! Our construction estimation app instantly calculates and
              displays your bill of quantities — so you can plan accurately & maximize profits.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/create-project"
                className="bg-cyan-500 hover:bg-white hover:text-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-500 shadow-lg text-center"
              >
                Create a New Project
              </Link>
              <Link
                to="/how-it-works"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-3 px-6 rounded-lg transition-all duration-500 text-center"
              >
                How Constructly Works
              </Link>
            </motion.div>
          </div>

          {/* Right Side - Hero Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <motion.div
              className="relative w-full max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="https://i.pinimg.com/736x/92/97/8a/92978ab87f671c343f1a2fc133e417d3.jpg"
                alt="Construction estimation dashboard"
                className="rounded-lg shadow-2xl border-4 border-white/10 w-full -auto"
              />
              <div className="absolute -inset-4 border-2 border-cyan-400/30 rounded-lg z-0 pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
