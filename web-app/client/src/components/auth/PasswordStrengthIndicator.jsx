import React from 'react';

const PasswordStrengthIndicator = ({ password }) => {
  if (!password) return null;

  const getStrength = () => {
    if (password.length < 4) return 'Very Weak';
    if (password.length < 8) return 'Weak';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return 'Medium';
    return 'Strong';
  };

  const getColor = () => {
    const strength = getStrength();
    switch(strength) {
      case 'Very Weak': return 'bg-red-500';
      case 'Weak': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Strong': return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };

  const getWidth = () => {
    const strength = getStrength();
    switch(strength) {
      case 'Very Weak': return 'w-1/4';
      case 'Weak': return 'w-1/2';
      case 'Medium': return 'w-3/4';
      case 'Strong': return 'w-full';
      default: return 'w-0';
    }
  };

  return (
    <div className="mt-2">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`h-2 rounded-full ${getColor()} ${getWidth()}`}></div>
      </div>
      <p className="text-xs mt-1 text-gray-500">
        Strength: <span className="font-medium">{getStrength()}</span>
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;