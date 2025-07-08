// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBuilding, FaHardHat, FaRobot, FaChartLine, 
  FaLightbulb, FaCog, FaSearch, FaBars, 
  FaMoon, FaSun, FaTimes, FaPlus, FaUserFriends,
  FaClipboardList, FaBell, FaComments, FaCalendarAlt,
  FaFileInvoiceDollar, FaRulerCombined
} from 'react-icons/fa';

const DashboardPage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [aiAssistantVisible, setAiAssistantVisible] = useState(true);
  const [activeInsight, setActiveInsight] = useState(0);
  const [notificationCount, setNotificationCount] = useState(3);
  const [teamMembers, setTeamMembers] = useState([]);

  const projects = [
    { 
      id: '1', 
      name: 'Urban Tower Complex', 
      lastUpdated: '2 days ago', 
      status: 'design', 
      progress: 45, 
      aiRecommendations: 12,
      budget: '$12.8M',
      timeline: '18 months',
      team: 8
    },
    { 
      id: '2', 
      name: 'Residential High-Rise', 
      lastUpdated: '1 week ago', 
      status: 'estimation', 
      progress: 78, 
      aiRecommendations: 8,
      budget: '$8.5M',
      timeline: '12 months',
      team: 6
    },
    { 
      id: '3', 
      name: 'Commercial Plaza', 
      lastUpdated: '3 weeks ago', 
      status: 'completed', 
      progress: 100, 
      aiRecommendations: 0,
      budget: '$15.2M',
      timeline: '24 months',
      team: 12
    },
    { 
      id: '4', 
      name: 'Mixed-Use Development', 
      lastUpdated: '1 month ago', 
      status: 'analysis', 
      progress: 32, 
      aiRecommendations: 5,
      budget: '$22.7M',
      timeline: '36 months',
      team: 15
    },
  ];

  const aiInsights = [
    {
      id: 1,
      title: "Material Cost Reduction",
      description: "AI recommends alternative materials that could save $124K on your Urban Tower project",
      icon: <FaFileInvoiceDollar className="h-5 w-5" />,
      color: "bg-gradient-to-r from-green-500 to-emerald-400"
    },
    {
      id: 2,
      title: "Timeline Optimization",
      description: "Reschedule foundation work to save 3 weeks on Residential High-Rise",
      icon: <FaCalendarAlt className="h-5 w-5" />,
      color: "bg-gradient-to-r from-blue-500 to-cyan-400"
    },
    {
      id: 3,
      title: "Structural Efficiency",
      description: "Redesign support beams to reduce material usage by 8% in Mixed-Use Development",
      icon: <FaRulerCombined className="h-5 w-5" />,
      color: "bg-gradient-to-r from-purple-500 to-indigo-400"
    }
  ];

  const activities = [
    { id: 1, user: "Emma Chen", action: "uploaded updated blueprints", project: "Urban Tower", time: "10 min ago" },
    { id: 2, user: "David Rodriguez", action: "approved budget changes", project: "Residential High-Rise", time: "45 min ago" },
    { id: 3, user: "Sarah Johnson", action: "added new material specifications", project: "Mixed-Use Development", time: "2 hours ago" },
    { id: 4, user: "Michael Thompson", action: "completed structural analysis", project: "Commercial Plaza", time: "5 hours ago" }
  ];

  useEffect(() => {
    const filtered = projects.filter(project => 
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
    
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    
    // Simulate team members
    setTeamMembers([
      { id: 1, name: 'Emma Chen', role: 'Lead Architect', avatarColor: 'bg-blue-500' },
      { id: 2, name: 'David Rodriguez', role: 'Project Manager', avatarColor: 'bg-green-500' },
      { id: 3, name: 'Sarah Johnson', role: 'QS Specialist', avatarColor: 'bg-purple-500' },
      { id: 4, name: 'Michael Thompson', role: 'Structural Engineer', avatarColor: 'bg-amber-500' },
    ]);
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Auto-rotate AI insights
    const insightInterval = setInterval(() => {
      setActiveInsight(prev => (prev + 1) % aiInsights.length);
    }, 5000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(insightInterval);
    };
  }, [searchQuery]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleNotifications = () => setNotificationCount(0);

  // Theme-based styling
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  const headerBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const sidebarBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const inputBg = darkMode ? 'bg-gray-700' : 'bg-gray-100';
  const hoverBg = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100';
  const secondaryText = darkMode ? 'text-gray-400' : 'text-gray-500';
  const shadow = darkMode ? 'shadow-lg' : 'shadow-md';
  const heroBg = darkMode 
    ? 'bg-gradient-to-r from-blue-900 to-cyan-800' 
    : 'bg-gradient-to-r from-blue-600 to-cyan-500';

  const getStatusColor = (status) => {
    const statusColors = {
      design: 'bg-blue-500',
      estimation: 'bg-yellow-500',
      analysis: 'bg-purple-500',
      completed: 'bg-green-500'
    };
    return statusColors[status] || 'bg-gray-500';
  };

  // AI Assistant component
  const AiAssistant = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`fixed right-6 bottom-6 z-20 w-80 rounded-2xl ${shadow} overflow-hidden ${
        darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
        : 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200'
      }`}
    >
      <div className={`p-4 flex items-center justify-between ${
        darkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 w-10 h-10 rounded-full flex items-center justify-center">
            <FaRobot className="text-white text-lg" />
          </div>
          <div className="ml-3">
            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Construction AI</h3>
            <p className={`text-xs ${secondaryText}`}>Ready to assist</p>
          </div>
        </div>
        <button 
          onClick={() => setAiAssistantVisible(false)}
          className={secondaryText}
        >
          <FaTimes className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4">
        <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <span className="font-medium">AI Tip:</span> Your "Residential High-Rise" project could save 12% on structural materials with optimized design.
        </p>
        <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
          Optimize Project
        </button>
      </div>
      <div className={`h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500`}></div>
    </motion.div>
  );

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} flex transition-colors duration-300`}>
      {/* Top Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-30 ${headerBg} ${shadow} h-16 flex items-center px-4 lg:px-8`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className={`mr-4 lg:hidden ${secondaryText} hover:${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              <FaBars className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0 flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 w-10 h-10 rounded-lg flex items-center justify-center">
                <FaBuilding className="text-white text-lg" />
              </div>
              <span className="ml-3 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 px-2 py-1 rounded-lg">
                ConstructAI
              </span>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search projects, materials, or team..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${inputBg} border ${
                  darkMode ? 'border-gray-600' : 'border-gray-300'
                } ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              />
              <div className={`absolute left-3 top-2.5 ${secondaryText}`}>
                <FaSearch className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button 
              onClick={toggleNotifications}
              className={`p-2 relative rounded-full ${hoverBg}`}
            >
              <FaBell className={`h-5 w-5 ${secondaryText}`} />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'
              } transition-colors`}
            >
              {darkMode ? <FaMoon className="h-5 w-5" /> : <FaSun className="h-5 w-5" />}
            </button>
            
            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex flex-col items-end">
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {currentUser?.name || 'User'}
                </span>
                <span className={`text-xs ${secondaryText}`}>Senior QS</span>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 w-10 h-10 rounded-full flex items-center justify-center text-white">
                  <FaHardHat className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className={`fixed lg:static z-20 h-full ${sidebarBg} border-r ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            } ${shadow} lg:shadow-none`}
          >
            <div className="h-full flex flex-col">
              <div className="p-6 pb-0 flex justify-between items-center lg:hidden">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 w-8 h-8 rounded-lg flex items-center justify-center">
                    <FaBuilding className="text-white text-sm" />
                  </div>
                  <span className="ml-2 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 px-2 py-1 rounded">
                    ConstructAI
                  </span>
                </div>
                <button 
                  onClick={toggleSidebar}
                  className={secondaryText}
                >
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-8">
                  <h2 className={`text-sm font-semibold ${secondaryText} mb-4 uppercase tracking-wider`}>
                    Navigation
                  </h2>
                  <nav>
                    <ul className="space-y-1">
                      {[
                        { name: 'Dashboard', icon: <FaChartLine className="h-5 w-5 mr-3" /> },
                        { name: 'Projects', icon: <FaBuilding className="h-5 w-5 mr-3" /> },
                        { name: 'Material Library', icon: <FaClipboardList className="h-5 w-5 mr-3" /> },
                        { name: 'Reports', icon: <FaChartLine className="h-5 w-5 mr-3" /> },
                        { name: 'Team', icon: <FaUserFriends className="h-5 w-5 mr-3" /> },
                      ].map((item) => (
                        <motion.li 
                          key={item.name}
                          whileHover={{ x: 5 }}
                          className="mb-1"
                        >
                          <a
                            href="#"
                            className={`flex items-center p-3 rounded-lg transition-colors ${hoverBg}`}
                          >
                            {item.icon}
                            {item.name}
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>
                </div>

                <div className="mb-8">
                  <h2 className={`text-sm font-semibold ${secondaryText} mb-4 uppercase tracking-wider`}>
                    AI Tools
                  </h2>
                  <nav>
                    <ul className="space-y-1">
                      {[
                        { name: 'Cost Estimator', icon: <FaRobot className="h-5 w-5 mr-3 text-blue-400" /> },
                        { name: 'Material Optimizer', icon: <FaLightbulb className="h-5 w-5 mr-3 text-yellow-400" /> },
                        { name: 'Structural Analysis', icon: <FaBuilding className="h-5 w-5 mr-3 text-purple-400" /> },
                        { name: 'Project Timeline', icon: <FaChartLine className="h-5 w-5 mr-3 text-green-400" /> },
                        { name: 'Risk Assessment', icon: <FaCog className="h-5 w-5 mr-3 text-red-400" /> },
                      ].map((item) => (
                        <motion.li 
                          key={item.name}
                          whileHover={{ x: 5 }}
                          className="mb-1"
                        >
                          <a
                            href="#"
                            className={`flex items-center p-3 rounded-lg transition-colors ${hoverBg}`}
                          >
                            {item.icon}
                            {item.name}
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>
                </div>
                
                <div className="mt-auto">
                  <button
                    onClick={logout}
                    className={`w-full py-3 ${
                      darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } rounded-lg font-medium transition-colors flex items-center justify-center`}
                  >
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 min-h-screen pt-16 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Hero Section */}
          <div className={`mb-10 relative overflow-hidden rounded-2xl ${heroBg} p-6 md:p-8 text-white`}>
            <div className={`absolute inset-0 opacity-20 ${
              darkMode ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CiAgPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSIgLz4KICA8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSI1IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSIgLz4KICA8bGluZSB4MT0iMCIgeTE9IjIwIiB4Mj0iNDAiIHkyPSIyMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiIC8+CiAgPGxpbmUgeDE9IjIwIiB5MT0iMCIgeDI9IjIwIiB5Mj0iNDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIiAvPgo8L3N2Zz4K')]" 
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
                  onClick={() => navigate('/editor/new')}
                >
                  <FaPlus className="mr-2" />
                  Create New Project
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg flex items-center"
                >
                  <FaRobot className="mr-2" />
                  Explore AI Tools
                </motion.button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {/* Stats Section */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Active Projects', value: 8, change: '+1.4%', icon: <FaBuilding className="h-6 w-6 text-white" />, color: 'from-blue-500 to-cyan-400' },
                  { title: 'Cost Savings', value: '$248K', change: '+12.6%', icon: <FaChartLine className="h-6 w-6 text-white" />, color: 'from-green-500 to-emerald-400' },
                  { title: 'AI Recommendations', value: 42, change: '+8.7%', icon: <FaLightbulb className="h-6 w-6 text-white" />, color: 'from-yellow-500 to-amber-400' },
                  { title: 'Risk Factors', value: 3, change: '-2.1%', icon: <FaCog className="h-6 w-6 text-white" />, color: 'from-purple-500 to-indigo-400' },
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                    whileHover={{ y: -5 }}
                    className={`rounded-xl p-6 ${shadow} overflow-hidden relative ${cardBg}`}
                  >
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color}`}></div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-sm font-medium ${secondaryText}`}>
                          {stat.title}
                        </p>
                        <p className={`text-2xl font-bold mt-1 ${textColor}`}>
                          {stat.value}
                        </p>
                      </div>
                      <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg`}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <span className={`text-xs font-medium ${
                        darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'
                      } py-1 px-2 rounded-full`}>
                        {stat.change}
                      </span>
                      <span className={`text-xs ml-2 ${secondaryText}`}>last 30 days</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className={`rounded-xl p-6 ${shadow} ${cardBg} relative overflow-hidden`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-bold ${textColor}`}>AI Insights</h2>
                <div className="flex space-x-2">
                  {aiInsights.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveInsight(index)}
                      className={`w-2 h-2 rounded-full ${index === activeInsight ? 'bg-cyan-500' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeInsight}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <div className={`${aiInsights[activeInsight].color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    {aiInsights[activeInsight].icon}
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${textColor}`}>
                    {aiInsights[activeInsight].title}
                  </h3>
                  <p className={`text-sm ${secondaryText}`}>
                    {aiInsights[activeInsight].description}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                View Details
              </button>
            </div>
          </div>

          {/* Project Tabs */}
          <div className={`flex border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'} mb-6`}>
            {['projects', 'analysis', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium relative ${
                  activeTab === tab 
                    ? 'text-cyan-500' 
                    : `${secondaryText} hover:${darkMode ? 'text-gray-300' : 'text-gray-700'}`
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500"
                    layoutId="tabIndicator"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project Grid */}
            <div className="lg:col-span-2">
              {/* Mobile Search */}
              <div className="mb-6 lg:hidden">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
                    } border ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                  />
                  <div className={`absolute left-3 top-2.5 ${secondaryText}`}>
                    <FaSearch className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Project Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                  <motion.div 
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    className={`rounded-2xl overflow-hidden border ${
                      darkMode ? 'border-gray-700' : 'border-gray-200'
                    } ${cardBg} cursor-pointer ${shadow}`}
                    onClick={() => navigate(`/editor/${project.id}`)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <span className={`${getStatusColor(project.status)} w-3 h-3 rounded-full mr-2`}></span>
                            <span className={`text-xs font-medium uppercase ${secondaryText}`}>
                              {project.status}
                            </span>
                          </div>
                          <h3 className={`text-lg font-bold mt-2 ${textColor}`}>{project.name}</h3>
                          <p className={`text-sm mt-1 ${secondaryText}`}>
                            Last updated {project.lastUpdated}
                          </p>
                        </div>
                        <div className={`p-2 rounded-lg ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          <FaBuilding className="text-cyan-500" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className={`text-xs ${secondaryText}`}>Budget</p>
                          <p className={`font-medium ${textColor}`}>{project.budget}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${secondaryText}`}>Timeline</p>
                          <p className={`font-medium ${textColor}`}>{project.timeline}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${secondaryText}`}>Team</p>
                          <p className={`font-medium ${textColor}`}>{project.team} members</p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <div className="flex justify-between mb-1">
                          <span className={`text-sm ${secondaryText}`}>Progress</span>
                          <span className={`text-sm font-medium ${textColor}`}>{project.progress}%</span>
                        </div>
                        <div className={`w-full rounded-full h-2 ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-200'
                        }`}>
                          <motion.div 
                            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full" 
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          ></motion.div>
                        </div>
                      </div>
                      
                      {/* AI Recommendations Badge */}
                      {project.aiRecommendations > 0 && (
                        <div className="mt-4 flex items-center">
                          <div className="bg-gradient-to-r from-purple-500 to-indigo-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                            {project.aiRecommendations} AI Recommendations
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={`px-6 py-3 border-t ${
                      darkMode ? 'border-gray-700 bg-gray-850' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex justify-between text-sm">
                        <span className={secondaryText}>AI Analysis</span>
                        <span className="font-medium text-green-500 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Complete
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* New Project Card */}
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-2xl border-2 border-dashed ${
                    darkMode ? 'border-cyan-500/30' : 'border-cyan-500/50'
                  } flex flex-col items-center justify-center p-10 cursor-pointer ${
                    darkMode ? 'bg-gradient-to-br from-gray-800/50 to-cyan-900/10 hover:bg-gray-800/70' 
                    : 'bg-gradient-to-br from-gray-50 to-cyan-100/30 hover:bg-gray-100/70'
                  } transition-all`}
                  onClick={() => navigate('/editor/new')}
                >
                  <motion.div 
                    className={`p-4 rounded-full mb-4 ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 w-12 h-12 rounded-full flex items-center justify-center">
                      <FaPlus className="text-white text-xl" />
                    </div>
                  </motion.div>
                  <h3 className={`text-lg font-medium ${textColor}`}>Create New Project</h3>
                  <p className={`text-center mt-2 ${secondaryText}`}>
                    Start a new construction project with AI assistance
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Activity and Team Section */}
            <div className="space-y-6">
              {/* Team Section */}
              <div className={`rounded-2xl overflow-hidden border ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              } ${cardBg} ${shadow}`}>
                <div className={`p-4 border-b ${
                  darkMode ? 'border-gray-700 bg-gray-850' : 'border-gray-200 bg-gray-50'
                } flex items-center justify-between`}>
                  <h3 className={`text-lg font-bold ${textColor}`}>Team Members</h3>
                  <button className={`text-sm font-medium ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                    View All
                  </button>
                </div>
                <div className="p-4">
                  {teamMembers.map((member, index) => (
                    <motion.div 
                      key={member.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                    >
                      <div className={`${member.avatarColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-medium`}>
                        {member.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className={`font-medium ${textColor}`}>{member.name}</p>
                        <p className={`text-sm ${secondaryText}`}>{member.role}</p>
                      </div>
                      <button className={`ml-auto p-2 rounded-full ${hoverBg}`}>
                        <FaComments className={`${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Activity Feed */}
              <div className={`rounded-2xl overflow-hidden border ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              } ${cardBg} ${shadow}`}>
                <div className={`p-4 border-b ${
                  darkMode ? 'border-gray-700 bg-gray-850' : 'border-gray-200 bg-gray-50'
                } flex items-center justify-between`}>
                  <h3 className={`text-lg font-bold ${textColor}`}>Recent Activity</h3>
                  <button className={`text-sm font-medium ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                    View All
                  </button>
                </div>
                <div className="p-4">
                  {activities.map((activity, index) => (
                    <motion.div 
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                    >
                      <div className="flex items-start">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 w-8 h-8 rounded-full flex items-center justify-center">
                          <FaUserFriends className="text-white text-sm" />
                        </div>
                        <div className="ml-3">
                          <p className={textColor}>
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </p>
                          <p className={`text-sm ${secondaryText}`}>
                            on <span className="font-medium">{activity.project}</span> • {activity.time}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Assistant */}
          <AnimatePresence>
            {aiAssistantVisible && <AiAssistant />}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Global styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;