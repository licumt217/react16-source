/* Layout */
import Layout from '@/layout'

export default [
  {
    path: '/business-center/contract-manage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'detail',
        component: () => import('@/views/business-center/contract-manage/detail'),
        name: 'contractDetail',
        meta: {
          title: '合同详情'
        }
      },
      {
        path: 'edit',
        component: () => import('@/views/business-center/contract-manage/edit'),
        name: 'editContract',
        meta: {
          title: '编辑合同'
        }
      }
    ]
  },
  {
    path: '/business-center/tag-manage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'detail',
        component: () => import('@/views/business-center/tag-manage/detail'),
        name: 'TagDetail',
        meta: {
          title: '标签详情'
        }
      }
    ]
  },
  {
    path: '/business-center/contract-tag',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'detail',
        component: () => import('@/views/business-center/contract-tag/detail'),
        name: 'ParkProjectDetail',
        meta: {
          title: '合同标签详情'
        }
      },
      {
        path: 'edit',
        component: () => import('@/views/business-center/contract-tag/edit'),
        name: 'ParkProjectEdit',
        meta: {
          title: '编辑合同标签'
        }
      }
    ]
  },
  {
    path: '/business-center/invoice-manage/invoice-bill',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'detail',
        component: () => import('@/views/business-center/invoice-manage/invoice-bill/detail'),
        name: 'InvoiceBillDetail',
        meta: {
          title: '账单明细'
        }
      },
      {
        path: 'check',
        component: () => import('@/views/business-center/invoice-manage/invoice-bill/check'),
        name: 'InvoiceCheck',
        meta: {
          title: '申请开票'
        }
      }
    ]
  },
  {
    path: '/business-center/invoice-manage/invoice-batch',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'bill',
        component: () => import('@/views/business-center/invoice-manage/invoice-batch/invoice-bill'),
        name: 'InvoiceBill',
        meta: {
          title: '发票账单'
        }
      },
      {
        path: 'red',
        component: () => import('@/views/business-center/invoice-manage/invoice-batch/red-invoice'),
        name: 'RedInvoice',
        meta: {
          title: '发票冲红'
        }
      }
    ]
  }
]
