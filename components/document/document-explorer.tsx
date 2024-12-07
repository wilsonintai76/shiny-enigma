"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface DocumentItem {
  id: string
  name: string
  type: "file" | "folder"
  children?: DocumentItem[]
}

interface DocumentExplorerProps {
  initialItems: DocumentItem[]
}

export default function DocumentExplorer({ initialItems }: DocumentExplorerProps) {
  const [items, setItems] = useState<DocumentItem[]>(initialItems)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    const newExpandedItems = new Set(expandedItems)
    if (expandedItems.has(id)) {
      newExpandedItems.delete(id)
    } else {
      newExpandedItems.add(id)
    }
    setExpandedItems(newExpandedItems)
  }

  const handleSelect = (id: string) => {
    setSelectedItem(id)
  }

  const renderItem = (item: DocumentItem, level: number = 0) => {
    const isExpanded = expandedItems.has(item.id)
    const isSelected = selectedItem === item.id

    return (
      <div key={item.id}>
        <div
          className={cn(
            "flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-100",
            isSelected && "bg-blue-100 hover:bg-blue-100",
            level > 0 && "ml-4"
          )}
          onClick={() => handleSelect(item.id)}
        >
          {item.type === "folder" && (
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0"
              onClick={(e) => {
                e.stopPropagation()
                toggleExpand(item.id)
              }}
            >
              {isExpanded ? "▼" : "▶"}
            </Button>
          )}
          <span className="flex-1 truncate">{item.name}</span>
        </div>
        {isExpanded &&
          item.children?.map((child) => renderItem(child, level + 1))}
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <Input placeholder="Search documents..." />
      </div>
      <div className="space-y-1">{items.map((item) => renderItem(item))}</div>
    </div>
  )
}
