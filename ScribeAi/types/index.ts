export interface User {
  id: string
  email: string
  name?: string | null
  createdAt: Date
  updatedAt: Date
  slides?: Slide[]
}

export interface Slide {
  id: string
  title: string
  content: string
  order: number
  createdAt: Date
  updatedAt: Date
  userId: string
  user?: User
}

export interface CreateSlideInput {
  title: string
  content: string
  order: number
}

export interface Book {
  id: string
  title: string
  description: string
  coverImage: string
  chapters: Chapter[]
  status: 'draft' | 'in-progress' | 'completed'
  createdAt: string
  updatedAt: string
}

export interface Chapter {
  id: string
  title: string
  content: string
  wordCount: number
  lastEdited: string
}

export interface Template {
  id: string
  title: string
  description: string
  chapters: string[]
  category: string
  popularity: number
}

export interface WritingHistory {
  id: string
  bookId: string
  chapterId: string
  wordCount: number
  timeSpent: number
  date: string
  aiSuggestionsUsed: number
}

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  writingStats: {
    totalBooks: number
    totalWords: number
    totalTimeSpent: number
    averageWordsPerSession: number
  }
  preferences: {
    theme: 'light' | 'dark'
    fontSize: number
    autoSave: boolean
    aiSuggestions: boolean
  }
}

export interface Notification {
  id: string
  type: 'success' | 'info' | 'warning' | 'error'
  message: string
  timestamp: string
  read: boolean
}
