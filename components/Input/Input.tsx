import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import type { FieldPath, FieldValues } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface InputProps<T extends FieldValues> extends React.ComponentProps<'input'> {
  name: FieldPath<T>;
  label: string;
}

const CustomInput = <T extends FieldValues>({ name, className, type, label, ...props }: InputProps<T>) => {
  const method = useFormContext<T>();

  const { control } = method;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <div className="flex flex-col gap-2.5">
          <Label htmlFor={name} className="text-sm text-gray-600">
            {label}
          </Label>
          <Input id={name} className={className} type={type} {...props} {...field} onChange={onChange} />
        </div>
      )}
    />
  );
};

export default CustomInput;
