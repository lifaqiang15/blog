import request from '@/utils/request'
import type { CreateBlogRequest, UpdateBlogRequest } from './type'
import type { Response, blog } from '@/type'

export const create_blog = (data: CreateBlogRequest): Promise<Response<{ id: number }>> => {
  return request.post('/blog', data)
}

export const get_blog = (id: number): Promise<Response<blog>> => {
  return request.get(`/blog/${id}`)
}

export const update_blog = (id: number, data: UpdateBlogRequest): Promise<Response<null>> => {
  return request.put(`/blog/info/${id}`, data)
}

export const update_blog_views_count = (
  id: number,
  views_count: number,
): Promise<Response<null>> => {
  return request.put(`/blog/views/${id}`, views_count)
}

export const delete_blog = (id: number): Promise<Response<null>> => {
  return request.delete(`/blog/${id}`)
}
