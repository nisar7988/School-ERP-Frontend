import { useState } from 'react'
import { Dialog } from '@/components/ui/Dialog'
import { useSubjects, useUpdateSubject } from '../api/queries'
import { Button } from '@/components/ui/button'
import { Search, Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { Subject } from '../types'

interface SubjectSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  classId: string
}

export function SubjectSelectorModal({
  isOpen,
  onClose,
  classId,
}: SubjectSelectorModalProps) {
  const [search, setSearch] = useState('')
  const { data: subjectsData, isLoading } = useSubjects({ search });
  const subjects = subjectsData?.data || [];
  const { mutate: updateSubject, isPending } = useUpdateSubject();

  const handleAttach = (subjectId: string) => {
    updateSubject(
      { id: subjectId, data: { classId } },
      {
        onSuccess: () => {
          onClose()
        },
      },
    )
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Attach Existing Subject"
      variant="default"
    >
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search subjects..."
            className="pl-10 h-12 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="max-h-96 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {isLoading ? (
            <div className="py-10 text-center text-gray-400 font-bold italic">
              Loading subjects...
            </div>
          ) : subjects.length === 0 ? (
            <div className="py-10 text-center text-gray-400 font-bold italic">
              No subjects found.
            </div>
          ) : (
            subjects.map((subject: Subject) => (
              <div
                key={subject.id}
                className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex justify-between items-center hover:bg-gray-100 transition-colors"
              >
                <div>
                  <span className="block font-black text-gray-900">
                    {subject.name}
                  </span>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {subject.code}
                  </span>
                  {subject.classId === classId && (
                    <span className="ml-2 text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-black uppercase">
                      Attached
                    </span>
                  )}
                </div>
                <Button
                  disabled={isPending || subject.classId === classId}
                  onClick={() => handleAttach(subject.id)}
                  size="sm"
                  variant={subject.classId === classId ? 'ghost' : 'brand'}
                  className="rounded-xl h-10 px-4"
                >
                  {subject.classId === classId ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    'Attach'
                  )}
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </Dialog>
  )
}
