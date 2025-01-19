<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { ArrowRight, Plus, Upload } from '@element-plus/icons-vue'

import DefaultAvatar from '@/assets/img/M.jpg'

import { useUserStore } from '@/stores'
const userStore = useUserStore()

// 头像
const avatarUrl = ref(userStore.info.avatar)
const showUpdateAvatar = ref(false)
const onSelectFile = (uploadFile) => {
  console.log(uploadFile);
  avatarUrl.value = URL.createObjectURL(uploadFile.raw)
}
const uploadAvatar = () => {
  console.log('上传')
  const newInfo = userStore.info
  newInfo.avatar = avatarUrl.value
  ElMessage.success('修改成功！')
  showUpdateAvatar.value = false
}

const data = ref({
  nickname: '肥猫BOY',
  bio: 'hello world ~'
})
</script>

<template>
  <!-- 面包屑 -->
  <el-breadcrumb :separator-icon="ArrowRight"
    style="margin-bottom: 20px;padding: 10px;background-color: #ffffff;border-radius: 4px;box-shadow: var(--el-box-shadow-light);">
    <el-breadcrumb-item :to="{ path: '/user/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>个人中心</el-breadcrumb-item>
    <el-breadcrumb-item>基本资料</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card>
    <!-- 头像 -->
    <el-avatar @click="showUpdateAvatar = true" :size="100" :src="userStore.info.avatar || DefaultAvatar" />
    <el-dialog v-model="showUpdateAvatar" title="修改头像" width="400">
      <el-upload class="avatar-uploader" :auto-upload="false" :show-file-list="false" :on-change="onSelectFile">
        <img class="avatar" v-if="avatarUrl" :src="avatarUrl" />
        <el-icon v-else>
          <Plus />
        </el-icon>
      </el-upload>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showUpdateAvatar = false">取消</el-button>
          <el-button type="warning" @click="uploadAvatar" :icon="Upload">上传</el-button>
        </div>
      </template>
    </el-dialog>

    <el-form label-width="auto">
      <el-form-item label="昵称">
        <el-input v-model="data.nickname" placeholder="请输入用户昵称" />
      </el-form-item>
      <el-form-item label="自我介绍">
        <el-input :rows="5" v-model="data.bio" type="textarea" placeholder="~~~" />
      </el-form-item>
      <el-button type="warning">更新</el-button>
    </el-form>

    <el-divider><span style="color: #606266;font-size: 12px;">更多信息</span></el-divider>
    <p style="color: #606266;font-size: 12px;">注册时间：<span>2025-01-01</span></p>

  </el-card>

</template>

<style lang="scss" scoped>
.el-card {
  .el-avatar {
    position: relative;
  }

  .el-avatar:hover::before {
    content: '修改头像';
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #ffffff;
    background-color: #00000080;
    cursor: pointer;
  }

  .avatar-uploader {
    width: 180px;
    height: 180px;
    border: 2px dashed var(--el-border-color);
    border-radius: 10px;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);

    .avatar {
      width: 180px;
      height: 180px;
    }

    .el-icon {
      width: 180px;
      height: 180px;
      color: #8c939d;
      font-size: 28px;
    }

    .el-icon:hover {
      color: var(--el-color-primary);
    }
  }

  .avatar-uploader:hover {
    border-color: var(--el-color-primary);
  }

  .el-form {
    margin-top: 20px;

    .el-form-item {
      .el-input {
        width: 240px;
      }
    }
  }
}
</style>