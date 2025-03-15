<script setup>
import axios from 'axios'
import { ref, onBeforeUnmount } from 'vue'
import SearchModule from './SearchModule.vue' // 搜索模块
import LinkModule from './LinkModule.vue'     // 导航链接模块

// ========== ========== 日期 ========== ==========
import { getDate } from '@/utils/getDate.js'

const date_1 = ref('00:00:00')
const date_2 = ref('0000年00月00日 星期日')
const date_3 = ref('-')
const updateDate = () => {
  date_1.value = `${getDate().hours}:${getDate().minutes}:${getDate().seconds}`
  date_2.value = `${getDate().year}年${getDate().month}月${getDate().date}日 ${getDate().dayOfWeek}`
}
// 更新时间，每秒更新时间
updateDate()
const interval = setInterval(updateDate, 1000)
// 清理定时器
onBeforeUnmount(() => clearInterval(interval))
// 获取-励志短句  喵星汇开发接口地址：https://mxh-open.apifox.cn
axios({ url: 'https://hmajax.itheima.net/api/ambition' }).then(res => { date_3.value = res.data.data })
</script>

<template>
  <div class="main">
    <!-- 日期 -->
    <div class="date">
      <h2 class="text text1">{{ date_1 }}</h2>
      <h4 class="text text2">{{ date_2 }}</h4>
      <h6 class="text text3">{{ date_3 }}</h6>
    </div>

    <!-- 搜索模块 -->
    <SearchModule></SearchModule>
    <!-- 导航链接模块 -->
    <LinkModule></LinkModule>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');

.main {
  width: 100%;
  min-height: 100vh;

  // 日期
  .date {
    color: #fff;
    text-align: center;

    .text {
      color: transparent;
      text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.8), 0px 4px 4px rgba(0, 0, 0, 0.1);
      font-family: 'Quicksand', sans-serif;
    }

    .text.text1 {
      font-size: 60px;
      letter-spacing: .4rem;
    }

    .text.text2 {
      margin: 10px 0;
      font-size: 18px;
      letter-spacing: .2rem;
    }

    .text.text3 {
      margin: 0 auto;
      width: 80%;
      min-width: 300px;
      max-width: 800px;
      font-size: 14px;
    }
  }
}
</style>