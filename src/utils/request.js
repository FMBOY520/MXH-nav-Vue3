import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useConfigStore, useUserStore } from '@/stores'
const userStore = useUserStore()
const configStore = useConfigStore()

// 服务器基地址
let baseURL = configStore.server.url

// 注册请求
const request = axios.create({
  baseURL,        // 服务器基地址
  timeout: 60000  // 超时时间
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    console.log('请求正常')
    config.headers.Authorization = userStore.token
    return config
  },
  (error) => {
    console.log('请求错误')
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    console.log('响应正常')
    return response
  },
  (error) => {
    console.log('响应错误')
    return Promise.reject(error)
  }
)

export default request
export { baseURL }