<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, RefreshLeft } from '@element-plus/icons-vue'
import { MoreFilled } from '@element-plus/icons-vue'
import Breadcrumb from '@/components/Breadcrumb.vue' // 面包屑
import { getUserList, getUserInfo, addUser, updateUser, updateUserPassword, updateUserRole, deleteUser } from '@/api/admin' // API
import { baseURL } from '@/utils/request.js'
import DefaultAvatar from '@/assets/img/Avater.png' // 默认头像

// 搜索表单数据
const searchForm = ref({ username: '', email: '' })
const searchBtn = () => {
  getUser()
}
const resetBtn = () => {
  searchForm.value.username = ''
  searchForm.value.email = ''
  getUser()
}
// 用户数据列表
const userDataList = ref([])
const getUser = async () => {
  const res = await getUserList(searchForm.value)
  console.log(res.data.data)
  userDataList.value = res.data.data
}
getUser()

// ========== 用户信息 ==========
const showUserInfo = ref(false)
const userDataInfo = ref({})
const getUserDataInfo = async (id) => {
  const res = await getUserInfo(id)
  console.log(res.data)
  userDataInfo.value = res.data.data
}
const getUserDataInfoBtn = (id) => {
  showUserInfo.value = true
  getUserDataInfo(id)
}

// ========== 添加用户 ==========
const showAddUserDialog = ref(false)
const addUserDataRef = ref()
const addUserData = ref({
  username: '',
  password: '',
  confirm_password: '',
  email: ''
})
const addUserDataReset = () => {
  addUserData.value = {
    username: '',
    password: '',
    confirm_password: '',
    email: ''
  }
}
const addUserDataRules = ref({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 5, max: 16, message: '用户名长度必须为 5 ~ 16 位', trigger: 'blur' },
    { pattern: /^[a-zA-Z_][a-zA-Z0-9_]{4,15}$/, message: '用户名必须以字母或下划线开头，且只能包含字母、数字或下划线', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 32, message: '密码长度必须为 6 ~ 32 位', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_@!.]{6,32}$/, message: '密码仅能包含字母、数字以及 _ @ ! .', trigger: 'blur' },
  ],
  confirm_password: [
    { required: true, message: '确认密码不能为空', trigger: 'blur' },
    { min: 6, max: 32, message: '密码长度必须为 6 ~ 32 位', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_@!.]{6,32}$/, message: '密码仅能包含字母、数字以及 _ @ ! .', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== addUserData.value.password) {
          callback(new Error('两次密码输入不一致'))
        } else {
          callback()
        }
      }, trigger: 'blur',
    },
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: '邮箱格式有误', trigger: 'blur' },
  ],
})
const addUserDataBtn = () => {
  // 显示前重置表单
  addUserDataReset()
  if (addUserDataRef.value) addUserDataRef.value.resetFields()
  // 显示表单
  showAddUserDialog.value = true
}
const useAddUserDataBtn = () => {
  addUserDataRef.value.validate(async (value) => {
    if (value) {
      const res = await addUser(addUserData.value)
      console.log(res.data)
      if (res.data.status === 200) {
        ElMessage.success('添加成功！')
        getUser()
        showAddUserDialog.value = false
      } else {
        ElMessage.error(res.data.message)
      }
    }
  })
}

// ========== 修改用户信息 ==========
const showUpdateUserDialog = ref(false)
const updateUserDataRef = ref()
const updateUserData = ref({
  id: '',
  email: '',
  nickname: '',
  bio: ''
})
const updateUserDataReset = () => {
  updateUserData.value = {
    id: '',
    email: '',
    nickname: '',
    bio: ''
  }
}
const updateUserDataRules = ref({
  // email: [
  //   { required: true, message: '邮箱不能为空', trigger: 'blur' },
  //   { pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: '邮箱格式有误', trigger: 'blur' },
  // ],
})
const updateUserDataBtn = async (id) => {
  // 显示前重置表单
  updateUserDataReset()
  if (updateUserDataRef.value) updateUserDataRef.value.resetFields()

  console.log(id);
  updateUserData.value.id = id
  const res = await getUserInfo(id)
  console.log(res.data);
  updateUserData.value.id = res.data.data.id
  updateUserData.value.email = res.data.data.email
  updateUserData.value.nickname = res.data.data.nickname
  updateUserData.value.bio = res.data.data.bio

  // 显示表单
  showUpdateUserDialog.value = true
}
const useUpdateUserDataBtn = () => {
  updateUserDataRef.value.validate(async (value) => {
    if (value) {
      const res = await updateUser(updateUserData.value)
      console.log(res.data)
      if (res.data.status === 200) {
        ElMessage.success('修改成功！')
        getUser()
        getUserDataInfo(updateUserData.value.id)
        showUpdateUserDialog.value = false
      } else {
        ElMessage.error(res.data.message)
      }
    }
  })
}

// ========== 修改密码 ==========
const showUpdateUserPasswordDialog = ref(false)
const updateUserPasswordDataRef = ref()
const updateUserPasswordData = ref({
  id: '',
  new_password: '',
  confirm_password: ''
})
const updateUserPasswordDataReset = () => {
  updateUserPasswordData.value = {
    id: '',
    new_password: '',
    confirm_password: ''
  }
}
const updateUserPasswordDataRules = ref({
  new_password: [
    { required: true, message: '新密码不能为空', trigger: 'blur' },
    { min: 6, max: 32, message: '密码长度必须为 6 ~ 32 位', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_@!.]{6,32}$/, message: '密码仅能包含字母、数字以及 _ @ ! .', trigger: 'blur' },
  ],
  confirm_password: [
    { required: true, message: '确认新密码不能为空', trigger: 'blur' },
    { min: 6, max: 32, message: '密码长度必须为 6 ~ 32 位', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_@!.]{6,32}$/, message: '密码仅能包含字母、数字以及 _ @ ! .', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== updateUserPasswordData.value.new_password) {
          callback(new Error('两次密码输入不一致'))
        } else {
          callback()
        }
      }, trigger: 'blur',
    },
  ],
})
const updateUserPasswordDataBtn = (id) => {
  // 显示前重置表单
  updateUserPasswordDataReset()
  if (updateUserPasswordDataRef.value) updateUserPasswordDataRef.value.resetFields()
  console.log(id)
  updateUserPasswordData.value.id = id
  // 显示表单
  showUpdateUserPasswordDialog.value = true
}
const useUpdateUserPasswordDataBtn = () => {
  updateUserPasswordDataRef.value.validate(async (value) => {
    if (value) {
      const res = await updateUserPassword(updateUserPasswordData.value)
      console.log(res.data)
      if (res.data.status === 200) {
        ElMessage.success('修改成功！')
        showUpdateUserPasswordDialog.value = false
      } else {
        ElMessage.error(res.data.message)
      }
    }
  })
}

// ========== 修改角色 ==========
const showUpdateUserRoleDialog = ref(false)
const updateUserRoleData = ref({
  id: '',
  role: ''
})
const updateUserRoleDataBtn = async (id) => {
  console.log(id)
  updateUserRoleData.value.id = id
  const res = await getUserInfo(id)
  console.log(res.data)
  updateUserRoleData.value.id = res.data.data.id
  updateUserRoleData.value.role = res.data.data.role
  // 显示表单
  showUpdateUserRoleDialog.value = true
}
const useUpdateUserRoleDataBtn = async () => {
  const res = await updateUserRole(updateUserRoleData.value)
  console.log(res.data)
  if (res.data.status === 200) {
    ElMessage.success('修改成功！')
    getUser()
    showUpdateUserRoleDialog.value = false
  } else {
    ElMessage.error(res.data.message)
  }
}

// ========== 删除用户 ==========
const deleteUserDataBtn = (id) => {
  ElMessageBox.confirm('确定删除此用户？', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', }).then(async () => {
    console.log('删除ID：' + id)
    const res = await deleteUser(id)
    console.log(res.data)
    if (res.data.status === 200) {
      ElMessage.success('删除成功！')
      getUser()
    } else {
      ElMessage.error(res.data.message)
    }
  }).catch(() => { })
}
</script>

<template>
  <Breadcrumb :nav="['管理员', '用户管理']"></Breadcrumb>
  <el-card>
    <!-- 搜索表单 -->
    <el-form class="search-form" :inline="true" :model="searchForm">
      <el-form-item label="用户名">
        <el-input v-model="searchForm.username" placeholder="请输入用户名" clearable />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="searchForm.email" placeholder="请输入邮箱" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="searchBtn">搜索</el-button>
        <el-button :icon="RefreshLeft" @click="resetBtn">重置</el-button>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="addUserDataBtn()">添加用户</el-button>

    <el-table :data="userDataList" style="width: 100%">
      <el-table-column prop="nickname" label="昵称" width="180">
        <template #default="scope">
          <div style="display: flex;align-items: center;">
            <img :src="scope.row.avatar ? baseURL + scope.row.avatar : DefaultAvatar"
              style="width: 50px;border-radius: 10px;">
            <div style="margin: 0 10px;">
              <h4 style="font-size: 16px;">{{ scope.row.nickname }}</h4>
              <p style="font-size: 12px;">{{ scope.row.username }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="role" label="用户角色">
        <template #default="scope">{{ scope.row.role === 'admin' ? '管理员用户' : '普通用户' }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-dropdown trigger="click">
            <el-icon size="20">
              <MoreFilled />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="getUserDataInfoBtn(scope.row.id)">用户信息</el-dropdown-item>
                <el-dropdown-item @click="updateUserPasswordDataBtn(scope.row.id)">修改密码</el-dropdown-item>
                <el-dropdown-item @click="updateUserRoleDataBtn(scope.row.id)">修改角色</el-dropdown-item>
                <el-dropdown-item @click="deleteUserDataBtn(scope.row.id)" divided
                  style="color: red;">删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!-- 用户信息 -->
  <el-drawer class="user-info" v-model="showUserInfo" size="50%" title="用户信息">
    <div class="info">
      <div class="left">
        <img :src="userDataInfo.avatar ? baseURL + userDataInfo.avatar : DefaultAvatar">
        <div style="margin: 0 10px;">
          <h4 style="font-size: 16px;">{{ userDataInfo.nickname }}</h4>
          <p style="font-size: 12px;">{{ userDataInfo.username }}</p>
        </div>
      </div>
      <div class="right">
        <span>{{ userDataInfo.role === 'admin' ? '管理员用户' : '普通用户' }}</span>
      </div>
    </div>
    <p class="email">用户邮箱：{{ userDataInfo.email }}</p>
    <p class="bio">自我介绍：{{ userDataInfo.bio }}</p>
    <p class="time">修改时间：{{ userDataInfo.update_time }}<br>注册时间：{{ userDataInfo.create_time }}</p>
    <el-button @click="updateUserDataBtn(userDataInfo.id)">修改用户信息</el-button>
  </el-drawer>

  <!-- 添加用户 -->
  <el-dialog v-model="showAddUserDialog" title="添加用户" width="500">
    <el-form ref="addUserDataRef" :model="addUserData" :rules="addUserDataRules" label-width="auto"
      style="max-width: 600px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addUserData.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" show-password v-model="addUserData.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm_password">
        <el-input type="password" show-password v-model="addUserData.confirm_password" placeholder="请再次输入密码" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addUserData.email" placeholder="请输邮箱" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="showAddUserDialog = false">取消</el-button>
      <el-button type="primary" @click="useAddUserDataBtn()">确定</el-button>
    </template>
  </el-dialog>

  <!-- 修改用户信息 -->
  <el-dialog v-model="showUpdateUserDialog" title="修改用户信息" width="500">
    <el-form ref="updateUserDataRef" :model="updateUserData" :rules="updateUserDataRules" label-width="auto"
      style="max-width: 600px">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="updateUserData.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="updateUserData.nickname" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="自我介绍" prop="bio">
        <el-input type="textarea" :rows="5" v-model="updateUserData.bio" placeholder="请再次自我介绍" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="showUpdateUserDialog = false">取消</el-button>
      <el-button type="primary" @click="useUpdateUserDataBtn()">确定</el-button>
    </template>
  </el-dialog>

  <!-- 修改密码 -->
  <el-dialog v-model="showUpdateUserPasswordDialog" title="修改密码" width="500">
    <el-form ref="updateUserPasswordDataRef" :model="updateUserPasswordData" :rules="updateUserPasswordDataRules"
      label-width="auto" style="max-width: 600px">
      <el-form-item label="新密码" prop="new_password">
        <el-input type="password" show-password v-model="updateUserPasswordData.new_password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirm_password">
        <el-input type="password" show-password v-model="updateUserPasswordData.confirm_password"
          placeholder="请再次输入新密码" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="showUpdateUserPasswordDialog = false">取消</el-button>
      <el-button type="primary" @click="useUpdateUserPasswordDataBtn()">确定</el-button>
    </template>
  </el-dialog>

  <!-- 修改角色 -->
  <el-dialog v-model="showUpdateUserRoleDialog" title="修改角色" width="400">
    <el-form :model="updateUserPasswordData" label-width="auto" style="max-width: 600px">
      <el-form-item prop="role">
        <el-select v-model="updateUserRoleData.role" placeholder="请选择角色">
          <el-option label="普通用户" value="user" />
          <el-option label="管理员用户" value="admin" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="showUpdateUserRoleDialog = false">取消</el-button>
      <el-button type="primary" @click="useUpdateUserRoleDataBtn()">确定</el-button>
    </template>
  </el-dialog>

</template>

<style lang="scss" scoped>
.user-info {
  .info {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #fefefe;
    border-radius: 5px;
    border: 1px solid #cccccc;

    .left {
      display: flex;
      align-items: center;
      // background-color: #ff0000;
    }

    .right {
      display: flex;
      align-items: center;
      // background-color: #00ff00;
    }

    img {
      width: 50px;
      border-radius: 10px;

    }
  }

  .email {
    margin: 10px 0;
    padding: 10px;
    font-size: 14px;
    background-color: #fefefe;
    border-radius: 5px;
    border: 1px solid #cccccc;
  }

  .bio {
    padding: 10px;
    font-size: 14px;
    background-color: #fefefe;
    border-radius: 5px;
    border: 1px solid #cccccc;
  }

  .time {
    margin: 10px 0;
    color: #606266;
    font-size: 12px;
    line-height: 20px;
  }

  .el-button {
    width: 100%;
    height: 40px;
    border-radius: 50px;
  }
}
</style>
