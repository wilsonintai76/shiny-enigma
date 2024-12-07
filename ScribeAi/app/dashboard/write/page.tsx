"use client"

import { useState, useCallback, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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

interface Chapter {
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
  const [activeChapter, setActiveChapter] = useState<string>("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [wordCount, setWordCount] = useState(0)
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
        // Set initial content to first chapter's content
        setContent(initialChapters[0]?.content || "")
      }
    }
  }, [templateId])

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

  const handleExport = async () => {
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
        title: "Exported",
        description: "Your eBook has been exported successfully."
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to export your eBook. Please try again."
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
    }
  }

  return (
    <div className={cn(
      "flex h-full flex-col space-y-4",
      isFullscreen && "fixed inset-0 bg-background z-50 p-6"
    )}>
      <div className="flex items-center justify-between">
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
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <MessageSquarePlus className="mr-2 h-4 w-4" />
                AI Chat
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            </SheetContent>
          </Sheet>
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

      <div className="grid flex-1 gap-4 md:grid-cols-[1fr,300px]">
        <div className="flex flex-col space-y-4">
          <Textarea
            placeholder="Start writing your eBook here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 resize-none"
          />
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {wordCount} words
            </div>
            <div className="text-sm text-muted-foreground">
              Ctrl+S to save • Ctrl+E to enhance • F11 for fullscreen
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleEnhance}>
            {isEnhancing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Enhance with AI
          </Button>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-4">
              <h3 className="font-semibold leading-none">Document Structure</h3>
            </div>
            <div className="p-4 pt-0">
              {chapters.map(chapter => (
                <Button
                  key={chapter.id}
                  variant={activeChapter === chapter.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleChapterChange(chapter.id)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {chapter.title}
                </Button>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground"
                onClick={addChapter}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Chapter
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-4">
              <h3 className="font-semibold leading-none">AI Tools</h3>
            </div>
            <div className="p-4 pt-0 space-y-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <Wand2 className="mr-2 h-4 w-4" />
                    Grammar Check
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Grammar Check</DialogTitle>
                    <DialogDescription>
                      AI is analyzing your text for grammar and style improvements...
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-6">
                    <Progress value={33} />
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <Wand2 className="mr-2 h-4 w-4" />
                    Style Suggestions
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Style Suggestions</DialogTitle>
                    <DialogDescription>
                      AI is analyzing your writing style...
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-6">
                    <Progress value={45} />
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <Wand2 className="mr-2 h-4 w-4" />
                    Content Ideas
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Content Ideas</DialogTitle>
                    <DialogDescription>
                      AI is generating creative content ideas...
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-6">
                    <Progress value={67} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
