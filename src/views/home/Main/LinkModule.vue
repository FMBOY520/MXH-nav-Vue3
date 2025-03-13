<script setup>
import { ref } from 'vue'
import LinkItem from '@/components/LinkItem.vue'
// ========== ========== 导航数据 ========== ==========
import axios from 'axios'
const navigationDataList = ref([])
const getNavigationDataList = () => {
  axios.get('/json/mxh-nav.json').then(res => {
    navigationDataList.value = res.data.data
  })
}
getNavigationDataList()
</script>

<template>
  <div class="module">
    <div class="items" v-for="item in navigationDataList">
      <h2 class="title">{{ item.category_name }}</h2>
      <div class="item">
        <LinkItem v-for="i in item.navigation" :id="i.id" :object="i"></LinkItem>
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