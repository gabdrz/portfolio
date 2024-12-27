// src/components/CardItem.tsx
import React from 'react';
import { Card } from '../types/cards';
import { CardContent } from './CardContent';

interface CardItemProps {
  card: Card;
  className: string;
}

export const CardItem: React.FC<CardItemProps> = ({ card, className }) => (
  <div className={className}>
    <CardContent card={card} />
  </div>
);

export default Cards;