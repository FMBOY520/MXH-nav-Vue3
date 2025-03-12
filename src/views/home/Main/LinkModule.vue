<script setup>
import { ref } from 'vue'
import LinkItem from '@/components/LinkItem.vue'
// 路由跳转
import router from '@/router'
const routeTo = (path, id) => router.push({ path, query: { id } })
// ========== ========== 导航数据 ========== ==========
const navigationDataList = ref([])
const data = [
  {
    category_name: '我的常用',
    navigation: [
      {
        id: 1,
        category_id: 1,
        navigation_name: '百度一下',
        navigation_logo: "https://www.baidu.com/favicon.ico",
        navigation_url: "https://www.baidu.com",
      },
      {
        id: 1,
        category_id: 1,
        navigation_name: '百度翻译',
        navigation_logo: "https://fanyi.baidu.com/favicon.ico",
        navigation_url: "https://fanyi.baidu.com",
      },
      {
        id: 1,
        category_id: 1,
        navigation_name: '哔哩哔哩',
        navigation_logo: "https://www.bilibili.com/favicon.ico",
        navigation_url: "https://www.bilibili.com",
      },
      {
        id: 1,
        category_id: 1,
        navigation_name: 'CSDN',
        navigation_logo: "https://www.csdn.net/favicon.ico",
        navigation_url: "https://www.csdn.net",
      },
    ]
  }
]
const getNavigationDataList = () => {
  navigationDataList.value = data
}
getNavigationDataList()
</script>

<template>
  <div class="module">
    <div class="items" v-for="item in data">
      <h2 class="title">{{ item.category_name }}</h2>
      <div class="item">
        <LinkItem v-for="i in item.navigation" :name="i.navigation_name" :url="i.navigation_url" :logo="i.navigation_logo"></LinkItem>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.module {
  margin: 0 auto;
  width: 80%;
  max-width: 800px;

  .items {
    margin-bottom: 20px;

    .title {
      color: #fff;
      font-size: 16px;
    }

    .item {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>