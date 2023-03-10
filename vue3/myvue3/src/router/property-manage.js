/* Layout */
import Layout from '@/layout'

export default [
  {
    path: '/property-manage/store-house',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'detail',
        component: () => import('@/views/property-manage/store-house/detail'),
        name: 'StoreHouseDetail',
        meta: {
          title: '库房详情'
        }
      },
      {
        path: 'out-put-in-note',
        component: () => import('@/views/property-manage/store-house/out-put-in-note'),
        name: 'StoreHouseOutPutInNote',
        meta: {
          title: '出入库记录'
        }
      }
    ]
  },
  {
    path: '/property-manage/borrow',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'my',
        component: () => import('@/views/property-manage/borrow/my'),
        name: 'MyBorrow',
        meta: {
          title: '我的借用'
        }
      }
    ]
  }
]
