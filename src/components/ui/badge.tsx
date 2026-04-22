import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'brand'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
  
  const variants = {
    default: "border-transparent bg-gray-900 text-white",
    secondary: "border-transparent bg-gray-100 text-gray-900",
    outline: "text-gray-950",
    success: "border-transparent bg-emerald-50 text-emerald-700",
    warning: "border-transparent bg-amber-50 text-amber-700",
    brand: "border-transparent bg-brand-peach text-brand-orange",
  }

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props} />
  )
}

export { Badge }
