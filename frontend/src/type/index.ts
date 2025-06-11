export type Role = 'admin' | 'blogger' | 'user'

export interface Response<T> {
  code: number
  message: string
  data?: T
}

export interface User {
  id: number
  username: string
  role: Role
  avatar: string | null
  created_time: string
  token?: string
}

export interface category {
  id: number
  name: string
  cover_image: string | null
  description: string | null
  created_time: string
}

export interface blog {
  id: number
  title: string
  content: string
  status: 'draft' | 'published' | 'pending review' | 'review rejected'
  user_id: number
  created_time: string
  published_time: string | null
  updated_time: string | null
  category_id: number
  views_count: number | null
}
