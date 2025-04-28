import React from 'react';

import { cn } from '@/lib/utils';

import Description from './Description';
import Title from './Title';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Root = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn('card-container relative w-full min-h-19 bg-white p-4 rounded-[16px] shadow-shadow1', className)}
    >
      {children}
    </div>
  );
};

const Card = () => null;

Card.Root = Root;
Card.Title = Title;
Card.Description = Description;

export default Card;
