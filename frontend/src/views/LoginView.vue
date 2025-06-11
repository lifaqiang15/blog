<template>
  <div class="login-view">
    <el-row style="height: 100%">
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24" class="login-container">
        <el-form :model="form" class="login-form">
          <h1>用户登录</h1>
          <el-form-item class="form-item">
            <el-input v-model="form.username" placeholder="请输入用户名">
              <template #prefix>
                <Icon icon="ep:user" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="form-item">
            <el-input v-model="form.password" show-password placeholder="请输入密码">
              <template #prefix>
                <Icon icon="ep:lock" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="form-item">
            <el-checkbox v-model="form.remember">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item class="form-item">
            <el-button type="primary" :loading="loading" @click="submit" style="width: 100%"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()

const loading = ref(false)

const form = reactive({
  username: '',
  password: '',
  remember: false,
})

const submit = async () => {
  loading.value = true
  try {
    await userStore.login(form.username, form.password, form.remember)
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-view {
  height: 100%;
  background: url('@/assets/login.jpg') no-repeat;
  background-size: cover;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 440px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;

  h1 {
    margin: 20px 0;
    text-align: center;
  }
}

.form-item {
  margin-bottom: 18px;
}
</style>
