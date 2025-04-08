
import React, { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { useWebSocket } from '@/contexts/WebSocketContext';

interface DeviceCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
  className?: string;
  sliderLabel: string;
  deviceId: string;
}

const DeviceCard = ({
  title,
  icon: Icon,
  color,
  className,
  sliderLabel,
  deviceId,
}: DeviceCardProps) => {
  const [value, setValue] = useState<number[]>([0]);
  const [isOn, setIsOn] = useState(false);
  const { sendCommand, isConnected } = useWebSocket();

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
    if (newValue[0] > 0 && !isOn) setIsOn(true);
    if (newValue[0] === 0 && isOn) setIsOn(false);
    
    // Send command to ESP device via WebSocket
    if (isConnected) {
      sendCommand(deviceId, newValue[0]);
    }
  };

  const toggleDevice = () => {
    const newIsOn = !isOn;
    setIsOn(newIsOn);
    
    if (newIsOn) {
      const newValue = [50];
      setValue(newValue);
      if (isConnected) {
        sendCommand(deviceId, newValue[0]);
      }
    } else {
      setValue([0]);
      if (isConnected) {
        sendCommand(deviceId, 0);
      }
    }
  };

  // Animation styles based on device state
  const iconAnimation = title.toLowerCase() === 'fan' && isOn
    ? 'animate-spin-slow'
    : title.toLowerCase() === 'light' && isOn
    ? 'animate-pulse-glow'
    : '';
  
  // Calculate glow intensity for light
  const glowIntensity = title.toLowerCase() === 'light' && isOn 
    ? `drop-shadow(0 0 ${value[0] / 10}px hsl(var(--smart-orange)))`
    : '';

  return (
    <div className={cn("device-card", className)}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div 
            className={`rounded-full p-2 ${color} mr-3 transition-all duration-300`}
            style={{ filter: glowIntensity }}
          >
            <Icon className={cn("h-5 w-5 text-white transition-all", iconAnimation)} strokeWidth={2} />
          </div>
          <h3 className="font-medium">{title}</h3>
        </div>
        <button
          onClick={toggleDevice}
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300",
            isOn ? `${color} text-white` : "bg-gray-200 text-gray-500",
            !isConnected && "opacity-50 cursor-not-allowed"
          )}
          disabled={!isConnected}
        >
          {isOn ? "ON" : "OFF"}
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">{sliderLabel}</span>
          <span className="text-sm font-medium">{value[0]}%</span>
        </div>
        <Slider
          defaultValue={value}
          value={value}
          onValueChange={handleValueChange}
          max={100}
          step={1}
          className={cn(isOn ? "" : "opacity-50", !isConnected && "cursor-not-allowed")}
          disabled={!isConnected}
        />
      </div>
      
      {!isConnected && (
        <div className="mt-3 text-xs text-red-500 italic">
          Not connected to ESP device
        </div>
      )}
    </div>
  );
};

export default DeviceCard;
