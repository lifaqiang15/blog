<!-- 最多两级路由 -->
<template>
  <template v-for="(item, _) in menuRoutes" :key="item.path">
    <!-- 有子路由 -->
    <el-sub-menu v-if="item.children" :index="item.path" class="sub-menu">
      <template #title>
        <Icon :icon="(item.meta as MetaData).icon" class="icon"></Icon>
        <span>{{ item.meta!.title }}</span>
      </template>
      <template v-for="(sub_item, _) in item.children" :key="sub_item.path">
        <el-menu-item :index="`/user/${item.path}/${sub_item.path}`" class="child-item">
          <span>{{ sub_item.meta!.title }}</span>
        </el-menu-item>
      </template>
    </el-sub-menu>
    <!-- 无子路由 -->
    <el-menu-item v-else :index="`/user/${item.path}`" class="menu-item">
      <Icon :icon="(item.meta as MetaData).icon" class="icon"></Icon>
      <span>{{ item.meta!.title }}</span>
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
  gap: 8px;
}

.icon {
  width: 15px;
  height: 15px;
}

.sub-menu,
.child-item,
.menu-item {
  color: #fff;
  background-color: #304156;
}
</style>
