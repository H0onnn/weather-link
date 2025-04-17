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
}

const CustomInput = <T extends FieldValues>({
  control,
  name,
  className,
  type,
  label,
  error,
  ...props
}: InputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <div>
          <div className="flex flex-col gap-2.5">
            <Label htmlFor={name}>{label}</Label>
            <Input {...props} {...field} id={name} className={className} type={type} onChange={onChange} />
          </div>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
      )}
    />
  );
};

export default CustomInput;
