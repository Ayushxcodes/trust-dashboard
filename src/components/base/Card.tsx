import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  border?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  background?: 'white' | 'gray' | 'blue' | 'transparent';
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  hover = false,
  shadow = 'md',
  border = false,
  rounded = 'lg',
  padding = 'md',
  background = 'white',
  onClick
}: CardProps) {
  const baseClasses = 'transition-all duration-300';

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
    transparent: 'bg-transparent'
  };

  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';
  const borderClasses = border ? 'border border-gray-200' : '';

  const combinedClasses = [
    baseClasses,
    shadowClasses[shadow],
    roundedClasses[rounded],
    paddingClasses[padding],
    backgroundClasses[background],
    hoverClasses,
    borderClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={combinedClasses} onClick={onClick}>
      {children}
    </div>
  );
}
