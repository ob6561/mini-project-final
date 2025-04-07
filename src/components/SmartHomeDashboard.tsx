
import React, { useEffect, useState } from 'react';
import { AirVent, Thermometer, Droplets, Home } from 'lucide-react';
import EnvironmentGraph from './EnvironmentGraph';
import RoomSection from './RoomSection';
import { ThemeToggle } from './ThemeProvider';
import { useTheme } from './ThemeProvider';

const SmartHomeDashboard = () => {
  const { theme } = useTheme();
  const [scrollY, setScrollY] = useState(0);

  // Update scroll position for background parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className="container mx-auto px-4 py-6 max-w-4xl relative"
      style={{
        backgroundImage: `radial-gradient(
          circle at ${50 + scrollY * 0.01}% ${50 - scrollY * 0.02}%, 
          ${theme === 'dark' ? 'rgba(30, 41, 59, 0.7)' : 'rgba(241, 245, 249, 0.7)'} 0%, 
          ${theme === 'dark' ? 'rgba(15, 23, 42, 0)' : 'rgba(241, 245, 249, 0)'} 70%
        )`
      }}
    >
      <header className="mb-8 flex justify-between items-center">
        <div className="w-8" /> {/* Empty div for spacing */}
        <h1 className="text-2xl md:text-3xl font-bold text-center flex items-center justify-center gap-2">
          <Home className={`h-7 w-7 ${theme === 'dark' ? 'text-smart-blue' : 'text-smart-teal'}`} />
          <span className="relative">
            Smart Home Dashboard
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-smart-blue to-transparent"></span>
          </span>
        </h1>
        <ThemeToggle />
      </header>

      <p className="text-center text-muted-foreground mb-8">Monitor and control your home environment</p>

      <section>
        <h2 className="text-xl font-semibold mb-4">Environment</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <EnvironmentGraph
            title="Air Quality"
            value="Good"
            unit="PM2.5"
            icon={AirVent}
            color="bg-smart-green"
            baseline={25}
            variation={15}
          />
          <EnvironmentGraph
            title="Temperature"
            value={23.5}
            unit="°C"
            icon={Thermometer}
            color="bg-smart-orange"
            baseline={23.5}
            variation={5}
          />
          <EnvironmentGraph
            title="Humidity"
            value={45}
            unit="%"
            icon={Droplets}
            color="bg-smart-blue"
            baseline={45}
            variation={10}
          />
        </div>
      </section>

      <RoomSection roomName="Bedroom" />
    </div>
  );
};

export default SmartHomeDashboard;
