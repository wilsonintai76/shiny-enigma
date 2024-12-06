'use client'

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'Guidelines', href: '/guidelines' },
  { name: 'Blog', href: '/blog' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-r from-gray-200 from-20% via-gray-200/90 via-30% to-blue-500/90 backdrop-blur-sm shadow-md">
      <Container className="pl-0">
        <nav className="flex items-center justify-between py-2" aria-label="Global">
          {/* Logo */}
          <div className="flex-shrink-0 -ml-4">
            <Link href="/" className="block relative">
              <div className="relative">
                <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl rounded-2xl -m-3 p-2 shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-shadow"></div>
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={140}
                  height={40}
                  className="relative z-10"
                />
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            <div className="flex gap-x-8 mr-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-900 hover:text-blue-800 font-semibold transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Button asChild variant="secondary" className="text-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50">
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </nav>
      </Container>

      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/20" aria-hidden="true" onClick={() => setMobileMenuOpen(false)} />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gradient-to-r from-gray-200 from-20% via-gray-200/90 via-30% to-blue-500/90 backdrop-blur-sm px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <div className="-ml-4">
              <Link href="/" className="block relative">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl rounded-2xl -m-3 p-2 shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-shadow"></div>
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={140}
                    height={40}
                    className="relative z-10"
                  />
                </div>
              </Link>
            </div>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-gray-900 hover:text-blue-800 font-semibold transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Button asChild variant="secondary" className="w-full text-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50">
                  <Link href="/login">Log in</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
