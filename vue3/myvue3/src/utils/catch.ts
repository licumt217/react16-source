import storage from 'good-storage';


const prefix = 'CURRENT_TAB_'
export const setParkCurrentTab = (key: any, value: any) => {
    storage.session.set(`${prefix}${key}`, value)
}

export const getParkCurrentTab = (key: any) => {
    return storage.session.get(`${prefix}${key}`)
}

export const removeParkCurrentTab = (key: any) => {
    storage.session.remove(`${prefix}${key}`)
}

// 存储发票信息
const invoicePrefix = 'CHECK_INVOICE_INFO_'
export const setCheckInvoiceInfo = (key: any, value: any) => {
    storage.session.set(`${invoicePrefix}${key}`, value)
}

export const getCheckInvoiceInfo = (key: any) => {
    return storage.session.get(`${invoicePrefix}${key}`, {})
}

export const removeCheckInvoiceInfo = (key: any) => {
    storage.session.remove(`${invoicePrefix}${key}`)
}

// 存储车场搜索信息
const parkSearchHistoryKey = 'PARK_SEARCH_HISTORY'
export const setParkSearchResult = (value: any) => {
    storage.session.set(parkSearchHistoryKey, value)
}

export const getParkSearchResult = () => {
    return storage.session.get(parkSearchHistoryKey, [])
}

export const removeParkSearchResult = () => {
    storage.session.remove(parkSearchHistoryKey)
}

// 存储车场ID
const parkIdKey = 'TJD_PARK_ID'
export const setParkId = (id: any) => {
    storage.session.set(parkIdKey, id)
}

export const getParkId = () => {
    return storage.session.get(parkIdKey, '')
}

export const removeParkId = () => {
    storage.session.remove(parkIdKey)
}

const creatorNameKey = 'CREATOR_NAME'
export const setCreatorName = (name: any) => {
    storage.session.set(creatorNameKey, name)
}

export const getCreatorName = () => {
    return storage.session.get(creatorNameKey, '')
}

export const removeCreatorName = () => {
    storage.session.remove(creatorNameKey)
}

// 存储路由入口
const routeName = 'ROUTE_FROM_NAME'
export const setRouteFromName = (name: any) => {
    storage.session.set(routeName, name)
}

export const getRouteFromName = () => {
    return storage.session.get(routeName, '')
}

// 存储详情
export const setDetailToSession = (key: any, data: any) => {
    storage.session.set(key, data)
}

export const getDetailFromSession = (key: any) => {
    return storage.session.get(key, {})
}
