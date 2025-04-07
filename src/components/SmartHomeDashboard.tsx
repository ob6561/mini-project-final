
import React from 'react';
import { AirVent, Thermometer, Droplets } from 'lucide-react';
import EnvironmentCard from './EnvironmentCard';
import RoomSection from './RoomSection';

const SmartHomeDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Smart Home Dashboard</h1>
        <p className="text-gray-500">Monitor and control your home environment</p>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-4">Environment</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <EnvironmentCard
            title="Air Quality"
            value="Good"
            unit="PM2.5"
            icon={AirVent}
            color="bg-smart-green"
          />
          <EnvironmentCard
            title="Temperature"
            value={23.5}
            unit="°C"
            icon={Thermometer}
            color="bg-smart-orange"
          />
          <EnvironmentCard
            title="Humidity"
            value={45}
            unit="%"
            icon={Droplets}
            color="bg-smart-blue"
          />
        </div>
      </section>

      <RoomSection roomName="Bedroom" />
    </div>
  );
};

export default SmartHomeDashboard;
