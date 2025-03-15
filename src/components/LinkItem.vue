<script setup>
import { ArrowRightBold } from '@element-plus/icons-vue'
// 路由跳转
import router from '@/router'
const routeTo = (path, id) => router.push({ path, query: { id } })

const props = defineProps({
  id: Number,
  object: {
    type: Object,
    default: {
      name: '百度一下',
      logo: "https://www.baidu.com/favicon.ico",
      url: "https://www.baidu.com",
    }
  },
})
</script>

<template>
  <div class="link-item">
    <a class="link" target="_blank" :title="object.name" :href="object.url">
      <img :src="object.logo">
      <p>{{ object.name }}</p>
    </a>
    <div class="info">
      <el-tooltip content="导航详情" placement="right" :hide-after="0">
        <el-button @click="routeTo('/info', id)" :icon="ArrowRightBold" size="small" circle />
      </el-tooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.link-item {
  position: relative;
  display: flex;
  margin: 5px;
  width: 150px;
  transition: .2s;

  .link {
    padding: 10px;
    width: 100%;
    background-color: #ffffff60;
    border-radius: 10px;
    box-shadow: 0 0 10px -5px #000;
    overflow: hidden;
    transition: .2s;

    img {
      display: block;
      margin: auto;
      padding: 8px;
      width: 40px;
      height: 40px;
      background-color: #ffffff99;
      border-radius: 8px;
    }

    p {
      margin-top: 5px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-family: '楷体';
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .info {
    position: absolute;
    right: 0;
    display: none;
    align-items: center;
    width: 20px;
    height: 100%;
  }
}

.link-item:hover {
  .link {
    background-color: #ffffff95;
    box-shadow: 0 0 10px 0 #fff;
    transform: scale(.95);
  }

  .info {
    display: flex;
  }
}

@media (max-width: 650px) {
  .link-item {
    width: 30%;
  }
}

@media (max-width: 400px) {
  .link-item {
    width: 45%;
  }
}
</style>