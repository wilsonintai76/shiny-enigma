"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  const getIcon = (variant?: "default" | "destructive" | "success" | "warning" | "info") => {
    switch (variant) {
      case "destructive":
        return <XCircle className="h-5 w-5 text-destructive-foreground" />
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
      case "info":
        return <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      default:
        return null
    }
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} {...props} variant={variant}>
            <div className="flex gap-3">
              {getIcon(variant)}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
