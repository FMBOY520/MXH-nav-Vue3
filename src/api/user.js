import request from '@/utils/request'

// 获取-用户基本信息
export const getUserInfo = () => {
  return request.get('/mxh-nav/user/info')
}

// 修改-头像
export const updateAvatar = (data) => {
  return request.patch('/mxh-nav/update/avatar', data)
}

// 修改-基本资料
export const updateInfo = (data) => {
  return request.patch('/mxh-nav/update/info', data)
}

// 修改-用户名
export const updateUsername = (data) => {
  return request.patch('/mxh-nav/update/username', data)
}

// 修改-邮箱
export const updateEmail = (data) => {
  return request.patch('/mxh-nav/update/email', data)
}

// 修改-密码
export const updatePassword = (data) => {
  return request.patch('/mxh-nav/update/password', data)
}
