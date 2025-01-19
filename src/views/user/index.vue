<script setup>
import { CaretBottom, User, Lock, SwitchButton } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted } from 'vue'
onMounted(() => document.title = '喵星汇-导航 v3 | 管理后台')

// 默认头像
import DefaultAvatar from '@/assets/img/Avater.png'

import { useUserStore } from '@/stores'
const userStore = useUserStore()

// 侧边菜单栏
import Menu from '@/components/Menu.vue'

// 路由跳转
import router from '@/router'
const routeTo = (key) => router.push(key)

// 退出登录
const logout = () => {
  ElMessageBox.confirm('确定退出登录吗？', {
    confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
  }).then(() => {
    userStore.removeInfo()
    userStore.removeToken()
    routeTo('/login')
    ElMessage.success('退出登录！')
  }).catch(() => { })
}
</script>

<template>
  <el-container class="index">
    <el-aside width="200px">
      <h2 class="title">喵星汇-导航</h2>
      <!-- ---------- 侧边菜单栏 ---------- -->
      <Menu height="92%"></Menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="toolbar">
          <span class="name">{{ userStore.info.nickname ? userStore.info.nickname : userStore.info.email }}</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar :size="35" :src="userStore.info.avatar || DefaultAvatar" />
              <el-icon style="margin-left: 5px;">
                <CaretBottom />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="User" @click="routeTo('/user/person/info')">基本资料</el-dropdown-item>
                <el-dropdown-item :icon="Lock" @click="routeTo('/user/person/secure')">账号安全</el-dropdown-item>
                <el-dropdown-item :icon="SwitchButton" divided @click="logout()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <RouterView></RouterView>
      </el-main>
      <el-footer>
        <div class="copyright">Copyright © 2024-2025 <a href="/" style="color: #409eff;">喵星汇</a></div>
      </el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100vh;

  .el-aside {
    box-shadow: 0 0 10px 0 #00000040;
    transition: .2s;
    z-index: 1;

    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 8%;
      color: #409eff;
      font-size: 16px;
      border-bottom: 1px solid #dedede;
    }
  }

  .el-header {
    display: flex;
    align-items: center;
    height: 45px;
    background-color: #303643;

    .toolbar {
      width: 100%;
      height: 35px;
      text-align: right;

      .name {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 0 10px;
        height: 100%;
        color: #ffffff;
        font-size: 14px;
        font-weight: bold;
      }
    }

    .el-dropdown {
      .el-dropdown-link {
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        cursor: pointer;
      }
    }
  }

  .el-main {
    background-color: #f5f5f5;
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    color: #6c757d;
    font-size: 12px;
    background-color: #f5f5f5;
  }
}
</style>