import request from '@/utils/request'

/**
 * 新建云资通账户
 * @param {*} param0
 * @returns
 */
export function indirectCreate({
    yztName,
    inDoorImages,
    outDoorImages,
    name,
    aliasName,
    merchantType,
    mcc,
    certNo,
    certName,
    certImage,
    certImageBack,
    legalName,
    legalCertNo,
    legalCertType,
    businessAddress,
    contactInfos,
    bizCards,
    licenseAuthLetterImage,
    legalCertFrontImage,
    legalCertBackImage,

}: {
    yztName: any,
    inDoorImages: any,
    outDoorImages: any,
    name: any,
    aliasName: any,
    merchantType: any,
    mcc: any,
    certNo: any,
    certName: any,
    certImage: any,
    certImageBack: any,
    legalName: any,
    legalCertNo: any,
    legalCertType: any,
    businessAddress: any,
    contactInfos: any,
    bizCards: any,
    licenseAuthLetterImage: any,
    legalCertFrontImage: any,
    legalCertBackImage: any,

}) {
    return request({
        url: '/payout/yzt/indirectCreate',
        method: 'post',
        data: {
            yztName,
            inDoorImages,
            outDoorImages,
            name,
            aliasName,
            merchantType,
            mcc,
            certNo,
            certName,
            certImage,
            certImageBack,
            legalName,
            legalCertNo,
            legalCertType,
            businessAddress,
            contactInfos,
            bizCards,
            licenseAuthLetterImage,
            legalCertFrontImage,
            legalCertBackImage,
        },
    })
}



/**
 * 更新云资通账户
 * @param {*} param0
 * @returns
 */
export function indirectUpdate({
    id,
    yztName,
    inDoorImages,
    outDoorImages,
    name,
    aliasName,
    merchantType,
    mcc,
    certNo,
    certName,
    certImage,
    certImageBack,
    legalName,
    legalCertNo,
    legalCertType,
    businessAddress,
    contactInfos,
    bizCards,
    licenseAuthLetterImage,
    legalCertFrontImage,
    legalCertBackImage,

}: {
    id: any,
    yztName: any,
    inDoorImages: any,
    outDoorImages: any,
    name: any,
    aliasName: any,
    merchantType: any,
    mcc: any,
    certNo: any,
    certName: any,
    certImage: any,
    certImageBack: any,
    legalName: any,
    legalCertNo: any,
    legalCertType: any,
    businessAddress: any,
    contactInfos: any,
    bizCards: any,
    licenseAuthLetterImage: any,
    legalCertFrontImage: any,
    legalCertBackImage: any,

}) {
    return request({
        url: `/payout/yzt/indirectUpdate/${id}`,
        method: 'post',
        data: {
            yztName,
            inDoorImages,
            outDoorImages,
            name,
            aliasName,
            merchantType,
            mcc,
            certNo,
            certName,
            certImage,
            certImageBack,
            legalName,
            legalCertNo,
            legalCertType,
            businessAddress,
            contactInfos,
            bizCards,
            licenseAuthLetterImage,
            legalCertFrontImage,
            legalCertBackImage,
        },
    })
}


/**
 * 查询云资通账户明细
 * @param {*} param0
 * @returns
 */
export function getIndirectMsg({ id }: { id: any }) {
    return request({
        url: `/payout/yzt/getIndirectMsg/${id}`,
    })
}


/**
 * 九、获取进件账户（主体）列表
 * @param {*} param0
 * @returns
 */
export function indirectList({
    id,
    yztName,
    startDate,
    endDate,
    start,
    limit,
    certImgStatus
}: {
    id: any,
    yztName: any,
    startDate: any,
    endDate: any,
    start: any,
    limit: any,
    certImgStatus: any
}) {
    return request({
        url: `/payout/yzt/indirectList`,
        method: 'post',
        data: {
            id, yztName, startDate, endDate, start, limit, certImgStatus
        },
    })
}

/**
 * 补充金额
 * @param {*} param0
 * @returns
 */
export function rechargeConfirm({ amount }: { amount: any }) {
    return request({
        url: `/tcAccountCheck/yzt/rechargeConfirm`,
        method: 'post',
        data: {
            amount
        },
    })
}

/**
 * 确认付款
 * @param {*} param0
 * @returns
 */
export function createYztPayPermission() {
    return request({
        url: `/tcAccountCheck/yzt/createYztPayPermission`,
        method: 'post',
    })
}


/**
 * 补充金额分页列表
 * @param {*} param0
 * @returns
 */
export function RechargeDetail({ start, limit }: { start: any, limit: any }) {
    return request({
        url: `/payout/yzt/RechargeDetail`,
        method: 'post',
        data: {
            start, limit
        },
    })
}

/**
 * 云资通进件主体下拉列表
 * @param {*} param0
 * @returns
 */
export function indirectListSimple() {
    return request({
        url: `/payout/yzt/indirectListSimple`,
        method: 'post',
    })
}

/**
 * 查询每日分账金额与云资通余额
 * @param {*} param0
 * @returns
 */
export function getDailyDivideInfo() {
    return request({
        url: `/tcAccountCheck/yzt/getDailyDivideInfo`,
        method: 'get',
    })
}

/**
 * 查询每日分账汇总记录
 * @param {*} param0
 * @returns
 */
export function getDailyDivideList({
    divideState,
    start,
    limit,
    startDate,
    endDate
}: {
    divideState: any,
    start: any,
    limit: any,
    startDate: any,
    endDate: any,
}) {
    return request({
        url: `/tcAccountCheck/yzt/getDailyDivideList`,
        method: 'post',
        data: {
            divideState, start, limit, startDate, endDate
        },
    })
}

/**
 * 根据云资通smid查询相关业务
 * @param {*} param0
 * @returns
 */
export function getRelBusinessBySmId({ smid, start, limit }: { smid: any, start: any, limit: any }) {
    return request({
        url: `/tcAccountCheck/yzt/getRelBusinessBySmId/${smid}`,
        method: 'post',
        data: {
            start, limit
        },
    })
}


/**
 * 开通云资通
 * @param {*} param0
 * @returns
 */
export function openYztSettle({ parkId }: { parkId: any }) {
    return request({
        url: `/tcAccountCheck/yzt/openYztSettle/${parkId}`,
        method: 'post',
    })
}

/**
 * 关闭云资通
 * @param {*} param0
 * @returns
 */
export function closeYztSettle({ parkId }: { parkId: any }) {
    return request({
        url: `/tcSettle/yzt/closeYztSettle/${parkId}`,
        method: 'post',
    })
}

/**
 * 查询云资通状态
 * @param {*} param0
 * @returns
 */
export function queryYztSettleState({ parkId }: { parkId: any }) {
    return request({
        url: `/tcAccountCheck/yzt/queryYztSettleState/${parkId}`,
        method: 'post',
    })
}

/**
 * 清分失败一键重试
 * @param {*} param0
 * @returns
 */
export function retryAgain() {
    return request({
        url: `/payout/yzt/retryAgain`,
        method: 'post',
    })
}


/**
 * 人工充值
 * @param {*} param0
 * @returns
 */
export function manualRecharge({ amount }: { amount: any }) {
    return request({
        url: `/payout/yzt/manualRecharge`,
        method: 'post',
        data: {
            amount
        },
    })
}


/**
 * 查询云资通对车场的需支付列表
 * @param {*} param0
 * @returns
 */
export function getParkSettleOrder({
    pmParkId,
    businessType,
    payState,
    startDate,
    endDate,
    start,
    limit
}: {
    pmParkId: any,
    businessType: any,
    payState: any,
    startDate: any,
    endDate: any,
    start: any,
    limit: any
}
) {
    return request({
        url: `/tcAccountCheck/yzt/getParkSettleOrder`,
        method: 'post',
        data: {
            pmParkId, businessType, payState, startDate, endDate, start, limit
        },
    })
}
/**
 * 查询云资通对车场的需支付列表Excel
 * @param {*} param0
 * @returns
 */
export function selectParkSettleOrderExcel({
    pmParkId,
    businessType,
    payState,
    startDate,
    endDate
}: {
    pmParkId: any,
    businessType: any,
    payState: any,
    startDate: any,
    endDate: any
}) {
    return request({
        url: `/tcAccountCheck/yzt/selectParkSettleOrderExcel`,
        method: 'post',
        data: {
            pmParkId, businessType, payState, startDate, endDate
        },
    })
}
/**
 * 云资通支付失败订单重新发起支付
 * @param {*} param0
 * @returns
 */
export function yztBatchRePay({ ids }: { ids: any }) {
    return request({
        url: `/tcSettle/yzt/yztBatchRePay`,
        method: 'post',
        data: ids,
    })
}
/**
 * 云资通支付成功订单重新发起支付结果查询
 * @param {*} param0
 * @returns
 */
export function yztBatchReQuery({ ids }: { ids: any }) {
    return request({
        url: `/tcSettle/yzt/yztBatchReQuery`,
        method: 'post',
        data: ids,
    })
}
