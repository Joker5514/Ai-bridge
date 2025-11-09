import React, { useState } from 'react';

// Types
type VitoMessageType = 'intro' | 'info' | 'success' | 'warning' | 'tip' | 'reminder';

interface VitoMessage {
  text: string;
  type: VitoMessageType;
}

type GameType = 'Blackjack' | 'Roulette';

interface Card {
  suit: '♠' | '♥' | '♦' | '♣';
  rank: string;
  value: number;
}

// Constants
const AFFILIATE_LINK = "https://stake.us/?c=DSpKvytf";

const VALUE_PROPS = [
  {
    title: "America's Social Casino",
    description: "Premium gaming experience with social community features.",
  },
  {
    title: "Daily Bonus Rewards",
    description: "10,000 Gold Coins + 1 Stake Cash every single day.",
  },
  {
    title: "Crypto-Ready Platform",
    description: "Seamless blockchain transactions and instant payouts.",
  },
  {
    title: "VIP Experience",
    description: "Exclusive tiers, promotions, and elite player benefits.",
  }
];

const BANNERS = [
  "https://placehold.co/970x90/FFD700/000000?text=Claim+Your+Exclusive+Bonus+Now!",
  "https://placehold.co/970x90/1a1a1a/FFFFFF?text=Stake.us+Elite+-+VIP+Experience",
  "https://placehold.co/970x90/333333/FFD700?text=Daily+Rewards+and+Instant+Payouts"
];

// Header Component
const Header: React.FC<{ affiliateLink: string }> = ({ affiliateLink }) => {
  return (
    <header className="border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{ color: '#d4af37' }}>Uncle Vito's Casino Guide</h1>
        <a 
          href={affiliateLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-2 rounded-lg font-bold text-black transition-all duration-300 hover:scale-105"
          style={{ background: 'linear-gradient(45deg, #ffd700, #d4af37)' }}
        >
          Join Stake.us
        </a>
      </div>
    </header>
  );
};

// Hero Component
const Hero: React.FC<{ affiliateLink: string; onLaunchVito: () => void }> = ({ affiliateLink, onLaunchVito }) => {
  return (
    <section className="text-center py-16">
      <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: '#d4af37' }}>
        Master Your Game with Uncle Vito
      </h2>
      <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
        Learn blackjack and roulette strategies from a seasoned pro. Practice risk-free, get personalized advice, and play smarter.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={onLaunchVito}
          className="px-8 py-4 rounded-lg font-bold text-black text-lg transition-all duration-300 hover:scale-105"
          style={{ background: 'linear-gradient(45deg, #ffd700, #d4af37)', boxShadow: '0 0 24px rgba(212, 175, 55, 0.65)' }}
        >
          Talk to Uncle Vito
        </button>
        <a 
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-white/10 rounded-lg font-bold text-white text-lg border-2 border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          Play at Stake.us
        </a>
      </div>
      <RotatingBanner affiliateLink={affiliateLink} />
    </section>
  );
};

// Rotating Banner Component
const RotatingBanner: React.FC<{ affiliateLink: string }> = ({ affiliateLink }) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center mt-12">
      <div className="relative w-full max-w-4xl" style={{ aspectRatio: '970 / 90' }}>
        {BANNERS.map((bannerUrl, index) => (
          <a 
            key={index} 
            href={affiliateLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBanner ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={bannerUrl} 
              alt="Promotional Banner" 
              className="rounded-lg shadow-lg w-full h-full object-cover" 
            />
          </a>
        ))}
      </div>
    </div>
  );
};

// Value Propositions Component
const ValuePropositions: React.FC = () => {
  return (
    <section className="py-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 tracking-wider text-center" style={{ color: '#d4af37' }}>
        Why Play With Us?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {VALUE_PROPS.map((prop) => (
          <div 
            key={prop.title} 
            className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/10 transform transition duration-300 hover:-translate-y-2 hover:border-amber-400/50"
          >
            <div className="mb-4">
              <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <span className="font-bold text-xl" style={{ color: '#d4af37' }}>★</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{prop.title}</h3>
            <p className="text-gray-400">{prop.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-md py-8 mt-20">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p className="mb-2">© 2024 Uncle Vito's Casino Guide. For entertainment purposes only.</p>
        <p className="text-sm">Please gamble responsibly. Must be 21+ to play.</p>
      </div>
    </footer>
  );
};

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

// Main App Component
const App: React.FC = () => {
  const [isVitoVisible, setIsVitoVisible] = useState(false);
  const [vitoMessage, setVitoMessage] = useState<VitoMessage | null>(null);
  const [tutorMode, setTutorMode] = useState<GameType | null>(null);

  const handleLaunchVito = () => {
    setIsVitoVisible(true);
    setVitoMessage({
      text: "Alright, let's see what you got. I'm here to help you practice, but don't get any funny ideas. I've seen it all.",
      type: 'intro',
    });
  };

  const handleCloseVito = () => {
    setIsVitoVisible(false);
  };

  const handleLaunchTutor = (game: GameType) => {
    setTutorMode(game);
  };

  const handleCloseTutor = () => {
    setTutorMode(null);
  };

  const handleSetVitoMessage = (msg: VitoMessage) => {
    setVitoMessage(msg);
    setIsVitoVisible(true);
  };

  return (
    <div className="min-h-screen" style={{ 
      backgroundImage: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
      fontFamily: "'Inter', sans-serif"
    }}>
      <Header affiliateLink={AFFILIATE_LINK} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Hero affiliateLink={AFFILIATE_LINK} onLaunchVito={handleLaunchVito} />
        <ValuePropositions />
      </main>
      <Footer />
      <UncleVitoWidget
        isVisible={isVitoVisible}
        message={vitoMessage}
        onClose={handleCloseVito}
        onLaunchTutor={handleLaunchTutor}
      />
      {tutorMode && (
        <TutorMode
          gameType={tutorMode}
          onClose={handleCloseTutor}
          setVitoMessage={handleSetVitoMessage}
        />
      )}
    </div>
  );
};

export default App;
