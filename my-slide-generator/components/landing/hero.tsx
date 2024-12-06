'use client'

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <div className="relative pt-20">
      <Container className="relative">
        <div className="relative mx-auto max-w-7xl py-24 sm:py-32 md:py-40">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16">
            <div className="relative z-10 md:text-center lg:text-left">
              <h1 className="font-display text-4xl font-medium tracking-tight text-gray-900 [text-wrap:balance] sm:text-6xl">
                Create stunning{' '}
                <span className="block">presentations</span>
                <span className="text-emerald-600">in minutes</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                Transform your ideas into professional presentations with our intuitive slide generator. 
                No design skills required.
              </p>
              <div className="mt-10 flex gap-x-6 md:justify-center lg:justify-start">
                <Button asChild size="lg" className="group bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/slides/new">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/slides">
                    View Examples
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative lg:static xl:pl-10">
              <div className="relative">
                <div className="absolute -inset-x-8 -inset-y-12 bg-emerald-50/50 rounded-[32px] shadow-lg" />
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-emerald-50 shadow-lg">
                  <Image
                    src="/lecture-1.jpg"
                    alt="Presentation preview"
                    width={800}
                    height={600}
                    className="absolute inset-0 h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
