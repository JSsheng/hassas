// ? 对axios的二次封装
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
const TimeOut = 3600 // s
function IsCheckTimeOut() {
  const currentTime = new Date()
  const timeStamp = (currentTime - store.getters.hrsaasTime) / 1000
  return timeStamp > TimeOut
}
// ? 创建axios的实例
// /* eslint-disable */
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      // return Promise.reject(new Error('token过期了'))
    }
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
  if (error.response && error.response.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
    // Message.error('token过期了')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})
export default service
