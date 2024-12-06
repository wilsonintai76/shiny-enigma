import { Features } from "@/components/landing/features"
import { Hero } from "@/components/landing/hero"

export default function Home() {
  return (
    <div className="flex-1">
      <Hero />
      <Features />
    </div>
  )
}
