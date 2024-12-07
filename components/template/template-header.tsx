"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface TemplateHeaderProps {
  initialTitle?: string
  initialCategory?: string
  onTitleChange: (title: string) => void
  onCategoryChange: (category: string) => void
}

export function TemplateHeader({
  initialTitle = "",
  initialCategory = "",
  onTitleChange,
  onCategoryChange,
}: TemplateHeaderProps) {
  const [title, setTitle] = useState(initialTitle)
  const [categories] = useState([
    "Book",
    "Article",
    "Report",
    "Documentation",
    "Other",
  ])
  const [newCategory, setNewCategory] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    onTitleChange(newTitle)
  }

  const handleCategoryChange = (value: string) => {
    if (value === "add-new") {
      setDialogOpen(true)
    } else {
      onCategoryChange(value)
    }
  }

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onCategoryChange(newCategory.trim())
      setNewCategory("")
      setDialogOpen(false)
    }
  }

  return (
    <div className="border-b">
      <div className="container max-w-screen-2xl mx-auto py-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              placeholder="Enter template title..."
              value={title}
              onChange={handleTitleChange}
              className="text-lg font-medium"
            />
          </div>
          <Select onValueChange={handleCategoryChange} value={initialCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
                <SelectItem value="add-new" className="text-primary">
                  + Add New Category
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Enter a name for the new template category
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
