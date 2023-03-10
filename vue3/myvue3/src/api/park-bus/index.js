import request from '@/utils/request'

/**
 * 获取车场快速部署编码
 * @param {*} param0 
 * @returns 
 */
export function getDeployCode({ parkId }) {
    return request({
        url: `/parkbus/deploy/park/deployCode/${parkId}`
    })
}

/**
 * 消息类型枚举列表
 * @returns 
 */
export function getMessageTypes() {
    return request({
        url: `/parkbus/messageType/types`
    })
}

/**
 * 内容占位符枚举列表
 * @param {*} messageType 
 * @returns 
 */
export function getContentPlaceholders({ messageType }) {
    return request({
        url: `/parkbus/placeholder/selectByMessageType`,
        params: {
            messageType,
        }
    })
}

/**
 * 操作类型枚举列表
 * @returns 
 */
export function getOperateTypes() {
    return request({
        url: `/parkbus/message/operateTypes`
    })
}

/**
 * 内容类型枚举列表
 * @returns 
 */
export function getContentTypes() {
    return request({
        url: `/parkbus/message/contentTypes`
    })
}

/**
 * 查询消息类型分页列表
 * @param {*} messageType 
 * @returns 
 */
export function queryTypePageList() {
    return request({
        url: `/parkbus/message/type/queryPageList`,
        params: {
            // messageType,
        }
    })
}

/**
 * 获取消息模板列表
 * @param {*} messageType 
 * @returns 
 */
export function getTemplatelistByParkId({ parkId }) {
    return request({
        url: `/parkbus/message/template/listByParkId`,
        params: {
            parkId,
        }
    })
}

/**
 * 查看消息模板
 * @param {*} param0 
 * @returns 
 */
export function getTemplateDetail({ templateId }) {
    return request({
        url: `/parkbus/message/template/${templateId}`,
    })
}

/**
 * 根据车场id查询未使用的消息类型
 * 此接口会过滤此车场已经使用过的消息类型，只留此车场未使用的
 * @param {*} param0 
 * @returns 
 */
export function queryUnusedMsgTypeListByParkId({ parkId }) {
    return request({
        url: `/parkbus/messageType/queryByPark/${parkId}`,
    })
}

/**
 * 保存消息模板(无templateId时是新增)
 * @param {*} param0 
 * @returns 
 */
export function saveTemplate({ templateId, templateName, messageType, parkId, isEnable, operates }) {
    return request({
        url: `/parkbus/message/template/save`,
        method: 'post',
        data: {
            templateId, templateName, messageType, parkId, isEnable, operates
        }
    })
}

/**
 * 删除模板
 * @param {*} param0 
 * @returns 
 */
export function deleteTemplate({ templateId }) {
    return request({
        url: `/parkbus/message/template/delete`,
        method: 'post',
        data: {
            templateId
        }
    })
}






