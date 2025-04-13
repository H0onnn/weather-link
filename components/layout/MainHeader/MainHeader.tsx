import Header from '@/components/Header';

const MainHeader = () => {
  return (
    <Header.Root>
      <Header.LocationDisplay />

      <div className="flex items-center gap-2">
        <Header.Notification />
        <Header.Setting />
      </div>
    </Header.Root>
  );
};

export default MainHeader;
