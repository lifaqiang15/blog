<template>
  <el-header class="header-top">
    <el-row class="header-content">
      <el-col :span="8" :xs="12" class="logo-container">
        <img src="@/assets/logo.svg"></img>
        <span>代码杂货铺</span>
      </el-col>
      <el-col :span="8" :xs="0" class="search-container hidden-xs-only">
        <el-input placeholder="搜索文档" class="search-input">
          <template #prefix>
            <Icon icon="si:search-line" />
          </template>
        </el-input>
      </el-col>
      <el-col :span="8" :xs="12" class="user-container">
        <router-link to="/" class="link">
          <span :class="{active:$route.path==='/'}">主页</span>
        </router-link>
        <router-link to="/blog" class="link">
          <span :class="{active:$route.path==='/blog'}">博客</span>
        </router-link>
        <el-dropdown>
          <router-link to="/user/home" class="link">
            <img src="@/assets/user.png">
          </router-link>
          <template #dropdown>
            <el-dropdown-menu>
              <router-link to="/user/home" class="link">
                <el-dropdown-item>我的主页</el-dropdown-item>
              </router-link>
              <router-link to="/user/profile" class="link">
                <el-dropdown-item>个人中心</el-dropdown-item>
              </router-link>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import 'element-plus/theme-chalk/display.css'
</script>

<style scoped lang="scss">
.header-top {
    display: flex;
    justify-content: center;
    align-items: center;

    .header-content {
      width: 100%;
      max-width: 1000px;

      .logo-container {
        display: flex;
        align-items: center;

        img {
          width: 45px;
          height:45px;
          margin-right: 10px;
        }

        span{
          font-size: 16px;
          font-weight: 600;
        }
      }

      .search-container{
        display: flex;
        align-items: center;
      }

      .user-container{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap:30px;

        .link{
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 500;
          outline:none;

          &:hover{
            color:$primary-color;
          }

          img{
            width:40px;
            height: 40px;
          }
        }

        .active{
          color:$primary-color;
        }
      }
    }
  }
</style>