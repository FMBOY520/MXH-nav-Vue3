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
      console.log(res.data)
      if (res.data.status === 200) {
        userStore.setToken(res.data.token)
        router.push('/')
        ElMessage.success('登录成功')
      } else {
        ElMessage.error('用户名或密码错误！')
      }
    }
  })
}
</script>

<template>
  <h2 class="title">MXH-LOGIN</h2>
  <el-form ref="dataRef" :model="data" :rules="dataRules">
    <el-form-item prop="username">
      <el-input v-model="data.username" placeholder="用户名" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="data.password" placeholder="密码" type="password" show-password />
    </el-form-item>
  </el-form>
  <el-button class="btnLogin" @click="loginBtn()">登录</el-button>
  <div class="account">
    <span>没有账号？<el-button type="primary" size="small" link @click="router.push('/register')">立即注册</el-button></span>
    <el-button type="primary" size="small" link @click="router.push('/reset')">忘记密码？</el-button>
  </div>
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 10px;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  text-shadow: 0 0 5px #fff;
}

.el-form {
  .el-input {
    height: 40px;
    font-size: 12px;
  }
}

.btnLogin {
  margin: 20px 0;
  width: 100%;
  height: 40px;
  font-size: 12px;
}

.account {
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    display: flex;
    align-items: center;
    font-size: 12px;
  }
}
</style>