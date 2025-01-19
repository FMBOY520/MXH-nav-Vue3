import '@/assets/main.scss'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

app.use(router)
app.use(pinia)
// Element Plus 全局配置+国际化
app.use(ElementPlus, { locale: zhCn })

app.mount('#app')
