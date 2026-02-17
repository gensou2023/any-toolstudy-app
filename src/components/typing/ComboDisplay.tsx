'use client';

interface ComboDisplayProps {
  combo: number;
  multiplier: number;
}

export default function ComboDisplay({ combo, multiplier }: ComboDisplayProps) {
  if (combo < 2) return null;

  const isHot = combo >= 25;
  const isWarm = combo >= 10;

  return (
    <div className={`text-center transition-all duration-200 ${isHot ? 'animate-pulse' : ''}`}>
      <div className={`text-2xl font-bold ${
        isHot ? 'text-danger' : isWarm ? 'text-secondary' : 'text-primary'
      }`}>
        {combo} COMBO!
      </div>
      <div className={`text-sm font-medium ${
        isHot ? 'text-danger/80' : isWarm ? 'text-secondary/80' : 'text-primary/80'
      }`}>
        x{multiplier}
      </div>
    </div>
  );
}
