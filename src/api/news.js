import request from '@/utils/request'

// 获取新闻简介列表
export function getList(data) {
  return request({
    url: '/news/list',
    method: 'post',
    data
  })
}
