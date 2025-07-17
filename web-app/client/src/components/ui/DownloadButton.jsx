import React, { useState, useEffect } from 'react';

const DownloadButton = ({ format }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  
  // Handle preview display with delay
  useEffect(() => {
    let timer;
    if (showPreview) {
      timer = setTimeout(() => setShowPreview(false), 2000);
    }
    return () => clearTimeout(timer);
  }, [showPreview]);

  const getIcon = () => {
    switch(format) {
      case 'pdf': return 'file-contract';
      case 'excel': return 'file-spreadsheet';
      case 'word': return 'file-word';
      default: return 'file-download';
    }
  };

  const getColor = () => {
    switch(format) {
      case 'pdf': return 'from-red-500/90 to-red-700';
      case 'excel': return 'from-green-500/90 to-green-700';
      case 'word': return 'from-blue-500/90 to-blue-700';
      default: return 'from-cyan-500/90 to-blue-700';
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
    setProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloading(false);
            setShowPreview(true);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="relative group">
      {/* Holographic projection effect */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl filter blur-md opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
      
      <button 
        onClick={handleClick}
        disabled={isDownloading}
        className={`
          relative w-full min-w-[200px] px-6 py-4 rounded-xl
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
        
        {/* Download progress bar */}
        {isDownloading && (
          <div 
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        )}
        
        {/* Nanobot loader when downloading */}
        {isDownloading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
            <div className="flex flex-col items-center">
              <div className="flex space-x-1 mb-2">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
              <div className="text-cyan-200 text-xs font-mono">
                {progress}% COMPLETE
              </div>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-3 z-[1]">
          {/* Animated icon with construction elements */}
          <div className="relative">
            {!isDownloading && (
              <div className="absolute -inset-2.5 bg-cyan-400/20 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
            )}
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
      <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[180px] h-[180px] bg-gray-900 border border-cyan-500/30 rounded-lg shadow-2xl shadow-blue-500/20 opacity-0 pointer-events-none transition-all duration-300 z-20 overflow-hidden ${showPreview ? '!opacity-100' : 'group-hover:opacity-100'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black/80"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}></div>
        
        {/* 3D Building Visualization */}
        <div className="absolute inset-4 flex items-end justify-center">
          <div className="relative w-24 h-24">
            {/* Base */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-gray-700 rounded-sm"></div>
            
            {/* Building */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-b from-gray-600 to-gray-800 rounded-t-sm">
              {/* Windows */}
              <div className="grid grid-cols-3 gap-1 p-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-700 rounded-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-yellow-400/30 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Crane */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="absolute bottom-0 left-0 h-20 w-1 bg-gray-600"></div>
              <div className="absolute top-0 left-0 w-16 h-1 bg-gray-600"></div>
              <div className="absolute top-0 left-16 w-1 h-6 bg-gray-600"></div>
              <div className="absolute top-6 left-16 w-6 h-6 bg-cyan-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-2 flex flex-col items-center justify-center">
          <div className="w-10 h-10 bg-cyan-500/30 rounded-full flex items-center justify-center mb-2">
            <i className={`fas fa-${getIcon()} text-cyan-300 text-lg`}></i>
          </div>
          <div className="text-cyan-300 text-xs font-mono text-center mb-1">
            AI-OPTIMIZED STRUCTURE
          </div>
          <div className="text-xs text-cyan-400/80 font-mono tracking-wide">
            {format?.toUpperCase()} FORMAT
          </div>
        </div>
        
        <div className="absolute bottom-2 left-0 w-full text-center text-cyan-400/50 text-[8px] font-mono tracking-widest">
          CONSTRUCTION BLUEPRINT
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        .animate-data-transfer {
          animation: dataTransfer 1.5s infinite;
        }
        @keyframes dataTransfer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default DownloadButton;