<script setup>
import { Avatar, Histogram, HomeFilled, Lock, Menu, User, UserFilled, View } from '@element-plus/icons-vue'

const props = defineProps({
  height: String,
})
</script>

<template>
  <el-scrollbar :style="{ height }">
    <el-menu :default-active="$route.path" :router="true">

      <el-menu-item index="/user/index">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/user/category">
        <el-icon><Menu></Menu></el-icon>
        <span>分类管理</span>
      </el-menu-item>
      <el-menu-item index="/user/navigation">
        <el-icon><Histogram /></el-icon>
        <span>导航管理</span>
      </el-menu-item>

      <el-sub-menu index="4">
        <template #title>
          <el-icon><UserFilled /></el-icon>
          <span>个人中心</span>
        </template>
        <el-menu-item index="/user/person/info">
          <el-icon><User /></el-icon>
          <span>基本资料</span>
        </el-menu-item>
        <el-menu-item index="/user/person/secure">
          <el-icon><Lock /></el-icon>
          <span>账号安全</span>
        </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="5" v-if="true">
        <template #title>
          <el-icon><Avatar /></el-icon>
          <span>管理员</span>
        </template>
        <el-menu-item index="/admin/navigation">
          <el-icon><View /></el-icon>
          <span>审核管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/user">
          <el-icon><View /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/category">
          <el-icon><View /></el-icon>
          <span>分类管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/navigation">
          <el-icon><View /></el-icon>
          <span>导航管理</span>
        </el-menu-item>
       
      </el-sub-menu>

    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.el-scrollbar {
  .el-menu {
    border: none;
  }
}
</style>