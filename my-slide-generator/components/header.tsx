import { Menu } from "lucide-react"
import { useSidebar } from "./ui/sidebar"
import { cn } from "@/lib/utils"

export function Header() {
  const { toggle, isOpen } = useSidebar()

  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center px-4">
        <button
          onClick={toggle}
          className="hidden lg:inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
