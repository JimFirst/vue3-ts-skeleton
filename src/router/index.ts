import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/layout.vue'
export const constRoutes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/project' },
]
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/project',
    name: 'home',
    meta: { title: '工程管理', icon: 'el-icon-folder-opened' },
    component: Layout,
    children: [],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...constRoutes, ...asyncRoutes],
})

export default router
