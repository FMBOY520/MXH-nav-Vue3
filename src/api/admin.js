import request from '@/utils/request'

// ========== ========== 用户管理 ========== ==========
// 获取-所有用户
export const getUserList = (params) => {
  return request.get('/mxh-nav/admin/user', { params })
}

// 获取-用户详情
export const getUserInfo = (id) => {
  return request.get('/mxh-nav/admin/user/info', { params: { id } })
}

// 添加-用户
export const addUser = (data) => {
  return request.post('/mxh-nav/admin/user', data)
}

// 修改-用户信息
export const updateUser = (data) => {
  return request.put('/mxh-nav/admin/user', data)
}

// 修改-用户密码
export const updateUserPassword = (data) => {
  return request.put('/mxh-nav/admin/user/password', data)
}

// 修改-用户角色
export const updateUserRole = (data) => {
  return request.put('/mxh-nav/admin/user/role', data)
}

// 删除-用户
export const deleteUser = (id) => {
  return request.delete('/mxh-nav/admin/user', { params: { id } })
}


// ========== ========== 分类管理 ========== ==========
// 获取-分类
export const getCategory = (params) => {
  return request.get('/mxh-nav/admin/category', { params })
}

// 获取-分类详情
export const getCategoryInfo = (id) => {
  return request.get('/mxh-nav/admin/category/info', { params: { id } })
}

// 新增-分类
export const addCategory = (data) => {
  return request.post('/mxh-nav/admin/category', data)
}

// 修改-分类
export const updateCategory = (data) => {
  return request.put('/mxh-nav/admin/category', data)
}

// 修改-分类发布状态
export const updateCategoryState = (data) => {
  return request.put('/mxh-nav/admin/category/state', data)
}

// 删除-分类
export const deleteCategory = (id) => {
  return request.delete('/mxh-nav/admin/category', { params: { id } })
}


// ========== ========== 导航管理 ========== ==========
// 获取-导航
export const getNavigation = (params) => {
  return request.get('/mxh-nav/admin/navigation', { params })
}

// 获取-导航详情
export const getNavigationInfo = (id) => {
  return request.get('/mxh-nav/admin/navigation/info', { params: { id } })
}

// 新增-导航
export const addNavigation = (data) => {
  return request.post('/mxh-nav/admin/navigation', data)
}

// 修改-导航
export const updateNavigation = (data) => {
  return request.put('/mxh-nav/admin/navigation', data)
}

// 修改-导航发布状态
export const updateNavigationState = (data) => {
  return request.put('/mxh-nav/admin/navigation/state', data)
}

// 删除-导航
export const deleteNavigation = (id) => {
  return request.delete('/mxh-nav/admin/navigation', { params: { id } })
}
