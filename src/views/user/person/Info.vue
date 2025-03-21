<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Upload } from '@element-plus/icons-vue'

// 用户仓库
import { useUserStore } from '@/stores'
const userStore = useUserStore()

import { getUserInfo, updateAvatar, updateInfo } from '@/api/user.js'
// 获取用户基本信息
const getInfo = async () => {
  const res = await getUserInfo()
  userStore.setInfo(res.data.data)
}
getInfo()

// 面包屑
import Breadcrumb from '@/components/Breadcrumb.vue'

// 默认头像
import DefaultAvatar from '@/assets/img/Avater.png'

import { baseURL } from '@/utils/request.js'

// 头像上传
const avatarUrl = ref(userStore.info.avatar ? baseURL + userStore.info.avatar : null)
const avatarFile = ref()
const showUpdateAvatar = ref(false)
const onSelectFile = (uploadFile) => {
  // 头像回写
  avatarUrl.value = URL.createObjectURL(uploadFile.raw)
  // 创建File
  const formData = new FormData()
  formData.append('avatar', uploadFile.raw)
  avatarFile.value = formData
}
const uploadAvatar = async () => {
  const res = await updateAvatar(avatarFile.value)
  if (res.data.status === 200) {
    getInfo()
    ElMessage.success('修改成功！')
    showUpdateAvatar.value = false
  }
}
const updateAvatarShow = () => {
  avatarUrl.value = userStore.info.avatar ? baseURL + userStore.info.avatar : null
  showUpdateAvatar.value = true
}

// 用户基本资料
const data = ref({
  nickname: userStore.info.nickname,
  bio: userStore.info.bio,
})
const updateInfoBtn = async () => {
  const res = await updateInfo(data.value)
  // console.log(res.data)
  if (res.data.status === 200) {
    getInfo()
    ElMessage.success('更新成功！')
  }
}
</script>

<template>
  <!-- 面包屑 -->
  <Breadcrumb :nav="['个人中心', '基本资料']"></Breadcrumb>

  <el-card>
    <!-- 头像 -->
    <el-avatar @click="updateAvatarShow()" :size="100"
      :src="userStore.info.avatar ? baseURL + userStore.info.avatar : DefaultAvatar" />
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
      <el-button type="warning" @click="updateInfoBtn()">更新</el-button>
    </el-form>

    <el-divider><span style="color: #606266;font-size: 12px;">更多信息</span></el-divider>
    <p style="color: #606266;font-size: 12px;">注册时间：<span>{{ userStore.info.create_time.split('T')[0] }}</span></p>

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