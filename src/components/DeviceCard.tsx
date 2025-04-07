
import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';

interface DeviceCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
  className?: string;
  sliderLabel: string;
}

const DeviceCard = ({
  title,
  icon: Icon,
  color,
  className,
  sliderLabel,
}: DeviceCardProps) => {
  const [value, setValue] = useState<number[]>([50]);
  const [isOn, setIsOn] = useState(false);

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
    if (newValue[0] > 0 && !isOn) setIsOn(true);
    if (newValue[0] === 0 && isOn) setIsOn(false);
  };

  const toggleDevice = () => {
    setIsOn(!isOn);
    if (!isOn) {
      setValue([50]);
    } else {
      setValue([0]);
    }
  };

  return (
    <div className={cn("device-card", className)}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className={`rounded-full p-2 ${color} mr-3`}>
            <Icon className="h-5 w-5 text-white" strokeWidth={2} />
          </div>
          <h3 className="font-medium">{title}</h3>
        </div>
        <button
          onClick={toggleDevice}
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            isOn ? `${color} text-white` : "bg-gray-200 text-gray-500"
          )}
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
          className={cn(isOn ? "" : "opacity-50")}
        />
      </div>
    </div>
  );
};

export default DeviceCard;
