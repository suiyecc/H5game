export interface Game {
  id: number
  slug: string
  title: string
  category: string
  thumbnail: string
  gif?: string
  url: string
  description: string
  featured: boolean
}