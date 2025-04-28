import { CloudOff } from 'lucide-react';
import { type ReactNode } from 'react';

interface NonDataFallbackProps {
  title?: ReactNode;
  description?: ReactNode;
}

const NonDataFallback = ({
  title = '준비된 데이터가 없습니다.',
  description = '데이터 요청 형식을 확인해주세요',
}: NonDataFallbackProps) => {
  return (
    <div className="flex flex-col max-w-[430px] mx-auto text-black mt-12 p-5">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <CloudOff className="w-16 h-16 text-primary" />
        </div>

        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray500">{description}</p>
      </div>
    </div>
  );
};

export default NonDataFallback;
