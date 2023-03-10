/* Layout */
import Layout from '@/layout'

export default [
  {
    path: '/finance-center/invoice-manage/invoice-statistics',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'invoice-batch',
        component: () => import('@/views/finance-center/invoice-manage/invoice-statistics/invoice-batch'),
        name: 'InvoiceBatch',
        meta: {
          title: '发票批次'
        }
      }
    ]
  },
   {
    path: '/finance-center/settle-manage/ziying-shouru',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'settle-view',
        component: () => import('@/views/finance-center/settle-manage/ziying-shouru/settle-view'),
        name: 'js',
        meta: {
          title: '结算一览'
        }
      }
    ]
  },
   {
    path: '/finance-center/settle-manage/ziying-shouru',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'settle-dzd',
        component: () => import('@/views/finance-center/settle-manage/ziying-shouru/settle-dzd'),
        name: 'dzd',
        meta: {
          title: '对账单'
        }
      }
    ]
  }
]
