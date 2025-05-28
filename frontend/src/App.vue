<template>
  <el-config-provider :locale="zhCn">
    <div style="background-color: red">
      <el-button @click="fun">Button</el-button>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const fun = () => {
  ElMessage.success('error')
}
</script>

<style scoped lang="scss"></style>
