import type { RouteRecordRaw } from 'vue-router'
import type { Role } from '@/type'

const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: 'home',
    name: 'user-home',
    component: () => import('@/views/UserHome.vue'),
    meta: {
      title: '我的主页',
      requiresAuth: true,
      roles: ['admin', 'blogger', 'user'],
      icon: 'ep:house',
    },
  },
  {
    path: 'profile',
    name: 'profile',
    component: () => import('@/views/PersonalCenter.vue'),
    meta: {
      title: '个人中心',
      requiresAuth: true,
      roles: ['admin', 'blogger', 'user'],
      icon: 'ep:user',
    },
  },
  {
    path: 'create-blog',
    name: 'create-blog',
    component: () => import('@/views/CreateBlog.vue'),
    meta: {
      title: '创作中心',
      requiresAuth: true,
      roles: ['admin', 'blogger'],
      icon: 'ep:edit',
    },
  },
  {
    path: 'manage',
    name: 'manage',
    component: () => import('@/views/ManageView.vue'),
    redirect: '/user/manage/user',
    meta: {
      title: '后台管理',
      requiresAuth: true,
      roles: ['admin'],
      icon: 'ep:set-up',
    },
    children: [
      {
        path: 'user',
        name: 'user-manage',
        component: () => import('@/views/UserManage.vue'),
        meta: {
          title: '用户管理',
          requiresAuth: true,
          roles: ['admin'],
        },
      },
      {
        path: 'category',
        name: 'category-manage',
        component: () => import('@/views/CategoryManage.vue'),
        meta: {
          title: '分类管理',
          requiresAuth: true,
          roles: ['admin'],
        },
      },
      {
        path: 'blog',
        name: 'blog-manage',
        component: () => import('@/views/BlogManage.vue'),
        meta: {
          title: '博客管理',
          requiresAuth: true,
          roles: ['admin'],
        },
      },
    ],
  },
]

function filterAsyncRoutes(asyncRoutes: RouteRecordRaw[], role: Role) {
  return asyncRoutes.filter((route) => {
    if (route.meta && (route.meta.roles as string[]).includes(role)) {
      if (route.children) {
        route.children = filterAsyncRoutes(route.children, role)
      }
      return true
    }
    return false
  })
}

export function getDynamicRoutes(role: Role) {
  return filterAsyncRoutes(dynamicRoutes, role)
}
