<script setup>
import { ref, onMounted } from 'vue'

const HeaderNav = ref(null)
const BackToTop = ref(null)

// 导航栏悬浮功能
const navFixed = () => {
  // 获取导航栏元素
  const header = HeaderNav.value
  // 监听滚动事件
  window.onscroll = function () {
    // 滚动超过100px时，添加浮动效果
    if (window.scrollY > 40) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
    // 滚动超过 200px 时显示按钮
    if (window.scrollY > 200) {
      backToTopBtn.style.display = "flex";
    } else {
      backToTopBtn.style.display = "none";
    }
  }
  // 获取回到顶部按钮元素
  const backToTopBtn = BackToTop.value
  // 点击按钮回到顶部
  backToTopBtn.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // 平滑滚动
    });
  }
}
onMounted(() => navFixed())
</script>

<template>
  <header>
    <div class="header-nav" ref="HeaderNav">
      <div class="title">
        <div class="logo">
          <img src="@/assets/img/logo/logo.png" alt="">
        </div>
        <div class="name">
          <h2>喵星汇-导航</h2>
          <p>mxh.fmboy.com</p>
        </div>
      </div>

      <div class="nav">
        <a href="https://gitee.com/FMBOY" target="_blank">Gitee</a>
        <a href="https://github.com/FMBOY520" target="_blank">GitHub</a>
        <a href="https://blog.csdn.net/m0_74175846" target="_blank">CSDN</a>
        <a href="https://mxh.fmboy.com/web/AI" target="_blank">AI</a>
      </div>
    </div>

    <!-- 回到顶部 -->
    <div class="back-to-top" ref="BackToTop">
      <img src="@/assets/icon/BackToTop.svg" alt="">
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;

  .header-nav {
    top: -50px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    width: 95%;
    height: 40px;
    background-color: #ffffff50;
    border-radius: 20px;
    backdrop-filter: blur(5px);
    /* 增加阴影效果 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: 1s;
  }

  .header-nav.fixed {
    position: fixed;
    top: 0;
    margin: 0;
    width: 100%;
    border-radius: 0;
    backdrop-filter: blur(50px);
    z-index: 10;
  }

  .header-nav .title {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 135px;
    min-width: 135px;
    height: 100%;
  }

  .header-nav .title .logo {
    display: inline-block;
    height: 80%;
  }

  .header-nav .title .logo img {
    width: 100%;
    height: 100%;
  }

  .header-nav .title .name {
    display: inline-block;
    color: #fff;
  }

  .header-nav .title .name h2 {
    font-size: 16px;
    font-family: 'youyuan';
  }

  .header-nav .title .name p {
    font-size: 10px;
    font-family: 'simhei';
    letter-spacing: 2px;
  }

  .header-nav .nav {
    margin: 0 50px;
  }

  .header-nav .nav a {
    margin: 0 10px;
    color: #fff;
    font-size: 14px;
    font-family: 'Quicksand', sans-serif;
    transition: .2s;
  }

  .header-nav .nav a:hover {
    color: #f30ba4;
    font-weight: bold;
  }


  @media (max-width: 600px) {
    .header-nav .title {
      margin: 0 auto;
    }

    .header-nav .nav {
      display: none;
    }
  }

  .back-to-top {
    position: fixed;
    right: 20px;
    bottom: 40px;

    display: none;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;
    background-color: #00000040;
    border-radius: 10px;

    transition: .2s;

    /* 鼠标悬浮变小手 */
    cursor: pointer;
  }

  .back-to-top:hover {
    background-color: #ffffff40;
    box-shadow: 0 0 10px 1px #ffffff50;
  }
}
</style>