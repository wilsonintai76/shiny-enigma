import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { BookText } from "lucide-react"

export interface BookMetadata {
  title: string
  author: string
  description: string
  language: string
  coverImage?: string
  isbn?: string
  publisher?: string
  publishDate?: string
  genre?: string
  tags?: string[]
}

interface BookMetadataProps {
  metadata: BookMetadata
  onMetadataChange: (metadata: BookMetadata) => void
}

export function BookMetadataDialog({ metadata, onMetadataChange }: BookMetadataProps) {
  const [localMetadata, setLocalMetadata] = React.useState<BookMetadata>(metadata)

  const handleChange = (field: keyof BookMetadata, value: string) => {
    setLocalMetadata(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onMetadataChange(localMetadata)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <BookText className="mr-2 h-4 w-4" />
          Book Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Book Metadata</DialogTitle>
          <DialogDescription>
            Add details about your book. This information will be included in the exported eBook.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input
              id="title"
              value={localMetadata.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right">Author</Label>
            <Input
              id="author"
              value={localMetadata.author}
              onChange={(e) => handleChange("author", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea
              id="description"
              value={localMetadata.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="language" className="text-right">Language</Label>
            <Input
              id="language"
              value={localMetadata.language}
              onChange={(e) => handleChange("language", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="genre" className="text-right">Genre</Label>
            <Input
              id="genre"
              value={localMetadata.genre}
              onChange={(e) => handleChange("genre", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isbn" className="text-right">ISBN</Label>
            <Input
              id="isbn"
              value={localMetadata.isbn}
              onChange={(e) => handleChange("isbn", e.target.value)}
              className="col-span-3"
              placeholder="Optional"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="publisher" className="text-right">Publisher</Label>
            <Input
              id="publisher"
              value={localMetadata.publisher}
              onChange={(e) => handleChange("publisher", e.target.value)}
              className="col-span-3"
              placeholder="Optional"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Details</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
