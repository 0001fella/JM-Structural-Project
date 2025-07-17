import React from 'react';

const ProjectCard = ({ icon, label, onClick, themeClasses }) => {
  return (
    <button 
      className={`py-3 px-4 rounded-lg flex flex-col items-center justify-center ${
        themeClasses.darkMode ? 'bg-gray-750 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
      } transition-colors`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default ProjectCard;