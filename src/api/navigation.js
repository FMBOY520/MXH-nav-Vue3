import request from '@/utils/request'

// 获取-导航
export const getNavigation = (params) => {
    return request.get('/mxh-nav/navigation', { params })
}

// 获取-导航详情
export const getNavigationInfo = (id) => {
    return request.get('/mxh-nav/navigation/info', { params: { id } })
}

// 新增-导航
export const addNavigation = (data) => {
    return request.post('/mxh-nav/navigation', data)
}

// 修改-导航
export const updateNavigation = (data) => {
    return request.put('/mxh-nav/navigation', data)
}

// 修改-导航发布状态
export const updateNavigationState = (data) => {
    return request.put('/mxh-nav/navigation/state', data)
}

// 删除-导航
export const deleteNavigation = (id) => {
    return request.delete('/mxh-nav/navigation', { params: { id } })
}
