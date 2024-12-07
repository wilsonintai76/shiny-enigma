'use client'

import { Container } from "@/components/ui/container"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <Container>
      <div className="relative isolate overflow-hidden bg-gradient-to-l from-purple-100/60 via-purple-200/60 to-indigo-200/60 px-4 py-8 text-center shadow-xl sm:rounded-2xl sm:px-6">
        <h2 className="mx-auto max-w-xl text-xl font-bold tracking-tight text-white sm:text-2xl">
          Ready to Write Your Next Bestseller?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-300">
          Join thousands of authors who have published their books using our AI-powered platform.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/write"
            className="rounded-full bg-gradient-to-r from-purple-300/50 to-indigo-300/50 px-6 py-2.5 text-sm font-semibold text-gray-800 hover:from-purple-400/50 hover:to-indigo-400/50 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-out"
          >
            Start Writing Free
          </Link>
          <Link
            href="/templates"
            className="text-sm font-semibold leading-6 text-gray-600 hover:text-gray-800 group relative"
          >
            View Templates{' '}
            <span aria-hidden="true" className="inline-block transition-all duration-300 group-hover:translate-x-1 group-hover:rotate-45 group-hover:bg-gradient-to-r group-hover:from-purple-300/50 group-hover:to-indigo-300/50 group-hover:bg-clip-text group-hover:text-transparent">
              →
            </span>
          </Link>
        </div>
      </div>
    </Container>
  )
}
