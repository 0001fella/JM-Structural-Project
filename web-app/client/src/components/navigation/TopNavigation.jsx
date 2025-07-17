import React from 'react';
import { 
  FaSearch, FaBars, FaMoon, 
  FaSun, FaBell, FaChevronDown 
} from 'react-icons/fa';

const TopNavigation = ({ 
  darkMode,
  themeClasses,
  searchQuery,
  setSearchQuery,
  toggleSidebar,
  toggleDarkMode,
  toggleNotifications,
  toggleUserMenu,
  isUserMenuOpen,
  notificationCount,
  currentUser,
  logout
}) => {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-30 ${themeClasses.headerBg} ${themeClasses.shadow} h-16 flex items-center px-4 lg:px-8 border-b ${themeClasses.borderColor}`}>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className={`mr-4 lg:hidden ${themeClasses.secondaryText} hover:${darkMode ? 'text-white' : 'text-gray-900'} transition-colors`}
          >
            <FaBars className="h-6 w-6" />
          </button>
          <div className="flex-shrink-0 flex items-center">
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 w-10 h-10 rounded-lg flex items-center justify-center">
              <FaSearch className="text-white text-lg" />
            </div>
            <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
              JTech AI
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
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${themeClasses.inputBg} border ${
                darkMode ? 'border-gray-600' : 'border-gray-300'
              } ${themeClasses.textColor} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            <div className={`absolute left-3 top-2.5 ${themeClasses.secondaryText}`}>
              <FaSearch className="h-5 w-5" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button 
            onClick={toggleNotifications}
            className={`p-2 relative rounded-full ${themeClasses.hoverBg} transition-colors`}
          >
            <FaBell className={`h-5 w-5 ${themeClasses.secondaryText}`} />
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
              darkMode ? 'bg-gray-700 text-amber-300' : 'bg-gray-200 text-gray-700'
            } transition-colors`}
          >
            {darkMode ? <FaMoon className="h-5 w-5" /> : <FaSun className="h-5 w-5" />}
          </button>
          
          {/* User Menu */}
          <div className="relative">
            <button 
              onClick={toggleUserMenu}
              className="flex items-center space-x-2"
              aria-expanded={isUserMenuOpen}
            >
              <div className="flex flex-col items-end">
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {currentUser?.name || 'User'}
                </span>
                <span className={`text-xs ${themeClasses.secondaryText}`}>Senior QS</span>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-teal-500 w-10 h-10 rounded-full flex items-center justify-center text-white">
                <FaSearch className="text-white" />
              </div>
              <FaChevronDown className={`${themeClasses.secondaryText} text-xs transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className={`absolute right-0 mt-2 w-48 rounded-md ${themeClasses.shadow} ${themeClasses.cardBg} border ${themeClasses.borderColor} z-40`}>
                <div className="py-1">
                  <button className={`w-full text-left px-4 py-2 ${themeClasses.hoverBg} transition-colors`}>
                    Profile Settings
                  </button>
                  <button className={`w-full text-left px-4 py-2 ${themeClasses.hoverBg} transition-colors`}>
                    Account Preferences
                  </button>
                  <button 
                    onClick={logout}
                    className={`w-full text-left px-4 py-2 ${themeClasses.hoverBg} text-red-500 transition-colors`}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;