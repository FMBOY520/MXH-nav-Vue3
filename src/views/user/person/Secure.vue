<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
// 面包屑
import Breadcrumb from '@/components/Breadcrumb.vue'

import { useUserStore } from '@/stores'
const userStore = useUserStore()

// 修改用户名
const updateUsername = ref(false)
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
// ---------- 验证码 ----------
const captchaText = ref('获取验证码')
const captchaState = ref(false)
const captchaIndex = ref(30)
const captchaBtn = async () => {
  // 开始发送验证码
  ElMessage.success("发送成功！")
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
      captchaIndex.value = 30  // 重置倒计时
    }
  }, 1000)
}

// 修改邮箱
const updateEmail = ref(false)
const emailData = ref({
  password: '',
  new_email: '',
  verification_code: ''
})
const emailRules = {
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
  ],
  new_email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: '邮箱格式有误', trigger: 'blur' },
  ],
  verification_code: [
    { required: true, message: '邮箱验证码不能为空', trigger: 'blur' },
  ],
}

// 修改密码
const updatePassword = ref(false)
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
</script>

<template>
  <!-- 面包屑 -->
  <Breadcrumb :nav="['个人中心', '账号安全']"></Breadcrumb>

  <el-card>
    <el-form label-width="auto">
      <el-form-item label="用户名">
        <el-input placeholder="用户名" disabled :value="userStore.info.username" />
        <el-button type="primary" link @click="updateUsername = true">修改用户名</el-button>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input placeholder="邮箱" disabled :value="userStore.info.email" />
        <el-button type="primary" @click="updateEmail = true">修改绑定邮箱</el-button>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="密码" disabled value="********" />
        <el-button type="primary" @click="updatePassword = true">修改密码</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <!-- 修改用户名 -->
  <el-dialog v-model="updateUsername" title="修改用户名" width="500">
    <el-form :model="usernameData" :rules="usernameRules" label-width="auto" style="max-width: 600px">
      <el-form-item label="新用户名" prop="username">
        <el-input v-model="usernameData.username" placeholder="请输入新用户名" />
      </el-form-item>
      <el-form-item label="邮箱验证码" prop="verification_code">
        <el-input v-model="usernameData.verification_code" placeholder="请输入邮箱验证码">
          <template #append>
            <el-button :disabled="captchaState" @click="captchaBtn" style="width: 150px;">{{ captchaText }}</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="updateUsername = false">取消</el-button>
        <el-button type="primary" @click="updateUsername = false">修改</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 修改绑定邮箱 -->
  <el-dialog v-model="updateEmail" title="修改绑定邮箱" width="500">
    <el-form :model="emailData" :rules="emailRules" label-width="auto" style="max-width: 600px">
      <el-form-item label="验证密码" prop="password">
        <el-input v-model="emailData.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="新邮箱" prop="new_email">
        <el-input v-model="emailData.new_email" placeholder="请输入新邮箱" />
      </el-form-item>
      <el-form-item label="邮箱验证码" prop="verification_code">
        <el-input v-model="emailData.verification_code" placeholder="请输入邮箱验证码">
          <template #append>
            <el-button :disabled="captchaState" @click="captchaBtn" style="width: 150px;">{{ captchaText }}</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="updateEmail = false">取消</el-button>
        <el-button type="primary" @click="updateEmail = false">修改</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 修改密码 -->
  <el-dialog v-model="updatePassword" title="修改密码" width="500">
    <el-form :model="passwordData" :rules="passwordRules" label-width="auto" style="max-width: 600px">
      <el-form-item label="旧密码" prop="password">
        <el-input v-model="passwordData.password" placeholder="请输入旧密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="new_password">
        <el-input v-model="passwordData.new_password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirm_password">
        <el-input v-model="passwordData.confirm_password" placeholder="请输入确认新密码" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="updatePassword = false">取消</el-button>
        <el-button type="primary" @click="updatePassword = false">修改</el-button>
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