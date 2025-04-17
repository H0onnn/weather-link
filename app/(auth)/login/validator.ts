import { z } from 'zod';

import {
  EMAIL_FORMAT_ERROR_MESSAGE,
  EMAIL_REQUIRED_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REQUIRED_ERROR_MESSAGE,
} from '@/constants/valid';

export type LoginFormSchema = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, EMAIL_REQUIRED_ERROR_MESSAGE).email(EMAIL_FORMAT_ERROR_MESSAGE),

  password: z
    .string()
    .min(1, PASSWORD_REQUIRED_ERROR_MESSAGE)
    .min(PASSWORD_MIN_LENGTH, PASSWORD_ERROR_MESSAGE)
    .regex(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE),
});
