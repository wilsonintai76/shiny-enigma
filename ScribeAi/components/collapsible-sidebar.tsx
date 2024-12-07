"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  ChevronRight, 
  Home,
  FileText,
  Settings,
  Menu
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

export function Sidebar({ className, isCollapsed, setIsCollapsed }: SidebarProps) {
  return (
    <div
      className={cn(
        "relative border-r bg-background flex flex-col h-screen",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4">
        <nav className="grid gap-2">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              isCollapsed && "justify-center"
            )}
          >
            <Home className="mr-2 h-4 w-4" />
            {!isCollapsed && <span>Home</span>}
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              isCollapsed && "justify-center"
            )}
          >
            <FileText className="mr-2 h-4 w-4" />
            {!isCollapsed && <span>Documents</span>}
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              isCollapsed && "justify-center"
            )}
          >
            <Settings className="mr-2 h-4 w-4" />
            {!isCollapsed && <span>Settings</span>}
          </Button>
        </nav>
      </ScrollArea>
    </div>
  )
}
