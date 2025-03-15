<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { User } from '@element-plus/icons-vue'
// 路由跳转
import router from '@/router'
const routeTo = (key) => router.push(key)
import { baseURL } from '@/utils/request.js'
// 默认头像
import DefaultAvatar from '@/assets/img/Avater.png'
// 用户仓库
import { useUserStore } from '@/stores'
const userStore = useUserStore()
// 获取用户基本信息
import { getUserInfo } from '@/api/user'
const onLogin = ref(false)
const userInfo = async () => {
  const res = await getUserInfo()
  console.log(res.data.data)
  if (res.data.status === 200) {
    userStore.setInfo(res.data.data)
    onLogin.value = true
  } else {
    onLogin.value = false
  }
}
userInfo()

// 退出登录
const logout = () => {
  ElMessageBox.confirm('确定退出登录吗？', {
    confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
  }).then(() => {
    userStore.removeInfo()
    userStore.removeToken()
    onLogin.value = false
    ElMessage.success('退出登录！')
  }).catch(() => { })
}


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
  <div class="header">
    <div class="header-nav" ref="HeaderNav">
      <div class="title">
        <div class="logo">
          <img src="/favicon.ico" alt="">
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
        <a href="https://space.bilibili.com/3546629109975913" target="_blank">Bilibili</a>
      </div>

      <div class="user-menu">
        <el-icon size="25">
          <User />
        </el-icon>
        <div class="menu" v-if="onLogin">
          <div class="user">
            <img :src="userStore.info.avatar ? baseURL + userStore.info.avatar : DefaultAvatar">
            <div style="margin: 0 10px;">
              <h4 style="font-size: 14px;">{{ userStore.info.nickname ? userStore.info.nickname : userStore.info.email
              }}</h4>
              <p style="font-size: 12px;">{{ userStore.info.username ? userStore.info.username : userStore.info.email }}
              </p>
            </div>
          </div>
          <div class="btn">
            <el-button type="success" style="width: 100%;" @click="routeTo('/user/index')">管理后台</el-button>
            <el-button type="danger" style="width: 100%;" @click="logout()">退出登录</el-button>
          </div>
        </div>
        <div class="menu" v-else>
          <div class="user">
            <img src="@/assets/icon/user.svg">
            <div style="margin: 0 10px;">
              <h4 style="font-size: 14px;">未登录</h4>
              <p style="font-size: 12px;">登录后即可体验更多功能</p>
            </div>
          </div>
          <div class="btn">
            <el-button type="primary" style="width: 100%;" @click="routeTo('/login')">登录</el-button>
            <el-button type="success" style="width: 100%;" @click="routeTo('/register')">注册</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 回到顶部 -->
    <div class="back-to-top" ref="BackToTop">
      <img src="@/assets/icon/BackToTop.svg" alt="">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;

  .header-nav {
    top: -50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    width: 95%;
    height: 40px;
    background-color: #ffffff50;
    border-radius: 20px;
    backdrop-filter: blur(5px);
    /* 增加阴影效果 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: 1s;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 135px;
      min-width: 135px;
      height: 100%;

      .logo {
        display: inline-block;
        height: 80%;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .name {
        display: inline-block;
        color: #fff;

        h2 {
          font-size: 16px;
          font-family: 'youyuan';
        }

        p {
          font-size: 10px;
          font-family: 'simhei';
          letter-spacing: 2px;
        }
      }
    }

    // ========== 用户 ==========
    .user-menu {
      position: relative;
      display: flex;

      .el-icon {
        color: #ffffff;
        transition: .2s;
        cursor: pointer;
      }

      .el-icon:hover {
        color: #f30ba4;
      }

      // 弹出菜单的样式
      .menu {
        position: absolute;
        top: 40px;
        right: -10px;
        padding: 10px;
        background-color: #ffffff50;
        backdrop-filter: blur(50px);
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // 增加阴影效果
        opacity: 0; // 初始透明度为0
        visibility: hidden; // 初始不可见
        transition: opacity 0.3s ease, visibility 0s 0.3s, z-index 0s 0.3s;

        .user {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          width: 220px;
          // color: #ffffff;

          img {
            width: 50px;
            background-color: #ffffff;
            border-radius: 50%;
          }
        }

        .btn {
          display: flex;
          justify-content: space-between;
          width: 220px;
        }
      }
    }

    /* 悬浮时显示菜单 */
    .user-menu:hover .menu {
      opacity: 1; // 透明度变为1
      visibility: visible; // 设置菜单为可见
      transition: opacity 0.3s ease, visibility 0s, z-index 0s;
    }
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



  .header-nav .nav {
    margin: 0 50px;
    width: 100%;
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