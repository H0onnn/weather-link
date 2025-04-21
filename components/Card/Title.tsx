import React from 'react';

const Title = ({ children }: { children: React.ReactNode }) => {
  return <p className="font-medium text-gray800">{children}</p>;
};

export default Title;
