<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { View, Edit, Delete, Search, RefreshLeft } from '@element-plus/icons-vue'
import { getCategory, getCategoryInfo, addCategory, updateCategory, updateCategoryState, deleteCategory } from '@/api/category' // API
import Breadcrumb from '@/components/Breadcrumb.vue' // 面包屑


// ========== 获取-分类 ==========
// 搜索表单数据
const searchForm = ref({ category_name: '', state: '' })
const searchBtn = () => {
  getCategoryData()
}
const resetBtn = () => {
  searchForm.value.category_name = ''
  searchForm.value.state = ''
  getCategoryData()
}
// 分类数据列表
const categoryDataList = ref([])
// 测试数据
// { id: 1, category_name: '收藏1', state: '无' },
// { id: 2, category_name: '收藏2', state: '已发布' },
// { id: 3, category_name: '收藏3', state: '已驳回' },
// { id: 4, category_name: '收藏4', state: '待审核' },
// 获取-分类
const getCategoryData = async () => {
  const res = await getCategory(searchForm.value)
  console.log(res.data)
  categoryDataList.value = res.data.data
}
getCategoryData()
// ========== 获取-分类 ==========


// ========== 获取-分类详情 ==========
const categoryInfoShow = ref(false)
// 分类详情数据
const categoryInfoData = ref({
  id: '1',
  category_name: '收藏1',
  category_text: '分类说明',
  state: '已发布',
  reason: '原因',
  create_time: '2025-01-01 00:00:00',
  update_time: '2025-01-01 00:00:00',
})

const active = ref(0)

const next = () => {
  if (active.value++ > 2) active.value = 0
}

const getCategoryInfoBtn = async (id) => {
  categoryInfoShow.value = true
  console.log(id)
  const res = await getCategoryInfo(id)
  console.log(res.data)
  categoryInfoData.value = res.data.data
}
// ========== 获取-分类详情 ==========


// ========== 新增-分类 和 修改-分类 ==========
const addCategoryShow = ref(false) //显示表单
const addCategoryTitle = ref('添加分类') //表单标题
// 表单数据
const addCategoryData = ref({ id: '', category_name: '', category_text: '', })
const addCategoryRules = {
  category_name: [{ required: true, message: '分类名不能为空', trigger: 'blur' },]
}
const addCategoryDataRef = ref() //获取表单元素
// 重置表单方法
const addCategoryDataReset = () => {
  addCategoryData.value = {
    id: '',
    category_name: '',
    category_text: '',
  }
}
const addCategoryBtn = async (id) => {
  addCategoryDataReset()
  if (id) {
    addCategoryTitle.value = '修改分类'
    const res = await getCategoryInfo(id)
    addCategoryData.value.id = res.data.data.id
    addCategoryData.value.category_name = res.data.data.category_name
    addCategoryData.value.category_text = res.data.data.category_text
  } else {
    addCategoryTitle.value = '添加分类'
  }
  addCategoryShow.value = true
}
const useAddCategoryBtn = () => {
  addCategoryDataRef.value.validate(async (value) => {
    if (value) {
      console.log(addCategoryData.value);
      if (addCategoryTitle.value === '添加分类') {
        const res = await addCategory(addCategoryData.value)
        console.log(res.data)
        ElMessage.success('添加成功！')
        getCategoryData()
        addCategoryShow.value = false
      } else {
        const res = await updateCategory(addCategoryData.value)
        console.log(res.data);
        ElMessage.success('修改成功！')
        getCategoryData()
        addCategoryShow.value = false
      }
    }
  })
}
// ========== 新增-分类 和 修改-分类 ==========


// ========== 修改-分类发布状态 ==========

// ========== 修改-分类发布状态 ==========


// ========== 删除-分类 ==========
const deleteCategoryBtn = (id) => {
  ElMessageBox.confirm('确定删除此分类？', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', }).then(async () => {
    console.log('删除ID：' + id)
    const res = await deleteCategory(id)
    console.log(res.data)
    ElMessage.success('删除成功！')
    getCategoryData()
  }).catch(() => { })
}
// ========== 删除-分类 ==========
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
    </div>

    <el-table :data="categoryDataList" style="width: 100%">
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
          <el-button type="success" size="small" @click="getCategoryInfoBtn(scope.row.id)">查看详情</el-button>
          <el-button type="primary" size="small" @click="addCategoryBtn(scope.row.id)">修改</el-button>
          <el-button type="danger" size="small" @click="deleteCategoryBtn(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!-- 分类详情 -->
  <el-drawer v-model="categoryInfoShow" size="50%" title="分类详情">
    <el-steps style="max-width: 600px" :active="active" finish-status="success">
      <el-step title="申请发布" />
      <el-step title="待审核" />
      <el-step title="已发布" />
    </el-steps>
    <el-button style="margin-top: 12px" @click="next">Next step</el-button>
    <div>
      <p>分类名称：{{ categoryInfoData.category_name }}</p>
      <p>分类说明：{{ categoryInfoData.category_text }}</p>
      <p>状态：{{ categoryInfoData.state }}</p>
      <p>原因：{{ categoryInfoData.reason }}</p>
      <p>创建时间：{{ categoryInfoData.create_time }}</p>
      <p>修改时间：{{ categoryInfoData.update_time }}</p>
    </div>
  </el-drawer>

  <!-- 添加分类 和 修改分类 -->
  <el-dialog v-model="addCategoryShow" :title="addCategoryTitle" width="500">
    <el-form ref="addCategoryDataRef" :model="addCategoryData" :rules="addCategoryRules" label-width="auto"
      style="max-width: 600px">
      <el-form-item label="分类名" prop="category_name">
        <el-input v-model="addCategoryData.category_name" placeholder="请输入分类名" />
      </el-form-item>
      <el-form-item label="分类说明" prop="category_text">
        <el-input type="textarea" :rows="5" v-model="addCategoryData.category_text" placeholder="请输入分类说明" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addCategoryShow = false">取消</el-button>
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