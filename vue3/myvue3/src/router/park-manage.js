/* Layout */
import Layout from '@/layout'

export default [
    {
        path: '/park-manage/park',
        component: Layout,
        hidden: true,
        children: [
            {
                path: 'detail',
                component: () => import('@/views/park-manage/park-detail'),
                name: 'ParkDetail',
                meta: { title: '车场详情' }
            },
            {
                path: 'detail/check',
                component: () => import('@/views/park-manage/park-detail/check-detail'),
                name: 'CheckDetail',
                meta: { title: '对账查看' }
            },
            {
                path: 'edit/base',
                component: () => import('@/views/park-manage/edit-park/base-form'),
                name: 'EditPark',
                meta: { title: '车场编辑' }
            },
            {
                path: 'edit/check',
                component: () => import('@/views/park-manage/edit-park/check-form'),
                name: 'EditCheck',
                meta: {
                    title: '对账编辑'
                }
            },
            //   {
            //     path: 'edit/checkYzt',
            //     component: () => import('@/views/park-manage/edit-park/check-form-yzt'),
            //     name: 'EditCheckYzt',
            //     meta: {
            //       title: '对账编辑'
            //     }
            //   },
            {
                path: 'edit/config',
                component: () => import('@/views/park-manage/edit-park/config-form'),
                name: 'EditConfig',
                meta: {
                    title: '配置编辑'
                }
            },
            {
                path: 'edit/operation',
                component: () => import('@/views/park-manage/edit-park/operation-form'),
                name: 'EditOperation',
                meta: {
                    title: '运维编辑'
                }
            },
            {
                path: 'edit/invoice',
                component: () => import('@/views/park-manage/edit-park/invoice-form'),
                name: 'EditInvoice',
                meta: {
                    title: '发票编辑'
                }
            },
            {
                path: 'edit/zone',
                component: () => import('@/views/park-manage/edit-park/zone-form'),
                name: 'EditZone',
                meta: {
                    title: '区域编辑'
                }
            },
            {
                path: 'edit/auth',
                component: () => import('@/views/park-manage/edit-park/auth-form'),
                name: 'EditAuth',
                meta: {
                    title: '出入口授权编辑'
                }
            },

            {
                path: 'edit/template',
                component: () => import('@/views/park-manage/edit-park/template-form'),
                name: 'EditTemplate',
                meta: {
                    title: '模板消息编辑'
                }
            },
            {
                path: 'detail/invoice',
                component: () => import('@/views/park-manage/park-detail/invoice-detail'),
                name: 'InvoiceDetail',
                meta: {
                    title: '开票详情'
                }
            }, {
                path: 'detail/zone',
                component: () => import('@/views/park-manage/park-detail/zone-detail'),
                name: 'ZoneDetail',
                meta: {
                    title: '区域详情'
                }
            },
            {
                path: 'detail/auth',
                component: () => import('@/views/park-manage/park-detail/auth-detail'),
                name: 'AuthDetail',
                meta: {
                    title: '出入口授权详情'
                }
            },
            {
                path: 'detail/device',
                component: () => import('@/views/park-manage/park-detail/device-detail'),
                name: 'DeviceDetail',
                meta: {
                    title: '硬件设备详情'
                }
            },
            {
                path: 'detail/entranceDevice',
                component: () => import('@/views/park-manage/park-detail/entrance-device-detail'),
                name: 'entranceDevice',
                meta: {
                    title: '硬件设备详情'
                }
            }
        ]
    },
    {
        path: '/park-manage/serviceCharge',
        component: Layout,
        hidden: true,
        children: [
            {
                path: 'add',
                component: () => import('@/views/park-manage/charge-config/add'),
                name: 'AddChargeConfig',
                meta: { title: '服务收费配置' }
            },
            {
                path: 'detail',
                component: () => import('@/views/park-manage/charge-config/detail'),
                name: 'detailChargeConfig',
                meta: { title: '服务收费配置' }
            },
            {
                path: 'brushDetail',
                component: () => import('@/views/park-manage/charge-bill/brushDetail'),
                name: 'brushDetail',
                meta: { title: '服务收费配置' }
            },
            {
                path: 'invoiceDetail',
                component: () => import('@/views/park-manage/charge-bill/invoiceDetail'),
                name: 'invoiceDetail',
                meta: { title: '服务收费配置' }
            }

        ]
    }
]
