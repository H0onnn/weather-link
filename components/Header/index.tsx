import { Back, LocationDisplay, Notification, Setting, Title } from './components';

const Root = ({ children }: { children: React.ReactNode }) => {
  return <header className="min-h-[80px] bg-background px-4 py-6 border-b border-b-gray-200">{children}</header>;
};

const Header = () => null;

Header.Root = Root;
Header.LocationDisplay = LocationDisplay;
Header.Notification = Notification;
Header.Setting = Setting;
Header.Back = Back;
Header.Title = Title;

export default Header;
