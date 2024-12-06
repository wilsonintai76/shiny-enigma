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
