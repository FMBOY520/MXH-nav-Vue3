<script setup>
import '@/assets/index.scss'
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>

<template>
  <div class="index Colorful">
    <Header></Header>
    <RouterView></RouterView>
    <Footer></Footer>
  </div>
</template>

<style lang="scss" scoped>
.index {
  min-height: 100vh;
}
</style>