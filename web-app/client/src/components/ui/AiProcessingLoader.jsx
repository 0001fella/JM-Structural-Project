import React, { useState, useEffect } from 'react';

const AiConstructionLoader = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing AI algorithms...");
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    // Simulate progress
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    // Update status messages
    const statusTimer = setInterval(() => {
      setStatus(prev => {
        if (progress < 20) return "Initializing AI algorithms...";
        if (progress < 40) return "Analyzing structural requirements...";
        if (progress < 60) return "Optimizing material distribution...";
        if (progress < 80) return "Simulating load distributions...";
        return "Finalizing construction plans...";
      });
    }, 1000);

    // Show blueprint grid after delay
    const gridTimer = setTimeout(() => {
      setShowGrid(true);
    }, 500);

    return () => {
      clearInterval(progressTimer);
      clearInterval(statusTimer);
      clearTimeout(gridTimer);
    };
  }, [progress]);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 bg-gray-900 rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 relative overflow-hidden">
      {/* Particle background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-cyan-400/10 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Blueprint grid background */}
      {showGrid && (
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(to right, #0ea5e933 1px, transparent 1px),
            linear-gradient(to bottom, #0ea5e933 1px, transparent 1px)
          `,
          backgroundSize: `30px 30px`,
        }}></div>
      )}
      
      {/* 3D Construction visualization */}
      <div className="relative mb-8 w-64 h-64 perspective-1000">
        {/* Building structure */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-40 h-40 transform-style-3d transition-transform duration-1000">
            {/* Building base */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-b from-gray-700 to-gray-800 border border-gray-600/50 rounded-md"></div>
            
            {/* Building floors */}
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-gray-600 to-gray-700 border border-gray-500/50 rounded-sm"
                style={{
                  width: `${24 - i * 4}px`,
                  height: '20px',
                  bottom: `${40 + i * 22}px`,
                  transition: 'all 0.5s ease-in-out',
                  animation: i < progress/20 ? 'pulse 1.5s infinite' : 'none'
                }}
              />
            ))}
            
            {/* Crane */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ zIndex: 10 }}>
              <div className="absolute bottom-0 left-0 h-40 w-1 bg-gray-500"></div>
              <div className="absolute top-0 left-0 w-24 h-1 bg-gray-500 origin-left transform -rotate-45"></div>
              <div className="absolute top-0 left-24 w-1 h-8 bg-gray-500"></div>
              <div className="absolute top-8 left-24 w-8 h-8 bg-cyan-500 rounded-full animate-pulse"></div>
            </div>
            
            {/* Construction beams */}
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 -rotate-45">
              <div className="w-24 h-1 bg-amber-500"></div>
            </div>
          </div>
        </div>
        
        {/* AI Core */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative">
            {/* Outer ring */}
            <div className="absolute -inset-4 rounded-full border-2 border-cyan-400/50 animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
            
            {/* Inner core */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-900/80 to-cyan-700/90 flex flex-col items-center justify-center border border-cyan-400/30 relative overflow-hidden">
              {/* Pulsing center */}
              <div className="w-10 h-10 rounded-full bg-cyan-700 animate-pulse flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-cyan-400 animate-ping absolute"></div>
              </div>
              
              {/* Data lines */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute top-0 left-1/2 h-full w-0.5 bg-cyan-400/30 origin-top animate-data-flow"
                    style={{ 
                      transform: `rotate(${i * 45}deg)`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Status text */}
      <h3 className="mt-4 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
        AI Construction Optimization
      </h3>
      <p className="text-cyan-300/80 mt-2 text-sm font-mono min-h-[20px] text-center">
        {status}
      </p>
      
      {/* Progress bar */}
      <div className="mt-6 w-full max-w-md relative">
        <div className="flex justify-between text-xs text-cyan-300 mb-1 font-mono">
          <span>0%</span>
          <span>STRUCTURAL ANALYSIS</span>
          <span>100%</span>
        </div>
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-cyan-400/50 animate-pulse"></div>
          </div>
        </div>
        <div className="text-right text-xs text-cyan-400 mt-1 font-mono">
          {progress}% COMPLETE
        </div>
      </div>
      
      {/* Construction indicators */}
      <div className="mt-6 flex space-x-6">
        {['MATERIALS', 'STRUCTURE', 'SAFETY'].map((label, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-8 h-8 flex items-center justify-center text-cyan-400 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
              <div className="w-4 h-4 rounded-full bg-cyan-500/50 animate-ping"></div>
            </div>
            <div className="text-xs text-cyan-400 mt-1">{label}</div>
          </div>
        ))}
      </div>
      
      {/* Construction nanobots */}
      <div className="absolute bottom-4 left-0 right-0 h-8 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute text-cyan-400"
            style={{
              bottom: '0',
              fontSize: '0.6rem',
              animation: `moveBot ${Math.random() * 10 + 5}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
              left: `${i * 12}%`,
            }}
          >
            <div className="w-6 h-4 bg-gray-800 border border-cyan-500/50 rounded flex items-center justify-center">
              <div className="w-1 h-1 bg-cyan-400 rounded-full mr-1"></div>
              <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-data-flow {
          animation: dataFlow 1.5s infinite;
        }
        @keyframes dataFlow {
          0% { transform: rotate(var(--rotate)) scaleY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: rotate(var(--rotate)) scaleY(1); opacity: 0; }
        }
        @keyframes moveBot {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }
        .animate-construction-progress {
          animation: progress-pulse 1.5s infinite;
        }
        @keyframes progress-pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.4); }
          70% { box-shadow: 0 0 0 5px rgba(56, 189, 248, 0); }
          100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
        }
      `}</style>
    </div>
  );
};

export default AiConstructionLoader;