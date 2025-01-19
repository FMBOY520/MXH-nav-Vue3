<script setup>
import { ref } from 'vue'
import { View, Edit, Delete } from '@element-plus/icons-vue'

import Breadcrumb from '@/components/Breadcrumb.vue'

const tableData = [
  {
    category: '收藏1',
    state: '无',
  },
  {
    category: '收藏2',
    state: '无',
  },
  {
    category: '收藏3',
    state: '无',
  },
  {
    category: '收藏4',
    state: '无',
  },
]
</script>

<template>
  <!-- 面包屑 -->
  <Breadcrumb :nav="['分类管理']"></Breadcrumb>

  <el-card>
    <el-table :data="tableData" style="width: 100%">
      <!-- 多选 -->
      <el-table-column type="selection" width="55" />
      <!-- 分类名称 -->
      <el-table-column label="分类名称" prop="date" width="180">
        <template #default="scope">
          <el-tag type="primary" size="large">{{ scope.row.category }}</el-tag>
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column label="状态" prop="state" width="180">
        <template #default="scope">
          <span style="margin-right:5px;">{{ scope.row.state }}</span>
          <el-button type="primary" :icon="View" link />
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template #default>
          <el-button type="success" :icon="Edit" circle />
          <el-button type="danger" :icon="Delete" circle />
        </template>
      </el-table-column>
    </el-table>
  </el-card>

</template>

<style lang="scss" scoped></style>