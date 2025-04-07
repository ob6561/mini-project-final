
import React, { useState, useEffect } from 'react';
import SmartHomeDashboard from '@/components/SmartHomeDashboard';
import { useTheme } from '@/components/ThemeProvider';

const Index = () => {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Limiting the update frequency for better performance
      requestAnimationFrame(() => {
        setMousePosition({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      className="min-h-screen transition-colors duration-500 relative overflow-hidden"
      style={{
        background: theme === 'dark' 
          ? `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(25, 39, 52, 1) 0%, rgba(10, 20, 30, 1) 100%)`
          : `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(240, 250, 255, 1) 0%, rgba(225, 235, 245, 1) 100%)`
      }}
    >
      {/* Dynamic background orbs/bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className={`absolute rounded-full mix-blend-${theme === 'dark' ? 'lighten' : 'multiply'} animate-float`}
            style={{
              width: `${Math.random() * 20 + 5}rem`,
              height: `${Math.random() * 20 + 5}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.15,
              background: `hsl(var(--smart-${['blue', 'green', 'orange', 'purple', 'teal'][Math.floor(Math.random() * 5)]}))`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 40}s`
            }}
          />
        ))}
      </div>
      
      <SmartHomeDashboard />
    </div>
  );
};

export default Index;
