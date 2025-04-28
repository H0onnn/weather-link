import { z } from 'zod';

import { checkPassword } from '@/utils/validUtils';

import {
  ALL_TERMS_REQUIRED_ERROR_MESSAGE,
  EMAIL_FORMAT_ERROR_MESSAGE,
  EMAIL_REQUIRED_ERROR_MESSAGE,
  GUGUN_REQUIRED_ERROR_MESSAGE,
  INVALID_IMAGE_ERROR_MESSAGE,
  LOCATION_TERMS_REQUIRED_ERROR_MESSAGE,
  NAME_ERROR_MESSAGE,
  NAME_LENGTH_ERROR_MESSAGE,
  NAME_MAX_LENGTH,
  NAME_REGEX,
  NAME_REQUIRED_ERROR_MESSAGE,
  PASSWORD_CONFIRM_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REQUIRED_ERROR_MESSAGE,
  SIDO_REQUIRED_ERROR_MESSAGE,
  TERMS_REQUIRED_ERROR_MESSAGE,
} from '@/constants/valid';

type SignupFormSchema = z.infer<typeof signupSchema>;

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
  { message: INVALID_IMAGE_ERROR_MESSAGE },
);

const signupSchema = z
  .object({
    email: z.string().min(1, EMAIL_REQUIRED_ERROR_MESSAGE).email(EMAIL_FORMAT_ERROR_MESSAGE),
    password: z
      .string()
      .min(1, PASSWORD_REQUIRED_ERROR_MESSAGE)
      .min(PASSWORD_MIN_LENGTH, PASSWORD_ERROR_MESSAGE)
      .regex(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE),
    passwordConfirm: z.string(),
    name: z
      .string()
      .min(1, NAME_REQUIRED_ERROR_MESSAGE)
      .max(NAME_MAX_LENGTH, NAME_LENGTH_ERROR_MESSAGE)
      .regex(NAME_REGEX, NAME_ERROR_MESSAGE),
    profileImage: fileSchema.optional(),
    location: z.object({
      sido: z.string().min(1, SIDO_REQUIRED_ERROR_MESSAGE),
      gugun: z.string().min(1, GUGUN_REQUIRED_ERROR_MESSAGE),
    }),
    termsAgreed: z.boolean().refine((value) => value, { message: TERMS_REQUIRED_ERROR_MESSAGE }),
    locationAgreed: z.boolean().refine((value) => value, { message: LOCATION_TERMS_REQUIRED_ERROR_MESSAGE }),
  })
  .refine(({ password, passwordConfirm }) => checkPassword(password, passwordConfirm), {
    message: PASSWORD_CONFIRM_ERROR_MESSAGE,
    path: ['passwordConfirm'],
  })
  .refine(({ termsAgreed, locationAgreed }) => termsAgreed && locationAgreed, {
    message: ALL_TERMS_REQUIRED_ERROR_MESSAGE,
    path: ['termsAgreed', 'locationAgreed'],
  });

export { signupSchema };
export type { SignupFormSchema };
