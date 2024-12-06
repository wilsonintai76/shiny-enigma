import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/ui/container"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple Header */}
      <header className="w-full border-b bg-slate-900/5 backdrop-blur-lg">
        <Container>
          <div className="flex h-16 items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center">
                <Image
                  src="/Logo Poli.png"
                  alt="Logo Poli"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
              <div className="h-6 w-px bg-gray-200 hidden md:block" />
            </div>

            {/* Right: App Name */}
            <div className="flex items-center">
              <span className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                ScribeAI
              </span>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="border-t bg-slate-900/5 backdrop-blur-lg">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <p className="text-sm text-slate-600">
              2024 Politeknik Kuching Sarawak. All rights reserved.
            </p>
            <nav className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </Container>
      </footer>
    </div>
  )
}
