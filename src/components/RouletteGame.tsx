import React, { useState } from 'react';
import { VitoMessage } from '../types';

// Roulette Game Component
const RouletteGame: React.FC<{ setVitoMessage: (msg: VitoMessage) => void }> = ({ setVitoMessage }) => {
  const ROULETTE_NUMBER_COLORS: { [key: number]: 'red' | 'black' | 'green' } = {
    0: 'green', 1: 'red', 2: 'black', 3: 'red', 4: 'black', 5: 'red', 6: 'black',
    7: 'red', 8: 'black', 9: 'red', 10: 'black', 11: 'black', 12: 'red', 13: 'black',
    14: 'red', 15: 'black', 16: 'red', 17: 'black', 18: 'red', 19: 'red', 20: 'black',
    21: 'red', 22: 'black', 23: 'red', 24: 'black', 25: 'red', 26: 'black', 27: 'red',
    28: 'black', 29: 'black', 30: 'red', 31: 'black', 32: 'red', 33: 'black', 34: 'red',
    35: 'black', 36: 'red'
  };

  const [balance, setBalance] = useState(1000);
  const [bets, setBets] = useState<{ [key: string]: number }>({});
  const [selectedChip, setSelectedChip] = useState(10);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [message, setMessage] = useState("Place your bets!");

  const totalBet = Object.values(bets).reduce((a, b) => a + b, 0);

  const placeBet = (betType: string) => {
    if (isSpinning || balance < selectedChip) return;
    setBalance(prev => prev - selectedChip);
    setBets(prev => ({ ...prev, [betType]: (prev[betType] || 0) + selectedChip }));
    setMessage(`${selectedChip} chips on ${betType}!`);
  };

  const clearBets = () => {
    if (isSpinning) return;
    setBalance(prev => prev + totalBet);
    setBets({});
    setMessage("Bets cleared.");
  };

  const spinRoulette = () => {
    if (isSpinning || totalBet === 0) return;
    setIsSpinning(true);
    setMessage("Spinning...");

    setTimeout(() => {
      const finalNumber = Math.floor(Math.random() * 37);
      calculateWinnings(finalNumber);
    }, 2000);
  };

  const calculateWinnings = (finalNumber: number) => {
    setWinningNumber(finalNumber);
    let totalWinnings = 0;
    const numColor = ROULETTE_NUMBER_COLORS[finalNumber];

    for (const [betType, betAmount] of Object.entries(bets)) {
      if (!isNaN(parseInt(betType)) && parseInt(betType) === finalNumber) {
        totalWinnings += betAmount * 36;
      } else if (finalNumber !== 0) {
        if ((betType === 'red' && numColor === 'red') ||
            (betType === 'black' && numColor === 'black') ||
            (betType === 'even' && finalNumber % 2 === 0) ||
            (betType === 'odd' && finalNumber % 2 !== 0)) {
          totalWinnings += betAmount * 2;
        }
      }
    }

    setBalance(prev => prev + totalWinnings);
    const profit = totalWinnings - totalBet;

    if (totalWinnings > 0) {
      setMessage(`Number ${finalNumber} (${numColor})! Won ${totalWinnings} chips!`);
      setVitoMessage({ text: `Nice hit on ${finalNumber}! You're up ${profit} chips.`, type: 'success' });
    } else {
      setMessage(`Number ${finalNumber} (${numColor}). Lost ${totalBet} chips.`);
      setVitoMessage({ text: `Tough luck. ${finalNumber} wasn't your number.`, type: 'warning' });
    }

    setBets({});
    setIsSpinning(false);
  };

  const getNumberColor = (num: number) => {
    const color = ROULETTE_NUMBER_COLORS[num];
    if (color === 'red') return 'bg-red-600';
    if (color === 'black') return 'bg-gray-900';
    return 'bg-green-600';
  };

  return (
    <div className="w-full text-white">
      <div className="bg-gray-900/50 rounded-lg p-6 mb-4 border-2 border-amber-500/50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gray-400 text-sm">Balance</p>
            <p className="text-3xl font-bold text-green-400">{balance}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Bet</p>
            <p className="text-3xl font-bold text-yellow-400">{totalBet}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Winning #</p>
            <p className="text-3xl font-bold">{winningNumber ?? '--'}</p>
          </div>
        </div>
        <p className="text-center text-yellow-300 mt-4 italic">{message}</p>
      </div>

      <div className="bg-green-900/80 rounded-lg p-4 border-2 border-amber-500/50 mb-4">
        <div className="grid grid-cols-6 gap-1 mb-2">
          {Array.from({ length: 37 }, (_, i) => i).map(num => (
            <button
              key={num}
              onClick={() => placeBet(num.toString())}
              disabled={isSpinning}
              className={`${getNumberColor(num)} h-12 text-white font-bold rounded hover:opacity-80 disabled:opacity-50`}
            >
              {num}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-6 gap-1 mt-2">
          {['red', 'black', 'even', 'odd', '1-18', '19-36'].map(bet => (
            <button
              key={bet}
              onClick={() => placeBet(bet)}
              disabled={isSpinning}
              className={`font-bold py-3 rounded hover:opacity-80 disabled:opacity-50 ${bet === 'red' ? 'bg-red-600' : bet === 'black' ? 'bg-gray-900' : 'bg-gray-700'}`}
            >
              {bet.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 justify-center items-center">
        <div className="flex gap-2">
          {[5, 10, 25, 50, 100].map(chip => (
            <button
              key={chip}
              onClick={() => setSelectedChip(chip)}
              className={`w-12 h-12 rounded-full font-bold transition-all ${selectedChip === chip ? 'scale-110 ring-2 ring-yellow-300' : ''}`}
              style={{backgroundColor: chip === 5 ? '#2563eb' : chip === 10 ? '#16a34a' : chip === 25 ? '#334155' : chip === 50 ? '#7c2d12' : '#4f46e5'}}
            >
              {chip}
            </button>
          ))}
        </div>
        <button
          onClick={spinRoulette}
          disabled={isSpinning || totalBet === 0}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50"
        >
          {isSpinning ? 'Spinning...' : 'Spin'}
        </button>
        <button
          onClick={clearBets}
          disabled={isSpinning || totalBet === 0}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default RouletteGame;
