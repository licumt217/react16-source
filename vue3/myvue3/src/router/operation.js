/* Layout */
import Layout from '@/layout'

export default [
  {
    path: '/operation-center/operation-api/message-push',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'receive-user',
        component: () => import('@/views/operation/operation-api/message-push/receive-user'),
        name: 'ReceiveUser',
        meta: { title: '接收人管理' }
      }
    ]
  },
  {
    path: '/operation-center/open-park-state',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: () => import('@/views/operation/park-state-monitor/open-park-state/log'),
        name: 'openParkStateLog',
        meta: {
          title: '路外车场状态日志'
        }
      },
      {
        path: 'running-state',
        component: () => import('@/views/operation/park-state-monitor/open-park-state/running-state'),
        name: 'runningState',
        meta: {
          title: '运行状态'
        }
      }
    ]
  }
]
