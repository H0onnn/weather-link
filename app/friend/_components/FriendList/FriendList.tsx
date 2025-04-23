'use client';

import { EllipsisVertical, LucideTrash2 } from 'lucide-react';
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
    <div className="p-5 flex flex-col gap-3">
      <div className="card-container flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card.Root key={i}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserAvatar />
                <div className="flex flex-col gap-1">
                  <Card.Title>강하늘</Card.Title>
                  <Card.Description>email@email.com</Card.Description>
                </div>
              </div>

              <DropdownMenu
                trigger={
                  <Button size="icon" variant="ghost" className="absolute right-2 top-2">
                    <EllipsisVertical />
                  </Button>
                }
                slot={
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="cursor-pointer text-red"
                      onClick={() => {
                        overlay.open((props) => {
                          return (
                            <Modal
                              {...props}
                              titleSlot="정말 삭제할까요?"
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
                      <LucideTrash2 className="text-red" stroke="currentColor" />
                      친구 삭제
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                }
              />
            </div>
            <div className="bg-body rounded-[16px] p-4 mt-2 pb-1">
              <Card.Description className="text-gray500">서울특별시 강서구</Card.Description>

              <div className="flex items-center gap-2">
                <WeatherIcon type="SUNNY" className="-ml-3" />
                <span className="-ml-3">19 °C</span>
                <span className="text-gray500">맑음</span>
              </div>
            </div>
          </Card.Root>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
