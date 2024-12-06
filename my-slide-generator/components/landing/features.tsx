'use client'

import { Container } from "@/components/ui/container"
import { Paintbrush, Wand2, Zap, Layout, Share2, Shield } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const features = [
  {
    name: 'Beautiful Templates',
    description: 'Choose from professionally designed templates',
    icon: Paintbrush,
  },
  {
    name: 'AI-Powered',
    description: 'Generate content with AI assistance',
    icon: Wand2,
  },
  {
    name: 'Lightning Fast',
    description: 'Create presentations in minutes',
    icon: Zap,
  },
  {
    name: 'Customizable',
    description: 'Easily match your brand style',
    icon: Layout,
  },
  {
    name: 'Easy Sharing',
    description: 'Share with anyone, anywhere',
    icon: Share2,
  },
  {
    name: 'Secure',
    description: 'Enterprise-grade security',
    icon: Shield,
  },
]

export function Features() {
  const [imagesLoading, setImagesLoading] = useState(true)

  return (
    <div className="relative py-12 bg-gradient-to-br from-purple-400 via-pink-300 to-red-300">
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
            Everything you need to create amazing presentations
          </h2>
        </div>
        <div className="mx-auto mt-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {features.map((feature) => (
              <div 
                key={feature.name} 
                className="group relative overflow-hidden rounded-lg bg-emerald-100/90 p-4 text-center"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className={`absolute inset-0 bg-neutral-100 animate-pulse ${!imagesLoading && 'hidden'}`} />
                  <Image
                    src="/lecture-1.jpg"
                    alt="Lecture background"
                    fill
                    className={`object-cover transition-opacity duration-300 ${imagesLoading ? 'opacity-0' : 'opacity-20'}`}
                    onLoadingComplete={() => setImagesLoading(false)}
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJiEwSzIrLisxKys4P1A/OTQ6PTs6RUhMUU9QUDg9Wl1eXF9LU1NTU1P/2wBDAR0XFx0aHR4eHVNNL002U1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1P/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    placeholder="blur"
                  />
                </div>
                <div className="relative">
                  <div className="flex justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/70 shadow-md
                      transition-all duration-300 group-hover:bg-emerald-500 group-hover:rotate-6">
                      <feature.icon className="h-5 w-5 text-neutral-900 transition-transform duration-300 
                        group-hover:scale-110 group-hover:text-white" />
                    </div>
                  </div>
                  <h3 className="mt-3 text-sm font-medium text-neutral-900">
                    {feature.name}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
