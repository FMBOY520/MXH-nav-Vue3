<script setup>
import { ref, onMounted } from 'vue'
import { ElNotification } from 'element-plus'
const searchNav = ref({
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
  if (searchNav.value.value.trim()) {
    searchNav.value.value = searchNav.value.value.trim()
  } else {
    ElNotification.error({ message: '输入内容不能为空', showClose: false, duration: 2000 })
    searchNav.value.value = ''
    e.preventDefault()
  }
}

// 搜索列表切换方法
const searchListBtn = (e) => {
  if (e.target.tagName === 'A') {
    const data = searchNav.value.list.filter(item => item.title === e.target.innerText)
    const { url, placeholder, name } = data[0]
    searchNav.value.url = url
    searchNav.value.placeholder = placeholder
    searchNav.value.name = name
    document.querySelector('.list-btn-on').classList.remove('list-btn-on')
    e.target.classList.add('list-btn-on')
  }
}
// 给搜索列表添加默认高亮（默认第一个高亮）
const search_nav = ref(null)
onMounted(() => search_nav.value.childNodes[1].classList.add('list-btn-on'))
</script>

<template>
  <div class="module">
    <div class="search_frame">
      <form :action="searchNav.url" target="_blank">
        <input :name="searchNav.name" :placeholder="searchNav.placeholder" v-model="searchNav.value">
        <button type="submit" @click="searchBtn">搜索</button>
      </form>
    </div>
    <div class="search_nav" ref="search_nav" @click="searchListBtn">
      <a href="javascript:;" v-for="item in searchNav.list">{{ item.title }}</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.module {
  margin: 10px auto;
  width: 80%;
  min-width: 300px;
  max-width: 800px;

  .search_frame {
    width: 100%;
    height: 40px;
    background-color: #ffffff60;
    backdrop-filter: blur(5px);
    border-radius: 10px;
    box-shadow: 0 0 5px 0px #ffffff60;
    overflow: hidden;

    form {
      width: 100%;
      height: 100%;

      input {
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

      input::placeholder {
        color: #ececec;
        font-size: 14px;
      }

      button {
        float: right;
        width: 20%;
        height: 100%;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        background-color: #ffffff00;
        border: none;
        border-left: 1px solid #fff;
        transition: .2s;
      }

      button:hover {
        font-size: 16px;
        background-color: #ffffff50;
      }
    }
  }

  .search_nav {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin: 4px 0;
    padding: 4px 0;
    min-height: 25px;
    background-color: #00000020;
    backdrop-filter: blur(50px);
    border-radius: 5px;

    a {
      padding: 2px 10px;
      color: #fff;
      font-size: 14px;
      border-radius: 50px;
      transition: .2s;
    }

    a:hover {
      box-shadow: 0 0 4px 0 #ffffff60;
    }

    .list-btn-on {
      background-color: #ffffff50;
    }
  }
}
</style>