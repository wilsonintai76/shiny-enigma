"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { AISettings } from "@/components/settings/ai-settings"

const settingsSections = [
  {
    label: "Appearance & Behavior",
    items: [
      { title: "Appearance", href: "#appearance" },
      { title: "System Settings", href: "#system" },
    ],
  },
  {
    label: "Editor",
    items: [
      { title: "Font", href: "#font" },
      { title: "Color Scheme", href: "#color" },
    ],
  },
  {
    label: "AI Assistant",
    items: [
      { title: "Language Settings", href: "#language" },
      { title: "Providers", href: "#providers" },
    ],
  },
]

export default function SettingsPage() {
  const [search, setSearch] = React.useState("")
  const [activeSection, setActiveSection] = React.useState("Language Settings")

  const renderContent = () => {
    switch (activeSection) {
      case "Language Settings":
      case "Providers":
        return <AISettings />
      default:
        return (
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Settings Content</h3>
            <p className="text-sm text-muted-foreground">
              Content for {activeSection} will be displayed here.
            </p>
          </div>
        )
    }
  }

  return (
    <div className="h-[calc(100vh-4rem)] grid grid-cols-[250px,1fr] divide-x">
      {/* Sidebar */}
      <div className="flex flex-col">
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
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-2 p-4">
            {settingsSections.map((section) => (
              <div key={section.label}>
                <h4 className="mb-2 text-sm font-medium">{section.label}</h4>
                {section.items.map((item) => (
                  <Button
                    key={item.href}
                    variant={activeSection === item.title ? "secondary" : "ghost"}
                    className="w-full justify-start"
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
        <div className="border-b p-4">
          <h2 className="text-lg font-medium">{activeSection}</h2>
          <p className="text-sm text-muted-foreground">
            Configure {activeSection.toLowerCase()}
          </p>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-6">
            {renderContent()}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
