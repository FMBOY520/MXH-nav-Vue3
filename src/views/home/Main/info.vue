<script setup>
// 路由跳转
import router from '@/router'
const routeTo = (key) => router.push(key)
</script>

<template>
  <div class="info">
    <div class="breadcrumb"><span @click="routeTo('/')">首页</span> > 导航详情</div>
    <h1 class="title">百度搜索</h1>
    <p>发布时间：2025-03-08</p>
    <p>百度搜索，什么都可以搜到！</p>
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
    color: #eaeaea;
    font-size: 25px;
  }
}
</style>