import request from '@/utils/request'

// 获取-分类
export const getCategory = (params) => {
    return request.get('/mxh-nav/category', { params })
}

// 获取-分类详情
export const getCategoryInfo = (id) => {
    return request.get('/mxh-nav/category/info', { params: { id } })
}

// 新增-分类
export const addCategory = (data) => {
    return request.post('/mxh-nav/category', data)
}

// 修改-分类
export const updateCategory = (data) => {
    return request.put('/mxh-nav/category', data)
}

// 修改-分类发布状态
export const updateCategoryState = (data) => {
    return request.put('/mxh-nav/category/state', data)
}

// 删除-分类
export const deleteCategory = (id) => {
    return request.delete('/mxh-nav/category', { params: { id } })
}
