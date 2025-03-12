import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import { useUserStore } from '@/stores'

const routes = [
  {
    path: '/', component: () => import('@/views/home/index.vue'),
    children: [
      { path: '/', component: () => import('@/views/home/Main/index.vue') },
      { path: '/info', component: () => import('@/views/home/Main/info.vue') },
    ]
  },
  { path: '/login', component: () => import('@/views/login/login.vue'), },
  { path: '/register', component: () => import('@/views/login/register.vue'), },
  { path: '/reset', component: () => import('@/views/login/reset.vue'), },

  {
    path: '/user', component: () => import('@/views/user/index.vue'),
    redirect: '/user/index',
    meta: { requiresAuth: true },
    children: [
      { path: '/user/index', component: () => import('@/views/user/index/index.vue') },
      { path: '/user/category', component: () => import('@/views/user/category/index.vue') },
      { path: '/user/navigation', component: () => import('@/views/user/navigation/index.vue') },

      { path: '/user/person/info', component: () => import('@/views/user/person/Info.vue') },
      { path: '/user/person/secure', component: () => import('@/views/user/person/Secure.vue') },

      { path: '/admin/user', component: () => import('@/views/user/admin/User.vue') },
      { path: '/admin/category', component: () => import('@/views/user/admin/Category.vue') },
      { path: '/admin/navigation', component: () => import('@/views/user/admin/Navigation.vue') },
    ]
  },
  { path: '/:pathMatch(.*)*', component: () => import('@/views/error/404.vue') }
]


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.token) {
    router.push('/login')
  } else {
    next()
  }

  if (to.path.split('/')[1] === 'admin' && userStore.info.role !== 'admin') {
    router.push('/404')
  }
})

export default router
