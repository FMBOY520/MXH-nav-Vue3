<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'

const data = ref({
  username: '',
  password: '',
})

const loginBtn = async () => {
  ElMessage.success('登录成功')
  router.push('/user/index')
}
</script>

<template>
  <div class="login">
    <div class="box">
      <h2 class="title">MXH-LOGIN</h2>
      <input class="username" v-model="data.username" type="username" placeholder="用户名">
      <input class="password" v-model="data.password" type="password" placeholder="密码">
      <button class="btnLogin" @click="loginBtn">登录</button>
      <div class="account">
        <span>没有账号？<button @click="router.push('/register')">立即注册</button></span>
        <span><button @click="router.push('/reset')">忘记密码？</button></span>
      </div>
      <div class="copyright">
        Copyright © 2024-2024
        <a href="/" style="color: #409eff;">喵星汇</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;

  .box {
    padding: 20px;
    width: 400px;
    min-width: 300px;
    background-color: #88888850;

    .title {
      margin: 10px 0;
      text-align: center;
      font-size: 20px;
    }

    .username,
    .password {
      margin: 10px 0;
      padding: 0 10px;
      width: 100%;
      height: 40px;
      font-size: 12px;
      border: none;
      outline: none;
    }

    .btnLogin {
      margin: 20px 0;
      width: 100%;
      height: 40px;
      font-size: 12px;
      background-color: #f0f0f0;
      border: none;
      transition: .2s;
      cursor: pointer;
    }

    .btnLogin:hover {
      background-color: #fcfcfc;
    }

    .account {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;

      button {
        color: #1f75cb;
        font-size: 12px;
        background-color: #ffffff00;
        border: none;
        cursor: pointer;
      }
    }

    .copyright {
      margin-top: 20px;
      width: 100%;
      color: #6c757d;
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>