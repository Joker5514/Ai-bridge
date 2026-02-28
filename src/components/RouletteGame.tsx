import React, { useState, useCallback } from 'react';
import { VitoMessage } from '../types';
import { ROULETTE_NUMBER_COLORS } from '../utils/gameLogic';
import { getVitoMessage } from '../services/ai';

// Roulette Game Component
const RouletteGame: React.FC<{ setVitoMessage: (msg: VitoMessage) => void }> = ({ setVitoMessage }) => {
  const [balance, setBalance] = useState(1000);
  const [bets, setBets] = useState<{ [key: string]: number }>({});
  const [selectedChip, setSelectedChip] = useState(10);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [message, setMessage] = useState("Place your bets!");

  const totalBet = Object.values(bets).reduce((a, b) => a + b, 0);

  const updateVitoMessage = useCallback(async (context: string, outcome: 'win' | 'loss' | 'neutral') => {
    const text = await getVitoMessage(context, outcome);
    const type = outcome === 'win' ? 'success' : outcome === 'loss' ? 'warning' : 'info';
    setVitoMessage({ text, type });
  }, [setVitoMessage]);

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

  const calculateWinnings = async (finalNumber: number, currentBets: { [key: string]: number }) => {
    setWinningNumber(finalNumber);
    let totalWinnings = 0;
    const numColor = ROULETTE_NUMBER_COLORS[finalNumber];

    for (const [betType, betAmount] of Object.entries(currentBets)) {
      if (!isNaN(parseInt(betType)) && parseInt(betType) === finalNumber) {
        // Straight up bet (35:1) + original bet = 36x
        totalWinnings += betAmount * 36;
      } else if (finalNumber !== 0) {
        // Outside bets
        if (
          (betType === 'red' && numColor === 'red') ||
          (betType === 'black' && numColor === 'black') ||
          (betType === 'even' && finalNumber % 2 === 0) ||
          (betType === 'odd' && finalNumber % 2 !== 0) ||
          (betType === '1-18' && finalNumber >= 1 && finalNumber <= 18) ||
          (betType === '19-36' && finalNumber >= 19 && finalNumber <= 36)
        ) {
          // 1:1 payout + original bet = 2x
          totalWinnings += betAmount * 2;
        }
      }
    }

    setBalance(prev => prev + totalWinnings);
    const profit = totalWinnings - Object.values(currentBets).reduce((a, b) => a + b, 0);

    if (totalWinnings > 0) {
      setMessage(`Number ${finalNumber} (${numColor})! Won ${totalWinnings} chips!`);
      await updateVitoMessage(`won ${profit} chips in roulette with number ${finalNumber}`, 'win');
    } else {
      setMessage(`Number ${finalNumber} (${numColor}). Lost ${totalBet} chips.`);
      await updateVitoMessage(`lost in roulette with number ${finalNumber}`, 'loss');
    }

    setBets({});
    setIsSpinning(false);
  };

  const spinRoulette = () => {
    if (isSpinning || totalBet === 0) return;
    setIsSpinning(true);
    setMessage("Spinning...");

    // Capture bets at the moment of spin
    const currentBets = { ...bets };

    setTimeout(() => {
      const finalNumber = Math.floor(Math.random() * 37);
      calculateWinnings(finalNumber, currentBets);
    }, 2000);
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
