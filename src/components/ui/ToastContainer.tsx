
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useToastStore } from '@/lib/stores/toast.store'
import { Toast } from './Toast'

export const ToastContainer: React.FC = () => {
  const toasts = useToastStore((state) => state.toasts)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Only render the portal after the client has hydrated
  if (!isMounted) return null

  return createPortal(
    <div
      className="fixed top-6 right-6 z-[9999] flex flex-col items-end pointer-events-none"
      aria-live="polite"
    >
      <div className="flex flex-col items-end w-full pointer-events-auto">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </div>
    </div>,
    document.body
  )
}
