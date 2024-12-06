"use client"

import * as React from "react"
import { createContext, useContext } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

interface SidebarContextValue {
  isOpen: boolean
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextValue>({
  isOpen: true,
  toggle: () => {},
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

const sidebarVariants = cva(
  "fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] bg-background border-r transition-[width] duration-200 ease-in-out",
  {
    variants: {
      isOpen: {
        true: "w-64",
        false: "w-16",
      },
    },
    defaultVariants: {
      isOpen: true,
    },
  }
)

export function Sidebar({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { isOpen } = useSidebar()

  return (
    <aside
      className={cn(sidebarVariants({ isOpen }), className)}
      {...props}
    >
      {children}
    </aside>
  )
}

export function SidebarContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen } = useSidebar()

  return (
    <div 
      className={cn(
        "h-full transition-all duration-200 ease-in-out",
        isOpen ? "px-4 py-4" : "px-2 py-4",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarGroup({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarGroupLabel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen } = useSidebar()

  return (
    <div
      className={cn(
        "flex items-center overflow-hidden whitespace-nowrap py-2",
        isOpen ? "px-2" : "justify-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarGroupContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarMenu({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarMenuItem({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen } = useSidebar()

  return (
    <div 
      className={cn(
        "overflow-hidden transition-all duration-200 ease-in-out",
        isOpen ? "w-full" : "w-8",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarTrigger({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { toggle, isOpen } = useSidebar()
  
  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "fixed top-4 right-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-lg p-2.5 text-sm hover:bg-accent",
        "lg:hidden",
        className
      )}
      {...props}
    >
      <svg
        className="h-5 w-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>
  )
}
