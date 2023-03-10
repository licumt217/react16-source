import request from '@/utils/request'

/**
 * 获取车场列表
 * @param interName
 * @param parkCode
 * @param parkName
 * @param parkState
 * @param start
 * @param limit
 * @returns {AxiosPromise}
 */
export function getParkList({ isCloud, parkCode, parkName, isBaseEdit, isConfig, pageSize, pageNum }) {
    return request({
        url: '/parkapi/parkInfo/getParkList',
        method: 'post',
        data: {
            isCloud, parkCode, parkName, isBaseEdit, isConfig, pageNum, pageSize
        }
    })
}

/**
 * 获取停车场汇总信息
 */
export function getParkCollectData() {
    return request({
        url: '/parkapi/parkInfo/getFrontPageParkCount'
    });
}

/**
 * 添加停车场
 * @param address
 * @param alias
 * @param applyDt
 * @param applyUserId
 * @param attribution
 * @param authUserId
 * @param baiduMapUid
 * @param category
 * @param parkYTS
 * @param city
 * @param cityCode
 * @param closeTime
 * @param contractUrl
 * @param count
 * @param createDate
 * @param createTime
 * @param createUserId
 * @param dialingCode
 * @param district
 * @param districtCode
 * @param editState
 * @param firstSignDt
 * @param firstSignUserId
 * @param gaodeMapUid
 * @param gmCompanyId
 * @param gmRegionId
 * @param interName
 * @param internalPicutre
 * @param isDay
 * @param isFree
 * @param isImportant
 * @param isPreferential
 * @param isReserve
 * @param isTceasyPark
 * @param latitude
 * @param logo
 * @param longitude
 * @param maxCount
 * @param openTime
 * @param operatorName
 * @param operatorPhone
 * @param parkArea
 * @param parkCode
 * @param parkName
 * @param parkState
 * @param parkType
 * @param picture
 * @param prepayAmount
 * @param privateCount
 * @param provinnce
 * @param provinnceCode
 * @param publicCount
 * @param signDt
 * @param signUserId
 * @param stability
 * @param status
 * @param wLatitude
 * @param wLongitude
 * @returns {AxiosPromise}
 */
export function addPark({ isCloud, address, alias, attribution, baiduMapUid, parkYTS, city, cityCode, closeTime, count, district, districtCode, gaodeMapUid, gmCompanyId, gmRegionId, interName, noteName, latitude, logo, longitude, maxCount, openTime, parkCode, parkName, parkState, parkType, picture, privateCount, provinnce, provinnceCode, publicCount, wLatitude, wLongitude, operatorName, operatorPhone, originatorUserId, ossUrl, deptName, department }) {
    return request({
        url: '/parkapi/parkInfo/addSimple',
        method: 'post',
        data: {
            isCloud, address, alias, attribution, baiduMapUid, parkYTS, city, cityCode, closeTime, count, district, districtCode, gaodeMapUid, gmCompanyId, gmRegionId, interName, noteName, latitude, logo, longitude, maxCount, openTime, parkCode, parkName, parkState, parkType, picture, privateCount, provinnce, provinnceCode, publicCount, wLatitude, wLongitude, operatorName, operatorPhone, originatorUserId, ossUrl, deptName, department
        }
    });
}

/**
 * 修改车场
 * @param pmParkId
 * @param address
 * @param alias
 * @param applyDt
 * @param attribution
 * @param baiduMapUid
 * @param category
 * @param parkYTS
 * @param city
 * @param cityCode
 * @param closeTime
 * @param contractUrl
 * @param count
 * @param dialingCode
 * @param district
 * @param districtCode
 * @param gaodeMapUid
 * @param gmCompanyId
 * @param gmRegionId
 * @param interName
 * @param internalPicutre
 * @param isDay
 * @param isFree
 * @param isImportant
 * @param isMonth
 * @param isPreferential
 * @param isReserve
 * @param isTceasyPark
 * @param latitude
 * @param logo
 * @param longitude
 * @param maxCount
 * @param openTime
 * @param operatorName
 * @param operatorPhone
 * @param parkArea
 * @param parkCode
 * @param parkName
 * @param parkState
 * @param parkType
 * @param picture
 * @param prepayAmount
 * @param privateCount
 * @param provinnce
 * @param provinnceCode
 * @param publicCount
 * @param stability
 * @param status
 * @param wLatitude
 * @param wLongitude
 */
export function editPark({ pmParkId, address, alias, attribution, baiduMapUid, parkYTS, city, cityCode, closeTime, count, district, districtCode, gaodeMapUid, gmCompanyId, gmRegionId, interName, noteName, latitude, logo, longitude, maxCount, openTime, parkCode, parkName, parkState, parkType, picture, privateCount, provinnce, provinnceCode, publicCount, wLatitude, wLongitude, operatorName, operatorPhone, originatorUserId, ossUrl, deptName, department, verifyRemark }) {
    return request({
        url: '/parkapi/parkInfo/editPark',
        method: 'post',
        data: {
            pmParkId, address, alias, attribution, baiduMapUid, parkYTS, city, cityCode, closeTime, count, district, districtCode, gaodeMapUid, gmCompanyId, gmRegionId, interName, noteName, latitude, logo, longitude, maxCount, openTime, parkCode, parkName, parkState, parkType, picture, privateCount, provinnce, provinnceCode, publicCount, wLatitude, wLongitude, operatorName, operatorPhone, originatorUserId, ossUrl, deptName, department, verifyRemark
        }
    });
}

/**
 * 下载车场excel
 * @param interName
 * @param isTceasyPark
 * @param parkCode
 * @param parkName
 * @param parkState
 * @returns {AxiosPromise}
 */
export function downloadParkExcel({ interName, isTceasyPark, parkCode, parkName, parkState }) {
    return request({
        url: '/parkapi/parkInfo/downloadExcel',
        method: 'post',
        data: {
            interName,
            isTceasyPark,
            parkCode,
            parkName,
            parkState
        },
        responseType: 'blob'
    })
}

/**
 * 修改车场定位
 * @param pmParkId
 * @param longitude
 * @param latitude
 * @param wLongitude
 * @param wLatitude
 * @param baiduMapUid
 * @param gaodeMapUid
 */
export function updateParkPosition({ pmParkId, longitude, latitude, wLongitude, wLatitude, baiduMapUid, gaodeMapUid }) {
    return request({
        url: '/parkapi/parkInfo/updateParkPosition',
        method: 'post',
        data: {
            pmParkId, longitude, latitude, wLongitude, wLatitude, baiduMapUid, gaodeMapUid
        }
    });
}

/**
 * 获取车场详细信息
 * @param pmParkId
 */
export function getParkDetailById({ pmParkId }) {
    return request({
        url: `/parkapi/parkInfo/getParkInfoByParkId/${pmParkId}`
    });
}

/**
 * 获取部门列表
 * @param companyId
 */
export function getDepartmentByCompanyId({ companyId }) {
    return request({
        url: `/parkapi/region/getRegionsByCompanyId/${companyId}`
    });
}

/**
 * 获取开关列表
 * @param pmParkId
 */
export function getSwitchList({ pmParkId }) {
    return request({
        url: `/parkapi/parkset/queryConfigList/${pmParkId}`
    });
}

/**
 * 修改开关状态
 * @param enableStatus
 * @param pmParkSetId
 * @param remark
 */
export function updateSwitchState({ enableStatus, pmParkSetId }) {
    return request({
        url: '/parkapi/parkset/modifyPmParkSetStatus',
        method: 'post',
        data: {
            enableStatus, pmParkSetId
        }
    });
}

/**
 * 获取出入口列表
 * @param pmParkId
 */
export function getEntranceList({ pmParkId, pageNum, pageSize }) {
    return request({
        url: `/parkapi/config/exit/list/${pmParkId}`,
        params: {
            pageNum,
            pageSize
        }
    });
}



/**
 * 更新出入口
 * @param pmParkExitId
 * @param pmParkId
 * @param parkName
 * @param exitType
 * @param longitude
 * @param latitude
 * @param wLongitude
 * @param wLatitude
 * @param exitNo
 * @param isAutoLift
 * @param state
 * @param picture
 * @returns {AxiosPromise}
 */
export function updateEntrance({ exitCode, pmParkExitId, pmParkId, parkName, exitType, longitude, latitude, wLongitude, wLatitude, exitNo, isAutoLift, state, picture }) {
    return request({
        url: '/parkapi/config/exit/editEntrance',
        method: 'post',
        data: {
            exitCode, pmParkExitId, pmParkId, parkName, exitType, longitude, latitude, wLongitude, wLatitude, exitNo, isAutoLift, state, picture
        }
    });
}

/**
 * 修改出入口
 * @param pmParkExitId
 * @param pmParkId
 * @param longitude
 * @param latitude
 * @returns {AxiosPromise}
 */
export function editEntrance({ exitCode, pmParkExitId, pmParkId, parkName, exitLocalType, longitude, latitude, wLongitude, wLatitude, exitNo, isAutoLift, isAutoDown, state, picture }) {
    return request({
        url: '/parkapi/config/exit/edit',
        method: 'post',
        data: {
            exitCode, pmParkExitId, pmParkId, parkName, exitLocalType, longitude, latitude, wLongitude, wLatitude, exitNo, isAutoLift, isAutoDown, state, picture
        }
    })
}

/**
 * 新增出入口
 * @param pmParkId
 * @param longitude
 * @param latitude
 * @returns {AxiosPromise}
 */
export function addEntrance({ exitCode, pmParkId, parkName, exitLocalType, longitude, latitude, wLongitude, wLatitude, exitNo, isAutoLift, isAutoDown, state, picture }) {
    return request({
        url: '/parkapi/config/exit/add',
        method: 'post',
        data: {
            exitCode, pmParkId, parkName, exitLocalType, longitude, latitude, wLongitude, wLatitude, exitNo, isAutoLift, isAutoDown, state, picture
        }
    })
}

/**
 * 删除出入口
 * @param pmParkExitId
 */
export function deleteEntrance({ pmParkExitId }) {
    return request({
        url: `/parkapi/config/exit/delete`,
        method: 'post',
        data: {
            pmParkExitId
        }
    });
}

/**
 * 添加对账信息
 * @param pmParkId
 * @param businessType
 * @param cycle
 * @param shortParkName
 * @param chargePercent
 * @param chargeAmount
 * @param name
 * @param bankName
 * @param accountNo
 * @param branchBank
 * @param province
 * @param city
 * @param payeeType
 * @param phone
 * @param email
 * @returns {AxiosPromise}
 */
export function addCheckInfo({ pmParkId, businessType, cycle, shortParkName, chargePercent, chargeAmount, name, bankName, accountNo, branchBank, province, city, payeeType, phone, email, reconcileDate }) {
    return request({
        url: '/parkapi/setcheck/addPmSetCheck',
        method: 'post',
        data: {
            pmParkId, businessType, cycle, shortParkName, chargePercent, chargeAmount, name, bankName, accountNo, branchBank, province, city, payeeType, phone, email, reconcileDate
        }
    });
}

/**
 * 更新对账信息
 * @param pmSetcheckId
 * @param pmParkId
 * @param gmBankcardId
 * @param businessType
 * @param cycle
 * @param shortParkName
 * @param chargePercent
 * @param chargeAmount
 * @param name
 * @param bankName
 * @param accountNo
 * @param branchBank
 * @param province
 * @param city
 * @param payeeType
 * @param phone
 * @param email
 * @returns {AxiosPromise}
 */
export function updateCheckInfo({ pmSetcheckId, pmParkId, gmBankcardId, businessType, cycle, shortParkName, chargePercent, chargeAmount, name, bankName, accountNo, branchBank, province, city, payeeType, phone, email, reconcileDate }) {
    return request({
        url: '/parkapi/setcheck/updatePmSetCheck',
        method: 'post',
        data: {
            pmSetcheckId, pmParkId, gmBankcardId, businessType, cycle, shortParkName, chargePercent, chargeAmount, name, bankName, accountNo, branchBank, province, city, payeeType, phone, email, reconcileDate
        }
    })
}

/**
 * 获取对账信息
 * @param parkType
 * @param pmParkId
 * @returns {AxiosPromise}
 */
export function getCheckInfo({ parkType, pmParkId }) {
    return request({
        url: `/parkapi/setcheck/getPmSetCheckByParkId/${pmParkId}/${parkType}`
    })
}

/**
 * 驳回对账信息
 * @param pmParkId
 * @param pmSetcheckId
 */
export function rejectCheckInfo({ pmParkId, pmSetCheckId }) {
    return request({
        url: `/parkapi/setcheck/reject/${pmParkId}/${pmSetCheckId}`
    })
}

/**
 * 审核对账信息
 * @param pmParkId
 * @param pmSetCheckId
 * @returns {AxiosPromise}
 */
export function verifyCheckInfo({ pmParkId, pmSetCheckId }) {
    return request({
        url: `/parkapi/setcheck/verify/${pmParkId}/${pmSetCheckId}`
    })
}

/**
 * 提交审核
 * @param pmParkId
 * @param pmSetCheckId
 * @returns {AxiosPromise}
 */
export function submitVerify({ pmParkId, pmSetCheckId }) {
    return request({
        url: `/parkapi/setcheck/submitReview/${pmParkId}/${pmSetCheckId}`
    })
}

/**
 * 取消审核
 * @param pmParkId
 * @param pmSetcheckId
 * @returns {AxiosPromise}
 */
export function cancelVerify({ pmParkId, pmSetCheckId }) {
    return request({
        url: `/parkapi/setcheck/cancelVerify/${pmParkId}/${pmSetCheckId}`
    })
}

/**
 * 签约车场
 * @param pmParkId
 * @returns {AxiosPromise}
 */
export function signPark({ pmParkId }) {
    return request({
        url: `/parkapi/parkInfo/sign/${pmParkId}`,
        method: 'post'
    })
}

/**
 * 取消审核
 * @param pmParkId
 * @returns {AxiosPromise}
 */
export function getSecretKey({ pmParkId }) {
    return request({
        url: `/parkapi/parkInfo/getSecretByPmParkId/${pmParkId}`
    })
}

/**
 * 审核停车场
 * @param pmParkId
 * @returns {AxiosPromise}
 */
export function approvePark({ pmParkId }) {
    return request({
        url: `/parkapi/parkInfo/approve/${pmParkId}`,
        method: 'post'
    })
}

/**
 * 取消审核
 * @param pmParkId
 * @returns {AxiosPromise}
 */
export function cancelApprovePark({ pmParkId }) {
    return request({
        url: `/parkapi/parkInfo/cancelApprove/${pmParkId}`,
        method: 'post'
    })
}

/**
 * 获取周边停车场
 * @param lat
 * @param lng
 * @param radius
 * @returns {AxiosPromise}
 */
export function getParkListByBaiduPosition({ lat, lng, radius = 2000 }) {
    return request({
        url: '/parkapi/config/exit/getBaiduPark',
        params: {
            lat, lng, radius
        }
    })
}

/**
 * 获取周边停车场
 * @param lat
 * @param lng
 * @param radius
 * @returns {AxiosPromise}
 */
export function getParkListByGaodePosition({ lat, lng, radius = 2000 }) {
    return request({
        url: '/parkapi/config/exit/getGaoDePark',
        params: {
            lat, lng, radius
        }
    })
}

/**
 * 获取用户钉钉部门信息
 * @returns {AxiosPromise}
 */
export function getDingDingDepartmentInfo() {
    return request({
        url: '/parkapi/dingding/user/getDepartmentByPhone'
    })
}

export function uploadOss(type, data) {
    return request({
        url: `parkapi/parkInfo/uploadOss/${type}`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export function addOrUpdateCheckInfo({ smid, settleType, pmSetcheckId, gmBankcardId, isEnable, cycle, delayNum, payeeType, phone, email, name, bankName, accountNo, branchBank, province, city, department, deptName, originatorUserId, pmParkId, businessType, ossUrl, reason, reconcileDate, shortParkName, chargeAmount, chargePercent, invoiceTitle, taxRegisterNo }) {
    return request({
        url: '/parkapi/setcheck/addOrUpdatePmSetCheck',
        method: 'post',
        data: {
            smid, settleType, pmSetcheckId, gmBankcardId, isEnable, cycle, delayNum, payeeType, phone, email, name, bankName, accountNo, branchBank, province, city, department, deptName, originatorUserId, pmParkId, businessType, ossUrl, reason, reconcileDate, shortParkName, chargeAmount, chargePercent, invoiceTitle, taxRegisterNo
        }
    })
}

export function getConfigInfo({ pmParkId }) {
    return request({
        url: `/parkapi/config/toll/${pmParkId}`
    })
}

export function getParkSwitchList({ pmParkId }) {
    return request({
        url: `/parkapi/config/parkset/list/${pmParkId}`
    })
}

export function addParkConfigInfo(data) {
    return request({
        url: '/parkapi/config/',
        method: 'post',
        data
    })
}

export function getVerifyList(queryParams) {
    return request({
        url: '/parkapi/park/verify/list',
        params: queryParams
    })
}

export function getVerifyDetail({ pmParkVerifyId }) {
    return request({
        url: `/parkapi/park/verify/${pmParkVerifyId}`
    })
}

export function getModifyDetail({ verifyId }) {
    return request({
        url: `/parkapi/modifyDetail/${verifyId}`
    })
}

export function selectLastVerify({ pmParkId, type, businessType }) {
    return request({
        url: `/parkapi/park/verify/selectLastVerify`,
        params: {
            pmParkId,
            type,
            businessType
        }
    })
}

export function getMapImage({ type, center, markers, markerStyles, width, height, zoom }) {
    return request({
        url: '/parkapi/parkInfo/getMapPicture',
        params: {
            type, center, markers, markerStyles, width, height, zoom
        },
        responseType: 'blob'
    })
}

export function getParkBaseInfoStatus({ pmParkId }) {
    return request({
        url: `/parkapi/parkInfo/selectParkBasicById/${pmParkId}`
    })
}

export function getInvoiceList({ pmParkId }) {
    return request({
        url: `/parkapi/invoice/list/${pmParkId}`
    })
}

export function addInvoice({ pmParkId, invoiceInfoId, invoiceTitle, taxRegisterNo, address, phone, branchBank, accountNo, remark, email, department, deptName, originatorUserId, ossUrl }) {
    return request({
        url: '/parkapi/invoice',
        method: 'post',
        data: { pmParkId, invoiceInfoId, invoiceTitle, taxRegisterNo, address, phone, branchBank, accountNo, remark, email, department, deptName, originatorUserId, ossUrl }
    })
}

export function getInvoiceDetail({ invoiceInfoId }) {
    return request({
        url: `/parkapi/invoice/${invoiceInfoId}`
    })
}

export function updateDynamicShortUrl({ dynamicShortUrl, pmParkExitId }) {
    return request({
        url: '/parkapi/config/exit/updateDynamicShortUrl',
        method: 'post',
        data: {
            dynamicShortUrl, pmParkExitId
        }
    })
}

export function downloadEntranceList({ pmParkId }) {
    return request({
        url: `/parkapi/config/exit/export/${pmParkId}`
    })
}

/**
 * 添加公司
 * @param name
 * @returns {AxiosPromise}
 */
export function addCompany({ name }) {
    return request({
        url: '/parkapi/company/add',
        method: 'post',
        data: {
            name
        }
    })
}

/**
 * 查询所有公司
 * @returns {AxiosPromise}
 */
export function getCompanyList() {
    return request({
        url: '/parkapi/company/list'
    })
}

/**
 * 查看区域列表
 * @param pmParkId
 */
export function getAreaList({ pmParkId }) {
    return request({
        url: `/parkapi/config/area/list/${pmParkId}`,
        method: 'post'
    });
}

/**
 * 添加区域
 * @param name
 * @returns {AxiosPromise}
 */
export function addArea({ pmParkId, areaName, longitude, latitude, wlongitude, wlatitude, memo, pmParkExitareaVos }) {
    return request({
        url: '/parkapi/config/area/add',
        method: 'post',
        data: {
            pmParkId, areaName, longitude, latitude, wlongitude, wlatitude, memo, pmParkExitareaVos
        }
    })
}

/**
 * 修改区域
 * @param name
 * @returns {AxiosPromise}
 */
export function updateArea({ pmParkId, pmParkAreaId, areaName, longitude, latitude, wlongitude, wlatitude, memo, pmParkExitareaVos }) {
    return request({
        url: '/parkapi/config/area/edit',
        method: 'post',
        data: {
            pmParkId, pmParkAreaId, areaName, longitude, latitude, wlongitude, wlatitude, memo, pmParkExitareaVos
        }
    })
}

/**
 * 删除区域
 * @param {*} param0
 * @returns
 */
export function deleteArea({ pmParkAreaId }) {
    return request({
        url: '/parkapi/config/area/delete',
        method: 'post',
        data: {
            pmParkAreaId
        }
    })
}

/**
 * 查看区域详情
 * @param {*} param0
 * @returns
 */
export function getAreaDetail({ pmParkAreaId }) {
    return request({
        url: '/parkapi/config/area/view',
        method: 'post',
        data: {
            pmParkAreaId
        }
    })
}

/**
 * 查询可被区域绑定的出入口
 * @param {*} param0
 * @returns
 */
export function getUsefulExitsByParkId({ exitAreaType, pmParkId }) {
    return request({
        url: '/parkapi/config/area/getUsefulExitsByParkId',
        method: 'post',
        data: {
            exitAreaType,
            pmParkId
        }
    })
}

/**
 * 获取包月用户组列表
 * @param {*} param0
 * @returns
 */
export function getUserGroups({ pmParkId }) {
    return request({
        url: '/tcRentSet/userGroup/listByParkId',
        method: 'post',
        data: {
            pmParkId
        }
    })
}

/**
 * 获取云大B车场配置
 * @param {} param0
 * @returns
 */
export function getBCloudParkSets({ pmParkId }) {
    return request({
        url: `/parkapi/parkInfo/getBCloudParkSets/${pmParkId}`
    })
}


/**
 * 售后宝列表
 * @param {} param0
 * @returns
 */
export function getShbList({ pageNum, pageSize, parkCode, aftermarketCode }) {
    return request({
        url: '/parkapi/parkAftermarket/list',
        method: 'post',
        data: {
            pageNum, pageSize, parkCode, aftermarketCode
        }
    })
}

/**
 * 新建售后宝
 * @param {} param0
 * @returns
 */
export function addShb({ parkCode, aftermarketCode, state }) {
    return request({
        url: '/parkapi/parkAftermarket/add',
        method: 'post',
        data: {
            parkCode, aftermarketCode, state
        }
    })
}


/**
 * 新建售后宝
 * @param {} param0
 * @returns
 */
export function deleteShb({ parkAftermarketRelaId }) {
    return request({
        url: '/parkapi/parkAftermarket/delete',
        method: 'post',
        data: {
            parkAftermarketRelaId
        }
    })
}

/**
 * 编辑售后宝
 * @param {} param0
 * @returns
 */
export function editShb({ parkAftermarketRelaId, aftermarketCode, state }) {
    return request({
        url: '/parkapi/parkAftermarket/edit',
        method: 'post',
        data: {
            parkAftermarketRelaId, aftermarketCode, state
        }
    })
}

/**
 * 广告屏蔽功能分页查询
 * @param {} param0
 * @returns
 */
export function clientAdBlockPageQuery(data) {
    return request({
        url: '/tcaction/clientAdBlock/pageQuery',
        method: 'post',
        data: {
            ...data
        }
    })
}
/**
 * 新增广告屏蔽
 * @param {} param0
 * @returns
 */
export function addClientAdBlock(data) {
    return request({
        url: '/tcaction/clientAdBlock/add',
        method: 'post',
        data: {
            ...data
        }
    })
}
/**
 * 修改广告屏蔽
 * @param {} param0
 * @returns
 */
export function editClientAdBlock(data) {
    const {id} = data
    return request({
        url: `/tcaction/clientAdBlock/update/${id}`,
        method: 'post',
        data: {
            ...data
        }
    })
}
/**
 * 删除广告屏蔽
 * @param {} param0
 * @returns
 */
export function delClientAdBlock(data) {
    const {id} = data
    return request({
        url: `/tcaction/clientAdBlock/remove/${id}`,
        method: 'post'
    })
}



