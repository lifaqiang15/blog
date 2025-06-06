import request from '@/utils/request'
import type { loginReqData } from './type'
import type { Response, User } from '@/type'
export const userLogin = (data: loginReqData): Promise<Response<User>> => {
  return request.post('/login', data)
}
