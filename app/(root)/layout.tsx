import { NavSidebar } from "@/components/nav-sidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full">
      <div className="hidden md:flex">
        <NavSidebar />
      </div>
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
