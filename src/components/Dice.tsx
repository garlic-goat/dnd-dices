import { useEffect, useState, useRef } from 'react';

interface DiceProps {
  diceType: number;
  result?: number;
  isRolling: boolean;
  delay: number;
}

export default function Dice({ diceType, result, isRolling, delay }: DiceProps) {
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isRolling) {
      setAnimating(true);
      setCurrentValue(null);
      timeoutRef.current = setTimeout(() => {
        setAnimating(false);
      }, 1200 - delay);
    } else if (result !== undefined) {
      setCurrentValue(result);
      setAnimating(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isRolling, result, delay]);

  const getDiceShape = () => {
    if (diceType === 4) return 'polygon(50% 0%, 0% 100%, 100% 100%)';
    if (diceType === 8) return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
    return 'rounded-2xl';
  };

  const getDiceColor = () => {
    if (diceType === 20) return 'from-red-500 to-red-700';
    if (diceType === 12) return 'from-blue-500 to-blue-700';
    if (diceType === 10) return 'from-green-500 to-green-700';
    if (diceType === 8) return 'from-purple-500 to-purple-700';
    if (diceType === 6) return 'from-orange-500 to-orange-700';
    if (diceType === 4) return 'from-teal-500 to-teal-700';
    if (diceType === 100) return 'from-pink-500 to-pink-700';
    return 'from-cyan-500 to-cyan-700';
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-32 w-32 flex items-center justify-center perspective-1000">
        <div
          className={`w-24 h-24 bg-gradient-to-br ${getDiceColor()} ${
            diceType === 4 || diceType === 8 ? '' : 'rounded-2xl'
          } shadow-2xl flex items-center justify-center transform transition-all duration-300 ${
            animating ? 'animate-roll-dice' : 'hover:scale-110'
          }`}
          style={{
            clipPath: diceType === 4 || diceType === 8 ? getDiceShape() : undefined,
            animationDelay: `${delay}ms`,
          }}
        >
          {currentValue !== null && !animating && (
            <span className="text-5xl font-black text-white drop-shadow-lg animate-fade-in">
              {currentValue}
            </span>
          )}
          {animating && (
            <span className="text-5xl font-black text-white/50 animate-pulse">
              ?
            </span>
          )}
        </div>
      </div>
      <div className="mt-3 text-center">
        <span className="text-sm font-semibold text-slate-400">
          d{diceType}
        </span>
      </div>
    </div>
  );
}
