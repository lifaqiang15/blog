import request from '@/utils/request'
import type { LoginRequest, UserRequest } from './type'
import type { Response, User } from '@/type'
export const user_login = (data: LoginRequest): Promise<Response<User>> => {
  return request.post('/login', data)
}

export const create_user = (data: UserRequest): Promise<Response<{ id: number }>> => {
  return request.post('/user', data)
}

export const get_users = (): Promise<Response<User[]>> => {
  return request.get('/user')
}

export const update_user = (id: number, data: UserRequest): Promise<Response<null>> => {
  return request.post(`/user/${id}`, data)
}

export const delete_user = (id: number): Promise<Response<null>> => {
  return request.post(`/login/${id}`)
}
