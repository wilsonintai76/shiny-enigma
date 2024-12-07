"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  BookText,
  Search,
  Users,
  Star,
  ArrowRight,
  Filter,
  Plus,
  Eye,
} from "lucide-react"
import { Template, templates } from "@/lib/template-data"

export default function TemplatesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [newTemplate, setNewTemplate] = useState({
    title: "",
    category: "",
    description: "",
    chapters: [] as string[],
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const categories = [
    "All",
    "Business",
    "Self-Help",
    "Technology",
    "Education",
    "Health",
  ]

  const filteredTemplates = templates.filter(template => 
    (selectedCategory === "all" || template.category === selectedCategory) &&
    (template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     template.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
    setIsPreviewOpen(true)
  }

  const handleUseTemplate = () => {
    if (!selectedTemplate) return

    const searchParams = new URLSearchParams({
      templateId: selectedTemplate.id,
      title: selectedTemplate.title,
      category: selectedTemplate.category,
    }).toString()

    router.push(`/dashboard/write?${searchParams}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">
            Choose from our collection of professional templates
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Custom Template
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Custom Template</DialogTitle>
              <DialogDescription>
                Create your own custom template for your books
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Template Title</Label>
                <Input
                  id="title"
                  value={newTemplate.title}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter template title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={newTemplate.category}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select a category</option>
                  {categories.filter(cat => cat !== "All").map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter template description"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                Create Template
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 mt-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === (category.toLowerCase() === "all" ? "all" : category) ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category.toLowerCase() === "all" ? "all" : category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div
              className="h-48 rounded-t-lg bg-cover bg-center"
              style={{ backgroundImage: `url(${template.image})` }}
            />
            <div className="p-6">
              <h3 className="font-semibold text-lg">{template.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {template.description}
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <BookText className="h-4 w-4" />
                  {template.chapters.length} Chapters
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {template.usageCount.toLocaleString()} Uses
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  {template.rating}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    const searchParams = new URLSearchParams({
                      templateId: template.id,
                      title: template.title,
                      category: template.category,
                    }).toString()
                    router.push(`/dashboard/write?${searchParams}`)
                  }}
                >
                  Use Template
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedTemplate?.title}</DialogTitle>
            <DialogDescription>
              Preview the template structure and suggested content
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Template Structure</h3>
              <div className="space-y-4">
                {selectedTemplate?.chapters.map((chapter, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium">{chapter.title}</h4>
                    <p className="text-sm text-muted-foreground">{chapter.description}</p>
                    {chapter.suggestedContent && (
                      <div className="rounded-md bg-muted p-3">
                        <p className="text-sm">{chapter.suggestedContent}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Close
            </Button>
            <Button onClick={handleUseTemplate}>
              Use Template
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
