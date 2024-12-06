"use client"

import { LayoutDashboard, BookText, PenTool, FileText, History } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
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
  const pathname = usePathname()
  const { isOpen } = useSidebar()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className={cn(
              "flex items-center space-x-2 overflow-hidden",
              !isOpen && "justify-center"
            )}>
              <BookText className="h-6 w-6 shrink-0" />
              <span className={cn(
                "font-semibold transition-all duration-200",
                !isOpen && "w-0 opacity-0"
              )}>
                AI eBook Writer
              </span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link 
                    href={item.url} 
                    className={cn(
                      "flex w-full items-center rounded-md px-3 py-2 hover:bg-accent",
                      pathname === item.url && "bg-accent"
                    )}
                  >
                    <div className={cn(
                      "flex items-center space-x-2 overflow-hidden",
                      !isOpen && "justify-center"
                    )}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className={cn(
                        "transition-all duration-200",
                        !isOpen && "w-0 opacity-0"
                      )}>
                        {item.title}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
