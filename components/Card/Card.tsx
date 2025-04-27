import React from 'react';

import Description from './Description';
import Title from './Title';

const Root = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="card-container relative w-full h-19 bg-white p-4 rounded-[16px] shadow-shadow1">{children}</div>
  );
};

const Card = () => null;

Card.Root = Root;
Card.Title = Title;
Card.Description = Description;

export default Card;
