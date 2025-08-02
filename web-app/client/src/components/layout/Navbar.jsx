import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

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

  const navigateToSection = (sectionId, event) => {
    event.preventDefault();
    closeMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      setActiveLink(sectionId);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLogoClick = (event) => {
    event.preventDefault();
    setActiveLink(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-transparent absolute w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 pt-4">
            <motion.div 
              className="w-12 h-12 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 10 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white font-bold text-xl">Co</span>
            </motion.div>
        {/* Logo */}
        <a href="/" onClick={handleLogoClick} className="text-white text-2xl font-bold">
            Constructly
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 ml-auto">
          <a href="/" onClick={handleLogoClick} className="text-white hover:text-cyan-400 font-medium transition duration-300">
            Home
          </a>
          <a href="#features" onClick={(e) => navigateToSection('features', e)} className="text-white hover:text-cyan-400 font-medium transition duration-300">
            Features
          </a>
          <a href="#process-intro" onClick={(e) => navigateToSection('process-intro', e)} className="text-white hover:text-cyan-400 font-medium transition duration-300">
            How it works
          </a>
          <a href="#testimonials" onClick={(e) => navigateToSection('testimonials', e)} className="text-white hover:text-cyan-400 font-medium transition duration-300">
            Testimonials
          </a>
          <a href="#pricing" onClick={(e) => navigateToSection('pricing', e)} className="text-white hover:text-cyan-400 font-medium transition duration-300">
            Pricing
          </a>

          {/* Sign In Button */}
          <motion.button
            type="button"
            className="ml-4 px-4 py-2 font-medium rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md hover:opacity-90 transition-all duration-300"
            onClick={handleLoginRedirect}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          type="button"
          className="md:hidden text-white focus:outline-none z-50"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </motion.button>
      </div>

      {/* Background overlay and mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Low-opacity background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              onClick={toggleMenu}
            />

            {/* Mobile nav content */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 z-50 flex flex-col justify-center items-center bg-white/90 space-y-6 text-lg font-semibold"
            >
              <a href="/" onClick={handleLogoClick} className="text-gray-900 hover:text-cyan-500 transition duration-300">
                Home
              </a>
              <a href="#features" onClick={(e) => navigateToSection('features', e)} className="text-gray-900 hover:text-cyan-500 transition duration-300">
                Features
              </a>
              <a href="#process-intro" onClick={(e) => navigateToSection('process-intro', e)} className="text-gray-900 hover:text-cyan-500 transition duration-300">
                How it works
              </a>
              <a href="#testimonials" onClick={(e) => navigateToSection('testimonials', e)} className="text-gray-900 hover:text-cyan-500 transition duration-300">
                About us
              </a>
              <a href="#pricing" onClick={(e) => navigateToSection('pricing', e)} className="text-gray-900 hover:text-cyan-500 transition duration-300">
                Contact
              </a>
              {/* Sign In Button */}
              <motion.button
                type="button"
                className="ml-4 px-4 py-2 font-medium rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md hover:opacity-90 transition-all duration-300"
                onClick={handleLoginRedirect}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
