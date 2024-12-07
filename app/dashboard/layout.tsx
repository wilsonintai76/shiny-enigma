import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="relative min-h-screen lg:grid lg:grid-cols-[auto,1fr]">
        <AppSidebar />
        <main className="flex min-h-screen flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
