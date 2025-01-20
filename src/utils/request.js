import axios from 'axios'
import { ElMessage } from 'element-plus'

// 服务器基地址
const baseURL = '/api'

// 注册请求
const request = axios.create({
  baseURL,        // 服务器基地址
  timeout: 60000  // 超时时间
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    console.log('请求正常')
    // console.log(config)
    return config
  },
  (error) => {
    console.log('请求错误')
    // console.log(error)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    console.log('响应正常')
    // console.log(response)
    return response
  },
  (error) => {
    console.log('响应错误')
    // console.log(error)
    if (error.status === 500) {
      ElMessage.error(`无法连接到服务器！| ${error.status}`)
    }
    return Promise.reject(error)
  }
)

export default request
export { baseURL }