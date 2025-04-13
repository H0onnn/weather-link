import Header from '@/components/Header';

interface NavigationHeaderProps {
  title: string;
}

/**
 * back button 있는 네비게이션 헤더
 */
const NavigationHeader = ({ title }: NavigationHeaderProps) => {
  return (
    <Header.Root>
      <div className="grid grid-cols-4">
        <Header.Back />
        <Header.Title className="col-span-2">{title}</Header.Title>
        <div className="col-span-1" />
      </div>
    </Header.Root>
  );
};

export default NavigationHeader;
