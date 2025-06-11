export const constRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: '首页',
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      title: '登录',
      requiresAuth: false,
    },
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/BlogView.vue'),
    meta: {
      title: '博客',
      requiresAuth: true,
    },
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/UserView.vue'),
    redirect: '/user/home',
    meta: {
      title: '用户',
      requiresAuth: true,
    },
    children: [
      {
        path: 'home',
        name: 'user-home',
        component: () => import('@/views/UserHome.vue'),
        meta: {
          title: '我的主页',
          requiresAuth: true,
        },
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/PersonalCenter.vue'),
        meta: {
          title: '个人中心',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '页面不存在',
      requiresAuth: false,
    },
  },
]

export const asyncRoutes = [
  {
    path: 'create-blog',
    name: 'create-blog',
    component: () => import('@/views/CreateBlog.vue'),
    meta: {
      title: '创作中心',
      requiresAuth: true,
      roles: ['admin', 'blogger'],
    },
  },
  {
    path: 'user-manage',
    name: 'user-manage',
    component: () => import('@/views/UserManage.vue'),
    meta: {
      title: '用户管理',
      requiresAuth: true,
      roles: ['admin'],
    },
  },
  {
    path: 'blog-manage',
    name: 'blog-manage',
    component: () => import('@/views/BlogManage.vue'),
    meta: {
      title: '博客管理',
      requiresAuth: true,
      roles: ['admin'],
    },
  },
]
