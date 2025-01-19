<script setup>
import { ref } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
const username = ref('FMBOY')
const email = ref('FMBOY520@qq.com')
</script>

<template>
  <!-- 面包屑 -->
  <el-breadcrumb :separator-icon="ArrowRight"
    style="margin-bottom: 20px;padding: 10px;background-color: #ffffff;border-radius: 4px;box-shadow: var(--el-box-shadow-light);">
    <el-breadcrumb-item :to="{ path: '/user/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>个人中心</el-breadcrumb-item>
    <el-breadcrumb-item>账号安全</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card>
    <el-form label-width="auto">
      <el-form-item label="用户名">
        <el-input v-model="username" placeholder="用户名" disabled />
        <el-button type="primary" link>修改用户名</el-button>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="email" placeholder="邮箱" disabled />
        <el-button type="primary">修改绑定邮箱</el-button>
      </el-form-item>
      <el-form-item label="密码">
        <el-input value="********" placeholder="密码" disabled />
        <el-button type="primary">修改密码</el-button>
      </el-form-item>
    </el-form>
  </el-card>

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