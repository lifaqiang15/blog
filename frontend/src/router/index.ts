import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/store/user'
import { constRoutes, asyncRoutes } from './routes'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// 前置路由守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string
  const userStore = useUserStore()
  const token = userStore.token
  if (to.meta.requiresAuth && !token) {
    next({ path: '/login', query: { redirect: to.path } })
  } else {
    next()
  }
})

export default router
