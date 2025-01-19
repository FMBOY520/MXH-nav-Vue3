<script setup>
import { ref } from 'vue'

// 面包屑
import Breadcrumb from '@/components/Breadcrumb.vue'

const tableData = [
  {
    name: '导航1',
    category: '收藏1',
    date: '2016-05-03',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    name: '导航2',
    category: '收藏2',
    date: '2016-05-02',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    name: '导航3',
    category: '收藏3',
    date: '2016-05-04',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    name: '导航4',
    category: '收藏4',
    date: '2016-05-01',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const activeName = ref('myNav')
const handleClick = (tab, event) => {
  console.log(tab, event)
}

</script>

<template>
  <!-- 面包屑 -->
  <Breadcrumb :nav="['导航管理']"></Breadcrumb>

  <el-card>
    <el-tabs type="card" v-model="activeName" class="demo-tabs" @tab-click="handleClick">

      <el-tab-pane label="我的导航" name="myNav">
        <el-table :data="tableData" style="width: 100%">
          <!-- 多选 -->
          <el-table-column type="selection" width="55" />
          <!-- 导航名称 -->
          <el-table-column label="导航名称" prop="name" width="180" />
          <!-- 导航分类 -->
          <el-table-column label="分类名称" prop="date" width="180">
            <template #default="scope">
              <el-tag type="primary" size="large">{{ scope.row.category }}</el-tag>
            </template>
          </el-table-column>
          <!-- 功能 -->
          <el-table-column label="功能">
            <template #default>
              <el-button type="success" size="small">访问</el-button>
              <el-button type="success" size="small">查看详情</el-button>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template #default>
              <el-button type="primary" size="small">修改</el-button>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="已发布导航" name="second">
        <el-table :data="tableData" style="width: 100%">
          <!-- 导航名称 -->
          <el-table-column label="导航名称" prop="name" width="180" />
          <!-- 导航分类 -->
          <el-table-column label="分类名称" prop="date" width="180">
            <template #default="scope">
              <el-tag type="primary" size="large">{{ scope.row.category }}</el-tag>
            </template>
          </el-table-column>
          <!-- 功能 -->
          <el-table-column label="功能">
            <template #default>
              <el-button type="success" size="small">访问</el-button>
              <el-button type="success" size="small">查看详情</el-button>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template #default>
              <el-button type="warning" size="small">撤销发布</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

    </el-tabs>
  </el-card>
</template>

<style lang="scss" scoped></style>