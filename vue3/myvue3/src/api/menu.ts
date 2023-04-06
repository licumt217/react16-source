import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
    return request({
        url: '/ipop-authcenter/getRouters',
        method: 'get'
    })
}
