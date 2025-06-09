export interface Business {
  id: string
  name: string
  category: string
  address: string
  phone?: string
  website?: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  username: string
  password: string // This would be hashed in a real application
  isAdmin: boolean
}

export interface Session {
  userId: string
  expires: string
}
