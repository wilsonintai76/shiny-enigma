"use client"

import { useState, useCallback, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"
import {
  BookText,
  MessageSquarePlus,
  Save,
  Download,
  FileText,
  Wand2,
  Plus,
  Expand,
  Loader2,
  X,
  BookTemplate
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Template, templates } from "@/lib/template-data"
import { AIChat } from "../../../components/ai-chat/ai-chat"
import { BookMetadataDialog, type BookMetadata } from "@/components/book/book-metadata"
import { BookExportDialog } from "@/components/book/book-export"
import { TechnicalContent } from "@/components/book/technical-content"
import { DocumentExplorer, type DocumentItem } from "@/components/book/document-explorer"

interface Chapter {
  id: string
  title: string
  content: string
}

interface Section {
  id: string
  title: string
  content: string
}

export default function WritePage() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("templateId")
  const templateTitle = searchParams.get("title")
  const templateCategory = searchParams.get("category")

  const [bookTitle, setBookTitle] = useState(templateTitle || "")
  const [content, setContent] = useState("")
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null)
  const [activeChapter, setActiveChapter] = useState<string>("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)
  const [bookMetadata, setBookMetadata] = useState<BookMetadata>({
    title: templateTitle || "",
    author: "",
    description: "",
    language: "English",
    genre: templateCategory || ""
  })
  const [sections, setSections] = useState<Section[]>([])
  const [documentItems, setDocumentItems] = useState<DocumentItem[]>([
    {
      id: "1",
      type: "folder",
      name: "Chapter 1: Introduction",
      children: [
        {
          id: "1.1",
          type: "file",
          name: "Overview",
          content: ""
        },
        {
          id: "1.2",
          type: "folder",
          name: "1.1 Background",
          children: [
            {
              id: "1.2.1",
              type: "file",
              name: "Historical Context",
              content: ""
            }
          ]
        }
      ]
    }
  ])
  const { toast } = useToast()

  // Load template data
  useEffect(() => {
    if (templateId) {
      const template = templates.find(t => t.id === templateId)
      if (template) {
        // Initialize chapters from template
        const initialChapters = template.chapters.map((chapter, index) => ({
          id: (index + 1).toString(),
          title: chapter.title,
          content: chapter.suggestedContent || ""
        }))
        setChapters(initialChapters)
        setActiveChapter(initialChapters[0]?.id || "")
        setCurrentChapter(initialChapters[0])
        // Set initial content to first chapter's content
        setContent(initialChapters[0]?.content || "")
      }
    }
  }, [templateId])

  // Initialize with a first chapter if none exists
  useEffect(() => {
    if (chapters.length === 0) {
      const initialChapter: Chapter = {
        id: "1",
        title: "Chapter 1",
        content: ""
      }
      setChapters([initialChapter])
      setCurrentChapter(initialChapter)
    }
  }, [])

  // Update word count
  useEffect(() => {
    const words = content.trim().split(/\s+/).length
    setWordCount(content.trim() === "" ? 0 : words)
  }, [content])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        handleSave()
      }
      if (e.key === "e" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        handleEnhance()
      }
      if (e.key === "F11") {
        e.preventDefault()
        setIsFullscreen(prev => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleContentChange = (content: string) => {
    if (!currentChapter) return

    setCurrentChapter(prev => ({
      ...prev!,
      content
    }))

    setChapters(prev =>
      prev.map(chapter =>
        chapter.id === currentChapter.id
          ? { ...chapter, content }
          : chapter
      )
    )
  }

  const handleSuggestionApply = (suggestion: string) => {
    setContent((prevContent) => {
      // If there's existing content, add a newline before the suggestion
      return prevContent ? `${prevContent}\n\n${suggestion}` : suggestion;
    });
    
    // If we're in a chapter, update the chapter content
    if (currentChapter) {
      setChapters(prev => prev.map(chapter =>
        chapter.id === currentChapter.id
          ? { ...chapter, content: content + '\n\n' + suggestion }
          : chapter
      ));
    }
  };

  const handleApplySuggestion = useCallback((suggestion: string) => {
    setContent(prev => prev + "\n" + suggestion)
    toast({
      variant: "success",
      title: "Suggestion applied",
      description: "The AI suggestion has been added to your content."
    })
  }, [toast])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Save current chapter content
      setChapters(prev => prev.map(chapter =>
        chapter.id === activeChapter
          ? { ...chapter, content }
          : chapter
      ))

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        variant: "success",
        title: "Saved",
        description: "Your content has been saved successfully."
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save your content. Please try again."
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleExport = async (format: string, options: any) => {
    try {
      // Save current chapter before export
      setChapters(prev => prev.map(chapter =>
        chapter.id === activeChapter
          ? { ...chapter, content }
          : chapter
      ))

      // Simulate export
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast({
        variant: "success",
        title: "Export Complete",
        description: `Your book has been exported as ${format.toUpperCase()}.`
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "Failed to export your book. Please try again."
      })
    }
  }

  const handleEnhance = async () => {
    setIsEnhancing(true)
    try {
      // Simulate AI enhancement
      await new Promise(resolve => setTimeout(resolve, 2000))
      setContent(prev => prev + "\n\nEnhanced content here...")
      toast({
        variant: "success",
        title: "Enhanced",
        description: "Your content has been enhanced by AI."
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to enhance your content. Please try again."
      })
    } finally {
      setIsEnhancing(false)
    }
  }

  const addChapter = () => {
    const newId = (chapters.length + 1).toString()
    setChapters(prev => [...prev, {
      id: newId,
      title: `Chapter ${newId}`,
      content: ""
    }])
  }

  const handleChapterChange = (chapterId: string) => {
    // Save current chapter content
    setChapters(prev => prev.map(chapter =>
      chapter.id === activeChapter
        ? { ...chapter, content }
        : chapter
    ))

    // Load new chapter content
    const newChapter = chapters.find(c => c.id === chapterId)
    if (newChapter) {
      setContent(newChapter.content)
      setActiveChapter(chapterId)
      setCurrentChapter(newChapter)
    }
  }

  const handleItemSelect = (item: DocumentItem) => {
    if (item.type === "file") {
      // Set the current content
      setContent(item.content || "")
    }
  }

  return (
    <div className={cn("flex h-screen flex-col", isFullscreen && "fixed inset-0 z-50 bg-background")}>
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <BookMetadataDialog metadata={bookMetadata} onMetadataChange={setBookMetadata} />
          <BookExportDialog metadata={bookMetadata} chapters={chapters} onExport={handleExport} />
        </div>
        <div className="flex-1 space-y-1">
          <Input
            type="text"
            placeholder="Enter book title..."
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className="text-xl font-semibold h-12"
          />
          <div className="flex items-center text-sm text-muted-foreground">
            <FileText className="mr-2 h-4 w-4" />
            <span>Using template:</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSave}>
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(prev => !prev)}
          >
            {isFullscreen ? (
              <X className="h-4 w-4" />
            ) : (
              <Expand className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="w-64 flex-shrink-0">
          <DocumentExplorer
            items={documentItems}
            onItemSelect={handleItemSelect}
            onItemsChange={setDocumentItems}
          />
        </div>
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto py-6">
            <TechnicalContent
              sections={sections}
              onSectionsChange={setSections}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
