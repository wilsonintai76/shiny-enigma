"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { 
  Home,
  Settings,
  FileText,
  PenTool,
  BookOpen,
  MessageSquare,
  LayoutTemplate,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const routes = [
  {
    label: "Home",
    icon: Home,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Write",
    icon: PenTool,
    href: "/dashboard/write",
    color: "text-violet-500",
  },
  {
    label: "Documents",
    icon: FileText,
    color: "text-pink-700",
    href: "/dashboard/documents",
  },
  {
    label: "Templates",
    icon: LayoutTemplate,
    color: "text-yellow-600",
    href: "/template",
  },
  {
    label: "Learn",
    icon: BookOpen,
    color: "text-orange-700",
    href: "/dashboard/learn",
  },
  {
    label: "Chat",
    icon: MessageSquare,
    color: "text-emerald-500",
    href: "/dashboard/chat",
  },
  {
    label: "Settings",
    icon: Settings,
    color: "text-gray-500",
    href: "/settings",
  },
]

export function NavSidebar({ className }: NavSidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 w-64 border-r bg-background", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Navigation
          </h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                  pathname === route.href ? "text-primary bg-primary/10" : "text-muted-foreground",
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
