
import { Dialog } from '@/components/ui/Dialog';
import { SubjectForm } from './SubjectForm';
import { useCreateSubject, useUpdateSubject } from '../api/queries';
import type { Subject, SubjectDto } from '../types';

interface SubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject?: Subject | null;
  fixedClassId?: string;
}

export function SubjectModal({ isOpen, onClose, subject, fixedClassId }: SubjectModalProps) {
  const { mutate: createSubject, isPending: isCreating } = useCreateSubject();
  const { mutate: updateSubject, isPending: isUpdating } = useUpdateSubject();

  const handleSubmit = (data: SubjectDto) => {
    if (subject) {
      updateSubject(
        { id: subject.id, data },
        {
          onSuccess: () => onClose(),
        }
      );
    } else {
      createSubject(data, {
        onSuccess: () => onClose(),
      });
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={subject ? 'Edit Subject' : 'Add New Subject'}
      variant="default"
    >
      <div className="p-1">
        <SubjectForm
          onSubmit={handleSubmit}
          isLoading={isCreating || isUpdating}
          defaultValues={subject || undefined}
          fixedClassId={fixedClassId}
        />
      </div>
    </Dialog>
  );
}
