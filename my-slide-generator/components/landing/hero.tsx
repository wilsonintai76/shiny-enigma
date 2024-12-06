'use client'

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import Link from "next/link"
import Image from 'next/image'

export function Hero() {
  return (
    <div className="relative flex-1 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 6rem)' }}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.png"
          alt=""
          fill
          className="object-cover opacity-[0.15]"
          priority
        />
      </div>
      <Container className="relative z-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch justify-items-center">
          <div className="relative w-full max-w-2xl">
            <div className="relative w-full h-full rounded-2xl bg-[#f3f4f6]/10 backdrop-blur-sm shadow-xl ring-1 ring-gray-900/10 sm:rounded-3xl overflow-hidden p-8 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Write Your Book with AI
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Transform your ideas into professionally crafted eBooks with our AI-powered writing platform. Get intelligent suggestions, professional templates, and publishing-ready exports.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    href="/write"
                    className="rounded-full bg-gradient-to-r from-purple-300/50 to-indigo-300/50 px-6 py-2.5 text-sm font-semibold text-gray-800 hover:from-purple-400/50 hover:to-indigo-400/50 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-out"
                  >
                    Start Writing
                  </Link>
                  <Link
                    href="/learn-more"
                    className="text-sm font-semibold leading-6 text-gray-600 hover:text-gray-800 group relative"
                  >
                    Learn more{' '}
                    <span aria-hidden="true" className="inline-block transition-all duration-300 group-hover:translate-x-1 group-hover:rotate-45 group-hover:bg-gradient-to-r group-hover:from-purple-300/50 group-hover:to-indigo-300/50 group-hover:bg-clip-text group-hover:text-transparent">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-2xl">
            <div className="relative w-full h-full rounded-2xl bg-[#f3f4f6]/10 backdrop-blur-sm shadow-xl ring-1 ring-gray-900/10 sm:rounded-3xl overflow-hidden p-8 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="AI eBook Writer Logo"
                width={500}
                height={167}
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
