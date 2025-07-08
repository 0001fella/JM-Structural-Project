import React from 'react';

const AiConstructionLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gray-900 rounded-xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
      <div className="relative mb-6">
        {/* Blueprint-inspired base */}
        <div className="absolute inset-0 w-32 h-32 rounded-full" style={{
          backgroundImage: `radial-gradient(circle, #0ea5e9 1px, transparent 1px), 
                            linear-gradient(to right, #0ea5e933 1px, transparent 1px), 
                            linear-gradient(to bottom, #0ea5e933 1px, transparent 1px)`,
          backgroundSize: `20px 20px, 20px 20px, 20px 20px`,
          mask: 'radial-gradient(black 65%, transparent 66%)'
        }}></div>
        
        {/* AI Core with construction elements */}
        <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500/50 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-900/30 to-cyan-500/20 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-cyan-900/80 flex flex-col items-center justify-center border border-cyan-400/30">
              <div className="flex">
                <i className="fas fa-brain text-cyan-300 text-xl mr-1"></i>
                <i className="fas fa-cubes text-cyan-300 text-xs mt-2"></i>
              </div>
              <div className="h-[2px] w-4 bg-cyan-400 mt-1 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Construction nanobots */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="absolute text-cyan-400 animate-construction-bot"
              style={{
                top: '50%',
                left: '50%',
                fontSize: '0.5rem',
                animationDelay: `${i * 0.2}s`,
                transform: `translate(-50%, -50%) rotate(${i * 30}deg) translate(52px)`,
              }}
            >
              <i className="fas fa-robot"></i>
            </div>
          ))}
        </div>

        {/* Structural scan lines */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400/20 animate-scan-line"></div>
          <div className="absolute top-0 left-0 w-[1px] h-full bg-cyan-400/20 animate-scan-line-vertical" style={{animationDelay: '1.5s'}}></div>
        </div>
      </div>
      
      <h3 className="mt-6 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
        AI optimizing structural integrity
      </h3>
      <p className="text-cyan-300/80 mt-2 font-mono text-sm">
        Simulating load distributions...
      </p>
      
      <div className="mt-6 w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-construction-progress"></div>
      </div>
      
      <div className="mt-4 flex space-x-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-6 h-6 flex items-center justify-center text-cyan-400 animate-bounce" style={{animationDelay: `${i * 0.2}s`}}>
              <i className={`fas ${i === 0 ? 'fa-cog' : i === 1 ? 'fa-cube' : 'fa-ruler-combined'} text-xs`}></i>
            </div>
            <div className="h-1 w-1 bg-cyan-400 rounded-full mt-1"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiConstructionLoader;