import React from 'react';

import Description from './Description';
import Title from './Title';

const Root = ({ children }: { children: React.ReactNode }) => {
  return <div className="card-container w-full min-h-16 bg-white p-4 rounded-lg">{children}</div>;
};

const Card = () => null;

Card.Root = Root;
Card.Title = Title;
Card.Description = Description;

export default Card;
