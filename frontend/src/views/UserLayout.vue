<template>
  <el-container style="height: 100%">
    <el-aside class="aside">
      <div class="logo">
        <img src="../assets/home.svg" />
        <h1>我的主页</h1>
      </div>
      <el-menu :router="true" default-active="/user/home" class="menu">
        <MenuBar :menuRoutes="userStore.menuRoutes"></MenuBar>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user'
import MenuBar from '@/components/MenuBar.vue'

const userStore = useUserStore()
</script>

<style scoped lang="scss">
.aside {
  width: 200px;
  height: 100%;
  background-color: #304156;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px 0;

  img {
    width: 36px;
    height: 36px;
  }

  h1 {
    color: white;
    font-size: 24px;
  }
}
</style>
