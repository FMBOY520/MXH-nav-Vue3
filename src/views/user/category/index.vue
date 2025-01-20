<script setup>
import { ref } from 'vue'
import { View, Edit, Delete, Search, RefreshLeft } from '@element-plus/icons-vue'
// 面包屑
import Breadcrumb from '@/components/Breadcrumb.vue'

// 搜索
const searchForm = ref({
  category_name: '',
  state: '',
})
const searchBtn = () => {
  console.log(searchForm.value)
}
const resetBtn = () => {
  searchForm.value.category_name = ''
  searchForm.value.state = ''
}

// 添加分类 和 修改分类
const addCategory = ref(false)
const addCategoryTitle = ref('添加分类')
const addCategoryData = ref({
  id: '',
  category_name: '',
  category_text: '',
})
const addCategoryRules = {
  category_name: [{ required: true, message: '分类名不能为空', trigger: 'blur' },]
}
const addCategoryDataReset = () => {
  addCategoryData.value = {
    id: '',
    category_name: '',
    category_text: '',
  }
}
const addCategoryBtn = (id) => {
  addCategoryDataReset()
  if (id) {
    addCategoryTitle.value = '修改分类'
    console.log(id)
  } else {
    addCategoryTitle.value = '添加分类'
  }
  addCategory.value = true
}
const useAddCategoryBtn = () => {
  console.log(addCategoryData.value)
}

// 批量删除

// 分类数据列表
const categoryDataList = ref([
  { id: 1, category_name: '收藏1', state: '无' },
  { id: 2, category_name: '收藏2', state: '已发布' },
  { id: 3, category_name: '收藏3', state: '已驳回' },
  { id: 4, category_name: '收藏4', state: '待审核' },
])

</script>

<template>
  <!-- 面包屑 -->
  <Breadcrumb :nav="['分类管理']"></Breadcrumb>

  <el-card>
    <!-- 搜索表单 -->
    <el-form class="search-form" :inline="true" :model="searchForm">
      <el-form-item label="分类名称">
        <el-input v-model="searchForm.category_name" placeholder="请输入分类名称" clearable />
      </el-form-item>
      <el-form-item label="分类状态">
        <el-select v-model="searchForm.state" placeholder="请选择分类状态" clearable>
          <el-option label="无" value="无" />
          <el-option label="待审核" value="待审核" />
          <el-option label="已发布" value="已发布" />
          <el-option label="已驳回" value="已驳回" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="searchBtn">搜索</el-button>
        <el-button :icon="RefreshLeft" @click="resetBtn">重置</el-button>
      </el-form-item>
    </el-form>

    <div style="margin-bottom: 10px;">
      <el-button type="primary" @click="addCategoryBtn()">添加分类</el-button>
      <el-button type="danger">批量删除</el-button>
    </div>

    <el-table :data="categoryDataList" style="width: 100%">
      <!-- 多选 -->
      <el-table-column type="selection" width="55" />
      <!-- 分类名称 -->
      <el-table-column label="分类名称" prop="category_name" width="180">
        <template #default="scope">
          <el-tag type="primary" size="large">{{ scope.row.category_name }}</el-tag>
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column label="状态" prop="state" width="180">
        <template #default="scope">
          <span>{{ scope.row.state }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="success" :icon="Edit" circle @click="addCategoryBtn(scope.row.id)" />
          <el-button type="danger" :icon="Delete" circle />
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!-- 添加分类 和 修改分类 -->
  <el-dialog v-model="addCategory" :title="addCategoryTitle" width="500">
    <el-form :model="addCategoryData" :rules="addCategoryRules" label-width="auto" style="max-width: 600px">
      <el-form-item label="分类名" prop="category_name">
        <el-input v-model="addCategoryData.category_name" placeholder="请输入分类名" />
      </el-form-item>
      <el-form-item label="分类说明" prop="category_text">
        <el-input type="textarea" :rows="5" v-model="addCategoryData.category_text" placeholder="请输入分类说明" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addCategory = false">取消</el-button>
        <el-button type="primary" @click="useAddCategoryBtn()">确定</el-button>
      </div>
    </template>
  </el-dialog>

</template>

<style lang="scss" scoped>
.el-card {
  .search-form {
    .el-form-item {
      .el-input {
        width: 200px;
      }

      .el-select {
        width: 200px;
      }
    }
  }
}
</style>