'use client';

import Image from 'next/image';
import * as React from 'react';
import { type Control, Controller, type FieldPath, type FieldValues } from 'react-hook-form';

import { ErrorMessage } from '@/components/ErrorMessage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface InputProps<T extends FieldValues> extends React.ComponentProps<'input'> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  error?: string;
  isReset?: boolean;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

const CustomInput = <T extends FieldValues>({
  control,
  name,
  className,
  type,
  label,
  error,
  isReset = true,
  rightSlot,
  leftSlot,
  ...props
}: InputProps<T>) => {
  const ref = React.useRef<HTMLInputElement>(null);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <div>
          <div className="flex flex-col gap-2.5">
            <Label htmlFor={name}>{label}</Label>
            <Input
              {...props}
              {...field}
              ref={ref}
              id={name}
              className={className}
              type={type}
              onChange={onChange}
              leftSlot={leftSlot}
              rightSlot={
                <div className="flex items-center gap-4">
                  {isReset && field.value && (
                    <button
                      type="button"
                      onClick={() => {
                        onChange('');
                        ref.current?.focus();
                      }}
                      tabIndex={-1}
                    >
                      <Image src="/icons/input/reset.svg" alt="reset" width={18} height={18} />
                    </button>
                  )}
                  {rightSlot}
                </div>
              }
            />
          </div>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
      )}
    />
  );
};

export default CustomInput;
