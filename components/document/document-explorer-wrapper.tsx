"use client"

import { useState } from "react"
import DocumentExplorer from "./document-explorer"
import { Button } from "@/components/ui/button"

interface DocumentExplorerWrapperProps {
  initialItems: any[]
}

export function DocumentExplorerWrapper({ initialItems }: DocumentExplorerWrapperProps) {
  const [items, setItems] = useState(initialItems)

  const handleItemSelect = (item: any) => {
    console.log("Selected:", item)
  }

  const handleItemAdd = (parentId: string, type: string) => {
    console.log("Add item:", parentId, type)
  }

  const handleItemDelete = (item: any) => {
    console.log("Delete item:", item)
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b p-2">
        <span className="font-medium">Document Explorer</span>
        <Button variant="ghost" size="icon">+</Button>
      </div>
      <DocumentExplorer
        items={items}
        onItemSelect={handleItemSelect}
        onItemAdd={handleItemAdd}
        onItemDelete={handleItemDelete}
      />
    </div>
  )
}
