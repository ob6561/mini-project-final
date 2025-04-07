
import React from 'react';
import { AirVent, Thermometer, Droplets } from 'lucide-react';
import EnvironmentGraph from './EnvironmentGraph';
import RoomSection from './RoomSection';
import { ThemeToggle } from './ThemeProvider';

const SmartHomeDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <header className="mb-8 flex justify-between items-center">
        <div className="w-8" /> {/* Empty div for spacing */}
        <h1 className="text-2xl md:text-3xl font-bold text-center">Smart Home Dashboard</h1>
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
