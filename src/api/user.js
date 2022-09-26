import request from '@/utils/request.js'

export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

export const getUserDetailById = (id) => ({
  url: `/sys/user/${id}`
})
