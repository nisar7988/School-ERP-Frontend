import { ClassDetailsPage } from '#/features/classes/pages/ClassDetailsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_teacher/teacher/classes/$id')({
  component: ClassDetailsPage,
})
