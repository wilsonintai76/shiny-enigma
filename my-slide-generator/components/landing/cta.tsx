'use client'

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <Container className="mt-24 sm:mt-32 md:mt-40">
      <div className="relative isolate overflow-hidden bg-blue-600 px-6 py-24 shadow-2xl rounded-3xl sm:px-24 xl:py-32">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to transform your presentations?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg leading-8 text-blue-100">
          Join thousands of professionals who are creating stunning presentations with our platform.
        </p>
        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" variant="secondary" className="group">
            <Link href="/slides/new">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.25" />
          <defs>
            <radialGradient id="gradient">
              <stop stopColor="white" />
              <stop offset={1} stopColor="white" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </Container>
  )
}
