export type VitoMessageType = 'intro' | 'info' | 'success' | 'warning' | 'tip' | 'reminder';

export interface VitoMessage {
  text: string;
  type: VitoMessageType;
}

export type GameType = 'Blackjack' | 'Roulette';

export interface Card {
  suit: '♠' | '♥' | '♦' | '♣';
  rank: string;
  value: number;
}
