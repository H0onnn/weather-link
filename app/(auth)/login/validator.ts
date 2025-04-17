import { z } from 'zod';

import { PASSWORD_ERROR_MESSAGE, PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@/constants/valid';

export type LoginFormSchema = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요.').email('이메일 형식이 올바르지 않습니다.'),

  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요.')
    .min(PASSWORD_MIN_LENGTH, '계정 정보가 올바르지 않습니다.')
    .regex(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE),
});
