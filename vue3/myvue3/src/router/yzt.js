/* Layout */
import Layout from '@/layout'

export default [
  {
    path: '/yzt/account-manage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'detail',
        component: () => import('@/views/yzt/account-manage/detail'),
        name: 'YztAccountDetail',
        meta: { title: '云资通账户查看' }
        },
        {
        path: 'edit',
        component: () => import('@/views/yzt/account-manage/edit'),
        name: 'YztAccountEdit',
        meta: { title: '云资通账户编辑' }
      }
    ]
  },
  {
    path: '/yzt/monitor-limit',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'record',
        component: () => import('@/views/yzt/monitor-limit/record'),
        name: 'record',
        meta: { title: '补充记录' }
      }
    ]
  },
]
