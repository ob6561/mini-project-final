
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import { cn } from '@/lib/utils';

// Generate mock data for the charts
const generateData = (baseline: number, variation: number, dataPoints = 24) => {
  return Array.from({ length: dataPoints }, (_, i) => {
    const hour = i % 24;
    const value = baseline + (Math.random() - 0.5) * variation;
    return {
      hour: `${hour}:00`,
      value: Number(value.toFixed(1))
    };
  });
};

interface EnvironmentGraphProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  color: string;
  className?: string;
  baseline?: number;
  variation?: number;
}

const EnvironmentGraph = ({
  title,
  value,
  unit,
  icon: Icon,
  color,
  className,
  baseline = 50,
  variation = 10,
}: EnvironmentGraphProps) => {
  const data = React.useMemo(() => generateData(Number(baseline), variation), [baseline, variation]);
  const colorValue = color.replace('bg-', '');

  return (
    <div className={cn("sensor-card flex flex-col", className)}>
      <div className="flex items-center mb-2">
        <div className={`rounded-full p-2 mr-2 ${color}`}>
          <Icon className="h-4 w-4 text-white" strokeWidth={2} />
        </div>
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
      </div>
      
      <div className="flex items-end mb-2">
        <span className="text-2xl font-semibold mr-1">{value}</span>
        <span className="text-muted-foreground text-sm pb-1">{unit}</span>
      </div>
      
      <div className="h-32 w-full mt-2">
        <ChartContainer
          className="h-full"
          config={{
            primary: {
              theme: {
                light: `hsl(var(--${colorValue}))`,
                dark: `hsl(var(--${colorValue}))`
              }
            }
          }}
        >
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`color${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={`hsl(var(--${colorValue}))`} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={`hsl(var(--${colorValue}))`} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis 
              dataKey="hour" 
              tick={{ fontSize: 10 }} 
              axisLine={false} 
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={15}
            />
            <YAxis hide={true} />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={false}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={`hsl(var(--${colorValue}))`} 
              strokeWidth={2}
              fill={`url(#color${title})`}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default EnvironmentGraph;
