import { FieldErrors } from 'react-hook-form';

import { LoginFormSchema } from './validator';

export const getLoginErrorMessage = (error: FieldErrors<LoginFormSchema>) => {
  return error.email?.message || error.password?.message || error.root?.message;
};
