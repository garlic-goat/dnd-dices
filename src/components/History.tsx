import { RollHistory, formatRoll, clearHistory } from '../utils/history';
import { Trash2 } from 'lucide-react';

interface HistoryProps {
  rolls: RollHistory[];
  onClear: () => void;
}

export default function History({ rolls, onClear }: HistoryProps) {
  if (rolls.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Roll History</h2>
        <button
          onClick={onClear}
          className="flex items-center gap-2 px-4 py-2 bg-red-600/30 hover:bg-red-600/50 text-red-300 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {rolls.map((roll) => (
          <div
            key={roll.id}
            className="bg-slate-700/40 backdrop-blur-sm rounded-lg p-4 border border-slate-600/50 hover:border-amber-500/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-amber-300 font-mono">
                {formatRoll(roll)}
              </span>
              <span className="text-xl font-bold text-amber-400 ml-4">
                {roll.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
