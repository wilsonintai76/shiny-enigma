"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  History,
  BookText,
  PenTool,
  FileText,
  Crown,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  isMobile: boolean
}

export function Sidebar({ isOpen, onToggle, isMobile }: SidebarProps) {
  const pathname = usePathname()

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      description: "Overview and statistics"
    },
    {
      name: "My eBooks",
      href: "/dashboard/ebooks",
      icon: BookText,
      description: "View and manage your books"
    },
    {
      name: "Write New Book",
      href: "/dashboard/write",
      icon: PenTool,
      description: "Start writing with AI"
    },
    {
      name: "Templates",
      href: "/dashboard/templates",
      icon: FileText,
      description: "Book templates and themes"
    },
    {
      name: "Writing History",
      href: "/dashboard/history",
      icon: History,
      description: "Your writing activity"
    }
  ]

  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed lg:relative h-full bg-muted/40 border-r transition-all duration-300 z-40",
          isOpen ? "w-64" : "w-16",
          isMobile && !isOpen && "hidden"
        )}
        role="navigation"
        aria-label="Main Navigation"
      >
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute -right-4 top-2 z-50 rounded-full border bg-background shadow-md",
            "focus:ring-2 focus:ring-primary"
          )}
          onClick={onToggle}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>

        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <Link
              href="/dashboard"
              className="flex items-center pl-2 mb-14"
            >
              <Crown className="h-6 w-6" />
              <span
                className={cn(
                  "text-xl font-bold ml-2",
                  !isOpen && "hidden"
                )}
              >
                AI eBook Writer
              </span>
            </Link>
          </div>
          <nav className="space-y-1 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-all",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                  !isOpen && "justify-center"
                )}
              >
                <item.icon className="flex-shrink-0 w-5 h-5" />
                {isOpen && (
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                      <span>{item.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.description}
                    </p>
                  </div>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}
