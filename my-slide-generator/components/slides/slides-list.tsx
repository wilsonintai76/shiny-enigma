'use client'

import { Slide } from "@/types"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface SlidesListProps {
  slides: Slide[]
}

export function SlidesList({ slides }: SlidesListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {slides.map((slide) => (
        <Card key={slide.id}>
          <CardHeader>
            <CardTitle>{slide.title}</CardTitle>
            <CardDescription>Slide {slide.order}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {slide.content.substring(0, 100)}...
            </p>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/slides/${slide.id}`}>Edit</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={`/slides/${slide.id}/preview`}>Preview</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
