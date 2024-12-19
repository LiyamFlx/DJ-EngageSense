import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-black/30 backdrop-blur-sm rounded-lg ${className}`}>
    {children}
  </div>
);