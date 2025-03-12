import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  base: './',

  // 服务器配置
  server: {
    port: 8080, // 设置端口号
    host: true, // 监听所有 IP 地址
    open: true, // 启动时自动打开浏览器
    proxy: {
      '/api': {
        target: 'http://localhost:9090', // 代理目标
        changeOrigin: true,                // 修改请求头中的 Origin
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径
      },
    },
  },
})
