import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/layout.vue'
import engineering from './engineering'
export const constRoutes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/engineering' },
]
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/engineering',
    name: 'home',
    meta: { title: '工程管理', icon: 'el-icon-folder-opened' },
    component: Layout,
    redirect: '/engineering/list',
    children: [...engineering],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...constRoutes, ...asyncRoutes],
})

export default router
