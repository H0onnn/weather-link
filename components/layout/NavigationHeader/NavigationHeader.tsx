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
      <Header.Back />
      <Header.Title>{title}</Header.Title>
      <div className="w-9" />
    </Header.Root>
  );
};

export default NavigationHeader;
