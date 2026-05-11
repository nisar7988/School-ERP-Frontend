import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubjectSchema, type SubjectDto } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useClasses } from '@/features/classes/api/queries';

interface SubjectFormProps {
  onSubmit: (data: SubjectDto) => void;
  isLoading: boolean;
  defaultValues?: Partial<SubjectDto>;
  fixedClassId?: string;
}

export function SubjectForm({ onSubmit, isLoading, defaultValues, fixedClassId }: SubjectFormProps) {
  const { data: classesResponse } = useClasses({ limit: 100 });
  const classes = classesResponse?.data || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectDto>({
    resolver: zodResolver(SubjectSchema),
    defaultValues: {
      ...defaultValues,
      classId: fixedClassId || defaultValues?.classId || '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Subject Name</label>
          <Input
            {...register('name')}
            placeholder="e.g. Mathematics"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-xs text-red-500 font-bold">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Subject Code</label>
          <Input
            {...register('code')}
            placeholder="e.g. MATH101"
            className={errors.code ? 'border-red-500' : ''}
          />
          {errors.code && <p className="text-xs text-red-500 font-bold">{errors.code.message}</p>}
        </div>

        {!fixedClassId && (
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Class</label>
            <select
              {...register('classId')}
              className={`w-full h-12 rounded-2xl border-gray-100 bg-gray-50/50 px-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-brand-orange/10 transition-all outline-none border ${
                errors.classId ? 'border-red-500' : ''
              }`}
            >
              <option value="">Select a class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} - {cls.section}
                </option>
              ))}
            </select>
            {errors.classId && <p className="text-xs text-red-500 font-bold">{errors.classId.message}</p>}
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-14 rounded-2xl font-black text-lg bg-brand-orange hover:bg-orange-600 text-white shadow-xl shadow-orange-100 transition-all"
      >
        {isLoading ? 'Saving...' : 'Save Subject'}
      </Button>
    </form>
  );
}
