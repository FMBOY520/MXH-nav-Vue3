<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, RefreshLeft } from '@element-plus/icons-vue'
import { getCategory, getCategoryInfo, addCategory, updateCategory, updateCategoryState, deleteCategory } from '@/api/category' // API
import Breadcrumb from '@/components/Breadcrumb.vue' // 面包屑


// ========== 获取-分类 ==========
// 加载
const loading = ref(true)
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
  loading.value = true
  const res = await getCategory(searchForm.value)
  console.log(res.data)
  categoryDataList.value = res.data.data
  loading.value = false
}
getCategoryData()
// ========== 获取-分类 ==========


// ========== 获取-分类详情 ==========
const loadingInfo = ref(true)
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
const getCategoryInfoBtn = async (id) => {
  // 显示分类详情
  categoryInfoShow.value = true
  // 开启加载
  loadingInfo.value = true
  // 获取数据
  const res = await getCategoryInfo(id)
  console.log(res.data)
  categoryInfoData.value = res.data.data
  // 加载完毕
  loadingInfo.value = false
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
// 添加按钮 和 修改按钮
const addCategoryBtn = async (id) => {
  // 显示前重置表单
  addCategoryDataReset()
  if (addCategoryDataRef.value) addCategoryDataRef.value.resetFields()
  // 判断 修改/添加
  if (id) {
    addCategoryTitle.value = '修改分类'
    const res = await getCategoryInfo(id)
    addCategoryData.value.id = res.data.data.id
    addCategoryData.value.category_name = res.data.data.category_name
    addCategoryData.value.category_text = res.data.data.category_text
  } else {
    addCategoryTitle.value = '添加分类'
  }
  // 显示表单
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
const categoryStateBtn = (data) => {
  ElMessageBox.confirm('是否确定发布此分类？', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', }).then(async () => {
    console.log(data)
    const res = await updateCategoryState({ id: data.id, reason: '申请发布' })
    console.log(res.data)
    if (res.data.status === 200) {
      ElMessage.success(res.data.message)
    }
    getCategoryData()
    getCategoryInfoBtn(data.id)
  }).catch(() => { })
}
// ========== 修改-分类发布状态 ==========


// ========== 删除-分类 ==========
const deleteCategoryBtn = (id) => {
  ElMessageBox.confirm('确定删除此分类？', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', }).then(async () => {
    console.log('删除ID：' + id)
    const res = await deleteCategory(id)
    console.log(res.data)
    if (res.data.status === 200) {
      ElMessage.success('删除成功！')
    } else {
      ElMessage.error(res.data.message)
    }
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

    <el-table v-loading="loading" :data="categoryDataList" style="width: 100%">
      <!-- 分类名称 -->
      <el-table-column label="分类名称" prop="category_name" width="180">
        <template #default="scope">
          <el-tag type="primary" size="large">{{ scope.row.category_name }}</el-tag>
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column label="状态" prop="state">
        <template #default="scope">
          <span v-if="scope.row.state === '已发布'" style="color: #67c23a;">{{ scope.row.state }}</span>
          <span v-if="scope.row.state === '待审核'" style="color: #e6a23c;">{{ scope.row.state }}</span>
          <span v-if="scope.row.state === '已驳回'" style="color: #f56c6c;">{{ scope.row.state }}</span>
          <span v-if="scope.row.state === '无'">{{ scope.row.state }}</span>
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
    <el-skeleton :loading="loadingInfo" :rows="5" animated>
      <!-- 分类名称 -->
      <h2
        style="padding: 10px 20px;color: #409eff;font-size: 18px;background-color: #ecf5ff;border: 1px solid #d8ebfe;">
        {{ categoryInfoData.category_name }}
      </h2>
      <!-- 分类说明 -->
      <p style="margin: 10px 0;padding: 10px;color: #606266;font-size: 14px;line-height: 20px;
                background-color: #f5f5f5;border: 1px solid #dddddd;">
        <span style="font-weight: bold;">分类说明：</span>
        {{ categoryInfoData.category_text }}
      </p>
      <!-- 分类状态 -->
      <p style="padding: 10px;color: #606266;font-size: 14px;line-height: 20px;
                background-color: #f5f5f5;border: 1px solid #dddddd;">
        <span style="font-weight: bold;">状态：</span>
        <span v-if="categoryInfoData.state === '已发布'" style="color: #67c23a;">{{ categoryInfoData.state }}</span>
        <span v-if="categoryInfoData.state === '待审核'" style="color: #e6a23c;">{{ categoryInfoData.state }}</span>
        <span v-if="categoryInfoData.state === '已驳回'" style="color: #f56c6c;">{{ categoryInfoData.state }}</span>
        <span v-if="categoryInfoData.state === '无'">{{ categoryInfoData.state }}</span>
        <br>
        <span v-if="categoryInfoData.state === '已驳回'" style="color: #f56c6c;">
          <span style="font-weight: bold;">原因：</span>{{ categoryInfoData.reason }}
        </span>
      </p>
      <!-- 时间 -->
      <p style="margin: 10px 0;color: #606266; font-size: 12px;line-height: 20px;">
        创建时间：{{ categoryInfoData.create_time }}<br>修改时间：{{ categoryInfoData.update_time }}
      </p>
      <!-- 发布 -->
      <el-button @click="categoryStateBtn(categoryInfoData)">
        {{ categoryInfoData.state === '已发布' || categoryInfoData.state === '待审核' ? '取消发布' : '发布分类' }}
      </el-button>
    </el-skeleton>
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