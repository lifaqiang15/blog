<template>
  <el-container style="height: 100%">
    <el-aside class="aside" :width="isCollapse ? '64px' : '200px'">
      <div class="logo">
        <img src="../assets/home.svg" />
        <h1 v-show="!isCollapse">我的主页</h1>
      </div>
      <el-menu :router="true" default-active="/user/home" :collapse="isCollapse" id="menu">
        <MenuBar :menuRoutes="userStore.menuRoutes"></MenuBar>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <Icon icon="ep:fold" :width="20" :height="20" v-show="!isCollapse" @click="collapse"></Icon>
        <Icon
          icon="ep:expand"
          :width="20"
          :height="20"
          v-show="isCollapse"
          @click="collapse"
        ></Icon>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import MenuBar from '@/components/MenuBar.vue'
import { Icon } from '@iconify/vue'

const userStore = useUserStore()

const isCollapse = ref(false)

const collapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style scoped lang="scss">
.aside {
  height: 100%;
  background-color: #304156;

  .menu {
    border: none;
  }
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

.header {
  display: flex;
  align-items: center;
  padding: 20px;
}
</style>
