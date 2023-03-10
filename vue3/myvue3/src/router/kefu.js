/* Layout */
import Layout from '@/layout'

export default [
    {
        path: '/kefu/feedback',
        component: Layout,
        hidden: true,
        children: [
            {
                path: 'detail',
                component: () => import('@/views/kefu/feedback/detail'),
                name: 'FeedbackDetail',
                meta: { title: '用户反馈问题详情',noCache: true }
            },
        ]
    }
]
