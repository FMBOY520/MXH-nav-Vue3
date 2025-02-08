<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'

import { login } from '@/api/login.js'

import { useUserStore } from '@/stores'
const userStore = useUserStore()

const data = ref({
  username: '',
  password: '',
})
const dataRules = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
  ],
}
const dataRef = ref()

// 登录按钮
const loginBtn = () => {
  dataRef.value.validate(async (value) => {
    if (value) {
      const res = await login(data.value)
      console.log(res.data);
      if (res.data.status === 200) {
        userStore.setToken(res.data.token)
        router.push('/user/index')
        ElMessage.success('登录成功')
      } else {
        ElMessage.error('用户名或密码错误！')
      }
    }
  })
}
</script>

<template>
  <div class="login">
    <div class="box">
      <h2 class="title">MXH-LOGIN</h2>
      <el-form ref="dataRef" :model="data" :rules="dataRules">
        <el-form-item prop="username">
          <el-input class="username" v-model="data.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" show-password class="password" v-model="data.password" placeholder="密码" />
        </el-form-item>
      </el-form>
      <button class="btnLogin" @click="loginBtn()">登录</button>
      <div class="account">
        <span>没有账号？<button @click="router.push('/register')">立即注册</button></span>
        <span><button @click="router.push('/reset')">忘记密码？</button></span>
      </div>
      <div class="copyright">
        Copyright © 2024-2025
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
    margin: 20px;
    padding: 20px;
    width: 400px;
    min-width: 300px;
    background-color: #88888850;
    border-radius: 4px;

    .title {
      margin-bottom: 10px;
      text-align: center;
      font-size: 20px;
    }

    .username,
    .password {
      width: 100%;
      height: 40px;
      font-size: 12px;
    }

    .btnLogin {
      margin: 20px 0;
      width: 100%;
      height: 40px;
      font-size: 12px;
      background-color: #f0f0f0;
      border: none;
      border-radius: 4px;
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