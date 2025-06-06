import { defineStore } from 'pinia'
import { userLogin } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || sessionStorage.getItem('token') || null,
    username: null as string | null,
  }),
  actions: {
    async login(username: string, password: string, remember: boolean) {
      try {
        const result = await userLogin({ username, password })
        if (result.code === 200) {
          this.token = result.data!.token!
          this.username = result.data!.username
          if (remember) {
            localStorage.setItem('token', this.token)
            sessionStorage.removeItem('token')
          } else {
            sessionStorage.setItem('token', this.token)
            localStorage.removeItem('token')
          }
          return 'ok'
        } else {
          ElMessage.error(result.message)
          return Promise.reject(new Error(result.message))
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },

    logout() {
      this.token = null
      this.username = null
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
    },
  },
})
