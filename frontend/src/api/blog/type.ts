export interface CreateBlogRequest {
  title: string
  content: string
  status: string
  user_id: number
  category_id: number
}

export interface UpdateBlogRequest {
  title: string
  content: string
  status: string
  published_time: string //"2023-10-10T12:34:56+08:00"
  category_id: number
}
