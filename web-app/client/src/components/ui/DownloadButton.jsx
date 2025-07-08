import React, { useState } from 'react';

const DownloadButton = ({ format }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const getIcon = () => {
    switch(format) {
      case 'pdf': return 'file-contract';
      case 'excel': return 'chart-network';
      case 'word': return 'file-alt';
      default: return 'cloud-download-alt';
    }
  };

  const getColor = () => {
    switch(format) {
      case 'pdf': return 'from-red-500/90 to-red-700 via-red-600';
      case 'excel': return 'from-green-500/90 to-green-700 via-green-600';
      case 'word': return 'from-blue-500/90 to-blue-700 via-blue-600';
      default: return 'from-cyan-500/90 to-blue-700 via-cyan-600';
    }
  };

  const getLabel = () => {
    switch(format) {
      case 'pdf': return 'Structural Report';
      case 'excel': return 'Data Matrix';
      case 'word': return 'Project Specs';
      default: return 'Blueprint Data';
    }
  };

  const handleClick = () => {
    setIsDownloading(true);
    // Simulate download process
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <div className="relative group">
      {/* Holographic projection effect */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl filter blur-md opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
      
      <button 
        onClick={handleClick}
        disabled={isDownloading}
        className={`
          relative w-full min-w-[180px] px-6 py-3 rounded-xl
          bg-gradient-to-r ${getColor()}
          border border-cyan-400/30
          shadow-xl shadow-blue-500/20
          flex items-center justify-center
          transition-all duration-300
          transform group-hover:-translate-y-0.5 group-hover:shadow-2xl group-hover:shadow-blue-500/30
          ${isDownloading ? 'opacity-90 cursor-not-allowed' : 'hover:scale-[1.02]'}
          overflow-hidden
        `}
      >
        {/* Construction grid background */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}></div>
        
        {/* Nanobot loader when downloading */}
        {isDownloading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-3 z-[1]">
          {/* Animated icon with construction elements */}
          <div className="relative">
            <div className="absolute -inset-2.5 bg-cyan-400/20 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
            <div className="relative flex items-center justify-center">
              <i className={`fas fa-${getIcon()} text-white text-xl`}></i>
              <div className="absolute -right-1 -bottom-1 text-white/80 text-xs">
                <i className="fas fa-robot"></i>
              </div>
            </div>
          </div>
          
          <div className="text-left">
            <div className="text-white font-semibold tracking-wide">
              {isDownloading ? 'Constructing File...' : getLabel()}
            </div>
            <div className="text-xs text-cyan-200/90 font-mono tracking-wider">
              {format?.toUpperCase()} FORMAT
            </div>
          </div>
        </div>
        
        {/* Data transfer animation */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent animate-data-transfer"></div>
      </button>
      
      {/* Hover effect - blueprint preview */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[140px] h-[140px] bg-gray-900 border border-cyan-500/30 rounded-lg shadow-2xl shadow-blue-500/20 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black/80"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}></div>
        <div className="absolute inset-2 flex flex-col items-center justify-center">
          <div className="w-8 h-8 bg-cyan-500/30 rounded-full flex items-center justify-center mb-2">
            <i className={`fas fa-${getIcon()} text-cyan-300 text-sm`}></i>
          </div>
          <div className="text-cyan-300 text-xs font-mono text-center">
            AI-OPTIMIZED<br/>STRUCTURE
          </div>
        </div>
        <div className="absolute bottom-2 left-0 w-full text-center text-cyan-400/50 text-[8px] font-mono tracking-widest">
          {format?.toUpperCase()} BLUEPRINT
        </div>
      </div>
    </div>
  );
};

export default DownloadButton;