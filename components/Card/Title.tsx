import React from 'react';

const Title = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-md font-medium text-gray-800">{children}</p>;
};

export default Title;
