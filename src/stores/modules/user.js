import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('mxh-nav-user', () => {
    // 用户信息
    const info = ref({})
    const setInfo = (newInfo) => info.value = newInfo
    const removeInfo = () => info.value = {}

    // 用户Token
    const token = ref('')
    const setToken = (newToken) => token.value = newToken
    const removeToken = () => token.value = ''

    return { info, setInfo, removeInfo, token, setToken, removeToken }
}, {
    persist: true,
})