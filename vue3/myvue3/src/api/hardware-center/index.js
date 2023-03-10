import request from '@/utils/request'


/**
 * 二维码批次列表
 * @param {*} param0 
 * @returns 
 */
export function getQrcodeBatchList({ pageNo, pageSize, deviceBatchCode, startDate, endDate, providerId, bizState }) {
    return request({
        url: `/iot/api/deviceQrcodeBatch/qurey`,
        method: 'post',
        data: {
            pageNo, pageSize, deviceBatchCode, startDate, endDate, providerId, bizState
        }
    })
}


/**
 * 
 * @param {*} param0 
 * @returns 
 */
export function addQrcode({ providerId, amount, remark }) {
    return request({
        url: `/iot/api/deviceQrcode/Add`,
        method: 'post',
        data: {
            providerId, amount, remark
        }
    })
}


/**
 * 获取设备厂商
 * @returns 
 */
export function getProviderList() {
    return request({
        url: `/iot/api/provider`,
    })
}

/**
 * 获取设备类型
 * @returns 
 */
export function getDeviceTypeList() {
    return request({
        url: `/iot/api/deviceType`,
    })
}

/**
 * 获取设备型号
 * @returns 
 */
export function getDeviceModelList() {
    return request({
        url: `/iot/api/deviceModel`,
    })
}

/**
 * 根据二维码查询批次
 * @param {*} param0 
 * @returns 
 */
export function queryBatchCodeByQrcode({ qrcode }) {
    return request({
        url: `/iot/api/deviceQrcode/queryBatchCode/${qrcode}`,
    })
}

/**
 * 根据批次ID查询批次
 * @param {*} param0 
 * @returns 
 */
export function getBatchDetailByCode({ deviceBatchCode }) {
    return request({
        url: `/iot/api/deviceQrcodeBatch/${deviceBatchCode}`,
    })
}

/**
 * 二维码列表
 * @param {*} param0 
 * @returns 
 */
export function getQrcodeList({ pageNo, pageSize, deviceBatchCode, deviceQRCode }) {
    return request({
        url: `/iot/api/deviceQrcode/qurey`,
        method: 'post',
        data: {
            pageNo, pageSize, deviceBatchCode, deviceQRCode
        }
    })
}

/**
 * 下载全部二维码
 * @param {*} param0 
 * @returns 
 */
export function downloadAllQrcode({ deviceBatchCode }) {
    return request({
        url: `/iot/api/deviceQrcode/download/${deviceBatchCode}`,
    })
}

/**
 * 设备列表
 * @param {*} param0 
 * @returns 
 */
export function getDeviceList({ pageNo, pageSize, deviceQRCode, parkName, providerId, deviceType, deviceModelId, parkId }) {
    return request({
        url: `/iot/api/device/query`,
        method: 'post',
        data: {
            pageNo, pageSize, deviceQRCode, parkName, providerId, deviceType, deviceModelId, parkId
        }
    })
}

/**
 * 设备详情
 * @param {*} param0 
 * @returns 
 */
export function getDeviceDetail({ deviceId }) {
    return request({
        url: `/iot/api/device/detail/${deviceId}`,
    })
}


/**
 * 修改设备名称
 * @param {*} param0 
 * @returns 
 */
export function updateDeviceName({ deviceSubId, deviceName }) {
    return request({
        url: `/iot/api/device/updateName`,
        method: 'post',
        data: {
            deviceSubId, deviceName
        }
    })
}

/**
 * 修改设备状态
 * @param {*} param0 
 * @returns 
 */
export function updateDeviceStatus({ deviceSubId, bizState }) {
    return request({
        url: `/iot/api/device/updateState`,
        method: 'post',
        data: {
            deviceSubId, bizState
        }
    })
}

/**
 * 根据区域、出入口ID查询设备
 * @param {*} param0 
 * @returns 
 */
export function getDeviceListByDataType({ pageNo, pageSize, dataType, dataId }) {
    return request({
        url: `/iot/api/device/queryByDataInfo`,
        method: 'post',
        data: {
            pageNo, pageSize, dataType, dataId
        }
    })
}



