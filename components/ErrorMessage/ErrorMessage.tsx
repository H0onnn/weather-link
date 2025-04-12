import React from 'react';

const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-red">{children}</p>;
};

export default ErrorMessage;
