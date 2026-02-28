import { Card } from '../types';

export const SUITS: Card['suit'][] = ['♠', '♥', '♦', '♣'];
export const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const createDeck = (): Card[] => {
  return SUITS.flatMap(suit =>
    RANKS.map(rank => {
      let value = parseInt(rank);
      if (rank === 'J' || rank === 'Q' || rank === 'K') value = 10;
      if (rank === 'A') value = 11;
      return { suit, rank, value };
    })
  );
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};

export const calculateScore = (hand: Card[]): number => {
  let score = hand.reduce((sum, card) => sum + card.value, 0);
  let aces = hand.filter(card => card.rank === 'A').length;
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }
  return score;
};

export const ROULETTE_NUMBER_COLORS: { [key: number]: 'red' | 'black' | 'green' } = {
  0: 'green', 1: 'red', 2: 'black', 3: 'red', 4: 'black', 5: 'red', 6: 'black',
  7: 'red', 8: 'black', 9: 'red', 10: 'black', 11: 'black', 12: 'red', 13: 'black',
  14: 'red', 15: 'black', 16: 'red', 17: 'black', 18: 'red', 19: 'red', 20: 'black',
  21: 'red', 22: 'black', 23: 'red', 24: 'black', 25: 'red', 26: 'black', 27: 'red',
  28: 'black', 29: 'black', 30: 'red', 31: 'black', 32: 'red', 33: 'black', 34: 'red',
  35: 'black', 36: 'red'
};
