import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Inline SVG Icons
const FaBars = ({ className, size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const FaTimes = ({ className, size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  // Define a consistent color palette
  const colors = {
    primary: 'indigo-600',
    secondary: 'blue-500',
    accent: 'cyan-400',
    darkText: 'gray-800', // This will be the main text color for white background
    lightText: 'white', // Used for buttons on gradients
    hoverLight: 'indigo-300', // For hover on dark backgrounds
    hoverDark: 'indigo-700', // For hover on light backgrounds
    buttonGradientFrom: 'from-indigo-600',
    buttonGradientTo: 'to-blue-700',
    buttonHoverFrom: 'from-indigo-700',
    buttonHoverTo: 'to-blue-800',
    scrolledBg: 'white', // Changed to white
    scrolledBorderColor: 'gray-300', // Adjusted for white background
    mobileMenuBg: 'white', // White background for mobile menu
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginRedirect = () => {
    window.location.href = '/login';
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  // Handle navigation to section
  const navigateToSection = (sectionId, event) => {
    event.preventDefault();
    closeMenu();
    
    const element = document.getElementById(sectionId);
    if (element) {
      setActiveLink(sectionId);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle logo click
  const handleLogoClick = (event) => {
    event.preventDefault();
    setActiveLink(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic classes based on scroll state
  // Always white background, but adjust padding/shadow based on scroll
  const navBgClass = scrolled ? `bg-white/95 backdrop-blur-xl shadow-lg py-3 border-b border-${colors.scrolledBorderColor}` : 'bg-white/95 py-5';
  const logoTextColorClass = `text-${colors.darkText}`; // Always dark text on white
  const linkTextColorClass = `text-${colors.darkText}`; // Always dark text on white
  const linkHoverClass = `hover:text-${colors.hoverDark}`; // Hover should be darker on light
  const mobileToggleColorClass = `text-${colors.darkText}`; // Always dark text on white

  // Button animations
  const buttonHover = {
    scale: 1.05,
    boxShadow: "0 10px 25px rgba(79, 70, 229, 0.4)",
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 15 
    }
  };

  const buttonTap = {
    scale: 0.95,
    transition: { duration: 0.1 }
  };

  // Framer Motion variants
  const navVariants = {
    initial: { y: -100 },
    animate: { y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
    scrolled: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)', // White with slight transparency
      backdropFilter: 'blur(16px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05)',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      borderBottom: `1px solid ${colors.scrolledBorderColor}`, // Thinner border
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    unscrolled: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)', // Always white with slight transparency
      backdropFilter: 'blur(0px)',
      boxShadow: 'none',
      paddingTop: '1.25rem',
      paddingBottom: '1.25rem',
      borderBottom: '1px solid transparent', // Consistent border style
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const mobileMenuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { 
      x: "0%", 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 15,
        staggerChildren: 0.1
      } 
    },
    exit: { 
      x: "100%", 
      opacity: 0, 
      transition: { 
        ease: "easeOut", 
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      } 
    }
  };

  const linkItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      } 
    }
  };

  // Section mapping with actual IDs
  const sections = [
    { id: 'features', label: 'Features' },
    { id: 'process-intro', label: 'How It Works' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'pricing', label: 'Pricing' }
  ];

  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        .font-inter {
            font-family: 'Inter', sans-serif;
        }
        .mobile-menu-bg {
          background: ${colors.mobileMenuBg}; // Using the new white mobile menu background color
        }
        .button-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4); }
          70% { box-shadow: 0 0 0 12px rgba(79, 70, 229, 0); }
          100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
        }
        .active-link {
          position: relative;
          font-weight: 600;
        }
        .active-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to));
          transform: scaleX(1);
          transition: transform 0.3s ease;
        }
        `}
      </style>
      <motion.nav
        className={`fixed w-full z-50 font-inter ${navBgClass}`}
        variants={navVariants}
        initial="unscrolled"
        animate={scrolled ? "scrolled" : "unscrolled"}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer"
            onClick={handleLogoClick}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ rotateY: 10, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`w-10 h-10 rounded-full bg-gradient-to-tr from-${colors.primary} to-${colors.accent} flex items-center justify-center shadow-md`}>
              <span className="text-white font-black text-xl tracking-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>JT</span>
            </div>
            <span className={`ml-3 text-xl font-bold ${logoTextColorClass} transition-colors duration-300`}>JTech AI</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {sections.map((section, index) => (
              <motion.a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => navigateToSection(section.id, e)}
                className={`relative font-medium ${linkTextColorClass} ${linkHoverClass} transition-colors capitalize py-2 group overflow-hidden ${activeLink === section.id ? 'active-link' : ''}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {section.label}
                <span className={`absolute bottom-0 left-0 w-full h-1 bg-${colors.primary} origin-left transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${activeLink === section.id ? 'scale-x-100' : ''}`}></span>
              </motion.a>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              className={`px-4 py-2 font-medium rounded-lg transition-all duration-300
                ${scrolled ? `text-${colors.darkText} hover:bg-gray-100 border border-gray-300` : `text-${colors.darkText} border border-${colors.darkText} hover:bg-gray-100/50`}
              `}
              onClick={handleLoginRedirect}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              Sign In
            </motion.button>
            
            <motion.button
              className={`px-6 py-2 bg-gradient-to-r ${colors.buttonGradientFrom} ${colors.buttonGradientTo} text-white font-bold rounded-lg shadow-md
                hover:${colors.buttonHoverFrom} hover:${colors.buttonHoverTo} hover:shadow-lg transition-all duration-300 button-pulse`}
              onClick={handleLoginRedirect}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            className={`md:hidden z-50 ${mobileToggleColorClass} transition-colors duration-300`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="times"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="bars"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={`md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center transition-transform duration-300 shadow-xl mobile-menu-bg`}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {sections.map((section, index) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => navigateToSection(section.id, e)}
                  className={`text-2xl font-medium text-${colors.darkText} hover:text-${colors.hoverDark} transition-colors capitalize py-4 w-full text-center ${activeLink === section.id ? 'active-link' : ''}`}
                  variants={linkItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ 
                    scale: 1.05,
                    x: 10,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.label}
                </motion.a>
              ))}
              <div className="flex flex-col space-y-4 mt-8 w-full px-6">
                <motion.button
                  className={`px-8 py-3 font-medium text-xl text-${colors.darkText} rounded-lg hover:bg-gray-100 transition-colors border border-gray-300`}
                  onClick={handleLoginRedirect}
                  variants={linkItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(243, 244, 246, 0.5)", // a lighter gray for hover on mobile button
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
                <motion.button
                  className={`px-8 py-3 bg-gradient-to-r ${colors.buttonGradientFrom} ${colors.buttonGradientTo} text-white font-bold rounded-lg shadow-md
                    hover:${colors.buttonHoverFrom} hover:${colors.buttonHoverTo} hover:shadow-lg transition-all duration-300 text-xl button-pulse`}
                  onClick={handleLoginRedirect}
                  variants={linkItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ 
                    delay: 0.5,
                    type: "spring",
                    stiffness: 300
                  }}
                  whileHover={{
                    scale: 1.05,
                    background: `linear-gradient(to right, var(--${colors.buttonHoverFrom}), var(--${colors.buttonHoverTo}))`,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;