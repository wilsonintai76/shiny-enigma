"use client"

import { useState } from "react"
import DocumentExplorer from "@/components/document/document-explorer"
import TechnicalContent from "@/components/document/technical-content"
import { TemplateHeader } from "@/components/template/template-header"

export default function CustomTemplatePage() {
  const [templateTitle, setTemplateTitle] = useState("")
  const [category, setCategory] = useState("")

  const initialItems = [
    {
      id: "chapter-1",
      name: "Chapter 1: Introduction",
      type: "folder" as const,
      children: [],
    },
  ]

  const initialSections = [
    {
      id: "section-1",
      title: "Introduction",
      level: 1,
      content: [
        {
          id: "content-1",
          type: "text" as const,
          content: "",
        },
      ],
      children: [],
    },
  ]

  return (
    <div className="flex flex-col h-screen">
      <TemplateHeader
        initialTitle={templateTitle}
        initialCategory={category}
        onTitleChange={setTemplateTitle}
        onCategoryChange={setCategory}
      />
      <div className="flex-1 flex">
        <div className="w-64 border-r">
          <DocumentExplorer initialItems={initialItems} />
        </div>
        <div className="flex-1">
          <TechnicalContent initialSections={initialSections} />
        </div>
      </div>
    </div>
  )
}
