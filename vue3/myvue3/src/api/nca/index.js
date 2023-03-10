import request from '@/utils/request'

/**
 * 查询出入口授权组列表
 * @param {*} param0 
 * @returns 
 */
export function getAuthGroupList({ parkId }) {
    return request({
        url: `/tcOrder/API/NoticeControlAuth`,
        method: 'post',
        data: {
            NoticeCode: '10000',
            ParkId: parkId,
            Data: JSON.stringify({})
        }
    })
}

/**
 * 编辑/新增出入口授权组
 * @param {*} GroupId  编辑时必须有值，新增时为空
 * @param {*} OperationType  0.新增1.修改
 * @returns 
 */
export function addOrUpdateAuthGroup({ parkId, GroupId, OperationType, GroupName, DateStart, DateEnd, ConfigTypeIds, AuthTarget }) {
    return request({
        url: `/tcOrder/API/NoticeControlAuth`,
        method: 'post',
        data: {
            NoticeCode: '10030',
            ParkId: parkId,
            Data: JSON.stringify({
                GroupId, OperationType, GroupName, DateStart, DateEnd, ConfigTypeIds, AuthTarget
            })
        }
    })
}

/**
 * 删除授权组
 * @param {*} param0 
 * @returns 
 */
export function deleteAuthGroup({ parkId, GroupId }) {
    return request({
        url: `/tcOrder/API/NoticeControlAuth`,
        method: 'post',
        data: {
            NoticeCode: '10020',
            ParkId: parkId,
            Data: JSON.stringify({
                GroupId
            })
        }
    })
}


/**
 * 授权组详情
 * @param {*} param0 
 * @returns 
 */
export function getAuthGroupDetail({ parkId, GroupId }) {
    return request({
        url: `/tcOrder/API/NoticeControlAuth`,
        method: 'post',
        data: {
            NoticeCode: '10010',
            ParkId: parkId,
            Data: JSON.stringify({
                GroupId
            })
        }
    })
}

/**
 * 出入口绑定授权组
 * @param {*} param0 
 * @returns 
 */
export function bindAuthGroups({ parkId, ControlId, AuthGroupIds }) {
    return request({
        url: `/tcOrder/API/NoticeControlAuth`,
        method: 'post',
        data: {
            NoticeCode: '10040',
            ParkId: parkId,
            Data: JSON.stringify({
                ControlId, AuthGroupIds
            })
        }
    })
}

/**
 * 查询出入口绑定的授权组
 * @param {*} param0 
 * @returns 
 */
export function getAuthGroupsByExitId({ parkId, ControlId }) {
    return request({
        url: `/tcOrder/API/NoticeControlAuth`,
        method: 'post',
        data: {
            NoticeCode: '10050',
            ParkId: parkId,
            Data: JSON.stringify({
                ControlId
            })
        }
    })
}
