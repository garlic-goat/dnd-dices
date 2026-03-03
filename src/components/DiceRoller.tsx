import Dice from './Dice';

interface DiceRollerProps {
  diceType: number;
  diceCount: number;
  results: number[];
  isRolling: boolean;
}

export default function DiceRoller({
  diceType,
  diceCount,
  results,
  isRolling,
}: DiceRollerProps) {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Array.from({ length: diceCount }).map((_, index) => (
          <Dice
            key={index}
            diceType={diceType}
            result={results[index]}
            isRolling={isRolling}
            delay={index * 150}
          />
        ))}
      </div>
    </div>
  );
}
