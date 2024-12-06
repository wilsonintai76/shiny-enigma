import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { SlidesList } from "@/components/slides/slides-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Slides",
  description: "Manage your presentation slides",
}

async function getSlides() {
  try {
    const slides = await prisma.slide.findMany({
      orderBy: {
        order: 'asc'
      },
      include: {
        user: true
      }
    })
    return slides
  } catch (error) {
    console.error('Failed to fetch slides:', error)
    return []
  }
}

export default async function SlidesPage() {
  const slides = await getSlides()

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Slides</h1>
        <Button asChild>
          <Link href="/slides/new">Create Slide</Link>
        </Button>
      </div>
      <SlidesList slides={slides} />
    </div>
  )
}
