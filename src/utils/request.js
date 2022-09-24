// ? 对axios的二次封装
import axios from 'axios'
// ? 创建axios的实例
/* eslint-disable */
const service = axios.create({
  baseUrl: '/dev',
  timeout:5000
})
export default service