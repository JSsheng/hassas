// ? 对axios的二次封装
import axios from 'axios'
// ? 创建axios的实例
/* eslint-disable */
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout:5000
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
  return Promise.reject(reeor)
})
export default service