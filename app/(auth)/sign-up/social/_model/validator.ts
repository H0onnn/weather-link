import { z } from 'zod';

import {
  GUGUN_REQUIRED_ERROR_MESSAGE,
  LOCATION_TERMS_REQUIRED_ERROR_MESSAGE,
  SIDO_REQUIRED_ERROR_MESSAGE,
  TERMS_REQUIRED_ERROR_MESSAGE,
} from '@/constants/valid';

type SocialSignupFormSchema = z.infer<typeof socialSignupSchema>;

const socialSignupSchema = z.object({
  sido: z.string().min(1, SIDO_REQUIRED_ERROR_MESSAGE),
  gugun: z.string().min(1, GUGUN_REQUIRED_ERROR_MESSAGE),
  termsAgreed: z.boolean().refine((value) => value, { message: TERMS_REQUIRED_ERROR_MESSAGE }),
  locationAgreed: z.boolean().refine((value) => value, { message: LOCATION_TERMS_REQUIRED_ERROR_MESSAGE }),
});

export { socialSignupSchema };
export type { SocialSignupFormSchema };
