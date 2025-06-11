import { defineStore } from 'pinia'
import { user_login } from '@/api/user'
import type { Role } from '@/type'
import type { RouteRecordRaw } from 'vue-router'
import { filterAsyncRoutes } from '@/permission'
import { asyncRoutes } from '@/router/routes'
import router from '@/router'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || sessionStorage.getItem('token') || null,
    username: null as string | null,
    role: null as Role | null,
    avatar: null as string | null,
    created_time: null as string | null,
    menuRoutes: [] as RouteRecordRaw[],
  }),
  actions: {
    async login(username: string, password: string, remember: boolean) {
      try {
        const result = await user_login({ username, password })
        if (result.code === 200) {
          // 获取用户信息
          this.token = result.data!.token!
          this.username = result.data!.username
          this.role = result.data!.role
          this.avatar = result.data!.avatar
          this.created_time = result.data!.created_time

          // 记住我功能(todo: 关闭浏览器重新打开或token过期才需要重新登陆)
          if (remember) {
            localStorage.setItem('token', this.token)
            sessionStorage.removeItem('token')
          } else {
            sessionStorage.setItem('token', this.token)
            localStorage.removeItem('token')
          }

          // 获取用户路由
          this.menuRoutes = filterAsyncRoutes(asyncRoutes, result.data!.role)
          this.menuRoutes.forEach((route) => {
            router.addRoute('user', route)
          })
          console.log(router.getRoutes())

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
