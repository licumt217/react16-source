/* Layout */
import Layout from '@/layout/Layout.vue'

export default [
    {
        path: '/park-manage/park',
        component: Layout,
        hidden: true,
        children: [
            {
                path: 'detail',
                component: () => import('@/views/HomeView.vue'),
                name: 'ParkDetail',
                meta: { title: '车场详情' }
            },
            {
                path: 'detail/check',
                component: () => import('@/views/AboutView.vue'),
                name: 'CheckDetail',
                meta: { title: '对账查看' }
            }
        ]
    }
]
