import request from '@/utils/request'

// 获取角色列表
export function getList(data) {
  return request({
    url: '/role/list',
    method: 'get'
  })
}
