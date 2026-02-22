import React, { useState, useEffect, useCallback } from 'react';
import { Card as CardType, VitoMessage } from '../types';
import { createDeck, shuffleDeck, calculateScore } from '../utils/gameLogic';
import Card from './Card';
import { getVitoMessage } from '../services/ai';

// Blackjack Game Component
const BlackjackGame: React.FC<{ setVitoMessage: (msg: VitoMessage) => void }> = ({ setVitoMessage }) => {
  const [deck, setDeck] = useState<CardType[]>([]);
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [dealerHand, setDealerHand] = useState<CardType[]>([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const updateVitoMessage = useCallback(async (context: string, outcome: 'win' | 'loss' | 'neutral') => {
    const text = await getVitoMessage(context, outcome);
    const type = outcome === 'win' ? 'success' : outcome === 'loss' ? 'warning' : 'info';
    setVitoMessage({ text, type });
  }, [setVitoMessage]);

  const deal = useCallback(() => {
    const newDeck = shuffleDeck(createDeck());
    const newPlayerHand = [newDeck.pop()!, newDeck.pop()!];
    const newDealerHand = [newDeck.pop()!, newDeck.pop()!];

    setDeck(newDeck);
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setGameOver(false);
    setMessage('');
    updateVitoMessage('new blackjack hand', 'neutral');
  }, [updateVitoMessage]);

  useEffect(() => {
    deal();
  }, [deal]);

  useEffect(() => {
    setPlayerScore(calculateScore(playerHand));
    setDealerScore(calculateScore(dealerHand));
  }, [playerHand, dealerHand]);

  const handleHit = async () => {
    if (gameOver || deck.length === 0) return;

    const newDeck = [...deck];
    const newCard = newDeck.pop()!;
    const newPlayerHand = [...playerHand, newCard];
    const newPlayerScore = calculateScore(newPlayerHand);

    setPlayerHand(newPlayerHand);
    setDeck(newDeck);

    if (newPlayerScore > 21) {
      setMessage('Bust! You lose.');
      setGameOver(true);
      await updateVitoMessage('player busted in blackjack', 'loss');
    }
  };

  const handleStand = async () => {
    if (gameOver) return;
    setGameOver(true);

    const currentDeck = [...deck];
    const currentDealerHand = [...dealerHand];
    let currentDealerScore = calculateScore(currentDealerHand);

    while (currentDealerScore < 17) {
      if (currentDeck.length === 0) break;
      currentDealerHand.push(currentDeck.pop()!);
      currentDealerScore = calculateScore(currentDealerHand);
    }

    setDealerHand(currentDealerHand);

    if (currentDealerScore > 21) {
      setMessage('Dealer busts! You win!');
      await updateVitoMessage('dealer busted in blackjack', 'win');
    } else if (currentDealerScore > playerScore) {
      setMessage('Dealer wins.');
      await updateVitoMessage('dealer won in blackjack', 'loss');
    } else if (playerScore > currentDealerScore) {
      setMessage('You win!');
      await updateVitoMessage('player won in blackjack', 'win');
    } else {
      setMessage("It's a push.");
      await updateVitoMessage('blackjack push', 'neutral');
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <div>
        <h3 className="text-xl font-bold mb-2 text-center">
          Dealer's Hand ({gameOver ? dealerScore : '?'})
        </h3>
        <div className="flex gap-2 min-h-[112px]">
          {dealerHand.map((card, i) => (
            !gameOver && i === 1 ?
              <div key={i} className="w-20 h-28 rounded-md bg-blue-800"></div> :
              <Card key={i} card={card} />
          ))}
        </div>
      </div>

      {message && <div className="text-center font-bold text-2xl my-2" style={{ color: '#d4af37' }}>{message}</div>}

      <div>
        <h3 className="text-xl font-bold mb-2 text-center">Your Hand ({playerScore})</h3>
        <div className="flex gap-2 min-h-[112px]">
          {playerHand.map((card, i) => <Card key={i} card={card} />)}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleHit}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded disabled:opacity-50"
          disabled={gameOver || playerScore >= 21}
        >
          Hit
        </button>
        <button
          onClick={handleStand}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded disabled:opacity-50"
          disabled={gameOver}
        >
          Stand
        </button>
      </div>

      <button
        onClick={deal}
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded mt-4"
      >
        New Hand
      </button>
    </div>
  );
};

export default BlackjackGame;
