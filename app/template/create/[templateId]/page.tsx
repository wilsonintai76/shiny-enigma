"use client"

import { useState } from "react"
import { templates } from "@/lib/template-data"
import DocumentExplorer from "@/components/document/document-explorer"
import TechnicalContent from "@/components/document/technical-content"
import { TemplateHeader } from "@/components/template/template-header"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    templateId: string
  }
}

export default function CreateTemplatePage({ params }: PageProps) {
  const template = templates.find((t) => t.id === params.templateId)

  if (!template) {
    notFound()
  }

  // Initialize with empty string if template title/category is undefined
  const [templateTitle, setTemplateTitle] = useState(template.title || "")
  const [category, setCategory] = useState(template.category || "")

  // Convert template chapters to document items for the explorer
  const initialItems = template.chapters.map((chapter) => ({
    id: chapter.title,
    name: chapter.title,
    type: "folder" as const,
    children: chapter.sections.map((section) => ({
      id: section.title,
      name: section.title,
      type: "file" as const,
    })),
  }))

  // Convert template sections to technical content sections
  const initialSections = template.chapters.flatMap((chapter) =>
    chapter.sections.map((section) => ({
      id: section.title,
      title: section.title,
      content: section.elements?.[0]?.content || "",
    }))
  )

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
