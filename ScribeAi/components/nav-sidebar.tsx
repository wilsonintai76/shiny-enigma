"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  ChevronDown,
  Layout,
  FileText,
  Settings,
  Clock,
  Star,
  Box,
  Building2,
  Timer,
  Plane,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"

interface NavSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function NavSidebar({ className }: NavSidebarProps) {
  return (
    <div className={cn("pb-12 w-64 border-r bg-background", className)}>
      {/* Organization Header */}
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-gray-800 flex items-center justify-center text-white">
                A
              </div>
              <div>
                <h2 className="text-lg font-semibold">Acme Inc</h2>
                <p className="text-sm text-muted-foreground">Enterprise</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="px-3">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Platform
          </h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <Layout className="mr-2 h-4 w-4" />
              Playground
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-8">
              <Clock className="mr-2 h-4 w-4" />
              History
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-8">
              <Star className="mr-2 h-4 w-4" />
              Starred
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-8">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
        <div className="px-3">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Box className="mr-2 h-4 w-4" />
              Models
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Documentation
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="px-3">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Projects
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Building2 className="mr-2 h-4 w-4" />
              Design Engineering
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Timer className="mr-2 h-4 w-4" />
              Sales & Marketing
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Plane className="mr-2 h-4 w-4" />
              Travel
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <MoreHorizontal className="mr-2 h-4 w-4" />
              More
            </Button>
          </div>
        </div>
      </div>
      {/* User Profile */}
      <div className="mt-auto px-3 py-2 border-t">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            <div>
              <p className="text-sm font-medium">shadcn</p>
              <p className="text-xs text-muted-foreground">m@example.com</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
