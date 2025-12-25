import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, ...props }) => {
  const baseStyles = "px-5 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-900/20",
    secondary: "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-white/5",
    ghost: "bg-transparent hover:bg-zinc-800/50 text-zinc-400"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props} />
  );
};