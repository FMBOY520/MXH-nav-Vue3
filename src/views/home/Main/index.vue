<script setup>
import axios from 'axios'
import { ref, onMounted, onBeforeUnmount } from 'vue'
// 导航链接模块
import LinkModule from './LinkModule.vue'

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


// ========== ========== 搜索 ========== ==========
const search = ref({
  url: 'https://www.baidu.com/s',
  name: 'wd',
  placeholder: '百度一下',
  value: '',
  list: [
    { title: '百度', url: 'https://www.baidu.com/s', placeholder: '百度一下', name: 'wd' },
    { title: 'Bing', url: 'https://cn.bing.com/search', placeholder: '微软Bing搜索', name: 'q' },
    { title: '哔哩哔哩', url: 'https://search.bilibili.com/all', placeholder: 'blbl搜索', name: 'keyword' },
    { title: 'CSDN', url: 'https://so.csdn.net/so/search', placeholder: 'CSDN', name: 'q' },
  ],
})
// 判断搜索方法
const searchBtn = (e) => {
  if (search.value.value.trim()) {
    search.value.value = search.value.value.trim()
  } else {
    alert('输入内容不能为空')
    search.value.value = ''
    e.preventDefault()
  }
}
// 搜索列表切换方法
const searchListBtn = (e) => {
  if (e.target.tagName === 'A') {
    const data = search.value.list.filter(item => item.title === e.target.innerText)
    const { url, placeholder, name } = data[0]
    search.value.url = url
    search.value.placeholder = placeholder
    search.value.name = name
    inpOn()
    document.querySelector('.list-btn-on').classList.remove('list-btn-on')
    e.target.classList.add('list-btn-on')
  }
}
// 自动选中输入框方法
const ss1 = ref(null)
const inpOn = () => ss1.value.focus()
// 进页面自动选中输入框
onMounted(() => inpOn())
// 给搜索列表添加默认高亮（默认第一个高亮）
const search_nav = ref(null)
onMounted(() => {
  search_nav.value.childNodes[1].classList.add('list-btn-on')
})
</script>

<template>
  <div class="main">
    <!-- 日期 -->
    <div class="date">
      <h2 class="text text1">{{ date_1 }}</h2>
      <h4 class="text text2">{{ date_2 }}</h4>
      <h6 class="text text3">{{ date_3 }}</h6>
    </div>

    <!-- 搜索 -->
    <div class="main-search">
      <div class="search_frame">
        <form :action="search.url" target="_blank">
          <input class="ss1" type="text" ref="ss1" :name="search.name" :placeholder="search.placeholder"
            v-model="search.value">
          <button class="ss2" type="submit" @click="searchBtn">搜索</button>
        </form>
      </div>
      <div class="search_nav" ref="search_nav" @click="searchListBtn">
        <a href="javascript:;" v-for="item in search.list">{{ item.title }}</a>
      </div>
    </div>

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

  /* 搜索 */
  .main-search {
    margin: 10px auto;
    width: 80%;
    min-width: 300px;
    max-width: 800px;
    /* background-color: #7a7a7a; */
  }

  .main-search .search_frame {
    width: 100%;
    height: 40px;
    background-color: #ffffff60;
    backdrop-filter: blur(5px);
    border-radius: 10px;
    box-shadow: 0 0 5px 0px #ffffff60;
    overflow: hidden;
  }

  .main-search .search_frame form {
    width: 100%;
    height: 100%;
  }

  .main-search .search_frame .ss1 {
    padding: 0 10px;
    float: left;
    width: 80%;
    height: 100%;
    color: #fff;
    font-size: 16px;
    background-color: #ffffff00;
    outline: none;
    border: none;
  }

  .main-search .search_frame .ss1::placeholder {
    color: #ececec;
    font-size: 14px;
  }

  .main-search .search_frame .ss2 {
    float: right;
    width: 20%;
    height: 100%;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    background-color: #ffffff00;
    border: none;
    border-left: 2px solid #fff;
    transition: .2s;
  }

  .main-search .search_frame .ss2:hover {
    font-size: 16px;
    background-color: #ffffff50;
  }

  .main-search .search_nav {
    margin: 5px 0;
    height: 40px;
    text-align: center;
    background-color: #00000040;
    backdrop-filter: blur(5px);
    border-radius: 10px;

  }

  .main-search a {
    display: inline-block;
    margin: 0 5px;
    width: 60px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    font-size: 14px;
    transition: .2s;
  }

  .main-search a:hover {
    font-size: 13px;
    border-radius: 10px;
    box-shadow: 0 0 4px 0 #ffffff60
  }

  .list-btn-on {
    border-bottom: 2px solid #ff9f00;
  }
}
</style>