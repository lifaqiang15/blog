import request from '@/utils/request'
import type { CategoryRequest } from './type'
import type { Response, category } from '@/type'

export const create_category = (data: CategoryRequest): Promise<Response<{ id: number }>> => {
  return request.post('/category', data)
}

export const get_categories = (): Promise<Response<category[]>> => {
  return request.get('/category')
}

export const update_category = (id: number, data: CategoryRequest): Promise<Response<null>> => {
  return request.put(`/category/${id}`, data)
}

export const delete_category = (id: number): Promise<Response<null>> => {
  return request.delete(`/category/${id}`)
}
