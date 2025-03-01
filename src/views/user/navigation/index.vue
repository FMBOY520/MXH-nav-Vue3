<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, RefreshLeft } from '@element-plus/icons-vue'
import { getCategory } from '@/api/category' // API
import { getNavigation, getNavigationInfo, addNavigation, updateNavigation, updateNavigationState, deleteNavigation } from '@/api/navigation' // API
import Breadcrumb from '@/components/Breadcrumb.vue' // 面包屑

// ========== 获取-分类 ==========
// 分类数据列表
// 测试数据
// { id: 1, category_name: '收藏1', state: '无' },
// { id: 2, category_name: '收藏2', state: '已发布' },
// { id: 3, category_name: '收藏3', state: '已驳回' },
// { id: 4, category_name: '收藏4', state: '待审核' },
const categoryDataList = ref([])
const getCategoryData = async () => {
  const res = await getCategory()
  console.log(res.data)
  categoryDataList.value = res.data.data
}
getCategoryData()
// ========== 获取-分类 ==========


// ========== 获取-导航 ==========
// 加载
const loading = ref(true)
// 搜索表单数据
const searchForm = ref({ navigation_name: '', category_id: '', state: '' })
const searchBtn = () => {
  getNavigationData()
}
const resetBtn = () => {
  searchForm.value.navigation_name = ''
  searchForm.value.category_id = ''
  searchForm.value.state = ''
  getNavigationData()
}
// 导航数据列表
const navigationDataList = ref([])
// 测试数据
// { id: 1, category_id: 1, navigation_name: "导航名1", navigation_logo: "图标url", navigation_url: "导航url", state: "已发布" },
// { id: 2, category_id: 2, navigation_name: "导航名2", navigation_logo: "图标url", navigation_url: "导航url", state: "已发布" },
// { id: 3, category_id: 3, navigation_name: "导航名3", navigation_logo: "图标url", navigation_url: "导航url", state: "已发布" },
// { id: 4, category_id: 4, navigation_name: "导航名4", navigation_logo: "图标url", navigation_url: "导航url", state: "已发布" },
const getNavigationData = async () => {
  loading.value = true
  const res = await getNavigation(searchForm.value)
  console.log(res.data)
  navigationDataList.value = res.data.data
  loading.value = false
}
getNavigationData()
// ========== 获取-导航 ==========


// ========== 获取-导航详情 ==========
const loadingInfo = ref(true)
const navigationInfoShow = ref(false)
// 分类详情数据
const navigationInfoData = ref({
  id: '',
  category_id: '',
  navigation_name: '',
  navigation_logo: '',
  navigation_url: '',
  navigation_text: '',
  state: '',
  reason: '',
  create_time: '',
  update_time: '',
})
const getNavigationInfoBtn = async (id) => {
  // 显示导航详情
  navigationInfoShow.value = true
  // 开启加载
  loadingInfo.value = true
  // 获取数据
  const res = await getNavigationInfo(id)
  console.log(res.data)
  navigationInfoData.value = res.data.data
  // 加载完成
  loadingInfo.value = false
}
// ========== 获取-导航详情 ==========


// ========== 新增-导航 和 修改-导航 ==========
// 表单显示
const addNavigationShow = ref(false)
const addNavigationTitle = ref('添加导航')
// 获取表单元素
const addNavigationDataRef = ref()
// 表单数据
const addNavigationData = ref({
  id: '',
  category_id: '',
  navigation_name: '',
  navigation_logo: '',
  navigation_url: '',
  navigation_text: '',
})
// 重置表单数据方法
const addNavigationDataReset = () => {
  addNavigationData.value = {
    id: '',
    category_id: '',
    navigation_name: '',
    navigation_logo: '',
    navigation_url: '',
    navigation_text: '',
  }
}
// 表单数据校验
const addNavigationRules = {
  category_id: [{ required: true, message: '导航分类不能为空', trigger: 'blur' },],
  navigation_name: [{ required: true, message: '导航名不能为空', trigger: 'blur' },],
  navigation_logo: [{ required: true, message: '导航图标不能为空', trigger: 'blur' },],
  navigation_url: [{ required: true, message: '导航地址不能为空', trigger: 'blur' },],
}
// 添加按钮 和 修改按钮
const addNavigationBtn = async (id) => {
  // 显示前重置表单
  addNavigationDataReset()
  if (addNavigationDataRef.value) addNavigationDataRef.value.resetFields()
  // 判断 修改/添加
  if (id) {
    addNavigationTitle.value = '修改导航'
    addNavigationData.value.id = id
    const res = await getNavigationInfo(id)
    addNavigationData.value.id = res.data.data.id
    addNavigationData.value.category_id = res.data.data.category_id
    addNavigationData.value.navigation_name = res.data.data.navigation_name
    addNavigationData.value.navigation_logo = res.data.data.navigation_logo
    addNavigationData.value.navigation_url = res.data.data.navigation_url
    addNavigationData.value.navigation_text = res.data.data.navigation_text
  } else {
    addNavigationTitle.value = '添加导航'
  }
  // 显示表单
  addNavigationShow.value = true
}
const useAddNavigationBtn = () => {
  addNavigationDataRef.value.validate(async (value) => {
    if (value) {
      console.log(addNavigationData.value);
      if (addNavigationTitle.value === '添加导航') {
        console.log('添加导航')
        const res = await addNavigation(addNavigationData.value)
        console.log(res.data)
        ElMessage.success('添加成功！')
        getNavigationData()
        addNavigationShow.value = false
      } else {
        console.log('修改导航')
        const res = await updateNavigation(addNavigationData.value)
        console.log(res.data);
        ElMessage.success('修改成功！')
        getNavigationData()
        addNavigationShow.value = false
      }
    }
  })
}
// ========== 新增-导航 和 修改-导航 ==========


// ========== 修改-导航发布状态 ==========
const navigationStateBtn = (data) => {
  ElMessageBox.confirm('是否确定发布此导航？', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', }).then(async () => {
    console.log(data)
    const res = await updateNavigationState({ id: data.id, reason: '申请发布' })
    console.log(res.data)
    if (res.data.status === 200) {
      ElMessage.success(res.data.message)
    }
    getNavigationData()
    getNavigationInfoBtn(data.id)
  }).catch(() => { })
}
// ========== 修改-导航发布状态 ==========


// ========== 删除-导航 ==========
const deleteNavigationBtn = (id) => {
  ElMessageBox.confirm('确定删除此导航？', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', }).then(async () => {
    console.log('删除ID：' + id)
    const res = await deleteNavigation(id)
    console.log(res.data)
    ElMessage.success('删除成功！')
    getNavigationData()
  }).catch(() => { })
}
// ========== 删除-导航 ==========
</script>

<template>
  <!-- 面包屑 -->
  <Breadcrumb :nav="['导航管理']"></Breadcrumb>

  <el-card>
    <!-- 搜索表单 -->
    <el-form class="search-form" :inline="true" :model="searchForm">
      <el-form-item label="导航名称">
        <el-input v-model="searchForm.navigation_name" placeholder="请输入分类名称" clearable />
      </el-form-item>
      <el-form-item label="导航分类">
        <el-select v-model="searchForm.category_id" placeholder="请选择导航分类" clearable>
          <el-option v-for="item in categoryDataList" :label="item.category_name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="导航状态">
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
      <el-button type="primary" @click="addNavigationBtn()">添加导航</el-button>
    </div>

    <el-table v-loading="loading" :data="navigationDataList" style="width: 100%">
      <!-- 导航名称 -->
      <el-table-column label="导航名称" prop="name" width="180">
        <template #default="scope">
          <div style="display: flex;align-items: center;">
            <img :src="scope.row.navigation_logo" alt="" style="width: 20px;">
            <a :href="scope.row.navigation_url" target="_blank" style="margin: 0 5px;color: #409eff;">
              {{ scope.row.navigation_name }}
            </a>
          </div>
        </template>
      </el-table-column>
      <!-- 导航分类 -->
      <el-table-column label="分类名称" prop="date" width="180">
        <template #default="scope">
          <el-tag v-if="categoryDataList != ''" type="primary" size="large">
            {{categoryDataList.find(i => i.id === scope.row.category_id).category_name}}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 导航状态 -->
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
          <el-button type="success" size="small" @click="getNavigationInfoBtn(scope.row.id)">查看详情</el-button>
          <el-button type="primary" size="small" @click="addNavigationBtn(scope.row.id)">修改</el-button>
          <el-button type="danger" size="small" @click="deleteNavigationBtn(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!-- 导航详情 -->
  <el-drawer v-model="navigationInfoShow" size="50%" title="导航详情">
    <el-skeleton :loading="loadingInfo" :rows="5" animated>
      <!-- 导航名称 -->
      <div style="display: flex;align-items: center;padding: 10px;background-color: #ecf5ff;border: 1px solid #d8ebfe;">
        <img :src="navigationInfoData.navigation_logo" alt="" style="width: 40px;">
        <h2 style="margin-left: 10px;font-size: 25px;">{{ navigationInfoData.navigation_name }}</h2>
      </div>
      <!-- 导航分类 -->
      <el-tag type="primary" size="large" style="margin-top: 10px;">
        {{categoryDataList.find(i => i.id === navigationInfoData.category_id).category_name}}
      </el-tag>
      <!-- 导航说明 -->
      <p style="margin: 10px 0;padding: 10px;color: #606266;font-size: 14px;line-height: 20px;
              background-color: #f5f5f5;border: 1px solid #dddddd;">
        <span style="font-weight: bold;">导航说明：</span>
        {{ navigationInfoData.navigation_text }}
      </p>
      <!-- 导航状态 -->
      <p style="padding: 10px;color: #606266;font-size: 14px;line-height: 20px;
                background-color: #f5f5f5;border: 1px solid #dddddd;">
        <span style="font-weight: bold;">状态：</span>
        <span v-if="navigationInfoData.state === '已发布'" style="color: #67c23a;">{{ navigationInfoData.state }}</span>
        <span v-if="navigationInfoData.state === '待审核'" style="color: #e6a23c;">{{ navigationInfoData.state }}</span>
        <span v-if="navigationInfoData.state === '已驳回'" style="color: #f56c6c;">{{ navigationInfoData.state }}</span>
        <span v-if="navigationInfoData.state === '无'">{{ navigationInfoData.state }}</span>
        <br>
        <span v-if="navigationInfoData.state === '已驳回'" style="color: #f56c6c;">
          <span style="font-weight: bold;">原因：</span>{{ navigationInfoData.reason }}
        </span>
      </p>
      <!-- 时间 -->
      <p style="margin: 10px 0;color: #606266; font-size: 12px;line-height: 20px;">
        创建时间：{{ navigationInfoData.create_time }}<br>修改时间：{{ navigationInfoData.update_time }}
      </p>
      <!-- 访问导航 -->
      <a :href="navigationInfoData.navigation_url" target="_blank" style="margin-right: 10px;">
        <el-button type="success">访问导航</el-button>
      </a>
      <!-- 发布 -->
      <el-button @click="navigationStateBtn(navigationInfoData)">
        {{ navigationInfoData.state === '已发布' || navigationInfoData.state === '待审核' ? '取消发布' : '发布导航' }}
      </el-button>
    </el-skeleton>
  </el-drawer>

  <!-- 添加分类 和 修改分类 -->
  <el-dialog v-model="addNavigationShow" :title="addNavigationTitle" width="500">
    <el-form ref="addNavigationDataRef" :model="addNavigationData" :rules="addNavigationRules" label-width="auto"
      style="max-width: 600px">
      <el-form-item label="导航分类" prop="category_id">
        <el-select v-model="addNavigationData.category_id" placeholder="请选择导航分类" clearable>
          <el-option v-for="item in categoryDataList" :label="item.category_name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="导航名" prop="navigation_name">
        <el-input v-model="addNavigationData.navigation_name" placeholder="请输入导航名" />
      </el-form-item>
      <el-form-item label="导航图标" prop="navigation_logo">
        <el-input v-model="addNavigationData.navigation_logo" placeholder="请输入导航图标的URL" />
      </el-form-item>
      <el-form-item label="导航地址" prop="navigation_url">
        <el-input v-model="addNavigationData.navigation_url" placeholder="请输入导航地址的URL" />
      </el-form-item>
      <el-form-item label="导航说明" prop="navigation_text">
        <el-input type="textarea" :rows="5" v-model="addNavigationData.navigation_text" placeholder="请输入导航说明" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addNavigationShow = false">取消</el-button>
        <el-button type="primary" @click="useAddNavigationBtn()">确定</el-button>
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