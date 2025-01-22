<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
// 面包屑
import Breadcrumb from '@/components/Breadcrumb.vue'

// 用户仓库
import { useUserStore } from '@/stores'
const userStore = useUserStore()

import { getEmailCode } from '@/api/login.js'
import { getUserInfo, updateUsername, updateEmail, updatePassword } from '@/api/user.js'
// 获取用户基本信息
const getInfo = async () => {
  const res = await getUserInfo()
  userStore.setInfo(res.data.data)
}
getInfo()

// 修改用户名
const usernameDialog = ref(false)
const usernameData = ref({
  username: '',
  verification_code: ''
})
const usernameRules = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 5, max: 16, message: '用户名长度必须为 5 ~ 16 位', trigger: 'blur' },
    { pattern: /^[a-zA-Z_][a-zA-Z0-9_]{4,15}$/, message: '用户名必须以字母或下划线开头，且只能包含字母、数字或下划线', trigger: 'blur' },
  ],
  verification_code: [
    { required: true, message: '邮箱验证码不能为空', trigger: 'blur' },
  ],
}
const usernameRef = ref()
// ---------- 验证码 ----------
const usernameCaptchaText = ref('获取验证码')
const usernameCaptchaState = ref(false)
const usernameCaptchaIndex = ref(60)
const usernameCaptchaBtn = async () => {
  // 开始发送验证码
  ElMessage.success("发送成功！")
  usernameCaptchaState.value = true
  usernameCaptchaText.value = `${usernameCaptchaIndex.value} 秒`
  const countdownInterval = setInterval(() => {
    usernameCaptchaIndex.value--
    usernameCaptchaText.value = `${usernameCaptchaIndex.value} 秒`
    // 当倒计时结束
    if (usernameCaptchaIndex.value <= 0) {
      clearInterval(countdownInterval)  // 停止倒计时
      usernameCaptchaText.value = "重新获取验证码"  // 恢复按钮文本
      usernameCaptchaState.value = false  // 重新启用按钮
      usernameCaptchaIndex.value = 60  // 重置倒计时
    }
  }, 1000)

  const res = await getEmailCode({ email: userStore.info.email })
  console.log(res)
  if (res.data.status === 200) {
    ElMessage.success("发送成功！")
  }
}
const usernameShow = () => {
  usernameDialog.value = true
  if (!usernameRef.value) return
  usernameRef.value.resetFields()
}
const usernameUpdateBtn = () => {
  usernameRef.value.validate(async (value) => {
    if (value) {
      const res = await updateUsername(usernameData.value)
      console.log(res.data)
      if (res.data.status === 409) {
        ElMessage.error(res.data.message)
      }
      if (res.data.status === 200) {
        usernameDialog.value = false
        getInfo()
        ElMessage.success("用户名修改成功！")
      } else {
        ElMessage.error("验证码错误！")
      }
    }
  })
}

// 修改邮箱
const emailDialog = ref(false)
const emailData = ref({
  password: '',
  email: '',
  verification_code: ''
})
const emailRules = {
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: '邮箱格式有误', trigger: 'blur' },
  ],
  verification_code: [
    { required: true, message: '邮箱验证码不能为空', trigger: 'blur' },
  ],
}
const emailRef = ref()
// ---------- 验证码 ----------
const emailCaptchaText = ref('获取验证码')
const emailCaptchaState = ref(false)
const emailCaptchaIndex = ref(60)
const emailCaptchaBtn = async () => {
  if (emailData.value.email === '') {
    ElMessage.error("邮箱不能为空！")
    return
  }
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!regex.test(emailData.value.email)) {
    ElMessage.error("邮箱格式不正确！")
    return
  }
  // 开始发送验证码
  ElMessage.success("发送成功！")
  emailCaptchaState.value = true
  emailCaptchaText.value = `${emailCaptchaIndex.value} 秒`
  const countdownInterval = setInterval(() => {
    emailCaptchaIndex.value--
    emailCaptchaText.value = `${emailCaptchaIndex.value} 秒`
    // 当倒计时结束
    if (emailCaptchaIndex.value <= 0) {
      clearInterval(countdownInterval)  // 停止倒计时
      emailCaptchaText.value = "重新获取验证码"  // 恢复按钮文本
      emailCaptchaState.value = false  // 重新启用按钮
      emailCaptchaIndex.value = 60  // 重置倒计时
    }
  }, 1000)

  const res = await getEmailCode({ email: emailData.value.email })
  console.log(res)
  if (res.data.status === 200) {
    ElMessage.success("发送成功！")
  }
}
const emailShow = () => {
  emailDialog.value = true
  if (!emailRef.value) return
  emailRef.value.resetFields()
}
const emailUpdateBtn = () => {
  emailRef.value.validate(async (value) => {
    if (value) {
      const res = await updateEmail(emailData.value)
      console.log(res.data)
      if (res.data.status === 400) {
        ElMessage.error(res.data.message)
      }
      if (res.data.status === 409) {
        ElMessage.error(res.data.message)
      }
      if (res.data.status === 200) {
        emailDialog.value = false
        getInfo()
        ElMessage.success("邮箱修改成功！")
      }
    }
  })
}

// 修改密码
const passwordDialog = ref(false)
const passwordData = ref({
  password: '',
  new_password: '',
  confirm_password: ''
})
const passwordRules = {
  password: [
    { required: true, message: '旧密码不能为空', trigger: 'blur' },
  ],
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
        if (value !== passwordData.value.new_password) {
          callback(new Error('确认密码与新密码不一致'))
        } else {
          callback()
        }
      }, trigger: 'blur',
    },
  ],
}
const passwordRef = ref()
const passwordShow = () => {
  passwordDialog.value = true
  if (!passwordRef.value) return
  passwordRef.value.resetFields()
}
const passwordUpdateBtn = () => {
  passwordRef.value.validate(async (value) => {
    if (value) {
      console.log(passwordData.value);
      const res = await updatePassword(passwordData.value)
      console.log(res.data)
      if (res.data.status === 400) {
        ElMessage.error(res.data.message)
      }
      if (res.data.status === 409) {
        ElMessage.error(res.data.message)
      }
      if (res.data.status === 200) {
        passwordDialog.value = false
        getInfo()
        ElMessage.success("密码修改成功！")
      }
    }
  })
}
</script>

<template>
  <!-- 面包屑 -->
  <Breadcrumb :nav="['个人中心', '账号安全']"></Breadcrumb>

  <el-card>
    <el-form label-width="auto">
      <el-form-item label="用户名">
        <el-input placeholder="用户名" disabled :value="userStore.info.username" />
        <el-button type="primary" link @click="usernameShow()">修改用户名</el-button>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input placeholder="邮箱" disabled :value="userStore.info.email" />
        <el-button type="primary" @click="emailShow()">修改绑定邮箱</el-button>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="密码" disabled value="********" />
        <el-button type="primary" @click="passwordShow()">修改密码</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <!-- 修改用户名 -->
  <el-dialog v-model="usernameDialog" title="修改用户名" width="500">
    <el-form ref="usernameRef" :model="usernameData" :rules="usernameRules" label-width="auto">
      <el-form-item label="新用户名" prop="username">
        <el-input v-model="usernameData.username" placeholder="请输入新用户名" />
      </el-form-item>
      <el-form-item label="邮箱验证码" prop="verification_code">
        <el-input v-model="usernameData.verification_code" placeholder="请输入邮箱验证码">
          <template #append>
            <el-button :disabled="usernameCaptchaState" @click="usernameCaptchaBtn()" style="width: 150px;">
              {{ usernameCaptchaText }}</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="usernameDialog = false">取消</el-button>
        <el-button type="primary" @click="usernameUpdateBtn()">确定</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 修改绑定邮箱 -->
  <el-dialog v-model="emailDialog" title="修改绑定邮箱" width="500">
    <el-form ref="emailRef" :model="emailData" :rules="emailRules" label-width="auto">
      <el-form-item label="验证密码" prop="password">
        <el-input type="password" show-password v-model="emailData.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="新邮箱" prop="email">
        <el-input v-model="emailData.email" placeholder="请输入新邮箱" />
      </el-form-item>
      <el-form-item label="邮箱验证码" prop="verification_code">
        <el-input v-model="emailData.verification_code" placeholder="请输入邮箱验证码">
          <template #append>
            <el-button :disabled="emailCaptchaState" @click="emailCaptchaBtn" style="width: 150px;">
              {{ emailCaptchaText }}</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="emailDialog = false">取消</el-button>
        <el-button type="primary" @click="emailUpdateBtn()">修改</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 修改密码 -->
  <el-dialog v-model="passwordDialog" title="修改密码" width="500">
    <el-form ref="passwordRef" :model="passwordData" :rules="passwordRules" label-width="auto">
      <el-form-item label="旧密码" prop="password">
        <el-input type="password" show-password v-model="passwordData.password" placeholder="请输入旧密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="new_password">
        <el-input type="password" show-password v-model="passwordData.new_password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirm_password">
        <el-input type="password" show-password v-model="passwordData.confirm_password" placeholder="请输入确认新密码" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="passwordDialog = false">取消</el-button>
        <el-button type="primary" @click="passwordUpdateBtn()">修改</el-button>
      </div>
    </template>
  </el-dialog>

</template>

<style lang="scss" scoped>
.el-card {
  .el-form {
    .el-form-item {
      .el-input {
        width: 240px;
      }

      .el-button {
        margin-left: 10px;
      }
    }
  }
}
</style>