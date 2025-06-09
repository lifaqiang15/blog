import axios from 'axios'
import { useUserStore } from '@/store/user'

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    const data = res.data
    if (data.code === 200) {
      return data
    } else {
      ElMessage.error(data.message)
      return Promise.reject(new Error(data.message))
    }
  },
  (error) => {
    if (!error.response) {
      ElMessage.error('网络连接异常')
      return Promise.reject(error)
    }
    const status = error.response.status //http状态码
    switch (status) {
      case 401:
        ElMessage.warning('未授权，请重新登录')
        break
      case 403:
        ElMessage.error('拒绝访问')
        break
      case 404:
        ElMessage.error('请求资源不存在')
        break
      case 500:
        ElMessage.error('服务器内部错误')
        break
      case 502:
        ElMessage.error('网关错误')
        break
      default:
        ElMessage.error(`请求出错 [${status}]`)
    }
    return Promise.reject(error)
  },
)

export default request
