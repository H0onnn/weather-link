import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import type { FieldPath, FieldValues } from 'react-hook-form';

import { Input } from '@/components/ui/input';

interface InputProps<T extends FieldValues>
  extends React.ComponentProps<'input'> {
  name: FieldPath<T>;
}

const CustomInput = <T extends FieldValues>({
  name,
  className,
  type,
  ...props
}: InputProps<T>) => {
  const method = useFormContext<T>();

  const { control } = method;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <Input
          className={className}
          type={type}
          {...props}
          {...field}
          onChange={onChange}
        />
      )}
    />
  );
};

export default CustomInput;
