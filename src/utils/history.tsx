export interface RollHistory {
  id: string;
  timestamp: number;
  diceType: number;
  count: number;
  results: number[];
  total: number;
}

const HISTORY_KEY = 'dice_roller_history';

export function saveRoll(diceType: number, count: number, results: number[]): RollHistory {
  const history = getHistory();
  const newRoll: RollHistory = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    diceType,
    count,
    results,
    total: results.reduce((a, b) => a + b, 0),
  };

  history.unshift(newRoll);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 50)));

  return newRoll;
}

export function getHistory(): RollHistory[] {
  const data = localStorage.getItem(HISTORY_KEY);
  return data ? JSON.parse(data) : [];
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

export function formatRoll(roll: RollHistory): string {
  const resultStr = roll.results.map((r, i) => `${i + 1}:${r}`).join(', ');
  return `${roll.count} Dice${roll.count > 1 ? 's' : ''} 1d${roll.diceType}: ${resultStr}`;
}
