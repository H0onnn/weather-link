import { z } from 'zod';

import {
  INVALID_IMAGE_ERROR_MESSAGE,
  NAME_LENGTH_ERROR_MESSAGE,
  NAME_MAX_LENGTH,
  NAME_REQUIRED_ERROR_MESSAGE,
} from '@/constants/valid';

type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

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

const updateProfileSchema = z.object({
  name: z.string().min(1, NAME_REQUIRED_ERROR_MESSAGE).max(NAME_MAX_LENGTH, NAME_LENGTH_ERROR_MESSAGE).optional(),
  profileImage: fileSchema.optional(),
});

export { updateProfileSchema };
export type { UpdateProfileSchema };
