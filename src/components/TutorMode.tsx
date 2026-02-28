import React from 'react';
import { GameType, VitoMessage } from '../types';
import BlackjackGame from './BlackjackGame';
import RouletteGame from './RouletteGame';

// Tutor Mode Component
const TutorMode: React.FC<{
  gameType: GameType;
  onClose: () => void;
  setVitoMessage: (msg: VitoMessage) => void;
}> = ({ gameType, onClose, setVitoMessage }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl border-2 border-amber-400/50 w-full max-w-5xl text-white relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition z-10 text-3xl font-bold"
        >
          ×
        </button>
        <div className="p-6">
          <h2 className="text-3xl font-bold text-center mb-6" style={{ color: '#d4af37' }}>
            {gameType} Tutor Mode
          </h2>
          {gameType === 'Blackjack' ? (
            <BlackjackGame setVitoMessage={setVitoMessage} />
          ) : (
            <RouletteGame setVitoMessage={setVitoMessage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorMode;
