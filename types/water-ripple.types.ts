// types/react-water-wave.d.ts

declare module 'react-water-wave' {
  import { CSSProperties, ReactNode } from 'react';

  interface WaterWaveProps {
    style?: CSSProperties;
    imageUrl?: string;
    dropRadius?: number;
    perturbance?: number;
    resolution?: number;
    interactive?: boolean;
    background?: string;
    children?: (methods?: WaterWaveMethods) => ReactNode;
  }

  interface WaterWaveMethods {
    drop?: (x: number, y: number, radius: number, strength: number) => void;
    set?: (url: string) => void;
    pause?: () => void;
    play?: () => void;
  }

  const WaterWave: React.FC<WaterWaveProps>;
  export default WaterWave;
}