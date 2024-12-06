'use client'

import { Container } from "@/components/ui/container"
import { Wand2, LayoutTemplate, Edit3, FileOutput, FolderTree, Search } from "lucide-react"
import { useState } from "react"

const features = [
  {
    name: 'AI-Powered Writing Assistant',
    description: 'Let our advanced AI help you write, edit, and refine your eBook content. Get suggestions for plot development, character arcs, and more.',
    icon: Wand2,
  },
  {
    name: 'Professional Templates',
    description: 'Choose from a variety of professionally designed eBook templates across multiple genres and styles.',
    icon: LayoutTemplate,
  },
  {
    name: 'Smart Editor',
    description: 'Real-time grammar checking, style suggestions, and readability analysis to ensure your eBook meets professional standards.',
    icon: Edit3,
  },
  {
    name: 'Export Options',
    description: 'Export your eBook in multiple formats including PDF, EPUB, and MOBI. Ready for publishing on major platforms.',
    icon: FileOutput,
  },
  {
    name: 'Chapter Organization',
    description: 'Easily organize and rearrange chapters, create outlines, and manage your book structure effortlessly.',
    icon: FolderTree,
  },
  {
    name: 'Research Assistant',
    description: 'Built-in research tools to help you find relevant information, citations, and references for your book.',
    icon: Search,
  },
]

export function Features() {
  const [imagesLoading, setImagesLoading] = useState(true)

  return (
    <div className="relative py-20 bg-gradient-to-br from-purple-400 via-pink-300 to-red-300">
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl">
            Everything you need to write amazing eBooks
          </h2>
          <p className="mt-3 text-base text-neutral-800">
            Powerful tools and AI assistance to help you create your masterpiece
          </p>
        </div>
        <div className="mx-auto mt-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {features.map((feature) => (
              <div 
                key={feature.name} 
                className="group relative overflow-hidden rounded-lg bg-white/20 p-4 text-center"
              >
                <div className="relative">
                  <div className="flex justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/70 shadow-md
                      transition-all duration-300 group-hover:bg-white/90 group-hover:rotate-6">
                      <feature.icon className="h-5 w-5 text-neutral-900 transition-transform duration-300 
                        group-hover:scale-110 group-hover:text-neutral-900" />
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
