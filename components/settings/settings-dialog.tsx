"use client"

import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const settingsSections = [
  {
    label: "Appearance & Behavior",
    items: [
      { title: "Appearance", href: "#appearance" },
      { title: "Menus and Toolbars", href: "#menus" },
      { title: "System Settings", href: "#system" },
    ],
  },
  {
    label: "Editor",
    items: [
      { title: "Font", href: "#font" },
      { title: "Color Scheme", href: "#color" },
      { title: "Code Style", href: "#code-style" },
    ],
  },
  {
    label: "Tools",
    items: [
      { title: "AI Assistant", href: "#ai" },
      { title: "Database", href: "#database" },
      { title: "External Tools", href: "#tools" },
    ],
  },
]

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [search, setSearch] = React.useState("")
  const [activeSection, setActiveSection] = React.useState("Appearance & Behavior")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl gap-0 p-0">
        <div className="grid h-[600px] grid-cols-[250px,1fr]">
          {/* Sidebar */}
          <div className="border-r">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search settings..."
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <ScrollArea className="h-[552px]">
              <div className="flex flex-col gap-2 p-4">
                {settingsSections.map((section) => (
                  <div key={section.label}>
                    <h4 className="mb-2 text-sm font-medium">{section.label}</h4>
                    {section.items.map((item) => (
                      <Button
                        key={item.href}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start",
                          activeSection === item.title && "bg-accent"
                        )}
                        onClick={() => setActiveSection(item.title)}
                      >
                        {item.title}
                      </Button>
                    ))}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b p-4">
              <div>
                <h2 className="text-lg font-medium">{activeSection}</h2>
                <p className="text-sm text-muted-foreground">
                  Configure {activeSection.toLowerCase()} settings
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {/* Content will be different based on activeSection */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Settings Content</h3>
                  <p className="text-sm text-muted-foreground">
                    Content for {activeSection} will be displayed here.
                  </p>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
