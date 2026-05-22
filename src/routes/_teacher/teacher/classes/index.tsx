import { createFileRoute } from '@tanstack/react-router'
import { ClassesPage } from '@/features/classes/pages/ClassesPage'

export const Route = createFileRoute('/_teacher/teacher/classes/')({
  component: () => <ClassesPage />,
})
