import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva  } from "class-variance-authority"
import type {VariantProps} from "class-variance-authority";
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl text-sm font-bold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-gray-900 text-white hover:bg-gray-900/90",
        brand: "bg-brand-orange text-white hover:bg-brand-orange-hover shadow-lg shadow-orange-100",
        outline: "border border-gray-200 bg-white hover:bg-gray-50 text-gray-700",
        secondary: "bg-brand-taupe text-gray-800 hover:bg-brand-taupe-hover",
        ghost: "hover:bg-gray-100 text-gray-600",
        link: "text-brand-orange hover:underline bg-transparent shadow-none",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-100",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-xl px-3",
        lg: "h-14 rounded-3xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
