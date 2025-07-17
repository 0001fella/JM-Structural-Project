import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHome, FaCalculator, FaChartLine, 
  FaUserFriends, FaComments, FaTimes 
} from 'react-icons/fa';

const SidebarNavigation = ({ 
  isSidebarOpen, 
  toggleSidebar, 
  themeClasses, 
  projects, 
  activeTab, 
  setActiveTab, 
  setCurrentProject,
  currentProject
}) => {
  const getStatusColor = (status) => {
    const statusColors = {
      design: 'bg-blue-500',
      estimation: 'bg-amber-500',
      analysis: 'bg-purple-500',
      completed: 'bg-emerald-500'
    };
    return statusColors[status] || 'bg-gray-500';
  };

  return (
    <motion.aside 
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', damping: 25 }}
      className={`fixed lg:static z-20 h-full ${themeClasses.sidebarBg} border-r ${
        themeClasses.darkMode ? 'border-gray-700' : 'border-gray-200'
      } ${themeClasses.shadow} lg:shadow-none w-64`}
    >
      <div className="h-full flex flex-col">
        <div className="p-6 pb-0 flex justify-between items-center lg:hidden">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 w-8 h-8 rounded-lg flex items-center justify-center">
              <FaComments className="text-white text-sm" />
            </div>
            <span className="ml-2 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
              JTech Ai
            </span>
          </div>
          <button 
            onClick={toggleSidebar}
            className={themeClasses.secondaryText}
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="mb-2 px-6">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                activeTab === 'dashboard' 
                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-300' 
                  : `${themeClasses.hoverBg} ${themeClasses.textColor}`
              }`}
            >
              <FaHome className="mr-3 text-blue-500" />
              Dashboard
            </button>
          </div>
          
          <div className="mb-6 px-3">
            <h2 className={`text-xs font-semibold ${themeClasses.secondaryText} px-3 py-2 uppercase tracking-wider`}>
              Projects
            </h2>
            <div>
              {projects.slice(0, 3).map(project => (
                <button
                  key={project.id}
                  onClick={() => {
                    setActiveTab(project.id);
                    setCurrentProject(project);
                  }}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === project.id 
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-300' 
                      : `${themeClasses.hoverBg} ${themeClasses.textColor}`
                  }`}
                >
                  <div className={`${getStatusColor(project.status)} w-2 h-2 rounded-full mr-3`}></div>
                  <span className="truncate">{project.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6 px-3">
            <h2 className={`text-xs font-semibold ${themeClasses.secondaryText} px-3 py-2 uppercase tracking-wider`}>
              Tools
            </h2>
            <nav>
              <ul>
                <li className="mb-1">
                  <button 
                    onClick={() => setActiveTab('quotation-generator')}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeTab === 'quotation-generator' 
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-300' 
                        : `${themeClasses.hoverBg} ${themeClasses.textColor}`
                    }`}
                  >
                    <FaCalculator className="mr-3 text-blue-500" />
                    Quotation Generator
                  </button>
                </li>
                <li className="mb-1">
                  <button 
                    onClick={() => setActiveTab('analysis')}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeTab === 'analysis' 
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-300' 
                        : `${themeClasses.hoverBg} ${themeClasses.textColor}`
                    }`}
                  >
                    <FaChartLine className="mr-3 text-green-500" />
                    Cost Analysis
                  </button>
                </li>
                <li className="mb-1">
                  <button 
                    onClick={() => setActiveTab('resources')}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeTab === 'resources' 
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-300' 
                        : `${themeClasses.hoverBg} ${themeClasses.textColor}`
                    }`}
                  >
                    <FaUserFriends className="mr-3 text-purple-500" />
                    Resource Planning
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-400 w-10 h-10 rounded-full flex items-center justify-center">
              <FaComments className="text-white" />
            </div>
            <div className="ml-3">
              <p className="font-medium">Need help?</p>
              <p className={`text-sm ${themeClasses.secondaryText}`}>Contact support</p>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default SidebarNavigation;