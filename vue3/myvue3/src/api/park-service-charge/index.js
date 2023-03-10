import request from '@/utils/request'

/**
 * 服务费配置记录查询
 * @param {*} param0 
 * @returns 
 */
export function getHostingSetList({ pmParkId, billType, billCycle, status, createStartDate, createEndDate, start, limit }) {

    return request({
        url: '/tcAccountCheck/hosting/getHostingSetList',
        method: 'post',
        data: {
            pmParkId, billType, billCycle, status, createStartDate, createEndDate, start, limit
        }
    })
}



/**
 * 
 * 服务费配置记录导出
 * @param {*} param0 
 * @returns 
 */
export function getHostingSetListFile({ pmParkId, billType, status, createStartDate, createEndDate }) {
    return request({

        url: '/tcAccountCheck/hosting/getHostingSetListFile',
        method: 'post',
        data: {
            pmParkId, billType, status, createStartDate, createEndDate
        }
    })
}



/**
 * 新增服务配置
 * @param {*} param0 
 * @returns 
 */
export function addPmHostingSet({ pmParkId, startDate, endDate, ratio, totalAmount, billType, billCycle, amount, status, isAutoOpenInvoice,
    invoiceTitle, identificationNumber, address, telPhone, bank, account, projectNo, projectName, companyBusinessEmail, companyContactEmailOne, parkContactEmail }) {
    return request({
        url: '/tcAccountCheck/hosting/addPmHostingSet',
        method: 'post',
        data: {
            pmParkId, startDate, endDate, ratio, totalAmount, billType, billCycle, amount, status, isAutoOpenInvoice,
            invoiceTitle, identificationNumber, address, telPhone, bank, account, projectNo, projectName, companyBusinessEmail, companyContactEmailOne, parkContactEmail
        }
    })
}
/**
 * 修改服务配置
 * @param {*} param0 
 * @returns 
 */
export function updatePmHostingSet({ pmHostingSetId, status, isAutoOpenInvoice,
    invoiceTitle, identificationNumber, address, telPhone, bank, account, companyBusinessEmail, companyContactEmailOne, parkContactEmail }) {
    return request({
        url: '/tcAccountCheck/hosting/updatePmHostingSet',
        method: 'post',
        data: {
            pmHostingSetId, status, isAutoOpenInvoice,
            invoiceTitle, identificationNumber, address, telPhone, bank, account, companyBusinessEmail, companyContactEmailOne, parkContactEmail
        }
    })
}

/**
 * 服务费账单记录查询
 * @param {*} param0 
 * @returns 
 */
export function getHostingBillList({ pmParkId, billType, billStartDate, billEndDate, start, limit }) {

    return request({
        url: '/tcAccountCheck/hosting/getHostingBillList',
        method: 'post',
        data: {
            pmParkId, billType, billStartDate, billEndDate, start, limit
        }
    })
}

/**
 * 服务费冲账明细记录查询
 * @param {*} param0 
 * @returns 
 */
export function getHostingReverseList({ pmReverseId, start, limit }) {
    return request({
        url: '/tcAccountCheck/hosting/getHostingReverseList',
        method: 'post',
        data: {
            pmReverseId, start, limit
        }
    })
}

/**
 * 服务费开票明细记录查询
 * @param {*} param0 
 * @returns 
 */
export function getHostingInvoiceList({ pmHostingMonthlyBillId, start, limit }) {

    return request({
        url: '/tcAccountCheck/hosting/getHostingInvoiceList',
        method: 'post',
        data: {
            pmHostingMonthlyBillId, start, limit
        }
    })
}

/**
 * 服务费账单记录导出
 * @param {*} param0 
 * @returns 
 */
export function getHostingBillListFile({ pmParkId, billType, billStartDate, billEndDate }) {
    return request({
        url: '/tcAccountCheck/hosting/getHostingBillListFile',
        method: 'post',
        data: {
            pmParkId, billType, billStartDate, billEndDate
        }
    })
}

/**
 * 缴清欠款
 * @param {*} param0 
 * @returns 
 */
export function clearArrearsAmount({ pmHostingMonthlyBillId }) {
    return request({
        url: '/tcAccountCheck/hosting/clearArrearsAmount',
        method: 'post',
        data: {
            pmHostingMonthlyBillId
        }
    })
}

/**
 * 开纸质票
 * @param {*} param0 
 * @returns 
 */
export function openPaperInvoice({ pmHostingMonthlyBillId }) {
    return request({
        url: '/tcAccountCheck/hosting/openPaperInvoice',
        method: 'post',
        data: {
            pmHostingMonthlyBillId
        }
    })
}

/**
 * 开电子票
 * @param {*} param0 
 * @returns 
 */
export function openElectricInVoice({ pmHostingMonthlyBillId, pmParkId, parkName, parkContactEmail, invoiceType, invoiceAmount, invoiceTitle, identificationNumber, address, telPhone, bank, account }) {
    return request({
        url: '/tcAccountCheck/hosting/openElectricInVoice',
        method: 'post',
        data: {
            pmHostingMonthlyBillId, pmParkId, parkName, parkContactEmail, invoiceType, invoiceAmount, invoiceTitle, identificationNumber, address, telPhone, bank, account
        }
    })
}

/**
 * 根据id查询服务费配置
 * @param {*} param0 
 * @returns 
 */
export function getPmHostingSetById({ id }) {
    return request({
        url: `/tcAccountCheck/hosting/getPmHostingSetById/${id}`,
        method: 'post',
        data: {
        }
    })
}

/**
 * 获取下个账单生成时间
 * @param {*} param0 
 * @returns 
 */
export function getNextBillDate({ billType, billCycle, createStartDate, createEndDate }) {
    return request({
        url: `/tcAccountCheck/hosting/getNextBillDate`,
        method: 'post',
        data: {
            billType, billCycle, createStartDate, createEndDate
        }
    })
}





