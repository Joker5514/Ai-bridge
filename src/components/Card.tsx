import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => (
  <div className={`w-20 h-28 flex flex-col justify-between p-2 rounded-md shadow-md ${card.suit === '♥' || card.suit === '♦' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-black'}`}>
    <span className="text-xl font-bold">{card.rank}</span>
    <span className="text-3xl self-center">{card.suit}</span>
  </div>
);

export default Card;
