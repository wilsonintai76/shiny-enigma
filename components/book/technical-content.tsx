import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Image as ImageIcon,
  Video,
  Table2,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Section {
  id: string
  title: string
  level: number
  content: string
  elements: ContentElement[]
}

interface ContentElement {
  id: string
  type: "image" | "video" | "formula" | "table" | "code"
  content: string
  caption?: string
  url?: string
}

interface TechnicalContentProps {
  sections: Section[]
  onSectionsChange: (sections: Section[]) => void
}

export function TechnicalContent({ sections, onSectionsChange }: TechnicalContentProps) {
  const [expandedSections, setExpandedSections] = React.useState<string[]>([])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const addSection = (parentId?: string) => {
    const newSection: Section = {
      id: Math.random().toString(36).substring(7),
      title: "New Section",
      level: parentId ? sections.find(s => s.id === parentId)?.level! + 1 : 1,
      content: "",
      elements: []
    }

    if (parentId) {
      const parentIndex = sections.findIndex(s => s.id === parentId)
      const newSections = [...sections]
      newSections.splice(parentIndex + 1, 0, newSection)
      onSectionsChange(newSections)
    } else {
      onSectionsChange([...sections, newSection])
    }
  }

  const addElement = (sectionId: string, type: ContentElement["type"]) => {
    const newElement: ContentElement = {
      id: Math.random().toString(36).substring(7),
      type,
      content: "",
      caption: ""
    }

    onSectionsChange(sections.map(section =>
      section.id === sectionId
        ? { ...section, elements: [...section.elements, newElement] }
        : section
    ))
  }

  const updateElement = (sectionId: string, elementId: string, updates: Partial<ContentElement>) => {
    onSectionsChange(sections.map(section =>
      section.id === sectionId
        ? {
            ...section,
            elements: section.elements.map(element =>
              element.id === elementId
                ? { ...element, ...updates }
                : element
            )
          }
        : section
    ))
  }

  const ElementEditor = ({ element, sectionId }: { element: ContentElement, sectionId: string }) => {
    switch (element.type) {
      case "image":
        return (
          <div className="space-y-2">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  // Handle image upload
                  updateElement(sectionId, element.id, {
                    content: URL.createObjectURL(file)
                  })
                }
              }}
            />
            <Input
              placeholder="Image caption"
              value={element.caption || ""}
              onChange={(e) => updateElement(sectionId, element.id, { caption: e.target.value })}
            />
          </div>
        )
      
      case "video":
        return (
          <div className="space-y-2">
            <Input
              placeholder="Video URL (YouTube, Vimeo, etc.)"
              value={element.url || ""}
              onChange={(e) => updateElement(sectionId, element.id, { url: e.target.value })}
            />
            <Input
              placeholder="Video caption"
              value={element.caption || ""}
              onChange={(e) => updateElement(sectionId, element.id, { caption: e.target.value })}
            />
          </div>
        )

      case "formula":
        return (
          <div className="space-y-2">
            <Textarea
              placeholder="Enter LaTeX formula"
              value={element.content}
              onChange={(e) => updateElement(sectionId, element.id, { content: e.target.value })}
            />
            <div className="formula-preview">
              {/* Add LaTeX preview here */}
            </div>
          </div>
        )

      case "code":
        return (
          <div className="space-y-2">
            <Select
              value={element.caption}
              onValueChange={(value) => updateElement(sectionId, element.id, { caption: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              className="font-mono"
              placeholder="Enter code"
              value={element.content}
              onChange={(e) => updateElement(sectionId, element.id, { content: e.target.value })}
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div
          key={section.id}
          className={cn(
            "border rounded-lg p-4",
            section.level > 1 && "ml-6"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => toggleSection(section.id)}
              className="p-1 hover:bg-accent rounded"
            >
              {expandedSections.includes(section.id) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            <Input
              value={section.title}
              onChange={(e) =>
                onSectionsChange(sections.map(s =>
                  s.id === section.id
                    ? { ...s, title: e.target.value }
                    : s
                ))
              }
              className="font-semibold"
            />
          </div>

          {expandedSections.includes(section.id) && (
            <div className="space-y-4 mt-4">
              <Textarea
                value={section.content}
                onChange={(e) =>
                  onSectionsChange(sections.map(s =>
                    s.id === section.id
                      ? { ...s, content: e.target.value }
                      : s
                  ))
                }
                placeholder="Section content..."
              />

              <div className="space-y-4">
                {section.elements.map((element) => (
                  <div key={element.id} className="border rounded p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label>{element.type.charAt(0).toUpperCase() + element.type.slice(1)}</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          onSectionsChange(sections.map(s =>
                            s.id === section.id
                              ? {
                                  ...s,
                                  elements: s.elements.filter(e => e.id !== element.id)
                                }
                              : s
                          ))
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <ElementEditor element={element} sectionId={section.id} />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addElement(section.id, "image")}
                >
                  <ImageIcon className="h-4 w-4 mr-1" />
                  Add Image
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addElement(section.id, "video")}
                >
                  <Video className="h-4 w-4 mr-1" />
                  Add Video
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addElement(section.id, "formula")}
                >
                  <GripVertical className="h-4 w-4 mr-1" />
                  Add Formula
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addElement(section.id, "code")}
                >
                  <Table2 className="h-4 w-4 mr-1" />
                  Add Code
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => addSection(section.id)}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Subsection
              </Button>
            </div>
          )}
        </div>
      ))}

      <Button
        variant="outline"
        onClick={() => addSection()}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Section
      </Button>
    </div>
  )
}
