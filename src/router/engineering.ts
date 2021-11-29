import { RouteRecordRaw } from 'vue-router'

const engineering: Array<RouteRecordRaw> = [
  {
    path: 'list',
    name: 'engineeringList',
    meta: { title: '工程列表' },
    component: () => import('@/views/engineering/list/index.vue'),
  },
  {
    path: 'flow',
    name: 'flow',
    meta: { title: 'flow列表' },
    component: () => import('@/views/engineering/flow/index.vue'),
  },
]
export default engineering
