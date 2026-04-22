import React, { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { useToastStore } from '@/lib/stores/toast.store'
import type { ToastItem } from '@/lib/stores/toast.store'

// 🎨 Color styles per type
const toastStyles = {
  success: 'bg-emerald-500',
  error: 'bg-rose-500',
  warning: 'bg-amber-500',
  info: 'bg-sky-500',
}

// 🎯 Icons (all white now)
const iconMap = {
  success: <CheckCircle2 className="w-5 h-5 text-white" />,
  error: <XCircle className="w-5 h-5 text-white" />,
  warning: <AlertCircle className="w-5 h-5 text-white" />,
  info: <Info className="w-5 h-5 text-white" />,
}

export const Toast: React.FC<{ toast: ToastItem }> = ({ toast }) => {
  const removeToast = useToastStore((state) => state.removeToast)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const enterTimer = setTimeout(() => setIsVisible(true), 10)

    let autoCloseTimer: NodeJS.Timeout
    if (toast.duration && toast.duration > 0) {
      autoCloseTimer = setTimeout(() => handleClose(), toast.duration)
    }

    return () => {
      clearTimeout(enterTimer)
      if (autoCloseTimer) clearTimeout(autoCloseTimer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => removeToast(toast.id), 300)
  }

  return (
    <div
      className={`
        relative flex items-center gap-3 p-4 mb-3 rounded-2xl shadow-lg
        min-w-[320px] max-w-[420px]
        text-white backdrop-blur-md
        ${toastStyles[toast.type]}
        transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${
          isVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95'
        }
      `}
      role="alert"
    >
      {/* Icon */}
      <div className="flex-shrink-0">{iconMap[toast.type]}</div>

      {/* Message */}
      <div className="flex-grow">
        <p className="text-sm font-semibold leading-snug">{toast.message}</p>
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition"
      >
        <X className="w-4 h-4 text-white" />
      </button>

      {/* Progress bar */}
      {toast.duration && toast.duration > 0 && (
        <div className="absolute bottom-0 left-0 h-1 w-full bg-white/20 overflow-hidden rounded-b-2xl">
          <div
            className="h-full bg-white/80"
            style={{
              animation: `progress ${toast.duration}ms linear forwards`,
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
}
