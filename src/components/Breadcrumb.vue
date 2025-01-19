<script setup>
import { ArrowRight } from '@element-plus/icons-vue'

const props = defineProps({
  nav: Array
})
</script>

<template>
  <!-- 面包屑 -->
  <el-breadcrumb :separator-icon="ArrowRight"
    style="margin-bottom: 20px;padding: 10px;background-color: #ffffff;border-radius: 4px;box-shadow: var(--el-box-shadow-light);">
    <el-breadcrumb-item :to="{ path: '/user/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="i in nav">{{ i }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>