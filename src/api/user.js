import request from '@/utils/request.js'

export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

export const getUserDetailById = (id) => request({
  url: `/sys/user/${id}`,
  method: 'get'
})

export const saveUserDetailById = (data) => request({
  url: `/sys/user/${data.id}`,
  method: 'put',
  data
})

