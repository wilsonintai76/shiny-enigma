"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardHeaderProps {
  isSidebarOpen: boolean
  className?: string
}

export function DashboardHeader({ isSidebarOpen, className }: DashboardHeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  
  // Convert pathname to breadcrumb
  const getBreadcrumb = () => {
    const parts = pathname.split("/").filter(Boolean)
    return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" / ")
  }

  const handleLogout = () => {
    // Here you would typically clear auth tokens/session
    router.push("/") // Redirect to main page
  }

  return (
    <header className={cn("h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative z-50", className)}>
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className={cn(
            "text-lg font-semibold",
            !isSidebarOpen && "lg:ml-12"
          )}>
            {getBreadcrumb()}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              2
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="User menu"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => router.push("/dashboard/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => router.push("/dashboard/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 cursor-pointer" onSelect={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
