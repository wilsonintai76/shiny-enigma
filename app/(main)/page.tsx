import { Features } from "@/components/landing/features"
import { Hero } from "@/components/landing/hero"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex-1">
      <Hero />
      <Features />
    </div>
  )
}
