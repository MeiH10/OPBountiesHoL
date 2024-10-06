import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  color?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 md:px-6 md:py-3 rounded-lg text-white text-sm md:text-lg transition-colors duration-300 
        ${color === 'green' ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'}`}
    >
      {label}
    </button>
  );
};

export default Button;
