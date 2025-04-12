import React from 'react';

import Header from '@/components/Header';

const MainHeader = () => {
  return (
    <Header.Root>
      <div className="flex items-center justify-between">
        <Header.LocationDisplay />

        <div className="flex items-center gap-2">
          <Header.Notification />
          <Header.Setting />
        </div>
      </div>
    </Header.Root>
  );
};

export default MainHeader;
