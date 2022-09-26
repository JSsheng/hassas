// ? 对axios的二次封装
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
// ? 创建axios的实例
// /* eslint-disable */
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
service.interceptors.response.use(response => {
  // 1. 需要哪些数据
  // 2. 接口成功并且业务成功
  // 3. 没有成功Promise.reject就会报错
  const { message, data, success } = response.data
  if (success) { // 业务逻辑成功的时候返回data
    return data
  }
  // 接口没有成功的时候
  Message.error(message)
  return Promise.reject(new Error(message))
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
})
export default service
