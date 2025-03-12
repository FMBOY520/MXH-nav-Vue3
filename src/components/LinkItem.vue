<script setup>
const props = defineProps({
  name: { type: String, default: '百度一下' },
  url: { type: String, default: 'https://www.baidu.com' },
  logo: { type: String, default: 'https://www.baidu.com/favicon.ico' },
})
</script>

<template>
  <a class="link" target="_blank" title="子模块" :href="url">
    <img :src="logo">
    <p>{{ name }}</p>
  </a>
</template>

<style lang="scss" scoped>
.link {
  display: inline-block;
  margin: 5px;
  padding: 10px;
  width: 150px;
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

.link:hover {
  background-color: #ffffff95;
  box-shadow: 0 0 10px 0 #fff;
  transform: scale(.95);
}

@media (max-width: 650px) {
  .link {
    width: 30%;
  }
}

@media (max-width: 400px) {
  .link {
    width: 45%;
  }
}
</style>