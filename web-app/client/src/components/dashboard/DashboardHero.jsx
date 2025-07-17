import React from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaRobot } from 'react-icons/fa';

const DashboardHero = ({ themeClasses, currentUser, setActiveTab, setCurrentProject }) => {
  return (
    <div className={`mb-10 relative overflow-hidden rounded-2xl ${themeClasses.heroBg} p-6 md:p-8 text-white`}>
      <div className={`absolute inset-0 opacity-20 ${
        themeClasses.darkMode ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CiAgPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSIgLz4KICA8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSI1IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSIgLz4KICA8bGluZSB4MT0iMCIgeTE9IjIwIiB4Mj0iNDAiIHkyPSIyMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiIC8+CiAgPGxpbmUgeDE9IjIwIiB5MT0iMCIgeDI9IjIwIiB5Mj0iNDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIiAvPgo8L3N2Zz4K')]" 
        : "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CiAgPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMSIgLz4KICA8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSI1IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMSIgLz4KICA8bGluZSB4MT0iMCIgeTE9IjIwIiB4Mj0iNDAiIHkyPSIyMCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiIC8+CiAgPGxpbmUgeDE9IjIwIiB5MT0iMCIgeDI9IjIwIiB5Mj0iNDAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIiAvPgo8L3N2Zz4K')]"
      }`}></div>
      
      {/* Floating AI Elements */}
      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-float"></div>
      <div className="absolute bottom-8 left-8 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-float animation-delay-2000"></div>
      
      <div className="relative z-10 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Welcome back, <span className="text-amber-300">{currentUser?.name || "Engineer"}</span>
        </motion.h1>
        <p className="text-blue-100 mb-6 max-w-xl">
          Optimize project costs, timelines, and resources with real-time AI analysis and predictive modeling
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-900 font-bold py-3 px-6 rounded-lg shadow-lg flex items-center"
            onClick={() => {
              setCurrentProject({
                id: 'new',
                name: 'New Project',
                status: 'draft'
              });
              setActiveTab('quotation-generator');
            }}
          >
            <FaPlus className="mr-2" />
            Create New Project
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg flex items-center"
            onClick={() => setActiveTab('quotation-generator')}
          >
            <FaRobot className="mr-2" />
            Generate Quotation
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;