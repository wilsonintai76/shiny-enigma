import { cn } from "@/lib/utils"
import { useSidebar } from "../ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isOpen } = useSidebar()

  return (
    <div className={cn(
      "container mx-auto p-4 transition-all duration-200 ease-in-out",
      isOpen ? "lg:pl-64" : "lg:pl-16"
    )}>
      {children}
    </div>
  )
}
