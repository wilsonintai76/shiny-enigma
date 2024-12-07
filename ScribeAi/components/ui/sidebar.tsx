"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarContextValue {
  isOpen: boolean
  isMobile: boolean
  setIsOpen: (open: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue>({
  isOpen: true,
  isMobile: false,
  setIsOpen: () => null,
})

export function useSidebar() {
  return React.useContext(SidebarContext)
}

interface SidebarProviderProps {
  children: React.ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = React.useState(true)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsOpen(false)
      }
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <SidebarContext.Provider value={{ isOpen, isMobile, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

interface SidebarProps extends CollapsiblePrimitive.CollapsibleProps {
  className?: string
  collapsible?: boolean | "icon"
}

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  SidebarProps
>(({ className, collapsible = false, ...props }, ref) => {
  const { isOpen, isMobile } = useSidebar()

  return (
    <CollapsiblePrimitive.Root
      open={isOpen}
      defaultOpen={true}
      {...props}
    >
      <div
        ref={ref}
        className={cn(
          "h-screen border-r bg-background transition-all duration-300",
          isMobile ? "fixed left-0 top-0 z-40 w-[280px]" : "relative w-[280px]",
          !isOpen && !isMobile && "w-[80px]",
          !isOpen && isMobile && "-left-[280px]",
          className
        )}
      >
        {!isMobile && (
          <button
            className={cn(
              "absolute -right-3 top-3 z-40 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-sm",
              "hover:bg-accent hover:text-accent-foreground"
            )}
            onClick={() => props.onOpenChange?.(!isOpen)}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                !isOpen && "rotate-180"
              )}
            />
          </button>
        )}
        {props.children}
      </div>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50"
          onClick={() => props.onOpenChange?.(false)}
        />
      )}
    </CollapsiblePrimitive.Root>
  )
})
Sidebar.displayName = "Sidebar"

interface SidebarContentProps {
  className?: string
  children?: React.ReactNode
}

export function SidebarContent({
  className,
  children,
}: SidebarContentProps) {
  return (
    <div className={cn("flex h-full flex-col", className)}>
      {children}
    </div>
  )
}

interface SidebarTriggerProps {
  className?: string
}

export function SidebarTrigger({ className }: SidebarTriggerProps) {
  const { isOpen, isMobile } = useSidebar()

  if (isMobile) return null

  return (
    <CollapsiblePrimitive.Trigger asChild>
      <button
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
          className
        )}
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform",
            !isOpen && "rotate-180"
          )}
        />
      </button>
    </CollapsiblePrimitive.Trigger>
  )
}
