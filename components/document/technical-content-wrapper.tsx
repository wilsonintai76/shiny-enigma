"use client"

import { useState } from "react"
import TechnicalContent from "./technical-content"
import { Button } from "@/components/ui/button"

export function TechnicalContentWrapper() {
  const handleSectionAdd = (parentId: string) => {
    console.log("Add section:", parentId)
  }

  const handleSectionDelete = (sectionId: string) => {
    console.log("Delete section:", sectionId)
  }

  const handleContentAdd = (sectionId: string, type: string) => {
    console.log("Add content:", sectionId, type)
  }

  const handleContentDelete = (sectionId: string, contentId: string) => {
    console.log("Delete content:", sectionId, contentId)
  }

  const handleContentUpdate = (sectionId: string, contentId: string, newContent: any) => {
    console.log("Update content:", sectionId, contentId, newContent)
  }

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between border-b p-4">
        <span className="text-sm">Add Section</span>
        <Button variant="ghost" size="sm">+</Button>
      </div>
      <TechnicalContent
        sections={[]}
        onSectionAdd={handleSectionAdd}
        onSectionDelete={handleSectionDelete}
        onContentAdd={handleContentAdd}
        onContentDelete={handleContentDelete}
        onContentUpdate={handleContentUpdate}
      />
    </div>
  )
}
