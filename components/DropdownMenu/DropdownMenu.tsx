import * as React from 'react';

import {
  DropdownMenuContent,
  DropdownMenu as DropdownMenuPrimitive,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  slot: React.ReactNode;
}

export function DropdownMenu({ trigger, slot }: DropdownMenuProps) {
  return (
    <DropdownMenuPrimitive>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-5">{slot}</DropdownMenuContent>
    </DropdownMenuPrimitive>
  );
}
