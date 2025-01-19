import request from '@/utils/request'

// 登录
export const login = (data) => {
    return request.post('/mxh-nav/login', data)
}

// 注册
export const register = (data) => {
    return request.post('/mxh-nav/register', data)
}

// 忘记密码
export const resetPassword = (data) => {
    return request.post('/mxh-nav/password/reset', data)
}

// 获取邮箱验证码
export const getEmailCode = (data) => {
    return request.post('/mxh-nav/email', data)
}