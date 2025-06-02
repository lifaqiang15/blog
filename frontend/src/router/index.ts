import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/BlogView.vue'),
  },
  {
    path: '/user/home',
    name: 'user-home',
    component: () => import('@/views/UserHomePage.vue'),
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/UserProfile.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: '页面不存在' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | 个人博客`
  next()
})

export default router
