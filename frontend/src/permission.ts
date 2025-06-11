import type { RouteRecordRaw } from 'vue-router'
import type { Role } from '@/type'

export function filterAsyncRoutes(asyncRoutes: RouteRecordRaw[], role: Role) {
  const routes: RouteRecordRaw[] = []
  asyncRoutes.forEach((route) => {
    if (route.meta && (route.meta.roles as string[]).includes(role)) {
      routes.push(route)
    }
  })
  return routes
}
