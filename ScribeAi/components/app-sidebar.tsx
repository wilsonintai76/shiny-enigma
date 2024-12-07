"use client"

import { LayoutDashboard, BookText, PenTool, FileText, History, ChevronDown, Menu } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  useSidebar
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview and statistics"
  },
  {
    title: "My eBooks",
    url: "/dashboard/ebooks",
    icon: BookText,
    description: "View and manage your books"
  },
  {
    title: "Write New Book",
    url: "/dashboard/write",
    icon: PenTool,
    description: "Start writing with AI"
  },
  {
    title: "Templates",
    url: "/dashboard/templates",
    icon: FileText,
    description: "Book templates and themes"
  },
  {
    title: "Writing History",
    url: "/dashboard/history",
    icon: History,
    description: "Your writing activity"
  }
]

export function AppSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { isOpen, isMobile, setIsOpen } = useSidebar()

  const handleLogout = async () => {
    // Add any cleanup or session clearing logic here
    router.push("/")
  }

  const handleProfile = () => {
    router.push("/dashboard/profile")
  }

  const handleSettings = () => {
    router.push("/dashboard/settings")
  }

  return (
    <>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-3 z-40 lg:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      )}
      <Sidebar
        open={isOpen}
        onOpenChange={setIsOpen}
        collapsible={isMobile ? false : "icon"}
      >
        <SidebarContent>
          <div className="flex h-16 items-center border-b px-4">
            <div className={cn(
              "flex flex-1 items-center gap-2",
              !isOpen && !isMobile && "justify-center"
            )}>
              <BookText className="h-6 w-6 shrink-0" />
              {(isOpen || isMobile) && (
                <span className="text-xl font-semibold">ScribeAI</span>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <nav className="space-y-1 px-2 py-3">
              {items.map((item) => (
                <Link 
                  key={item.title}
                  href={item.url} 
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                    "hover:bg-accent hover:text-accent-foreground",
                    pathname === item.url ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    !isOpen && !isMobile && "justify-center px-2"
                  )}
                >
                  <item.icon className={cn(
                    "h-4 w-4 shrink-0",
                    (isOpen || isMobile) && "mr-2"
                  )} />
                  {(isOpen || isMobile) && (
                    <span>{item.title}</span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div className="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "h-auto w-full justify-start px-2",
                    !isOpen && !isMobile && "justify-center"
                  )}
                >
                  <div className={cn(
                    "flex items-center gap-2",
                    !isOpen && !isMobile && "justify-center"
                  )}>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    {(isOpen || isMobile) && (
                      <>
                        <div className="flex flex-1 flex-col items-start text-sm">
                          <span className="font-medium">John Doe</span>
                          <span className="text-xs text-muted-foreground">john@example.com</span>
                        </div>
                        <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                      </>
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfile}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettings}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-red-600 focus:bg-red-50 focus:text-red-600"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarContent>
      </Sidebar>
    </>
  )
}
