import request from '@/utils/request'

export function getRentList({ parkName, status, start, limit }) {
    return request({
        url: '/tcRentSet/deleteRent/listBody',
        method: 'post',
        data: {
            parkName,
            status,
            start,
            limit
        }
    })
}

export function hasLinkUser({ deleteRentProcessId }) {
    return request({
        url: '/tcRentSet/deleteRent/hasLinkUser',
        method: 'post',
        data: {
            deleteRentProcessId
        }
    })
}

export function startDelete({ deleteRentProcessId }) {
    return request({
        url: '/tcRentSet/deleteRent/start',
        method: 'post',
        data: {
            deleteRentProcessId
        }
    })
}

// 取消执行
export function cancelExecute({ deleteRentProcessId }) {
    return request({
        url: '/tcRentSet/deleteRent/cancel',
        method: 'post',
        data: {
            deleteRentProcessId
        }
    })
}

export function getRentDetail({ deleteRentProcessId }) {
    return request({
        url: '/tcRentSet/deleteRent/detail',
        method: 'post',
        data: {
            deleteRentProcessId
        }
    })
}

export function getOperateLog({ deleteRentProcessId }) {
    return request({
        url: '/tcRentSet/deleteRent/log',
        method: 'post',
        data: {
            deleteRentProcessId
        }
    })
}

export function exportRentList(params) {
    return request({
        url: '/tcRentSet/deleteRent/download',
        params
    })
}
