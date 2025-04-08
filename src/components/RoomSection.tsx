
import React from 'react';
import { Fan, Lightbulb } from 'lucide-react';
import DeviceCard from './DeviceCard';

interface RoomSectionProps {
  roomName: string;
}

const RoomSection = ({ roomName }: RoomSectionProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">{roomName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DeviceCard
          title="Light"
          icon={Lightbulb}
          color="bg-smart-orange"
          sliderLabel="Brightness"
          deviceId="led"
        />
        <DeviceCard
          title="Fan"
          icon={Fan}
          color="bg-smart-blue"
          sliderLabel="Speed"
          deviceId="fan"
        />
      </div>
    </div>
  );
};

export default RoomSection;
