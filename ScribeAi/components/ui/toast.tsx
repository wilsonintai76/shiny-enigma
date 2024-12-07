import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, CheckCircle2, Info, XCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-lg border p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-red-500/30 bg-red-50 text-red-900 dark:border-red-500/30 dark:bg-red-900/10 dark:text-red-400 [&_svg]:text-red-500 dark:[&_svg]:text-red-400",
        success: 
          "border-green-500/30 bg-green-50 text-green-900 dark:border-green-500/30 dark:bg-green-900/10 dark:text-green-400 [&_svg]:text-green-500 dark:[&_svg]:text-green-400",
        warning:
          "border-yellow-500/30 bg-yellow-50 text-yellow-900 dark:border-yellow-500/30 dark:bg-yellow-900/10 dark:text-yellow-400 [&_svg]:text-yellow-500 dark:[&_svg]:text-yellow-400",
        info:
          "border-blue-500/30 bg-blue-50 text-blue-900 dark:border-blue-500/30 dark:bg-blue-900/10 dark:text-blue-400 [&_svg]:text-blue-500 dark:[&_svg]:text-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface IconProps {
  className?: string
  "aria-hidden"?: boolean
}

const ToastIcon = React.forwardRef<
  SVGSVGElement,
  IconProps & { variant?: keyof typeof toastVariants["variants"] }
>(({ className, variant, ...props }, ref) => {
  const Icon = {
    default: Info,
    destructive: XCircle,
    success: CheckCircle2,
    warning: AlertCircle,
    info: Info,
  }[variant || "default"]

  return (
    <Icon
      ref={ref}
      className={cn("h-5 w-5 shrink-0", className)}
      aria-hidden="true"
      {...props}
    />
  )
})
ToastIcon.displayName = "ToastIcon"

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, children, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      duration={5000}
      {...props}
    >
      <div className="flex gap-3">
        <ToastIcon variant={variant} />
        <div className="flex-1 space-y-1">{children}</div>
      </div>
    </ToastPrimitives.Root>
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, children, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50",
      "group-[.destructive]:border-red-500/30 group-[.destructive]:hover:border-red-500/30 group-[.destructive]:hover:bg-red-500 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-500",
      "group-[.success]:border-green-500/30 group-[.success]:hover:border-green-500/30 group-[.success]:hover:bg-green-500 group-[.success]:hover:text-green-50 group-[.success]:focus:ring-green-500",
      "group-[.warning]:border-yellow-500/30 group-[.warning]:hover:border-yellow-500/30 group-[.warning]:hover:bg-yellow-500 group-[.warning]:hover:text-yellow-50 group-[.warning]:focus:ring-yellow-500",
      "group-[.info]:border-blue-500/30 group-[.info]:hover:border-blue-500/30 group-[.info]:hover:bg-blue-500 group-[.info]:hover:text-blue-50 group-[.info]:focus:ring-blue-500",
      className
    )}
    {...props}
  >
    {children}
  </ToastPrimitives.Action>
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100",
      "group-[.destructive]:text-red-400 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-500",
      "group-[.success]:text-green-400 group-[.success]:hover:text-green-50 group-[.success]:focus:ring-green-500",
      "group-[.warning]:text-yellow-400 group-[.warning]:hover:text-yellow-50 group-[.warning]:focus:ring-yellow-500",
      "group-[.info]:text-blue-400 group-[.info]:hover:text-blue-50 group-[.info]:focus:ring-blue-500",
      className
    )}
    toast-close=""
    aria-label="Close notification"
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
