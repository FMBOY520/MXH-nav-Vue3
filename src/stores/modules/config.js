import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('mxh-nav-config', () => {
  // 配置文件
  const server = ref({})
  const setServer = (newServer) => server.value = newServer
  const removeServer = () => server.value = {}

  return { server, setServer, removeServer }
}, {
  persist: true,
})