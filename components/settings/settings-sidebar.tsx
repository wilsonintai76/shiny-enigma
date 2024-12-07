"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Settings,
  FileText,
  Keyboard,
  Database,
  Brush,
  GitBranch,
  Tool,
} from "lucide-react"

const items = [
  {
    title: "General",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Editor",
    href: "/settings/editor",
    icon: FileText,
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
    icon: Brush,
  },
  {
    title: "Keybindings",
    href: "/settings/keybindings",
    icon: Keyboard,
  },
  {
    title: "Version Control",
    href: "/settings/version-control",
    icon: GitBranch,
  },
  {
    title: "Database",
    href: "/settings/database",
    icon: Database,
  },
  {
    title: "Tools",
    href: "/settings/tools",
    icon: Tool,
  },
]

export function SettingsSidebar() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col space-y-1">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <Button
            key={item.href}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "justify-start",
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline"
            )}
            asChild
          >
            <Link href={item.href}>
              <Icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}
