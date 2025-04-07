
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnvironmentCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  color: string;
  className?: string;
}

const EnvironmentCard = ({
  title,
  value,
  unit,
  icon: Icon,
  color,
  className,
}: EnvironmentCardProps) => {
  return (
    <div className={cn("sensor-card flex flex-col items-center", className)}>
      <div className={`rounded-full p-3 mb-2 ${color}`}>
        <Icon className="h-6 w-6 text-white" strokeWidth={2} />
      </div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="flex items-end mt-1">
        <span className="text-2xl font-semibold mr-1">{value}</span>
        <span className="text-gray-500 text-sm pb-1">{unit}</span>
      </div>
    </div>
  );
};

export default EnvironmentCard;
