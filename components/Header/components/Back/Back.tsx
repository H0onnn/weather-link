import { ArrowLeftIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

const Back = () => {
  return (
    <Button variant="ghost" size="icon">
      <ArrowLeftIcon />
    </Button>
  );
};

export default Back;
