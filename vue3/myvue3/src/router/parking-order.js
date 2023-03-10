/* Layout */
import Layout from '@/layout'

export default [
  {
    path: '/parking-order/exception-order',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'detail',
        component: () => import('@/views/parking-order/exception-order/detail'),
        name: 'ExceptionOrderDetail',
        meta: { title: '异常订单详情' }
      }
    ]
  },
  {
    path: '/parking-order/in-parking-order',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'detail',
        component: () => import('@/views/parking-order/in-parking-order/detail'),
        name: 'InParkingOrderDetail',
        meta: { title: '在场订单详情' }
      }
    ]
  },
  {
    path: '/parking-order/out-parking-order',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'detail',
        component: () => import('@/views/parking-order/out-parking-order/detail'),
        name: 'OutParkingOrderDetail',
        meta: { title: '出场订单详情' }
      }
    ]
  },
  {
    path: '/parking-order/refund-order',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'detail',
        component: () => import('@/views/parking-order/refund-order/detail'),
        name: 'RefundOrderDetail',
        meta: { title: '退款订单详情' }
      }
    ]
  }
]
