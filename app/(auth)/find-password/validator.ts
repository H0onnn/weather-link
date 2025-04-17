import { z } from 'zod';

import {
  EMAIL_FORMAT_ERROR_MESSAGE,
  EMAIL_REQUIRED_ERROR_MESSAGE,
  PASSWORD_CONFIRM_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REQUIRED_ERROR_MESSAGE,
} from '@/constants/valid';

import { checkPassword } from '@/lib/validUtils';

type FindPasswordFormSchema = z.infer<typeof findPasswordSchema>;

const findPasswordSchema = z
  .object({
    email: z.string().min(1, EMAIL_REQUIRED_ERROR_MESSAGE).email(EMAIL_FORMAT_ERROR_MESSAGE),
    newPassword: z
      .string()
      .min(1, PASSWORD_REQUIRED_ERROR_MESSAGE)
      .min(PASSWORD_MIN_LENGTH, PASSWORD_ERROR_MESSAGE)
      .regex(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE),
    confirmPassword: z.string(),
  })
  .refine(({ newPassword, confirmPassword }) => checkPassword(newPassword, confirmPassword), {
    message: PASSWORD_CONFIRM_ERROR_MESSAGE,
    path: ['confirmPassword'],
  });

export { findPasswordSchema };
export type { FindPasswordFormSchema };
