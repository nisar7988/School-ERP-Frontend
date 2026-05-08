import { z } from 'zod';
import { Role } from '@/types/base.types';
import type { UserWithProfiles as User  } from '@/types/base.types';


export { Role }
export type { User }

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginDto = z.infer<typeof LoginSchema>;

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    user: User;
  };
}
