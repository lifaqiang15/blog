<!-- 最多两级路由 -->
<template>
  <template v-for="(item, _) in menuRoutes" :key="item.path">
    <!-- 有子路由 -->
    <el-sub-menu v-if="item.children" :index="item.path">
      <template #title>
        <Icon :icon="(item.meta as MetaData).icon" :width="20" :height="20"></Icon>
        <span class="sub-menu-title">{{ item.meta!.title }}</span>
      </template>
      <template v-for="(sub_item, _) in item.children" :key="sub_item.path">
        <el-menu-item
          :index="`/user/${item.path}/${sub_item.path}`"
          class="child-item"
          style="padding-left: 36px"
        >
          <span>{{ sub_item.meta!.title }}</span>
        </el-menu-item>
      </template>
    </el-sub-menu>
    <!-- 无子路由 -->
    <el-menu-item v-else :index="`/user/${item.path}`" class="menu-item" style="padding-left: 20px">
      <Icon :icon="(item.meta as MetaData).icon" :width="20" :height="20"></Icon>
      <span style="margin-left: 10px">{{ item.meta!.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import { Icon } from '@iconify/vue'

interface MetaData extends RouteMeta {
  title: string
  requiresAuth: boolean
  roles: string[]
  icon: string
}

defineProps<{ menuRoutes: RouteRecordRaw[] }>()
</script>

<style scoped lang="scss">
.menu-item,
:deep(.el-sub-menu__title) {
  font-size: 16px;
}

.menu-item,
.child-item,
:deep(.el-sub-menu__title) {
  color: #eee;
  background-color: #304156;
  user-select: none;

  &:hover,
  &.is-active {
    background-color: #1f2d3d;
  }
}
// margin/padding会导致折叠时图标变小，添加伪类代替
.sub-menu-title::before {
  content: '';
  display: inline-block;
  width: 10px;
}
</style>
