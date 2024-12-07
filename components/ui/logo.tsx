import { PresentationIcon } from "lucide-react"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex h-8 w-8 items-center justify-center">
        <PresentationIcon className="h-5 w-5 text-emerald-600" />
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-emerald-500 bg-clip-text text-transparent">
        SlideGen
      </span>
    </div>
  )
}
