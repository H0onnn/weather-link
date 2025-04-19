'use client';

import { EllipsisVertical, LucideGitCompare, LucideTrash } from 'lucide-react';
import { overlay } from 'overlay-kit';

import { Button as ModalButton } from '@/components/Button';
import { Card } from '@/components/Card';
import { DropdownMenu } from '@/components/DropdownMenu/DropdownMenu';
import { Modal } from '@/components/Modal';
import { UserAvatar } from '@/components/UserAvatar';
import { WeatherIcon } from '@/components/WeatherIcon';
import { Button } from '@/components/ui/button';
import { DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu';

const FriendList = () => {
  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="card-container flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card.Root key={i}>
            <div className="flex items-center gap-2">
              <UserAvatar />
              <div className="flex flex-col gap-1 ml-3 flex-2/4">
                <Card.Title>강하늘</Card.Title>
                <Card.Description>email@email.com</Card.Description>
              </div>

              <DropdownMenu
                trigger={
                  <Button size="icon" variant="ghost" className="rounded-2xl text-sm">
                    <EllipsisVertical className="size-3" />
                  </Button>
                }
                slot={
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">
                      <LucideGitCompare className="size-3 mr-2 text-primary" fill="currentColor" />
                      날씨 비교
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        overlay.open((props) => {
                          return (
                            <Modal
                              {...props}
                              titleSlot={<div className="text-lg font-semibold text-gray-800">정말 삭제할까요?</div>}
                              buttonSlot={
                                <>
                                  <ModalButton.Secondary className="flex-1" onClick={props.close}>
                                    아니오
                                  </ModalButton.Secondary>
                                  <ModalButton.Warn className="flex-1" onClick={props.close}>
                                    네, 삭제할래요
                                  </ModalButton.Warn>
                                </>
                              }
                            >
                              삭제했던 친구도 언제든지 다시 추가할 수 있어요
                            </Modal>
                          );
                        });
                      }}
                    >
                      <LucideTrash className="size-3 mr-2 text-red" stroke="currentColor" />
                      친구 삭제
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                }
              />
            </div>
            <div className="bg-body rounded-2xl p-4 min-h-24 mt-3 pb-0">
              <Card.Description className="text-gray-500">서울특별시 강서구</Card.Description>

              <div className="flex items-center -ml-5">
                <WeatherIcon type="SUNNY" width={64} height={64} />
                <span className="text-md font-light -ml-2">19 °C</span>
                <span className="text-md font-light ml-4 text-gray-500">맑음</span>
              </div>
            </div>
          </Card.Root>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
