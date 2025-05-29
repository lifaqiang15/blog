import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('@/views/BlogView.vue'),
    meta: { title: '文章详情' },
    props: true,
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
