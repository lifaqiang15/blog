export interface CategoryRequest {
  name: string
  cover_image: string | null
  description: string
}

export interface CategoryResponse {
  id: number
  created_time: string
}
