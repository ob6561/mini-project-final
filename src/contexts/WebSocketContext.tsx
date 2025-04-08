
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

interface SensorData {
  temp: number;
  humidity: number;
  co2_ppm: number; // Air quality data
}

interface WebSocketContextType {
  isConnected: boolean;
  sensorData: SensorData;
  sendCommand: (device: string, value: number) => void;
}

const initialSensorData: SensorData = {
  temp: 23.5,
  humidity: 45,
  co2_ppm: 450, // Default "Good" air quality
};

const WebSocketContext = createContext<WebSocketContextType>({
  isConnected: false,
  sensorData: initialSensorData,
  sendCommand: () => {},
});

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [sensorData, setSensorData] = useState<SensorData>(initialSensorData);

  const connectWebSocket = useCallback(() => {
    try {
      const ws = new WebSocket('ws://esp.local:81');
      
      ws.onopen = () => {
        setIsConnected(true);
        toast({
          title: "Connected",
          description: "Connected to ESP WebSocket",
          variant: "default",
        });
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as SensorData;
          setSensorData(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = () => {
        setIsConnected(false);
        toast({
          title: "Connection Error",
          description: "Failed to connect to ESP device",
          variant: "destructive",
        });
      };

      ws.onclose = () => {
        setIsConnected(false);
        // Try to reconnect after a delay
        setTimeout(connectWebSocket, 5000);
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [connectWebSocket]);

  const sendCommand = useCallback((device: string, value: number) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(`${device}:${value}`);
    }
  }, [socket]);

  return (
    <WebSocketContext.Provider value={{ isConnected, sensorData, sendCommand }}>
      {children}
    </WebSocketContext.Provider>
  );
};
