import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, AlertTriangle } from 'lucide-react'
import { Button } from './button'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message?: string
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'info' | 'success' | 'warning' | 'default'
  children?: React.ReactNode
}

export function Dialog({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  children,
}: DialogProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 w-full max-w-md overflow-hidden animate-in zoom-in-95 rise-in duration-300">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${variant === 'danger' ? 'bg-red-50 text-red-600' : 'bg-brand-peach text-brand-orange'}`}
            >
              <AlertTriangle className="w-6 h-6" />
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-2 display-title">
            {title}
          </h2>
          {message && (
            <p className="text-gray-500 font-semibold leading-relaxed">
              {message}
            </p>
          )}
          
          {children && <div className="mt-6">{children}</div>}
        </div>

        {onConfirm && (
          <div className="bg-gray-50/50 p-6 flex flex-col sm:flex-row gap-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 h-12 rounded-2xl font-bold"
            >
              {cancelText}
            </Button>
            <Button
              variant={variant === 'danger' ? 'default' : 'brand'}
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className={`flex-1 h-12 rounded-2xl font-bold shadow-lg ${variant === 'danger' ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-100' : ''}`}
            >
              {confirmText}
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
