import { z } from 'zod';
import type { BaseQuery, Subject } from '@/types/base.types';

export const SubjectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  classId: z.string().min(1, 'Class is required'),
});

export type SubjectDto = z.infer<typeof SubjectSchema>;
export type UpdateSubjectDto = Partial<SubjectDto>;

export interface SubjectQuery extends BaseQuery {
  classId?: string;
}

export type { Subject };
