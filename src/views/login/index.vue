<script setup>
import '@/assets/index.scss'
import Header from '../home/Header.vue'
</script>

<template>
  <div class="index Colorful">
    <Header></Header>
    <div class="login">
      <div class="box">
        <RouterView></RouterView>
        <div class="copyright">Copyright © 2024-2025 <a href="/" style="color: #409eff;">喵星汇</a></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.index {
  min-height: 100vh;

  .login {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80vh;

    .box {
      margin: 20px;
      padding: 20px;
      width: 400px;
      min-width: 300px;
      background-color: #ffffff50;
      border-radius: 10px;

      .copyright {
        margin-top: 20px;
        width: 100%;
        color: #6c757d;
        font-size: 12px;
        text-align: center;
      }
    }
  }
}
</style>