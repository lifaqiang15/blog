import { defineStore } from 'pinia'
import { userLogin } from '@/api/user'
import type { loginReqData } from '@/api/user/type'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    username: '',
  }),
  actions: {
    async login(data: loginReqData) {
      try {
        const result = await userLogin(data)
        this.token = result.token!
        this.username = result.username
        localStorage.setItem('token', this.token)
        return 'ok'
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
  },
})
