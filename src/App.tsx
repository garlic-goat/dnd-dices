import { useState, useEffect } from 'react';
import { Dices, Sword } from 'lucide-react';
import DiceRoller from './components/DiceRoller';
import History from './components/History';
import DualMode from './components/DualMode';
import { RollHistory, saveRoll, getHistory, clearHistory } from './utils/history';

function App() {
  const [mode, setMode] = useState<'simple' | 'dual'>('simple');
  const [diceType, setDiceType] = useState<number>(20);
  const [diceCount, setDiceCount] = useState<number>(1);
  const [isRolling, setIsRolling] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [history, setHistory] = useState<RollHistory[]>([]);

  const diceTypes = [2, 3, 4, 6, 8, 10, 12, 20, 100];

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    setResults([]);

    setTimeout(() => {
      const newResults = Array.from({ length: diceCount }, () =>
        Math.floor(Math.random() * diceType) + 1
      );
      setResults(newResults);
      saveRoll(diceType, diceCount, newResults);
      setHistory(getHistory());
      setIsRolling(false);
    }, 1200);
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const total = results.reduce((sum, val) => sum + val, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Dices className="w-12 h-12 text-amber-400" />
            <h1 className="text-5xl font-bold text-white">D&D Dice Roller</h1>
          </div>
          <p className="text-slate-300 text-lg">Roll the dice and let fate decide</p>

          <div className="flex gap-3 justify-center mt-6">
            <button
              onClick={() => setMode('simple')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                mode === 'simple'
                  ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/50'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              Simple Mode
            </button>
            <button
              onClick={() => setMode('dual')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2 ${
                mode === 'dual'
                  ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/50'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              <Sword className="w-4 h-4" />
              Damage Mode
            </button>
          </div>
        </div>

        {mode === 'simple' ? (
          <>
            <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-700">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-white font-semibold mb-3 text-lg">
                    Dice Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {diceTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setDiceType(type)}
                        className={`py-3 px-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 ${
                          diceType === type
                            ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/50'
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
                    Number of Dice
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((count) => (
                      <button
                        key={count}
                        onClick={() => setDiceCount(count)}
                        className={`py-3 px-4 rounded-lg font-bold text-xl transition-all transform hover:scale-105 ${
                          diceCount === count
                            ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/50'
                            : 'bg-slate-700 text-white hover:bg-slate-600'
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={rollDice}
                disabled={isRolling}
                className={`w-full py-4 rounded-xl font-bold text-xl transition-all transform ${
                  isRolling
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 hover:from-amber-400 hover:to-orange-400 hover:scale-[1.02] shadow-lg shadow-amber-500/30'
                }`}
              >
                {isRolling ? 'Rolling...' : `Roll ${diceCount}d${diceType}`}
              </button>

              <DiceRoller
                diceType={diceType}
                diceCount={diceCount}
                results={results}
                isRolling={isRolling}
              />

              {results.length > 0 && !isRolling && (
                <div className="mt-8 text-center">
                  <div className="bg-slate-900/50 rounded-xl p-6 border border-amber-500/30">
                    <p className="text-slate-300 text-lg mb-2">Total</p>
                    <p className="text-6xl font-bold text-amber-400">{total}</p>
                  </div>
                </div>
              )}
            </div>

            <History rolls={history} onClear={handleClearHistory} />
          </>
        ) : (
          <DualMode onClose={() => setMode('simple')} />
        )}
      </div>
    </div>
  );
}

export default App;
