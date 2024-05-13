import request from '@/utils/request'

// 获取新闻评论列表
export function getNewsCommentList(data) {
  return request({
    url: '/comment/list',
    method: 'post',
    data
  })
}

// 保存评论
export function saveComment(data) {
  return request({
    url: '/comment/save',
    method: 'post',
    data
  })
}
