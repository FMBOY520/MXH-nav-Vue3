import request from '@/utils/request'

// 获取-首页导航
export const getNavigation = (params) => {
  return request.get('/mxh-nav', { params })
}
