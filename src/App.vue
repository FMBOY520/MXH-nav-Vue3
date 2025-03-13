<script setup>
// 加载本地配置文件：config.json
import axios from 'axios'
import { useConfigStore } from '@/stores'
const configStore = useConfigStore()
const getConfig = async () => {
  const res = await axios.get('/json/config.json')
  configStore.setServer(res.data.server)
}
getConfig()
</script>

<template>
  <RouterView></RouterView>
</template>