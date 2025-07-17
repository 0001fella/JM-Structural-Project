import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/landing/HeroSection';
import FeaturesGrid from '../components/landing/FeaturesGrid';
import ProcessSteps from '../components/landing/ProcessSteps';
import Testimonials from '../components/landing/testimonials';
import Pricing from '../components/landing/Pricing';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const LandingPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Handle navigation to sections
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  // Handle button actions
  const handleStartTrial = () => {
    window.location.href = '/signup';
  };

  const handleScheduleDemo = () => {
    window.location.href = '/contact';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-hidden">
      <Navbar />
      
      <HeroSection onGetStarted={() => scrollToSection('features')} />
      
      {/* Logo Cloud */}
      <div className="py-12 bg-gray-50" id="features">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-medium text-gray-600">TRUSTED BY INDUSTRY LEADERS</h3>
          </motion.div>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i} 
                className="flex justify-center"
                variants={itemVariants}
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-16" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      <FeaturesGrid onLearnMore={() => scrollToSection('process-intro')} />
      <ProcessSteps id="process-intro" />
      <Testimonials id="testimonials" />
      <Pricing id="pricing" onSelectPlan={() => window.location.href = '/signup'} />
      
      {/* CTA Section */}
      <section 
        ref={ref}
        className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white"
        id="cta"
      >
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={itemVariants}
          >
            Ready to Transform Your Construction Estimates?
          </motion.h2>
          <motion.p 
            className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={itemVariants}
          >
            Join thousands of professionals using JTech AI for precise construction estimations
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={itemVariants}
          >
            <motion.button 
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
              onClick={handleStartTrial}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(37, 99, 235, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
            </motion.button>
            <motion.button 
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow hover:bg-blue-50 transition-colors"
              onClick={handleScheduleDemo}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#eff6ff",
                boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Demo
            </motion.button>
          </motion.div>
          
          <motion.p 
            className="mt-6 text-blue-200 text-sm"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={itemVariants}
          >
            No credit card required • 14-day free trial • Cancel anytime
          </motion.p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;