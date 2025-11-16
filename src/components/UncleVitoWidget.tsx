import React from 'react';
import { VitoMessage, GameType } from '../types';

// Uncle Vito Widget Component
const UncleVitoWidget: React.FC<{
  isVisible: boolean;
  message: VitoMessage | null;
  onClose: () => void;
  onLaunchTutor: (game: GameType) => void;
}> = ({ isVisible, message, onClose, onLaunchTutor }) => {
  if (!isVisible) return null;

  const getBubbleClasses = (type: VitoMessage['type']) => {
    switch(type) {
      case 'success': return 'border-green-400 bg-green-900/80';
      case 'warning': return 'border-red-400 bg-red-900/80';
      case 'tip': return 'border-blue-400 bg-blue-900/80';
      default: return 'border-amber-400 bg-black/80';
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-4">
      {message && (
        <div className={`relative max-w-xs p-4 rounded-lg shadow-2xl text-white backdrop-blur-md border-2 ${getBubbleClasses(message.type)}`}>
          <p className="text-sm mb-3">{message.text}</p>
          <div className="flex gap-2">
            <button
              onClick={() => onLaunchTutor('Blackjack')}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 rounded text-xs font-bold transition"
            >
              Practice Blackjack
            </button>
            <button
              onClick={() => onLaunchTutor('Roulette')}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 rounded text-xs font-bold transition"
            >
              Practice Roulette
            </button>
          </div>
        </div>
      )}
      <div className="relative w-32 h-32 bg-slate-800 border-4 rounded-full flex items-center justify-center" style={{ borderColor: '#d4af37' }}>
        <div className="text-6xl">🎩</div>
        <button
          onClick={onClose}
          className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-700 transition"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default UncleVitoWidget;
