'use client';

import { removeToken } from '@/actions';
import { logout, withdraw } from '@/app/(auth)/profile/_service/apis';
import { useMyUserInfo } from '@/app/(auth)/profile/_service/queries';
import { RegisterType } from '@/types/user';
import { redirect } from 'next/navigation';
import { overlay } from 'overlay-kit';
import { toast } from 'sonner';

import { Modal } from '@/components/Modal';
import { Button } from '@/components/ui/button';

import { type ApiResponse } from '@/lib/axios';
import { getQueryClient } from '@/lib/query';

const getRegisterType = (registerType: RegisterType) => {
  switch (registerType) {
    case 'EMAIL':
      return '이메일';
    case 'KAKAO':
      return '카카오';
    case 'GOOGLE':
      return '구글';
    case 'NAVER':
      return '네이버';
    default:
      return;
  }
};

export default function ProfileManagePage() {
  const queryClient = getQueryClient();
  const { data: user } = useMyUserInfo();

  const manageFunction = async (fn: () => Promise<ApiResponse<unknown>>, type: 'logout' | 'withdraw' = 'logout') => {
    await fn();
    await removeToken();

    if (type === 'withdraw') {
      toast.success('탈퇴가 완료되었어요', {
        description: '그동안 이용해주셔서 감사합니다. 나중에 다시 만나요!',
      });
    }

    queryClient.clear();
    redirect('/login');
  };

  const handleLogout = () => {
    overlay.open((props) => {
      return (
        <Modal
          {...props}
          titleSlot={<div className="text-lg font-bold">로그아웃 하시겠어요?</div>}
          buttonSlot={
            <>
              <Button variant="secondary" className="flex-1 text-base font-semibold" onClick={props.close}>
                아니오
              </Button>
              <Button
                variant="warn"
                className="flex-1 text-base font-semibold"
                onClick={async () => {
                  props.close();
                  await manageFunction(logout);
                }}
              >
                네, 로그아웃할래요
              </Button>
            </>
          }
        />
      );
    });
  };

  const handleWithdraw = () => {
    overlay.open((props) => {
      return (
        <Modal
          {...props}
          titleSlot={<div className="text-lg font-bold">서비스를 탈퇴하시겠어요?</div>}
          buttonSlot={
            <>
              <Button variant="secondary" className="flex-1 text-base font-semibold" onClick={props.close}>
                아니오
              </Button>
              <Button
                variant="warn"
                className="flex-1 text-base font-semibold"
                onClick={() => manageFunction(withdraw, 'withdraw')}
              >
                네, 탈퇴할래요
              </Button>
            </>
          }
        >
          탈퇴 시 모든 데이터가 삭제되며,
          <br />
          복구가 불가능해요
        </Modal>
      );
    });
  };

  return (
    <div className="p-5">
      <div className="bg-white rounded-[16px] shadow-shadow1 p-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <span className="font-medium">{getRegisterType(user?.registerType ?? 'EMAIL')} 계정</span>
          <button className="text-gray500 text-sm cursor-pointer" onClick={handleLogout}>
            로그아웃
          </button>
        </div>

        <div className="flex items-center justify-between pt-4">
          <span className="font-medium text-sm text-[#A7ACBD]">회원정보를 삭제하시겠어요?</span>
          <button className="text-gray500 text-sm cursor-pointer" onClick={handleWithdraw}>
            서비스 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
