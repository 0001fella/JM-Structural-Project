import React, { useState, useEffect, useRef } from "react";
import { 
  FaCalculator, FaDraftingCompass, FaDatabase, FaArrowRight, 
  FaChartLine, FaRobot, FaSync, FaShieldAlt, FaBrain, FaLightbulb,
  FaHardHat, FaRulerCombined, FaFileInvoiceDollar
} from "react-icons/fa";
import { motion } from "framer-motion";

const FeaturesGrid = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  
  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    if (sectionRef.current) {
      sectionRef.current.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (sectionRef.current) {
        sectionRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const features = [
    {
      icon: <FaBrain className="text-2xl" />,
      title: "AI-Powered Estimates",
      description: "Generate accurate construction cost estimates in seconds using advanced AI models.",
      aiHighlight: "Our neural networks analyze historical project data to predict costs with 98.7% accuracy.",
      animation: "pulse"
    },
    {
      icon: <FaDraftingCompass className="text-2xl" />,
      title: "Blueprint Intelligence",
      description: "Extract dimensions and details directly from PDF drawings and blueprints.",
      aiHighlight: "Computer vision algorithms automatically detect and measure structural elements.",
      animation: "scan"
    },
    {
      icon: <FaDatabase className="text-2xl" />,
      title: "Smart Material Database",
      description: "Access real-time material pricing and quantities with editable entries.",
      aiHighlight: "AI predicts material price fluctuations based on market trends and supply chain data.",
      animation: "wave"
    },
    {
      icon: <FaChartLine className="text-2xl" />,
      title: "Predictive Analytics",
      description: "Track project costs and progress with predictive analytics and visual dashboards.",
      aiHighlight: "Machine learning identifies cost overruns before they happen, saving up to 15% on projects.",
      animation: "graph"
    },
    {
      icon: <FaLightbulb className="text-2xl" />,
      title: "AI-Assisted Reporting",
      description: "Generate comprehensive project reports with a single click using AI templates.",
      aiHighlight: "Natural language processing creates human-like reports tailored to stakeholder needs.",
      animation: "glow"
    },
    {
      icon: <FaRobot className="text-2xl" />,
      title: "Automated Collaboration",
      description: "Work simultaneously with team members on the same project documents.",
      aiHighlight: "AI resolves conflicting edits and suggests optimal solutions for team alignment.",
      animation: "connect"
    }
  ];

  const gradients = [
    "from-cyan-500 to-blue-500",
    "from-amber-500 to-orange-500",
    "from-emerald-500 to-teal-500",
    "from-violet-500 to-purple-500",
    "from-rose-500 to-pink-500",
    "from-indigo-500 to-blue-500"
  ];

  // AI particle positions
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    speed: Math.random() * 2 + 1
  }));

  // Construction stats
  const stats = [
    { value: "85%", label: "Faster Estimates" },
    { value: "99.7%", label: "Accuracy Rate" },
    { value: "4.8/5", label: "User Rating" },
    { value: "10K+", label: "Projects" }
  ];

  return (
    <section 
      id="features" 
      className="py-16 bg-[#0A142F] relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Full-width Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* AI Neural Network Connections - Full Width */}
        <div className="absolute inset-0 opacity-15">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute bg-blue-500 rounded-full"
              initial={{ 
                width: 0,
                height: 1,
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%'
              }}
              animate={isVisible ? { 
                width: Math.random() * 200 + 100 + 'px',
                rotate: Math.random() * 360
              } : {}}
              transition={{ 
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
        
        {/* AI Particles - Cover Entire Screen */}
        <div className="absolute inset-0">
          {particles.map(particle => (
            <motion.div
              key={`particle-${particle.id}`}
              className="absolute rounded-full bg-cyan-400"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                boxShadow: '0 0 10px 2px rgba(59, 130, 246, 0.7)'
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * 50],
                y: [0, (Math.random() - 0.5) * 50]
              }}
              transition={{
                duration: particle.speed * 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Interactive Mouse Trails - Full Width */}
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-blue-500/10 blur-[100px]"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192
          }}
          transition={{ type: "tween", duration: 0.5 }}
        />
        
        {/* Construction Elements */}
        <div className="absolute top-20 left-[5%]">
          <motion.div
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaHardHat className="text-amber-400 text-4xl opacity-20" />
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-[15%]">
          <motion.div
            animate={{ rotate: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaRulerCombined className="text-emerald-400 text-4xl opacity-20" />
          </motion.div>
        </div>
        <div className="absolute top-1/3 right-[10%]">
          <motion.div
            animate={{ rotate: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaFileInvoiceDollar className="text-cyan-400 text-4xl opacity-20" />
          </motion.div>
        </div>
      </div>
      
      {/* Full-width Content Container */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-full text-base font-medium flex items-center justify-center gap-2">
              <FaRobot className="animate-pulse" />
              <span>AI-POWERED CONSTRUCTION TECHNOLOGY</span>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Engineering Intelligence
            </span> <br />for Construction Professionals
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-slate-300 max-w-5xl mx-auto"
          >
            Transform your workflow with AI that understands construction specifications and industry standards
          </motion.p>
        </div>

        {/* Full-width Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
              whileHover={{ 
                y: -15,
                boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25)',
                zIndex: 10
              }}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`bg-gradient-to-br from-[#1C2C65] to-[#0A1A4D] p-6 rounded-xl shadow-lg relative overflow-hidden border border-[#2A3D7A] transition-all duration-300 ${
                activeIndex === idx ? 'ring-2 ring-[#FFC947] shadow-xl' : ''
              }`}
            >
              {/* Animated AI Highlight */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 pointer-events-none"
                animate={{ 
                  opacity: activeIndex === idx ? 0.3 : 0,
                  backgroundPosition: activeIndex === idx ? ['0% 0%', '100% 100%'] : '0% 0%'
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Gradient Highlight */}
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${gradients[idx]}`}></div>
              
              {/* Animated AI Icon */}
              <motion.div 
                className="flex items-center justify-center mb-5"
                animate={isVisible ? { 
                  scale: activeIndex === idx ? [1, 1.2, 1] : 1,
                  rotate: activeIndex === idx ? [0, 5, -5, 0] : 0
                } : {}}
                transition={{ 
                  duration: 0.8, 
                  repeat: activeIndex === idx ? Infinity : 0,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              >
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradients[idx]} text-white shadow-lg`}>
                  {feature.icon}
                </div>
              </motion.div>
              
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-300 mb-4 text-sm">{feature.description}</p>
              
              {/* AI Explanation */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: activeIndex === idx ? 'auto' : 0,
                  opacity: activeIndex === idx ? 1 : 0
                }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <FaRobot className="text-cyan-400 text-sm" />
                    </div>
                    <p className="text-xs text-cyan-200 italic">{feature.aiHighlight}</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.button 
                whileHover={{ x: 5, backgroundColor: '#0A1A4D' }}
                className="mt-5 flex items-center text-sm font-medium text-[#FFC947] group px-3 py-1.5 rounded-lg bg-[#0A142F]/50 text-xs"
              >
                <span className="mr-2">See AI in action</span>
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1 text-xs" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Full-width Stats Section */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-[#0A1A4D] to-[#1C2C65] rounded-2xl p-8 md:p-12 shadow-inner border border-[#2A3D7A] relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">AI Engineered for Construction</h3>
              <p className="text-slate-300 mb-8 max-w-2xl">
                Our proprietary AI models are trained on over 50,000 construction projects, 
                enabling unprecedented accuracy in cost estimation and project planning.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Reduces estimation time", value: "85%" },
                  { label: "Improves cost accuracy", value: "42%" },
                  { label: "Projects completed faster", value: "30%" },
                  { label: "Material waste reduction", value: "27%" }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    className="bg-[#0A142F]/50 p-5 rounded-xl border border-[#2A3D7A]"
                    whileHover={{ y: -5, backgroundColor: '#0A1A4D' }}
                  >
                    <div className="text-2xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                    <div className="text-slate-300 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col">
              {/* AI Visualization */}
              <div className="relative h-64 bg-[#0A142F] rounded-xl border border-cyan-500/30 overflow-hidden flex-1">
                {/* Neural Network Visualization */}
                <div className="absolute inset-0">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={`node-${i}`}
                      className="absolute w-4 h-4 bg-cyan-500 rounded-full"
                      style={{
                        left: `${15 + (i * 7)}%`,
                        top: `${30 + Math.sin(i) * 20}%`
                      }}
                      animate={{ 
                        boxShadow: [
                          '0 0 0 0 rgba(59, 130, 246, 0.7)',
                          '0 0 0 12px rgba(59, 130, 246, 0)'
                        ] 
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                  
                  {/* Connection Lines */}
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={`line-${i}`}
                      className="absolute h-0.5 bg-cyan-500/30 rounded-full"
                      style={{
                        left: `${Math.random() * 90 + 5}%`,
                        top: `${Math.random() * 90 + 5}%`,
                        width: `${Math.random() * 40 + 20}px`,
                        transform: `rotate(${Math.random() * 360}deg)`
                      }}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ 
                        duration: 1.5 + Math.random() * 2, 
                        repeat: Infinity 
                      }}
                    />
                  ))}
                </div>
                
                {/* Floating 3D Elements */}
                <motion.div
                  className="absolute w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg flex items-center justify-center"
                  style={{ left: '25%', top: '40%' }}
                  animate={{ 
                    y: [0, -15, 0],
                    rotateY: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="text-white font-bold text-xs">BIM</span>
                </motion.div>
                
                <motion.div
                  className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg flex items-center justify-center"
                  style={{ left: '65%', top: '60%' }}
                  animate={{ 
                    x: [0, 15, 0],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="text-white font-bold text-xs">AI</span>
                </motion.div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    className="text-center bg-[#0A142F] p-4 rounded-xl shadow-sm border border-[#2A3D7A]"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-xl font-bold text-[#FFC947] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-slate-300 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Full-width CTA Section */}
        <motion.div 
          className="mt-20 text-center relative px-8 py-12 rounded-3xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, rgba(10, 20, 47, 0.8) 0%, rgba(28, 44, 101, 0.9) 100%)',
            border: '1px solid rgba(42, 61, 122, 0.5)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Animated Construction Blueprint Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-20 gap-2 w-full h-full">
              {[...Array(400)].map((_, i) => (
                <div key={i} className="border border-[#2A3D7A] rounded-sm"></div>
              ))}
            </div>
          </div>
          
          {/* Floating AI Assistant */}
          <motion.div
            className="absolute -top-16 left-1/2 -translate-x-1/2"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-5 rounded-full shadow-xl">
              <FaRobot className="text-white text-4xl" />
            </div>
          </motion.div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Construction Workflow?
          </h3>
          <p className="text-slate-300 max-w-3xl mx-auto mb-8 text-lg">
            Join thousands of engineers and quantity surveyors who are already using AI to save time and reduce costs
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 30px rgba(255, 201, 71, 0.7)",
                backgroundColor: '#FFD369'
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-[#FFC947] text-[#0A142F] font-bold rounded-xl shadow-lg transition-all relative overflow-hidden text-lg"
            >
              <span className="relative z-10">Start Free Trial</span>
              <motion.div 
                className="absolute inset-0 bg-white opacity-0"
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: '#0A1A4D',
                boxShadow: "0 0 30px rgba(255, 201, 71, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-transparent border-2 border-[#FFC947] text-[#FFC947] font-bold rounded-xl hover:bg-[#FFC947]/10 transition-colors relative overflow-hidden text-lg"
            >
              <span className="relative z-10">Schedule AI Demo</span>
              <motion.div 
                className="absolute inset-0 bg-[#FFC947] opacity-0"
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-4 text-slate-300">
            <FaShieldAlt className="text-[#FFC947]" />
            <span>Enterprise-grade security · SOC 2 compliant · No credit card required</span>
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        .floating {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturesGrid;