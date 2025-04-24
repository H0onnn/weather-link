'use client';

import { removeToken } from '@/actions';
import { logout, withdraw } from '@/app/(auth)/profile/_service/apis';
import { signOut } from 'next-auth/react';
import { overlay } from 'overlay-kit';
import { toast } from 'sonner';

import { Modal } from '@/components/Modal';
import { Button } from '@/components/ui/button';

import { type ApiResponse } from '@/lib/axios';
import { getQueryClient } from '@/lib/query';

export default function ProfileManagePage() {
  const queryClient = getQueryClient();

  const manageFunction = async (fn: () => Promise<ApiResponse<unknown>>, type: 'logout' | 'withdraw' = 'logout') => {
    try {
      await fn();
      await removeToken();
      signOut({ callbackUrl: '/login', redirect: true });
      queryClient.clear();
      type === 'withdraw' && toast.success('탈퇴가 완료되었어요');
    } catch (error) {
      toast.error('예상치 못한 오류가 발생했어요. 잠시 후 다시 시도해주세요.');
    }
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
              <Button variant="warn" className="flex-1 text-base font-semibold" onClick={() => manageFunction(logout)}>
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
          <span className="font-medium">카카오 계정</span>
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
