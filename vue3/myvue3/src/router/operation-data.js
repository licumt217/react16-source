/* Layout */
import Layout from '@/layout'

export default [
    {
        path: '/operation-data/revenue',
        component: Layout,
        hidden: true,
        children: [
            {
                path: 'detail',
                component: () => import('@/views/operation-data/revenue-sell/sell-detail'),
                name: 'SellDetail',
                meta: { title: '会员权益售卖详情' }
            },

        ]
    }
]
