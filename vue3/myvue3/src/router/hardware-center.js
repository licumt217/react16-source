/* Layout */
import Layout from '@/layout'

export default [
    {
        path: '/hardware-center',
        component: Layout,
        hidden: true,
        children: [
            {
                path: 'detail/qrcode',
                component: () => import('@/views/hardware-center/qrcode-manage/qrcode'),
                name: 'QrcodeDetail',
                meta: { title: '二维码查看' }
            },

        ]
    }
]
