import request from '@/utils/request.js'

export function gteEmployeesimple() {
  return request({
    url: '/sys/user/simple'
  })
}
