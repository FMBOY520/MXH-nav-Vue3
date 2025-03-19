<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'

import { getEmailCode, resetPassword } from '@/api/login.js'

const data = ref({
  new_password: '',
  confirm_password: '',
  email: '',
  verification_code: '',
})
const dataRules = {
  new_password: [
    { required: true, message: '新密码不能为空', trigger: 'blur' },
    { min: 6, max: 32, message: '密码长度必须为 6 ~ 32 位', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_@!.]{6,32}$/, message: '密码仅能包含字母、数字以及 _ @ ! .', trigger: 'blur' },
  ],
  confirm_password: [
    { required: true, message: '确认新密码不能为空', trigger: 'blur' },
    { min: 6, max: 32, message: '密码长度必须为 6 ~ 32 位', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_@!.]{6,32}$/, message: '密码仅能包含字母、数字以及 _ @ ! .', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== data.value.new_password) {
          callback(new Error('两次密码输入不一致'))
        } else {
          callback()
        }
      }, trigger: 'blur',
    },
  ],
  email: [
    { required: true, message: '绑定的邮箱不能为空', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: '邮箱格式有误', trigger: 'blur' },
  ],
  verification_code: [
    { required: true, message: '邮箱验证码不能为空', trigger: 'blur' },
  ],
}
const dataRef = ref()

// ---------- 验证码 ----------
const captchaText = ref('获取验证码')
const captchaState = ref(false)
const captchaIndex = ref(60)
const captchaBtn = async () => {
  if (data.value.email === '') {
    ElMessage.error("邮箱不能为空！")
    return
  }
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!regex.test(data.value.email)) {
    ElMessage.error("邮箱格式不正确！")
    return
  }
  // 开始发送验证码
  captchaState.value = true
  captchaText.value = `${captchaIndex.value} 秒`
  const countdownInterval = setInterval(() => {
    captchaIndex.value--
    captchaText.value = `${captchaIndex.value} 秒`
    // 当倒计时结束
    if (captchaIndex.value <= 0) {
      clearInterval(countdownInterval)  // 停止倒计时
      captchaText.value = "重新获取验证码"  // 恢复按钮文本
      captchaState.value = false  // 重新启用按钮
      captchaIndex.value = 60  // 重置倒计时
    }
  }, 1000)

  const res = await getEmailCode({ email: data.value.email })
  console.log(res)
  if (res.data.status === 200) {
    ElMessage.success("发送成功！")
  }
}

const resetPasswordBtn = () => {
  dataRef.value.validate(async (value) => {
    if (value) {
      const res = await resetPassword(data.value)
      console.log(res.data);
      if (res.data.status === 400) {
        ElMessage.error(res.data.message)
        return
      }
      if (res.data.status === 404) {
        ElMessage.error(res.data.message)
        return
      }
      if (res.data.status === 200) {
        ElMessage.success("重置密码成功！")
        router.push('/login')
        return
      }
    }
  })
}
</script>

<template>
  <h2 class="title">MXH-RESET</h2>
  <el-form ref="dataRef" :model="data" :rules="dataRules">
    <el-form-item prop="new_password">
      <el-input v-model="data.new_password" placeholder="新密码" type="password" show-password />
    </el-form-item>
    <el-form-item prop="confirm_password">
      <el-input v-model="data.confirm_password" placeholder="确认新密码" type="password" show-password />
    </el-form-item>
    <el-form-item prop="email">
      <el-input v-model="data.email" placeholder="绑定的邮箱" />
    </el-form-item>
    <el-form-item prop="verification_code">
      <el-input v-model="data.verification_code" placeholder="邮箱验证码">
        <template #append>
          <el-button :disabled="captchaState" @click="captchaBtn()">{{ captchaText }}</el-button>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <el-button class="btnLogin" @click="resetPasswordBtn()">重置密码</el-button>
  <div class="account">
    <span>想起来了？<el-button type="primary" size="small" link @click="router.push('/login')">去登录</el-button></span>
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

    .el-button {
      width: 100px;
    }
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