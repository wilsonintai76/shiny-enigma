"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  BookText,
  Star,
  Clock,
  MoreVertical,
  FileEdit,
  Download,
  Trash2,
  Filter,
} from "lucide-react"

interface Book {
  id: string
  title: string
  status: "in_progress" | "published"
  progress: number
  lastEdited: string
  genre: string
  rating: number
  chapters: number
  words: number
}

export default function EbooksPage() {
  const [filter, setFilter] = useState<"all" | "in_progress" | "published">("all")

  const books: Book[] = [
    {
      id: "1",
      title: "The Art of AI",
      status: "in_progress",
      progress: 65,
      lastEdited: "2 hours ago",
      genre: "Technology",
      rating: 4.5,
      chapters: 8,
      words: 12500,
    },
    {
      id: "2",
      title: "Future of Technology",
      status: "published",
      progress: 100,
      lastEdited: "1 day ago",
      genre: "Technology",
      rating: 4.8,
      chapters: 12,
      words: 28400,
    },
    {
      id: "3",
      title: "Digital Revolution",
      status: "in_progress",
      progress: 30,
      lastEdited: "3 days ago",
      genre: "Business",
      rating: 4.2,
      chapters: 5,
      words: 8200,
    },
  ]

  const filteredBooks = filter === "all" 
    ? books 
    : books.filter(book => book.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My eBooks</h1>
          <p className="text-muted-foreground">
            Manage and track your eBook collection
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <BookText className="h-4 w-4 mr-2" />
            New Book
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          variant={filter === "all" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "in_progress" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setFilter("in_progress")}
        >
          In Progress
        </Button>
        <Button
          variant={filter === "published" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setFilter("published")}
        >
          Published
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{book.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {book.lastEdited}
                    </span>
                    <span>•</span>
                    <span>{book.genre}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      {book.rating}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{book.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-primary"
                    style={{ width: `${book.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span>{book.chapters} Chapters</span>
                <span>•</span>
                <span>{book.words.toLocaleString()} Words</span>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Button variant="outline" className="w-full">
                  <FileEdit className="h-4 w-4 mr-2" />
                  {book.status === "published" ? "Edit" : "Continue Writing"}
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
