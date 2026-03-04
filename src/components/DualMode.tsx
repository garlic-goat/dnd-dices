import { useState } from 'react';
import DiceRoller from './DiceRoller';
import { Dices } from 'lucide-react';

interface DualModeProps {
  onClose: () => void;
}

export default function DualMode({ onClose }: DualModeProps) {
  const [leftDiceType, setLeftDiceType] = useState<number>(20);
  const [rightDiceType, setRightDiceType] = useState<number>(10);
  const [diceCount, setDiceCount] = useState<number>(4);
  const [isRolling, setIsRolling] = useState(false);
  const [leftResults, setLeftResults] = useState<number[]>([]);
  const [rightResults, setRightResults] = useState<number[]>([]);
  const [threshold, setThreshold] = useState<number>(10);

  const [attackBonus, setAttackBonus] = useState<number>(0);
  const [damageBonus, setDamageBonus] = useState<number>(0);

  const diceTypes = [2, 3, 4, 6, 8, 10, 12, 20, 100];

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    setLeftResults([]);
    setRightResults([]);

    setTimeout(() => {
      const newLeftResults = Array.from({ length: diceCount }, () =>
        Math.floor(Math.random() * leftDiceType) + 1
      );
      const newRightResults = Array.from({ length: diceCount }, () =>
        Math.floor(Math.random() * rightDiceType) + 1
      );
      setLeftResults(newLeftResults);
      setRightResults(newRightResults);
      setIsRolling(false);
    }, 1200);
  };

  const calculateDamage = () => {
    return rightResults.reduce((sum, rightVal, index) => {
      const leftVal = leftResults[index];
      // Add attack bonus to check against threshold
      if (leftVal + attackBonus >= threshold) {
        // Add damage bonus to the result (minimum 0 damage)
        return sum + Math.max(0, rightVal + damageBonus);
      }
      return sum;
    }, 0);
  };

  const leftTotal = leftResults.reduce((a, b) => a + b, 0) + (leftResults.length * attackBonus);
  const damageTotal = calculateDamage();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-2xl border border-slate-700 max-h-[95vh] overflow-y-auto w-full max-w-6xl">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Dices className="w-8 h-8 text-amber-400" />
              <h2 className="text-4xl font-bold text-white">Damage Roll</h2>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-3xl"
            >
              ✕
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-white font-semibold mb-3 text-lg">
                Left Dice Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {diceTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setLeftDiceType(type)}
                    className={`py-3 px-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 ${leftDiceType === type
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/50'
                      : 'bg-slate-700 text-white hover:bg-slate-600'
                      }`}
                  >
                    d{type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3 text-lg">
                Right Dice Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {diceTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setRightDiceType(type)}
                    className={`py-3 px-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 ${rightDiceType === type
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-slate-700 text-white hover:bg-slate-600'
                      }`}
                  >
                    d{type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-white font-semibold mb-3 text-lg">
                Number of Dice
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                  <button
                    key={count}
                    onClick={() => setDiceCount(count)}
                    className={`py-3 px-4 rounded-lg font-bold text-xl transition-all transform hover:scale-105 ${diceCount === count
                      ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/50'
                      : 'bg-slate-700 text-white hover:bg-slate-600'
                      }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3 text-lg">
                Threshold Value
              </label>
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none transition-colors text-lg font-semibold"
                min="1"
              />
              <p className="text-slate-400 text-sm mt-2">
                Only right dice where left dice ≥ {threshold} are counted
              </p>
            </div>
          </div>

          <div>
            <label className="block text-white font-semibold mb-3 text-lg">
              Attack Bonus (to each die)
            </label>
            <input
              type="number"
              value={attackBonus}
              onChange={(e) => setAttackBonus(Number(e.target.value))}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none transition-colors text-lg font-semibold"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-3 text-lg">
              Damage Bonus (to each die)
            </label>
            <input
              type="number"
              value={damageBonus}
              onChange={(e) => setDamageBonus(Number(e.target.value))}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none transition-colors text-lg font-semibold"
            />
          </div>

          <button
            onClick={rollDice}
            disabled={isRolling}
            className={`w-full py-4 rounded-xl font-bold text-xl transition-all transform mb-8 ${isRolling
              ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 hover:from-amber-400 hover:to-orange-400 hover:scale-[1.02] shadow-lg shadow-amber-500/30'
              }`}
          >
            {isRolling ? 'Rolling...' : `Roll ${diceCount} Dice`}
          </button>

          {(leftResults.length > 0 || isRolling) && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-red-400 mb-4">Left (Attack)</h3>
                <DiceRoller
                  diceType={leftDiceType}
                  diceCount={diceCount}
                  results={leftResults.map(val => val + attackBonus)}
                  isRolling={isRolling}
                />
                {leftResults.length > 0 && !isRolling && (
                  <div className="mt-4 bg-slate-800/50 rounded-lg p-4 border border-red-500/30 text-center">
                    <p className="text-slate-300 text-sm mb-1">Total</p>
                    <p className="text-4xl font-bold text-red-400">{leftTotal}</p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-400 mb-4">Right (Damage)</h3>
                <DiceRoller
                  diceType={rightDiceType}
                  diceCount={diceCount}
                  results={rightResults.map(val => Math.max(0, val + damageBonus))}
                  isRolling={isRolling}
                />
                {rightResults.length > 0 && !isRolling && (
                  <div className="mt-4 bg-slate-800/50 rounded-lg p-4 border border-blue-500/30">
                    <div className="text-center mb-3">
                      <p className="text-slate-300 text-sm mb-1">Applied Damage</p>
                      <p className="text-4xl font-bold text-blue-400">{damageTotal}</p>
                    </div>
                    <div className="text-xs text-slate-400 space-y-1">
                      {rightResults.map((right, i) => {
                        const finalAttack = leftResults[i] + attackBonus;
                        const finalDamage = Math.max(0, right + damageBonus);
                        const applied = finalAttack >= threshold ? finalDamage : 0;
                        return (
                          <div key={i} className="flex justify-between">
                            <span>Dice {i + 1} (Atk: {finalAttack}):</span>
                            <span className={applied > 0 ? 'text-blue-300' : 'text-slate-500'}>
                              {applied > 0 ? `${finalDamage}` : '-'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
