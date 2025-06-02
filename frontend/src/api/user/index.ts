import request from '@/utils/request'
import type { loginReqData } from './type'
import type { User } from '@/type'
export const userLogin = (data: loginReqData): Promise<User> => {
  return request.post('/login', data)
}
