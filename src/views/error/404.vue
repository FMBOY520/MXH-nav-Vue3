<script setup>
import { onMounted } from 'vue'
onMounted(() => document.title = '喵星汇-导航 v3 | 404')
</script>

<template>
  <div class="container">
    <div class="box">
      <img src="@/assets/img/logo/smile_50x50.ico" alt="">
      <h2>. . . 资源跑丢了 . . .</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;

  .box {
    padding: 5% 15%;
    text-align: center;
    background-color: #f0f0f0;
    border-radius: 10px;

    img {
      margin: 10px;
      width: 40px;
    }

    h2 {
      color: #555;
      font-size: 20px;
    }
  }
}
</style>