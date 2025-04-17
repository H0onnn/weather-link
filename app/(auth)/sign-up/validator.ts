import { z } from 'zod';

import { PASSWORD_ERROR_MESSAGE, PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@/constants/valid';

const PASSWORD_CONFIRM_ERROR_MESSAGE = '비밀번호가 일치하지 않습니다.';

const NAME_REGEX = /^[가-힣a-zA-Z0-9]+$/;
const NAME_MAX_LENGTH = 8;
const NAME_ERROR_MESSAGE = '이름은 한글, 영어, 숫자만 입력 가능합니다.';
const NAME_LENGTH_ERROR_MESSAGE = '이름은 최대 8글자까지 입력 가능합니다.';

type SignupFormSchema = z.infer<typeof signupSchema>;

const checkPassword = (password: string, passwordConfirm: string): boolean => {
  return password === passwordConfirm;
};

const fileSchema = z.any().refine(
  (file) => {
    if (!file) return true;
    if (typeof file === 'string') return true;

    return (
      file instanceof File ||
      file instanceof Blob ||
      (typeof file === 'object' && 'name' in file && 'type' in file && 'size' in file)
    );
  },
  { message: '유효한 이미지 파일이 아닙니다.' },
);

const signupSchema = z
  .object({
    email: z.string().min(1, '이메일을 입력해주세요.').email('이메일 형식이 올바르지 않습니다.'),
    password: z
      .string()
      .min(1, '비밀번호를 입력해주세요.')
      .min(PASSWORD_MIN_LENGTH, PASSWORD_ERROR_MESSAGE)
      .regex(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE),
    passwordConfirm: z.string(),
    name: z
      .string()
      .min(1, '사용할 이름을 입력해주세요.')
      .max(NAME_MAX_LENGTH, NAME_LENGTH_ERROR_MESSAGE)
      .regex(NAME_REGEX, NAME_ERROR_MESSAGE),
    profileImage: fileSchema.optional(),
    location: z.object({
      sido: z.string().min(1, '시/도를 입력해주세요.'),
      gugun: z.string().min(1, '시/군/구를 입력해주세요.'),
    }),
    termsAgreed: z.boolean().refine((value) => value, { message: '서비스 이용약관에 동의해주세요.' }),
    locationAgreed: z.boolean().refine((value) => value, { message: '개인정보 수집 및 이용에 동의해주세요.' }),
  })
  .refine(({ password, passwordConfirm }) => checkPassword(password, passwordConfirm), {
    message: PASSWORD_CONFIRM_ERROR_MESSAGE,
    path: ['passwordConfirm'],
  })
  .refine(({ termsAgreed, locationAgreed }) => termsAgreed && locationAgreed, {
    message: '모든 필수 약관에 동의해주세요.',
    path: ['termsAgreed', 'locationAgreed'],
  });

export { signupSchema, PASSWORD_MIN_LENGTH, NAME_MAX_LENGTH };
export type { SignupFormSchema };
