import React, { useState } from 'react';
import { Card, VitoMessage } from '../types';

// Blackjack Game Component
const BlackjackGame: React.FC<{ setVitoMessage: (msg: VitoMessage) => void }> = ({ setVitoMessage }) => {
  const SUITS: Card['suit'][] = ['♠', '♥', '♦', '♣'];
  const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  const createDeck = (): Card[] => {
    return SUITS.flatMap(suit =>
      RANKS.map(rank => {
        let value = parseInt(rank);
        if (rank === 'J' || rank === 'Q' || rank === 'K') value = 10;
        if (rank === 'A') value = 11;
        return { suit, rank, value };
      })
    );
  };

  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const calculateScore = (hand: Card[]): number => {
    let score = hand.reduce((sum, card) => sum + card.value, 0);
    let aces = hand.filter(card => card.rank === 'A').length;
    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }
    return score;
  };

  const deal = React.useCallback(() => {
    let newDeck = [...createDeck()].sort(() => Math.random() - 0.5);
    const newPlayerHand = [newDeck.pop()!, newDeck.pop()!];
    const newDealerHand = [newDeck.pop()!, newDeck.pop()!];

    setDeck(newDeck);
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setGameOver(false);
    setMessage('');
    setVitoMessage({ text: "Alright, new hand. Let's see what we got.", type: 'info' });
  }, [setVitoMessage]);

  React.useEffect(() => {
    deal();
  }, [deal]);

  React.useEffect(() => {
    setPlayerScore(calculateScore(playerHand));
    setDealerScore(calculateScore(dealerHand));
  }, [playerHand, dealerHand]);

  const handleHit = () => {
    if (gameOver || deck.length === 0) return;

    const newDeck = [...deck];
    const newCard = newDeck.pop()!;
    const newPlayerHand = [...playerHand, newCard];
    const newPlayerScore = calculateScore(newPlayerHand);

    setPlayerHand(newPlayerHand);
    setDeck(newDeck);

    if (newPlayerScore > 21) {
      setMessage('Bust! You lose.');
      setVitoMessage({ text: "Woah, easy there. You busted. Sometimes you gotta know when to hold back.", type: 'warning' });
      setGameOver(true);
    }
  };

  const handleStand = () => {
    if (gameOver) return;
    setGameOver(true);

    let currentDeck = [...deck];
    let currentDealerHand = [...dealerHand];
    let currentDealerScore = calculateScore(currentDealerHand);

    while (currentDealerScore < 17) {
      if (currentDeck.length === 0) break;
      currentDealerHand.push(currentDeck.pop()!);
      currentDealerScore = calculateScore(currentDealerHand);
    }

    setDealerHand(currentDealerHand);

    if (currentDealerScore > 21) {
      setMessage('Dealer busts! You win!');
      setVitoMessage({ text: "Attaboy! The house went bust. That's how you do it.", type: 'success' });
    } else if (currentDealerScore > playerScore) {
      setMessage('Dealer wins.');
    } else if (playerScore > currentDealerScore) {
      setMessage('You win!');
      setVitoMessage({ text: "Nice one, kid. Played your cards right.", type: 'success' });
    } else {
      setMessage("It's a push.");
    }
  };

  const CardComponent: React.FC<{ card: Card }> = ({ card }) => (
    <div className={`w-20 h-28 flex flex-col justify-between p-2 rounded-md shadow-md ${card.suit === '♥' || card.suit === '♦' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-black'}`}>
      <span className="text-xl font-bold">{card.rank}</span>
      <span className="text-3xl self-center">{card.suit}</span>
    </div>
  );

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
              <CardComponent key={i} card={card} />
          ))}
        </div>
      </div>

      {message && <div className="text-center font-bold text-2xl my-2" style={{ color: '#d4af37' }}>{message}</div>}

      <div>
        <h3 className="text-xl font-bold mb-2 text-center">Your Hand ({playerScore})</h3>
        <div className="flex gap-2 min-h-[112px]">
          {playerHand.map((card, i) => <CardComponent key={i} card={card} />)}
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
