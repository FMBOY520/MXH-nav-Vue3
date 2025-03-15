<script setup>
import { ref } from 'vue'
import { Clock } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const routeTo = (key) => router.push(key)
// ========== ========== 导航数据 ========== ==========
import axios from 'axios'
const navigationDataInfo = ref({})
const getNavigationDataInfo = () => {
  axios.get('/json/mxh-nav.json').then(res => {
    navigationDataInfo.value = res.data.data[0].navigation[route.query.id - 1]
    console.log(navigationDataInfo.value)
  })
}
getNavigationDataInfo()
</script>

<template>
  <div class="info">
    <div class="breadcrumb"><span @click="routeTo('/')">首页</span> > 导航详情</div>
    <h1 class="title"><img src="https://www.baidu.com/favicon.ico">百度搜索</h1>
    <div class="time">
      <el-icon>
        <Clock />
      </el-icon>
      <span>发布时间：2025-03-08</span>
    </div>
    <p class="text">百度搜索，什么都可以搜到！</p>
    <div class="functionBtn">
      <el-tooltip content="打开此网站" placement="bottom" :hide-after="0">
        <el-button type="primary">打开网站</el-button>
      </el-tooltip>
      <el-tooltip content="添加网站到我的导航" placement="bottom" :hide-after="0">
        <el-button type="success">添加网站</el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info {
  padding: 0 40px;
  min-height: 100vh;

  .breadcrumb {
    margin: 20px 0;
    color: #eaeaea;
    font-size: 14px;

    span:hover {
      font-weight: 600;
      cursor: pointer;
    }
  }

  .title {
    display: flex;
    align-items: center;
    color: #eaeaea;
    font-size: 25px;

    img {
      margin-right: 10px;
      width: 25px;
    }
  }

  .time {
    display: flex;
    align-items: center;
    height: 40px;
    color: #eaeaea;
    font-size: 14px;
  }

  .text {
    padding: 10px;
    color: #fff;
    font-size: 14px;
    background-color: #ffffff50;
    border-radius: 5px;
  }

  .functionBtn {
    margin: 20px 0;
  }
}
</style>