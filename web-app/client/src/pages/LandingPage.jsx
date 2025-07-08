import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import FeaturesGrid from '../components/landing/FeaturesGrid';
import { FaBuilding, FaUsers, FaChartBar, FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const processSteps = [
    {
      icon: <FaBuilding className="text-4xl" />,
      title: "Upload Blueprints",
      description: "Simply upload your construction blueprints in PDF format"
    },
    {
      icon: <FaLightbulb className="text-4xl" />,
      title: "AI Analysis",
      description: "Our AI analyzes dimensions, materials, and requirements"
    },
    {
      icon: <FaChartBar className="text-4xl" />,
      title: "Get Estimates",
      description: "Receive accurate cost breakdowns in minutes, not days"
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Collaborate",
      description: "Share and refine estimates with your team"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A142F] text-white overflow-hidden">
      <HeroSection />
      <FeaturesGrid />
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-[#1C2C65]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How <span className="text-[#FFC947]">It Works</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              Transform your construction estimation process in four simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="bg-[#0A142F] p-8 rounded-2xl border border-[#2A3D7A] text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-[#1C2C65] w-20 h-20 rounded-full flex items-center justify-center text-[#FFC947]">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-300">{step.description}</p>
                <div className="mt-6 text-3xl font-bold text-[#FFC947]">{index + 1}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-[#0A142F]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="text-[#FFC947]">Clients Say</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              Trusted by engineers, architects, and construction firms worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="bg-[#1C2C65] p-8 rounded-2xl border border-[#2A3D7A]"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic">
                  "JTech AI has revolutionized our estimation process. What used to take days now takes hours, with significantly improved accuracy that's transformed our bidding strategy."
                </p>
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-full w-12 h-12" />
                  <div className="ml-4">
                    <div className="font-bold">Michael Reynolds</div>
                    <div className="text-[#FFC947]">Senior Project Manager</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-[#0A142F] to-[#1C2C65]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
          <div className="bg-[#0A142F] p-12 rounded-3xl border border-[#FFC947] shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Construction Estimates?
            </h2>
            <p className="text-slate-300 mb-10 text-xl">
              Join thousands of professionals using JTech AI for precise construction estimations
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-8 py-4 bg-[#FFC947] text-[#0A142F] font-bold rounded-lg shadow-lg hover:bg-[#FFD369] transition-colors">
                Start Free Trial
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-[#FFC947] text-[#FFC947] font-bold rounded-lg hover:bg-[#FFC947]/10 transition-colors">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#0A142F] border-t border-[#1C2C65] py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold">JT</span>
                </div>
                <span className="ml-3 text-xl font-bold text-white">
                  JTech AI
                </span>
              </div>
              <p className="text-slate-300 mb-6">
                AI-powered construction estimation for engineers and quantity surveyors.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#FFC947] mb-6">Product</h3>
              <ul className="space-y-3">
                {['Features', 'Solutions', 'Pricing', 'Templates', 'Releases'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-300 hover:text-[#FFC947] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#FFC947] mb-6">Resources</h3>
              <ul className="space-y-3">
                {['Documentation', 'Tutorials', 'Blog', 'Help Center'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-300 hover:text-[#FFC947] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#FFC947] mb-6">Contact</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start">
                  <span>123 Innovation Blvd, Tech City</span>
                </li>
                <li className="flex items-start">
                  <span>contact@jtechai.com</span>
                </li>
                <li className="flex items-start">
                  <span>+1 (555) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#1C2C65] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 mb-4 md:mb-0">
              © 2025 JTech AI. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a key={item} href="#" className="text-slate-400 hover:text-[#FFC947] transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;